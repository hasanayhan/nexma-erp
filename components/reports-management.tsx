"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, BarChart3, TrendingUp, TrendingDown, DollarSign, Users, Package, Download, Eye } from "lucide-react"

interface ReportsManagementProps {
  onBack: () => void
  language: "tr" | "en"
}

export function ReportsManagement({ onBack, language }: ReportsManagementProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedPeriod, setSelectedPeriod] = useState("month")

  const translations = {
    tr: {
      backToHome: "Ana Sayfa",
      reportsAndAnalysis: "Raporlama ve Analiz",
      businessIntelligence: "İş zekası, raporlar ve performans analizleri",
      overview: "Genel",
      sales: "Satış",
      financial: "Mali",
      inventory: "Stok",
      thisWeek: "Bu Hafta",
      thisMonth: "Bu Ay",
      thisQuarter: "Bu Çeyrek",
      thisYear: "Bu Yıl",
      downloadReport: "Rapor İndir",
      totalRevenue: "Toplam Gelir",
      netProfit: "Net Kar",
      customerCount: "Müşteri Sayısı",
      averageOrder: "Ortalama Sipariş",
      salesTrend: "Satış Trendi",
      salesTrendDesc: "Son 12 ayın satış performansı",
      categoryDistribution: "Kategori Dağılımı",
      categoryDistributionDesc: "Ürün kategorilerine göre satış dağılımı",
      chartWillShow: "Grafik burada görüntülenecek",
      pieChartWillShow: "Pasta grafik burada görüntülenecek",
      salesReports: "Satış Raporları",
      salesReportsDesc: "Satış performansı ve müşteri analizleri",
      financialReports: "Mali Raporlar",
      financialReportsDesc: "Finansal durum ve muhasebe raporları",
      inventoryReports: "Stok Raporları",
      inventoryReportsDesc: "Envanter yönetimi ve stok analizleri",
      current: "Güncel",
      old: "Eski",
      lastUpdate: "Son güncelleme:",
      monthlySalesReport: "Aylık Satış Raporu",
      monthlySalesReportDesc: "Detaylı aylık satış analizi",
      customerAnalysis: "Müşteri Analizi",
      customerAnalysisDesc: "Müşteri segmentasyonu ve davranış analizi",
      productPerformance: "Ürün Performansı",
      productPerformanceDesc: "En çok satan ürünler ve stok analizi",
      profitabilityAnalysis: "Karlılık Analizi",
      profitabilityAnalysisDesc: "Ürün ve kategori bazında kar marjları",
      incomeExpenseReport: "Gelir-Gider Raporu",
      incomeExpenseReportDesc: "Detaylı finansal durum raporu",
      cashFlowReport: "Nakit Akış Raporu",
      cashFlowReportDesc: "Nakit giriş-çıkış analizi",
      debtReceivableReport: "Borç-Alacak Raporu",
      debtReceivableReportDesc: "Cari hesap durumu",
      taxReport: "Vergi Raporu",
      taxReportDesc: "KDV ve stopaj hesaplamaları",
      stockStatusReport: "Stok Durum Raporu",
      stockStatusReportDesc: "Mevcut stok seviyeleri ve değerleri",
      stockMovementReport: "Stok Hareket Raporu",
      stockMovementReportDesc: "Giriş-çıkış hareketleri",
      criticalStockReport: "Kritik Stok Raporu",
      criticalStockReportDesc: "Minimum seviyenin altındaki ürünler",
      abcAnalysis: "ABC Analizi",
      abcAnalysisDesc: "Ürün önem sınıflandırması",
      hoursAgo: "saat önce",
      daysAgo: "gün önce",
      weekAgo: "hafta önce",
      minutesAgo: "dakika önce",
    },
    en: {
      backToHome: "Home",
      reportsAndAnalysis: "Reports and Analysis",
      businessIntelligence: "Business intelligence, reports and performance analytics",
      overview: "Overview",
      sales: "Sales",
      financial: "Financial",
      inventory: "Inventory",
      thisWeek: "This Week",
      thisMonth: "This Month",
      thisQuarter: "This Quarter",
      thisYear: "This Year",
      downloadReport: "Download Report",
      totalRevenue: "Total Revenue",
      netProfit: "Net Profit",
      customerCount: "Customer Count",
      averageOrder: "Average Order",
      salesTrend: "Sales Trend",
      salesTrendDesc: "Sales performance of the last 12 months",
      categoryDistribution: "Category Distribution",
      categoryDistributionDesc: "Sales distribution by product categories",
      chartWillShow: "Chart will be displayed here",
      pieChartWillShow: "Pie chart will be displayed here",
      salesReports: "Sales Reports",
      salesReportsDesc: "Sales performance and customer analytics",
      financialReports: "Financial Reports",
      financialReportsDesc: "Financial status and accounting reports",
      inventoryReports: "Inventory Reports",
      inventoryReportsDesc: "Inventory management and stock analytics",
      current: "Current",
      old: "Old",
      lastUpdate: "Last update:",
      monthlySalesReport: "Monthly Sales Report",
      monthlySalesReportDesc: "Detailed monthly sales analysis",
      customerAnalysis: "Customer Analysis",
      customerAnalysisDesc: "Customer segmentation and behavior analysis",
      productPerformance: "Product Performance",
      productPerformanceDesc: "Best selling products and stock analysis",
      profitabilityAnalysis: "Profitability Analysis",
      profitabilityAnalysisDesc: "Profit margins by product and category",
      incomeExpenseReport: "Income-Expense Report",
      incomeExpenseReportDesc: "Detailed financial status report",
      cashFlowReport: "Cash Flow Report",
      cashFlowReportDesc: "Cash inflow-outflow analysis",
      debtReceivableReport: "Debt-Receivable Report",
      debtReceivableReportDesc: "Current account status",
      taxReport: "Tax Report",
      taxReportDesc: "VAT and withholding tax calculations",
      stockStatusReport: "Stock Status Report",
      stockStatusReportDesc: "Current stock levels and values",
      stockMovementReport: "Stock Movement Report",
      stockMovementReportDesc: "Inbound-outbound movements",
      criticalStockReport: "Critical Stock Report",
      criticalStockReportDesc: "Products below minimum level",
      abcAnalysis: "ABC Analysis",
      abcAnalysisDesc: "Product importance classification",
      hoursAgo: "hours ago",
      daysAgo: "days ago",
      weekAgo: "week ago",
      minutesAgo: "minutes ago",
    },
  }

  const t = (key: keyof typeof translations.tr) => translations[language][key]

  const kpiData = [
    { title: t("totalRevenue"), value: "₺456,789", change: "+12.5%", trend: "up", icon: DollarSign },
    { title: t("netProfit"), value: "₺89,234", change: "+8.3%", trend: "up", icon: TrendingUp },
    { title: t("customerCount"), value: "298", change: "+15", trend: "up", icon: Users },
    { title: t("averageOrder"), value: "₺1,532", change: "-2.1%", trend: "down", icon: Package },
  ]

  const salesReports = [
    {
      name: t("monthlySalesReport"),
      description: t("monthlySalesReportDesc"),
      lastGenerated: `2 ${t("hoursAgo")}`,
      status: t("current"),
    },
    {
      name: t("customerAnalysis"),
      description: t("customerAnalysisDesc"),
      lastGenerated: `1 ${t("daysAgo")}`,
      status: t("current"),
    },
    {
      name: t("productPerformance"),
      description: t("productPerformanceDesc"),
      lastGenerated: `3 ${t("hoursAgo")}`,
      status: t("current"),
    },
    {
      name: t("profitabilityAnalysis"),
      description: t("profitabilityAnalysisDesc"),
      lastGenerated: `1 ${t("daysAgo")}`,
      status: t("current"),
    },
  ]

  const financialReports = [
    {
      name: t("incomeExpenseReport"),
      description: t("incomeExpenseReportDesc"),
      lastGenerated: `1 ${t("hoursAgo")}`,
      status: t("current"),
    },
    {
      name: t("cashFlowReport"),
      description: t("cashFlowReportDesc"),
      lastGenerated: `4 ${t("hoursAgo")}`,
      status: t("current"),
    },
    {
      name: t("debtReceivableReport"),
      description: t("debtReceivableReportDesc"),
      lastGenerated: `2 ${t("daysAgo")}`,
      status: t("old"),
    },
    { name: t("taxReport"), description: t("taxReportDesc"), lastGenerated: `1 ${t("daysAgo")}`, status: t("current") },
  ]

  const inventoryReports = [
    {
      name: t("stockStatusReport"),
      description: t("stockStatusReportDesc"),
      lastGenerated: `30 ${t("minutesAgo")}`,
      status: t("current"),
    },
    {
      name: t("stockMovementReport"),
      description: t("stockMovementReportDesc"),
      lastGenerated: `2 ${t("hoursAgo")}`,
      status: t("current"),
    },
    {
      name: t("criticalStockReport"),
      description: t("criticalStockReportDesc"),
      lastGenerated: `1 ${t("hoursAgo")}`,
      status: t("current"),
    },
    { name: t("abcAnalysis"), description: t("abcAnalysisDesc"), lastGenerated: `1 ${t("weekAgo")}`, status: t("old") },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t("backToHome")}
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">{t("reportsAndAnalysis")}</h1>
              <p className="text-muted-foreground">{t("businessIntelligence")}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="flex items-center justify-between">
            <TabsList className="grid w-full max-w-md grid-cols-4">
              <TabsTrigger value="overview">{t("overview")}</TabsTrigger>
              <TabsTrigger value="sales">{t("sales")}</TabsTrigger>
              <TabsTrigger value="financial">{t("financial")}</TabsTrigger>
              <TabsTrigger value="inventory">{t("inventory")}</TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-4">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">{t("thisWeek")}</SelectItem>
                  <SelectItem value="month">{t("thisMonth")}</SelectItem>
                  <SelectItem value="quarter">{t("thisQuarter")}</SelectItem>
                  <SelectItem value="year">{t("thisYear")}</SelectItem>
                </SelectContent>
              </Select>
              <Button>
                <Download className="h-4 w-4 mr-2" />
                {t("downloadReport")}
              </Button>
            </div>
          </div>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {kpiData.map((kpi) => {
                const IconComponent = kpi.icon
                return (
                  <Card key={kpi.title}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.title}</CardTitle>
                        <IconComponent className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{kpi.value}</div>
                      <div
                        className={`flex items-center text-xs ${kpi.trend === "up" ? "text-green-600" : "text-red-600"}`}
                      >
                        {kpi.trend === "up" ? (
                          <TrendingUp className="h-3 w-3 mr-1" />
                        ) : (
                          <TrendingDown className="h-3 w-3 mr-1" />
                        )}
                        {kpi.change}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Charts Placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t("salesTrend")}</CardTitle>
                  <CardDescription>{t("salesTrendDesc")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground">{t("chartWillShow")}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t("categoryDistribution")}</CardTitle>
                  <CardDescription>{t("categoryDistributionDesc")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground">{t("pieChartWillShow")}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Sales Reports Tab */}
          <TabsContent value="sales" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold">{t("salesReports")}</h2>
              <p className="text-muted-foreground">{t("salesReportsDesc")}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {salesReports.map((report) => (
                <Card key={report.name}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{report.name}</CardTitle>
                      <Badge variant={report.status === t("current") ? "default" : "secondary"}>{report.status}</Badge>
                    </div>
                    <CardDescription>{report.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {t("lastUpdate")} {report.lastGenerated}
                      </span>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Financial Reports Tab */}
          <TabsContent value="financial" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold">{t("financialReports")}</h2>
              <p className="text-muted-foreground">{t("financialReportsDesc")}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {financialReports.map((report) => (
                <Card key={report.name}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{report.name}</CardTitle>
                      <Badge variant={report.status === t("current") ? "default" : "secondary"}>{report.status}</Badge>
                    </div>
                    <CardDescription>{report.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {t("lastUpdate")} {report.lastGenerated}
                      </span>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Inventory Reports Tab */}
          <TabsContent value="inventory" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold">{t("inventoryReports")}</h2>
              <p className="text-muted-foreground">{t("inventoryReportsDesc")}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {inventoryReports.map((report) => (
                <Card key={report.name}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{report.name}</CardTitle>
                      <Badge variant={report.status === t("current") ? "default" : "secondary"}>{report.status}</Badge>
                    </div>
                    <CardDescription>{report.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {t("lastUpdate")} {report.lastGenerated}
                      </span>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
