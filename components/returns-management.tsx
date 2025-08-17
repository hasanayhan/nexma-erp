"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Plus, Search, RotateCcw, AlertCircle, CheckCircle, Clock } from "lucide-react"

interface ReturnsManagementProps {
  onBack: () => void
  language: "tr" | "en" // Added language prop
}

const translations = {
  tr: {
    back: "Geri",
    title: "İade İşlemleri",
    subtitle: "Ürün iade yönetimi",
    returns: "İadeler",
    analytics: "Analitik",
    settings: "Ayarlar",
    totalReturns: "Toplam İade",
    processed: "İşlenen",
    pending: "Bekleyen",
    returnAmount: "İade Tutarı",
    thisMonth: "Bu ay",
    completed: "Tamamlandı",
    review: "İnceleme",
    searchReturn: "İade ara...",
    status: "Durum",
    all: "Tümü",
    approved: "Onaylandı",
    processing: "İşleniyor",
    newReturn: "Yeni İade",
    newReturnRecord: "Yeni İade Kaydı",
    createNewReturn: "Yeni bir ürün iadesi oluşturun",
    customer: "Müşteri",
    customerName: "Müşteri adı",
    invoiceNo: "Fatura No",
    product: "Ürün",
    productName: "Ürün adı",
    quantity: "Adet",
    returnReason: "İade Nedeni",
    selectReason: "Neden seçin",
    returnAmountField: "İade Tutarı",
    description: "Açıklama",
    returnDetails: "İade detayları...",
    save: "Kaydet",
    cancel: "İptal",
    returnList: "İade Listesi",
    allReturnRecords: "Tüm ürün iade kayıtları",
    pieces: "adet",
    returnReasons: "İade Nedenleri",
    mostCommonReasons: "En sık karşılaşılan iade sebepleri",
    monthlyReturnTrend: "Aylık İade Trendi",
    last6MonthsStats: "Son 6 ayın iade istatistikleri",
    returnPerformanceMetrics: "İade Performans Metrikleri",
    processingTimesAndRates: "İade işlem süreleri ve başarı oranları",
    averageProcessingTime: "Ortalama İşlem Süresi",
    returnApprovalRate: "İade Onay Oranı",
    totalSalesRatio: "Toplam Satışa Oranı",
    returnPolicySettings: "İade Politikası Ayarları",
    generalSettingsForReturns: "İade süreçleri için genel ayarlar",
    maxReturnPeriod: "Maksimum İade Süresi (gün)",
    autoApprovalLimit: "Otomatik Onay Limiti",
    returnReasonsSettings: "İade Nedenleri",
    edit: "Düzenle",
    saveSettings: "Ayarları Kaydet",
    days: "gün",
    returnCount: "iade",
    defectiveProduct: "Arızalı ürün",
    wrongModel: "Yanlış model",
    damagedShipping: "Hasarlı kargo",
    customerDissatisfaction: "Müşteri memnuniyetsizliği",
    lateDelivery: "Geç teslimat",
    missingProduct: "Eksik ürün",
    other: "Diğer",
    statusPending: "Bekliyor",
    statusApproved: "Onaylandı",
    statusProcessing: "İşleniyor",
    statusCompleted: "Tamamlandı",
    statusRejected: "Reddedildi",
    statusUnknown: "Bilinmiyor",
    january: "Ocak",
    december: "Aralık",
    november: "Kasım",
    october: "Ekim",
    september: "Eylül",
    august: "Ağustos",
  },
  en: {
    back: "Back",
    title: "Returns Management",
    subtitle: "Product return management",
    returns: "Returns",
    analytics: "Analytics",
    settings: "Settings",
    totalReturns: "Total Returns",
    processed: "Processed",
    pending: "Pending",
    returnAmount: "Return Amount",
    thisMonth: "This month",
    completed: "Completed",
    review: "Review",
    searchReturn: "Search return...",
    status: "Status",
    all: "All",
    approved: "Approved",
    processing: "Processing",
    newReturn: "New Return",
    newReturnRecord: "New Return Record",
    createNewReturn: "Create a new product return",
    customer: "Customer",
    customerName: "Customer name",
    invoiceNo: "Invoice No",
    product: "Product",
    productName: "Product name",
    quantity: "Quantity",
    returnReason: "Return Reason",
    selectReason: "Select reason",
    returnAmountField: "Return Amount",
    description: "Description",
    returnDetails: "Return details...",
    save: "Save",
    cancel: "Cancel",
    returnList: "Return List",
    allReturnRecords: "All product return records",
    pieces: "pcs",
    returnReasons: "Return Reasons",
    mostCommonReasons: "Most common return reasons",
    monthlyReturnTrend: "Monthly Return Trend",
    last6MonthsStats: "Last 6 months return statistics",
    returnPerformanceMetrics: "Return Performance Metrics",
    processingTimesAndRates: "Return processing times and success rates",
    averageProcessingTime: "Average Processing Time",
    returnApprovalRate: "Return Approval Rate",
    totalSalesRatio: "Total Sales Ratio",
    returnPolicySettings: "Return Policy Settings",
    generalSettingsForReturns: "General settings for return processes",
    maxReturnPeriod: "Maximum Return Period (days)",
    autoApprovalLimit: "Auto Approval Limit",
    returnReasonsSettings: "Return Reasons",
    edit: "Edit",
    saveSettings: "Save Settings",
    days: "days",
    returnCount: "returns",
    defectiveProduct: "Defective product",
    wrongModel: "Wrong model",
    damagedShipping: "Damaged shipping",
    customerDissatisfaction: "Customer dissatisfaction",
    lateDelivery: "Late delivery",
    missingProduct: "Missing product",
    other: "Other",
    statusPending: "Pending",
    statusApproved: "Approved",
    statusProcessing: "Processing",
    statusCompleted: "Completed",
    statusRejected: "Rejected",
    statusUnknown: "Unknown",
    january: "January",
    december: "December",
    november: "November",
    october: "October",
    september: "September",
    august: "August",
  },
}

export function ReturnsManagement({ onBack, language }: ReturnsManagementProps) {
  const [activeTab, setActiveTab] = useState("returns")
  const [searchTerm, setSearchTerm] = useState("")
  const [showNewReturn, setShowNewReturn] = useState(false)

  const t = translations[language] // Added translation helper

  const returnReasons = [
    t.defectiveProduct,
    t.wrongModel,
    t.damagedShipping,
    t.customerDissatisfaction,
    t.lateDelivery,
    t.missingProduct,
    t.other,
  ]

  const returns = [
    {
      id: "IAD001",
      customer: "Ahmet Yılmaz",
      product: "iPhone 15 Pro",
      quantity: 1,
      reason: t.defectiveProduct,
      status: "pending",
      date: "2024-01-15",
      amount: "₺45,000",
      invoice: "FAT-2024-001",
    },
    {
      id: "IAD002",
      customer: "Fatma Kaya",
      product: "Samsung Galaxy S24",
      quantity: 1,
      reason: t.wrongModel,
      status: "approved",
      date: "2024-01-14",
      amount: "₺35,000",
      invoice: "FAT-2024-002",
    },
    {
      id: "IAD003",
      customer: "Mehmet Demir",
      product: "MacBook Air M3",
      quantity: 1,
      reason: t.customerDissatisfaction,
      status: "processing",
      date: "2024-01-13",
      amount: "₺55,000",
      invoice: "FAT-2024-003",
    },
    {
      id: "IAD004",
      customer: "Ayşe Öz",
      product: "iPad Pro",
      quantity: 2,
      reason: t.damagedShipping,
      status: "completed",
      date: "2024-01-12",
      amount: "₺60,000",
      invoice: "FAT-2024-004",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500"
      case "approved":
        return "bg-blue-500"
      case "processing":
        return "bg-orange-500"
      case "completed":
        return "bg-green-500"
      case "rejected":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return t.statusPending
      case "approved":
        return t.statusApproved
      case "processing":
        return t.statusProcessing
      case "completed":
        return t.statusCompleted
      case "rejected":
        return t.statusRejected
      default:
        return t.statusUnknown
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />
      case "approved":
        return <CheckCircle className="h-4 w-4" />
      case "processing":
        return <RotateCcw className="h-4 w-4" />
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      case "rejected":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
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
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="returns">{t.returns}</TabsTrigger>
            <TabsTrigger value="analytics">{t.analytics}</TabsTrigger>
            <TabsTrigger value="settings">{t.settings}</TabsTrigger>
          </TabsList>

          <TabsContent value="returns" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{t.totalReturns}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">34</div>
                  <p className="text-xs text-orange-600">{t.thisMonth}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{t.processed}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">29</div>
                  <p className="text-xs text-green-600">{t.completed}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{t.pending}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">5</div>
                  <p className="text-xs text-yellow-600">{t.review}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{t.returnAmount}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">₺195,000</div>
                  <p className="text-xs text-muted-foreground">{t.thisMonth}</p>
                </CardContent>
              </Card>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder={t.searchReturn}
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
                    <SelectItem value="pending">{t.statusPending}</SelectItem>
                    <SelectItem value="approved">{t.statusApproved}</SelectItem>
                    <SelectItem value="processing">{t.statusProcessing}</SelectItem>
                    <SelectItem value="completed">{t.statusCompleted}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={() => setShowNewReturn(true)}>
                <Plus className="h-4 w-4 mr-2" />
                {t.newReturn}
              </Button>
            </div>

            {showNewReturn && (
              <Card>
                <CardHeader>
                  <CardTitle>{t.newReturnRecord}</CardTitle>
                  <CardDescription>{t.createNewReturn}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">{t.customer}</label>
                      <Input placeholder={t.customerName} />
                    </div>
                    <div>
                      <label className="text-sm font-medium">{t.invoiceNo}</label>
                      <Input placeholder="FAT-2024-XXX" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">{t.product}</label>
                      <Input placeholder={t.productName} />
                    </div>
                    <div>
                      <label className="text-sm font-medium">{t.quantity}</label>
                      <Input type="number" placeholder="1" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">{t.returnReason}</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder={t.selectReason} />
                        </SelectTrigger>
                        <SelectContent>
                          {returnReasons.map((reason) => (
                            <SelectItem key={reason} value={reason}>
                              {reason}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">{t.returnAmountField}</label>
                      <Input type="number" placeholder="0.00" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">{t.description}</label>
                    <Textarea placeholder={t.returnDetails} />
                  </div>
                  <div className="flex gap-2">
                    <Button>{t.save}</Button>
                    <Button variant="outline" onClick={() => setShowNewReturn(false)}>
                      {t.cancel}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>{t.returnList}</CardTitle>
                <CardDescription>{t.allReturnRecords}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {returns.map((returnItem) => (
                    <div
                      key={returnItem.id}
                      className="flex items-center justify-between p-4 border border-border rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-orange-100 rounded-lg">
                          <RotateCcw className="h-5 w-5 text-orange-600" />
                        </div>
                        <div>
                          <p className="font-medium">
                            #{returnItem.id} - {returnItem.customer}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {returnItem.product} • {returnItem.quantity} {t.pieces}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {returnItem.reason} • {returnItem.date}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">{returnItem.amount}</p>
                        <Badge className={`${getStatusColor(returnItem.status)} text-white flex items-center gap-1`}>
                          {getStatusIcon(returnItem.status)}
                          {getStatusText(returnItem.status)}
                        </Badge>
                        <p className="text-sm text-muted-foreground mt-1">{returnItem.invoice}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t.returnReasons}</CardTitle>
                  <CardDescription>{t.mostCommonReasons}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { reason: t.defectiveProduct, count: 12, percentage: "35%" },
                      { reason: t.wrongModel, count: 8, percentage: "24%" },
                      { reason: t.damagedShipping, count: 6, percentage: "18%" },
                      { reason: t.customerDissatisfaction, count: 4, percentage: "12%" },
                      { reason: t.lateDelivery, count: 3, percentage: "9%" },
                      { reason: t.other, count: 1, percentage: "3%" },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{item.reason}</p>
                          <p className="text-sm text-muted-foreground">
                            {item.count} {t.returnCount}
                          </p>
                        </div>
                        <Badge variant="secondary">{item.percentage}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t.monthlyReturnTrend}</CardTitle>
                  <CardDescription>{t.last6MonthsStats}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { month: t.january, returns: 34, amount: "₺195,000" },
                      { month: t.december, returns: 28, amount: "₺156,000" },
                      { month: t.november, returns: 31, amount: "₺178,000" },
                      { month: t.october, returns: 25, amount: "₺142,000" },
                      { month: t.september, returns: 29, amount: "₺167,000" },
                      { month: t.august, returns: 22, amount: "₺125,000" },
                    ].map((month, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{month.month}</p>
                          <p className="text-sm text-muted-foreground">
                            {month.returns} {t.returnCount}
                          </p>
                        </div>
                        <span className="font-medium">{month.amount}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>{t.returnPerformanceMetrics}</CardTitle>
                <CardDescription>{t.processingTimesAndRates}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">2.3 {t.days}</p>
                    <p className="text-sm text-muted-foreground">{t.averageProcessingTime}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">%85.3</p>
                    <p className="text-sm text-muted-foreground">{t.returnApprovalRate}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-orange-600">%2.8</p>
                    <p className="text-sm text-muted-foreground">{t.totalSalesRatio}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t.returnPolicySettings}</CardTitle>
                <CardDescription>{t.generalSettingsForReturns}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">{t.maxReturnPeriod}</label>
                  <Input type="number" defaultValue="30" />
                </div>
                <div>
                  <label className="text-sm font-medium">{t.autoApprovalLimit}</label>
                  <Input type="number" defaultValue="1000" />
                </div>
                <div>
                  <label className="text-sm font-medium">{t.returnReasonsSettings}</label>
                  <div className="space-y-2">
                    {returnReasons.map((reason, index) => (
                      <div key={index} className="flex items-center justify-between p-2 border border-border rounded">
                        <span>{reason}</span>
                        <Button variant="outline" size="sm">
                          {t.edit}
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
                <Button>{t.saveSettings}</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
