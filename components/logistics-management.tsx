"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Plus, Search, Truck, Package, MapPin, Clock } from "lucide-react"

interface LogisticsManagementProps {
  onBack: () => void
  language: "tr" | "en" // Added language prop
}

const translations = {
  tr: {
    back: "Geri",
    title: "Lojistik Yönetimi",
    subtitle: "Kargo ve sevkiyat işlemleri",
    shipments: "Sevkiyatlar",
    carriers: "Kargo Firmaları",
    tracking: "Takip",
    reports: "Raporlar",
    totalShipments: "Toplam Sevkiyat",
    pending: "Bekleyen",
    inTransit: "Yolda",
    delivered: "Teslim Edildi",
    thisWeek: "+8 bu hafta",
    preparing: "Hazırlanıyor",
    transit: "Transit",
    thisMonth: "Bu ay",
    searchShipment: "Sevkiyat ara...",
    status: "Durum",
    all: "Tümü",
    newShipment: "Yeni Sevkiyat",
    shipmentList: "Sevkiyat Listesi",
    allShipmentRecords: "Tüm sevkiyat kayıtları",
    products: "ürün",
    addNewCarrier: "Yeni Firma Ekle",
    active: "Aktif",
    rate: "Ücret",
    delivery: "Teslimat",
    editSettings: "Ayarları Düzenle",
    cargoTracking: "Kargo Takip",
    trackingDescription: "Takip numarası ile kargo durumunu sorgulayın",
    enterTrackingNumber: "Takip numarası girin...",
    query: "Sorgula",
    activeTracking: "Aktif Takipler",
    currentlyTracked: "Şu anda takip edilen kargolar",
    carrierPerformance: "Kargo Firma Performansı",
    deliveryTimes: "Teslimat süreleri ve başarı oranları",
    average: "Ortalama",
    successRate: "Başarı oranı",
    monthlyShipmentTrend: "Aylık Sevkiyat Trendi",
    last6Months: "Son 6 ayın sevkiyat istatistikleri",
    january: "Ocak",
    december: "Aralık",
    november: "Kasım",
    october: "Ekim",
    september: "Eylül",
    august: "Ağustos",
    shipmentsCount: "sevkiyat",
    days1to2: "1-2 gün",
    days2to3: "2-3 gün",
    days3to5: "3-5 gün",
    day1: "1 gün",
    statusPreparing: "Hazırlanıyor",
    statusTransit: "Yolda",
    statusDelivered: "Teslim Edildi",
    statusCancelled: "İptal Edildi",
    statusUnknown: "Bilinmiyor",
  },
  en: {
    back: "Back",
    title: "Logistics Management",
    subtitle: "Shipping and delivery operations",
    shipments: "Shipments",
    carriers: "Carriers",
    tracking: "Tracking",
    reports: "Reports",
    totalShipments: "Total Shipments",
    pending: "Pending",
    inTransit: "In Transit",
    delivered: "Delivered",
    thisWeek: "+8 this week",
    preparing: "Preparing",
    transit: "Transit",
    thisMonth: "This month",
    searchShipment: "Search shipment...",
    status: "Status",
    all: "All",
    newShipment: "New Shipment",
    shipmentList: "Shipment List",
    allShipmentRecords: "All shipment records",
    products: "products",
    addNewCarrier: "Add New Carrier",
    active: "Active",
    rate: "Rate",
    delivery: "Delivery",
    editSettings: "Edit Settings",
    cargoTracking: "Cargo Tracking",
    trackingDescription: "Query cargo status with tracking number",
    enterTrackingNumber: "Enter tracking number...",
    query: "Query",
    activeTracking: "Active Tracking",
    currentlyTracked: "Currently tracked shipments",
    carrierPerformance: "Carrier Performance",
    deliveryTimes: "Delivery times and success rates",
    average: "Average",
    successRate: "Success rate",
    monthlyShipmentTrend: "Monthly Shipment Trend",
    last6Months: "Last 6 months shipment statistics",
    january: "January",
    december: "December",
    november: "November",
    october: "October",
    september: "September",
    august: "August",
    shipmentsCount: "shipments",
    days1to2: "1-2 days",
    days2to3: "2-3 days",
    days3to5: "3-5 days",
    day1: "1 day",
    statusPreparing: "Preparing",
    statusTransit: "In Transit",
    statusDelivered: "Delivered",
    statusCancelled: "Cancelled",
    statusUnknown: "Unknown",
  },
}

export function LogisticsManagement({ onBack, language }: LogisticsManagementProps) {
  const [activeTab, setActiveTab] = useState("shipments")
  const [searchTerm, setSearchTerm] = useState("")

  const t = translations[language] // Added translation helper

  const shipments = [
    {
      id: "KRG001",
      customer: "ABC Teknoloji Ltd.",
      destination: language === "tr" ? "İstanbul, Kadıköy" : "Istanbul, Kadikoy",
      status: "transit",
      carrier: "Aras Kargo",
      trackingCode: "AR123456789",
      date: "2024-01-15",
      items: 3,
      weight: "2.5 kg",
    },
    {
      id: "KRG002",
      customer: "XYZ Mağazacılık",
      destination: language === "tr" ? "Ankara, Çankaya" : "Ankara, Cankaya",
      status: "preparing",
      carrier: "MNG Kargo",
      trackingCode: "MN987654321",
      date: "2024-01-15",
      items: 1,
      weight: "1.2 kg",
    },
    {
      id: "KRG003",
      customer: "DEF İnşaat",
      destination: language === "tr" ? "İzmir, Bornova" : "Izmir, Bornova",
      status: "delivered",
      carrier: "Yurtiçi Kargo",
      trackingCode: "YK456789123",
      date: "2024-01-14",
      items: 5,
      weight: "8.7 kg",
    },
  ]

  const carriers = [
    { id: "aras", name: "Aras Kargo", rate: "₺15", delivery: t.days1to2 },
    { id: "mng", name: "MNG Kargo", rate: "₺12", delivery: t.days2to3 },
    { id: "yurtici", name: "Yurtiçi Kargo", rate: "₺18", delivery: t.days1to2 },
    { id: "ptt", name: "PTT Kargo", rate: "₺10", delivery: t.days3to5 },
    { id: "ups", name: "UPS", rate: "₺25", delivery: t.day1 },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "preparing":
        return "bg-yellow-500"
      case "transit":
        return "bg-blue-500"
      case "delivered":
        return "bg-green-500"
      case "cancelled":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "preparing":
        return t.statusPreparing
      case "transit":
        return t.statusTransit
      case "delivered":
        return t.statusDelivered
      case "cancelled":
        return t.statusCancelled
      default:
        return t.statusUnknown
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t.back} {/* Using translation */}
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">{t.title}</h1>
              <p className="text-muted-foreground">{t.subtitle}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="shipments">{t.shipments}</TabsTrigger>
            <TabsTrigger value="carriers">{t.carriers}</TabsTrigger>
            <TabsTrigger value="tracking">{t.tracking}</TabsTrigger>
            <TabsTrigger value="reports">{t.reports}</TabsTrigger>
          </TabsList>

          <TabsContent value="shipments" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{t.totalShipments}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">67</div>
                  <p className="text-xs text-green-600">{t.thisWeek}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{t.pending}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">12</div>
                  <p className="text-xs text-orange-600">{t.preparing}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{t.inTransit}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">23</div>
                  <p className="text-xs text-blue-600">{t.transit}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{t.delivered}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">32</div>
                  <p className="text-xs text-green-600">{t.thisMonth}</p>
                </CardContent>
              </Card>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder={t.searchShipment}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Select>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder={t.status} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t.all}</SelectItem>
                    <SelectItem value="preparing">{t.statusPreparing}</SelectItem>
                    <SelectItem value="transit">{t.statusTransit}</SelectItem>
                    <SelectItem value="delivered">{t.statusDelivered}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                {t.newShipment}
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>{t.shipmentList}</CardTitle>
                <CardDescription>{t.allShipmentRecords}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {shipments.map((shipment) => (
                    <div
                      key={shipment.id}
                      className="flex items-center justify-between p-4 border border-border rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Truck className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">
                            #{shipment.id} - {shipment.customer}
                          </p>
                          <p className="text-sm text-muted-foreground flex items-center gap-2">
                            <MapPin className="h-3 w-3" />
                            {shipment.destination}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {shipment.carrier} • {shipment.trackingCode}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={`${getStatusColor(shipment.status)} text-white mb-2`}>
                          {getStatusText(shipment.status)}
                        </Badge>
                        <p className="text-sm text-muted-foreground">
                          {shipment.items} {t.products} • {shipment.weight}
                        </p>
                        <p className="text-sm text-muted-foreground">{shipment.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="carriers" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">{t.carriers}</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                {t.addNewCarrier}
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {carriers.map((carrier) => (
                <Card key={carrier.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {carrier.name}
                      <Badge variant="secondary">{t.active}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">{t.rate}:</span>
                        <span className="font-medium">{carrier.rate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">{t.delivery}:</span>
                        <span className="font-medium">{carrier.delivery}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-4 bg-transparent">
                      {t.editSettings}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tracking" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t.cargoTracking}</CardTitle>
                <CardDescription>{t.trackingDescription}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <Input placeholder={t.enterTrackingNumber} className="flex-1" />
                  <Button>{t.query}</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t.activeTracking}</CardTitle>
                <CardDescription>{t.currentlyTracked}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {shipments
                    .filter((s) => s.status !== "delivered")
                    .map((shipment) => (
                      <div key={shipment.id} className="p-4 border border-border rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-medium">
                            #{shipment.id} - {shipment.customer}
                          </h3>
                          <Badge className={`${getStatusColor(shipment.status)} text-white`}>
                            {getStatusText(shipment.status)}
                          </Badge>
                        </div>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <p className="flex items-center gap-2">
                            <MapPin className="h-3 w-3" />
                            {shipment.destination}
                          </p>
                          <p className="flex items-center gap-2">
                            <Package className="h-3 w-3" />
                            {shipment.trackingCode} - {shipment.carrier}
                          </p>
                          <p className="flex items-center gap-2">
                            <Clock className="h-3 w-3" />
                            {shipment.date}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t.carrierPerformance}</CardTitle>
                  <CardDescription>{t.deliveryTimes}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {carriers.map((carrier) => (
                      <div key={carrier.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{carrier.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {t.average} {carrier.delivery}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">%95.2</p>
                          <p className="text-sm text-muted-foreground">{t.successRate}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t.monthlyShipmentTrend}</CardTitle>
                  <CardDescription>{t.last6Months}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { month: t.january, shipments: 67, cost: "₺2,340" },
                      { month: t.december, shipments: 89, cost: "₺3,120" },
                      { month: t.november, shipments: 76, cost: "₺2,660" },
                      { month: t.october, shipments: 92, cost: "₺3,220" },
                      { month: t.september, shipments: 84, cost: "₺2,940" },
                      { month: t.august, shipments: 78, cost: "₺2,730" },
                    ].map((month, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{month.month}</p>
                          <p className="text-sm text-muted-foreground">
                            {month.shipments} {t.shipmentsCount}
                          </p>
                        </div>
                        <span className="font-medium">{month.cost}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
