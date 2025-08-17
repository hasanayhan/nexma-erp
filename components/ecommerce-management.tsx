"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Plus,
  Search,
  Filter,
  Edit,
  ShoppingCart,
  Globe,
  FolderSyncIcon as Sync,
  Eye,
  TrendingUp,
  Clock,
} from "lucide-react"

interface EcommerceOrder {
  id: string
  orderNumber: string
  platform: "shopify" | "woocommerce" | "trendyol" | "hepsiburada" | "n11"
  customerName: string
  customerEmail: string
  customerPhone: string
  orderDate: string
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled" | "refunded"
  items: OrderItem[]
  subtotal: number
  shipping: number
  tax: number
  total: number
  shippingAddress: string
  trackingNumber?: string
  notes: string
}

interface OrderItem {
  id: string
  productCode: string
  productName: string
  quantity: number
  unitPrice: number
  total: number
}

interface PlatformIntegration {
  id: string
  platform: "shopify" | "woocommerce" | "trendyol" | "hepsiburada" | "n11"
  name: string
  status: "connected" | "disconnected" | "error"
  apiKey: string
  storeUrl: string
  lastSync: string
  totalOrders: number
  totalRevenue: number
}

interface EcommerceManagementProps {
  onBack: () => void
  language: "tr" | "en"
}

const translations = {
  tr: {
    title: "E-ticaret Yönetimi",
    subtitle: "Online satış kanalları ve sipariş yönetimi",
    backToHome: "Ana Sayfa",
    syncAll: "Tümünü Senkronize Et",
    addPlatform: "Platform Ekle",
    totalOrders: "Toplam Sipariş",
    onlineRevenue: "Online Gelir",
    pendingOrders: "Bekleyen Siparişler",
    connectedPlatforms: "Bağlı Platformlar",
    thisMonth: "Bu ay",
    increase: "+15.3% artış",
    actionRequired: "İşlem gerekli",
    total: "toplam",
    orders: "Siparişler",
    integrations: "Platform Entegrasyonları",
    analytics: "Analitik",
    searchPlaceholder: "Sipariş numarası veya müşteri adı ile ara...",
    allPlatforms: "Tüm Platformlar",
    allStatuses: "Tüm Durumlar",
    orderList: "Sipariş Listesi",
    ordersShowing: "sipariş gösteriliyor",
    orderNo: "Sipariş No",
    platform: "Platform",
    customer: "Müşteri",
    date: "Tarih",
    amount: "Tutar",
    status: "Durum",
    actions: "İşlemler",
    pending: "Bekliyor",
    processing: "İşleniyor",
    shipped: "Kargoda",
    delivered: "Teslim Edildi",
    cancelled: "İptal",
    refunded: "İade",
    connected: "Bağlı",
    disconnected: "Bağlı Değil",
    error: "Hata",
    totalOrdersCount: "Toplam Sipariş:",
    totalRevenueAmount: "Toplam Gelir:",
    lastSync: "Son Senkronizasyon:",
    synchronize: "Senkronize Et",
    platformPerformance: "Platform Performansı",
    salesDistribution: "Platformlara göre satış dağılımı",
    orderStatuses: "Sipariş Durumları",
    currentOrderStatus: "Mevcut sipariş durumu dağılımı",
    orderDetail: "Sipariş Detayı",
    orderInfo: "Sipariş Bilgileri",
    customerInfo: "Müşteri Bilgileri",
    deliveryAddress: "Teslimat Adresi",
    orderItems: "Sipariş Kalemleri",
    orderTotal: "Sipariş Toplamı",
    product: "Ürün",
    quantity: "Miktar",
    unitPrice: "Birim Fiyat",
    subtotal: "Ara Toplam",
    shipping: "Kargo",
    tax: "Vergi",
    grandTotal: "Genel Toplam",
    notes: "Notlar",
    trackingNo: "Kargo Takip",
    notYet: "Henüz yok",
    newPlatformIntegration: "Yeni Platform Entegrasyonu",
    enterConnectionInfo: "E-ticaret platformu bağlantı bilgilerini girin.",
    selectPlatform: "Platform seçin",
    storeName: "Mağaza Adı",
    enterStoreName: "Mağaza adını girin",
    apiKey: "API Anahtarı",
    enterApiKey: "API anahtarını girin",
    storeUrl: "Mağaza URL",
    cancel: "İptal",
    connect: "Bağlan",
  },
  en: {
    title: "E-commerce Management",
    subtitle: "Online sales channels and order management",
    backToHome: "Home",
    syncAll: "Sync All",
    addPlatform: "Add Platform",
    totalOrders: "Total Orders",
    onlineRevenue: "Online Revenue",
    pendingOrders: "Pending Orders",
    connectedPlatforms: "Connected Platforms",
    thisMonth: "This month",
    increase: "+15.3% increase",
    actionRequired: "Action required",
    total: "total",
    orders: "Orders",
    integrations: "Platform Integrations",
    analytics: "Analytics",
    searchPlaceholder: "Search by order number or customer name...",
    allPlatforms: "All Platforms",
    allStatuses: "All Statuses",
    orderList: "Order List",
    ordersShowing: "orders showing",
    orderNo: "Order No",
    platform: "Platform",
    customer: "Customer",
    date: "Date",
    amount: "Amount",
    status: "Status",
    actions: "Actions",
    pending: "Pending",
    processing: "Processing",
    shipped: "Shipped",
    delivered: "Delivered",
    cancelled: "Cancelled",
    refunded: "Refunded",
    connected: "Connected",
    disconnected: "Disconnected",
    error: "Error",
    totalOrdersCount: "Total Orders:",
    totalRevenueAmount: "Total Revenue:",
    lastSync: "Last Sync:",
    synchronize: "Synchronize",
    platformPerformance: "Platform Performance",
    salesDistribution: "Sales distribution by platforms",
    orderStatuses: "Order Statuses",
    currentOrderStatus: "Current order status distribution",
    orderDetail: "Order Detail",
    orderInfo: "Order Information",
    customerInfo: "Customer Information",
    deliveryAddress: "Delivery Address",
    orderItems: "Order Items",
    orderTotal: "Order Total",
    product: "Product",
    quantity: "Quantity",
    unitPrice: "Unit Price",
    subtotal: "Subtotal",
    shipping: "Shipping",
    tax: "Tax",
    grandTotal: "Grand Total",
    notes: "Notes",
    trackingNo: "Tracking No",
    notYet: "Not yet",
    newPlatformIntegration: "New Platform Integration",
    enterConnectionInfo: "Enter e-commerce platform connection details.",
    selectPlatform: "Select platform",
    storeName: "Store Name",
    enterStoreName: "Enter store name",
    apiKey: "API Key",
    enterApiKey: "Enter API key",
    storeUrl: "Store URL",
    cancel: "Cancel",
    connect: "Connect",
  },
}

const mockOrders: EcommerceOrder[] = [
  {
    id: "1",
    orderNumber: "SH-2024-001",
    platform: "shopify",
    customerName: "Ahmet Yılmaz",
    customerEmail: "ahmet@email.com",
    customerPhone: "+90 532 123 4567",
    orderDate: "2024-01-15",
    status: "processing",
    items: [
      {
        id: "1",
        productCode: "LP001",
        productName: "Dell XPS 13 Laptop",
        quantity: 1,
        unitPrice: 12000,
        total: 12000,
      },
    ],
    subtotal: 12000,
    shipping: 50,
    tax: 2400,
    total: 14450,
    shippingAddress: "Maslak Mah. Teknoloji Cad. No:15 Sarıyer/İstanbul",
    trackingNumber: "TR123456789",
    notes: "Hızlı teslimat talep edildi",
  },
  {
    id: "2",
    orderNumber: "TR-2024-002",
    platform: "trendyol",
    customerName: "Ayşe Demir",
    customerEmail: "ayse@email.com",
    customerPhone: "+90 533 987 6543",
    orderDate: "2024-01-14",
    status: "shipped",
    items: [
      {
        id: "1",
        productCode: "MS001",
        productName: "Logitech MX Master 3",
        quantity: 2,
        unitPrice: 650,
        total: 1300,
      },
    ],
    subtotal: 1300,
    shipping: 25,
    tax: 260,
    total: 1585,
    shippingAddress: "Çankaya Mah. İş Merkezi A Blok Kat:5 Çankaya/Ankara",
    trackingNumber: "TR987654321",
    notes: "",
  },
  {
    id: "3",
    orderNumber: "HB-2024-003",
    platform: "hepsiburada",
    customerName: "Mehmet Kaya",
    customerEmail: "mehmet@email.com",
    customerPhone: "+90 534 555 1234",
    orderDate: "2024-01-13",
    status: "delivered",
    items: [
      {
        id: "1",
        productCode: "KB001",
        productName: "Mechanical Keyboard",
        quantity: 1,
        unitPrice: 550,
        total: 550,
      },
    ],
    subtotal: 550,
    shipping: 15,
    tax: 110,
    total: 675,
    shippingAddress: "Ataşehir Mah. Ticaret Merkezi B Blok Ataşehir/İstanbul",
    trackingNumber: "HB456789123",
    notes: "Müşteri memnun kaldı",
  },
]

const mockIntegrations: PlatformIntegration[] = [
  {
    id: "1",
    platform: "shopify",
    name: "Shopify Mağazası",
    status: "connected",
    apiKey: "sk_****_****",
    storeUrl: "mystore.myshopify.com",
    lastSync: "2024-01-15 14:30",
    totalOrders: 45,
    totalRevenue: 125000,
  },
  {
    id: "2",
    platform: "trendyol",
    name: "Trendyol Mağazası",
    status: "connected",
    apiKey: "tr_****_****",
    storeUrl: "trendyol.com/magaza/mystore",
    lastSync: "2024-01-15 14:25",
    totalOrders: 78,
    totalRevenue: 89000,
  },
  {
    id: "3",
    platform: "hepsiburada",
    name: "Hepsiburada Mağazası",
    status: "error",
    apiKey: "hb_****_****",
    storeUrl: "hepsiburada.com/magaza/mystore",
    lastSync: "2024-01-14 10:15",
    totalOrders: 33,
    totalRevenue: 67000,
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-yellow-500"
    case "processing":
      return "bg-blue-500"
    case "shipped":
      return "bg-green-500"
    case "delivered":
      return "bg-green-500"
    case "cancelled":
      return "bg-red-500"
    case "refunded":
      return "bg-red-500"
    default:
      return "bg-gray-500"
  }
}

export function EcommerceManagement({ onBack, language }: EcommerceManagementProps) {
  const t = (key: keyof typeof translations.tr) => translations[language][key]

  const [orders, setOrders] = useState<EcommerceOrder[]>(mockOrders)
  const [integrations, setIntegrations] = useState<PlatformIntegration[]>(mockIntegrations)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPlatform, setSelectedPlatform] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedOrder, setSelectedOrder] = useState<EcommerceOrder | null>(null)
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false)
  const [isIntegrationDialogOpen, setIsIntegrationDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("orders")

  const platforms = ["all", "shopify", "woocommerce", "trendyol", "hepsiburada", "n11"]
  const orderStatuses = ["all", "pending", "processing", "shipped", "delivered", "cancelled", "refunded"]

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPlatform = selectedPlatform === "all" || order.platform === selectedPlatform
    const matchesStatus = selectedStatus === "all" || order.status === selectedStatus
    return matchesSearch && matchesPlatform && matchesStatus
  })

  const totalOrders = orders.length
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0)
  const pendingOrders = orders.filter((o) => o.status === "pending" || o.status === "processing").length
  const connectedPlatforms = integrations.filter((i) => i.status === "connected").length

  const getPlatformLabel = (platform: string) => {
    switch (platform) {
      case "shopify":
        return "Shopify"
      case "woocommerce":
        return "WooCommerce"
      case "trendyol":
        return "Trendyol"
      case "hepsiburada":
        return "Hepsiburada"
      case "n11":
        return "N11"
      default:
        return platform
    }
  }

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case "shopify":
        return "bg-green-500"
      case "woocommerce":
        return "bg-purple-500"
      case "trendyol":
        return "bg-orange-500"
      case "hepsiburada":
        return "bg-red-500"
      case "n11":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  const getIntegrationStatusColor = (status: string) => {
    switch (status) {
      case "connected":
        return "bg-green-500"
      case "disconnected":
        return "bg-gray-500"
      case "error":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const handleStatusChange = (orderId: string, newStatus: string) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: newStatus as any } : order)))
  }

  const handleSyncPlatform = (platformId: string) => {
    setIntegrations(
      integrations.map((integration) =>
        integration.id === platformId
          ? { ...integration, lastSync: new Date().toLocaleString("tr-TR"), status: "connected" as any }
          : integration,
      ),
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t("backToHome")}
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">{t("title")}</h1>
                <p className="text-muted-foreground">{t("subtitle")}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Sync className="h-4 w-4 mr-2" />
                {t("syncAll")}
              </Button>
              <Dialog open={isIntegrationDialogOpen} onOpenChange={setIsIntegrationDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    {t("addPlatform")}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>{t("newPlatformIntegration")}</DialogTitle>
                    <DialogDescription>{t("enterConnectionInfo")}</DialogDescription>
                  </DialogHeader>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label>{t("platform")}</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder={t("selectPlatform")} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="shopify">Shopify</SelectItem>
                          <SelectItem value="woocommerce">WooCommerce</SelectItem>
                          <SelectItem value="trendyol">Trendyol</SelectItem>
                          <SelectItem value="hepsiburada">Hepsiburada</SelectItem>
                          <SelectItem value="n11">N11</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>{t("storeName")}</Label>
                      <Input placeholder={t("enterStoreName")} />
                    </div>
                    <div className="space-y-2">
                      <Label>{t("apiKey")}</Label>
                      <Input placeholder={t("enterApiKey")} type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label>{t("storeUrl")}</Label>
                      <Input placeholder="https://mystore.shopify.com" />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline" onClick={() => setIsIntegrationDialogOpen(false)}>
                      {t("cancel")}
                    </Button>
                    <Button>{t("connect")}</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <ShoppingCart className="h-4 w-4" />
                {t("totalOrders")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{totalOrders}</div>
              <p className="text-xs text-muted-foreground">{t("thisMonth")}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                {t("onlineRevenue")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">₺{totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-green-600">{t("increase")}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {t("pendingOrders")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{pendingOrders}</div>
              <p className="text-xs text-muted-foreground">{t("actionRequired")}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Globe className="h-4 w-4" />
                {t("connectedPlatforms")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{connectedPlatforms}</div>
              <p className="text-xs text-muted-foreground">
                {integrations.length} {t("total")}
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="orders">{t("orders")}</TabsTrigger>
            <TabsTrigger value="integrations">{t("integrations")}</TabsTrigger>
            <TabsTrigger value="analytics">{t("analytics")}</TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder={t("searchPlaceholder")}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                    <SelectTrigger className="w-full md:w-48">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t("allPlatforms")}</SelectItem>
                      {platforms.slice(1).map((platform) => (
                        <SelectItem key={platform} value={platform}>
                          {getPlatformLabel(platform)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t("allStatuses")}</SelectItem>
                      {orderStatuses.slice(1).map((status) => (
                        <SelectItem key={status} value={status}>
                          {getStatusLabel(status, language)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Orders Table */}
            <Card>
              <CardHeader>
                <CardTitle>{t("orderList")}</CardTitle>
                <CardDescription>
                  {filteredOrders.length} {t("ordersShowing")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t("orderNo")}</TableHead>
                      <TableHead>{t("platform")}</TableHead>
                      <TableHead>{t("customer")}</TableHead>
                      <TableHead>{t("date")}</TableHead>
                      <TableHead>{t("amount")}</TableHead>
                      <TableHead>{t("status")}</TableHead>
                      <TableHead>{t("actions")}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.orderNumber}</TableCell>
                        <TableCell>
                          <Badge className={`${getPlatformColor(order.platform)} text-white`}>
                            {getPlatformLabel(order.platform)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{order.customerName}</p>
                            <p className="text-xs text-muted-foreground">{order.customerEmail}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          {new Date(order.orderDate).toLocaleDateString(language === "tr" ? "tr-TR" : "en-US")}
                        </TableCell>
                        <TableCell>₺{order.total.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge className={`${getStatusColor(order.status)} text-white`}>
                            {getStatusLabel(order.status, language)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedOrder(order)
                                setIsOrderDialogOpen(true)
                              }}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Select value={order.status} onValueChange={(value) => handleStatusChange(order.id, value)}>
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">{t("pending")}</SelectItem>
                                <SelectItem value="processing">{t("processing")}</SelectItem>
                                <SelectItem value="shipped">{t("shipped")}</SelectItem>
                                <SelectItem value="delivered">{t("delivered")}</SelectItem>
                                <SelectItem value="cancelled">{t("cancelled")}</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integrations" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {integrations.map((integration) => (
                <Card key={integration.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Badge className={`${getPlatformColor(integration.platform)} text-white`}>
                          {getPlatformLabel(integration.platform)}
                        </Badge>
                      </CardTitle>
                      <Badge className={`${getIntegrationStatusColor(integration.status)} text-white`}>
                        {integration.status === "connected"
                          ? t("connected")
                          : integration.status === "error"
                            ? t("error")
                            : t("disconnected")}
                      </Badge>
                    </div>
                    <CardDescription>{integration.name}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{t("totalOrdersCount")}</span>
                        <span className="font-medium">{integration.totalOrders}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>{t("totalRevenueAmount")}</span>
                        <span className="font-medium">₺{integration.totalRevenue.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>{t("lastSync")}</span>
                        <span className="text-muted-foreground">{integration.lastSync}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-transparent"
                        onClick={() => handleSyncPlatform(integration.id)}
                      >
                        <Sync className="h-4 w-4 mr-2" />
                        {t("synchronize")}
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t("platformPerformance")}</CardTitle>
                  <CardDescription>{t("salesDistribution")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {integrations.map((integration) => (
                      <div key={integration.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge className={`${getPlatformColor(integration.platform)} text-white`}>
                            {getPlatformLabel(integration.platform)}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">₺{integration.totalRevenue.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">
                            {integration.totalOrders} {t("orders").toLowerCase()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>{t("orderStatuses")}</CardTitle>
                  <CardDescription>{t("currentOrderStatus")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {orderStatuses.slice(1).map((status) => {
                      const count = orders.filter((o) => o.status === status).length
                      const percentage = totalOrders > 0 ? ((count / totalOrders) * 100).toFixed(1) : "0"
                      return (
                        <div key={status} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Badge className={`${getStatusColor(status)} text-white`}>
                              {getStatusLabel(status, language)}
                            </Badge>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">
                              {count} {t("orders").toLowerCase()}
                            </p>
                            <p className="text-xs text-muted-foreground">%{percentage}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Order Detail Dialog */}
        <Dialog open={isOrderDialogOpen} onOpenChange={setIsOrderDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {t("orderDetail")} - {selectedOrder?.orderNumber}
              </DialogTitle>
              <DialogDescription>
                {selectedOrder?.customerName} -{" "}
                {selectedOrder &&
                  new Date(selectedOrder.orderDate).toLocaleDateString(language === "tr" ? "tr-TR" : "en-US")}
              </DialogDescription>
            </DialogHeader>
            {selectedOrder && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">{t("orderInfo")}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between">
                        <span>{t("orderNo")}:</span>
                        <span className="font-medium">{selectedOrder.orderNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{t("platform")}:</span>
                        <Badge className={`${getPlatformColor(selectedOrder.platform)} text-white`}>
                          {getPlatformLabel(selectedOrder.platform)}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>{t("status")}:</span>
                        <Badge className={`${getStatusColor(selectedOrder.status)} text-white`}>
                          {getStatusLabel(selectedOrder.status, language)}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>{t("trackingNo")}:</span>
                        <span className="font-medium">{selectedOrder.trackingNumber || t("notYet")}</span>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">{t("customerInfo")}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between">
                        <span>{language === "tr" ? "Ad Soyad:" : "Full Name:"}:</span>
                        <span className="font-medium">{selectedOrder.customerName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{language === "tr" ? "E-posta:" : "Email:"}:</span>
                        <span className="font-medium">{selectedOrder.customerEmail}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{language === "tr" ? "Telefon:" : "Phone:"}:</span>
                        <span className="font-medium">{selectedOrder.customerPhone}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>{t("deliveryAddress")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{selectedOrder.shippingAddress}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>{t("orderItems")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>{t("product")}</TableHead>
                          <TableHead>{t("quantity")}</TableHead>
                          <TableHead>{t("unitPrice")}</TableHead>
                          <TableHead>{t("total")}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedOrder.items.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>
                              <div>
                                <p className="font-medium">{item.productName}</p>
                                <p className="text-xs text-muted-foreground">{item.productCode}</p>
                              </div>
                            </TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell>₺{item.unitPrice.toLocaleString()}</TableCell>
                            <TableCell>₺{item.total.toLocaleString()}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>{t("orderTotal")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>{t("subtotal")}:</span>
                        <span>₺{selectedOrder.subtotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{t("shipping")}:</span>
                        <span>₺{selectedOrder.shipping.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{t("tax")}:</span>
                        <span>₺{selectedOrder.tax.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold border-t pt-2">
                        <span>{t("grandTotal")}:</span>
                        <span>₺{selectedOrder.total.toLocaleString()}</span>
                      </div>
                    </div>
                    {selectedOrder.notes && (
                      <div className="mt-4 p-3 bg-muted rounded-lg">
                        <p className="text-sm">
                          <strong>{t("notes")}:</strong> {selectedOrder.notes}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  )
}

const getStatusLabel = (status: string, language: "tr" | "en") => {
  const statusLabels = {
    tr: {
      pending: "Bekliyor",
      processing: "İşleniyor",
      shipped: "Kargoda",
      delivered: "Teslim Edildi",
      cancelled: "İptal",
      refunded: "İade",
    },
    en: {
      pending: "Pending",
      processing: "Processing",
      shipped: "Shipped",
      delivered: "Delivered",
      cancelled: "Cancelled",
      refunded: "Refunded",
    },
  }
  return statusLabels[language][status as keyof typeof statusLabels.tr] || status
}
