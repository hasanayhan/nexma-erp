"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { InventoryManagement } from "@/components/inventory-management"
import { CustomerManagement } from "@/components/customer-management"
import { InvoiceManagement } from "@/components/invoice-management"
import { EcommerceManagement } from "@/components/ecommerce-management"
import { CashManagement } from "@/components/cash-management"
import { AdminDashboard } from "@/components/admin-dashboard"
import { ReportsManagement } from "@/components/reports-management"
import { ExpenseManagement } from "@/components/expense-management"
import { RetailManagement } from "@/components/retail-management"
import { LogisticsManagement } from "@/components/logistics-management"
import { AccountingManagement } from "@/components/accounting-management"
import { ReturnsManagement } from "@/components/returns-management"
import { BranchManagement } from "@/components/branch-management"
import {
  Package,
  Users,
  FileText,
  ShoppingCart,
  CreditCard,
  TrendingUp,
  BarChart3,
  Settings,
  Store,
  Truck,
  Calculator,
  Receipt,
  Building,
} from "lucide-react"

const translations = {
  tr: {
    title: "İşletme Yönetim Sistemi",
    subtitle: "İşinizi Tek Noktadan Yönetin",
    totalSales: "Toplam Satış",
    activeCustomers: "Aktif Müşteriler",
    pendingOrders: "Bekleyen Siparişler",
    stockValue: "Stok Değeri",
    thisMonth: "bu ay",
    newCustomers: "yeni müşteri",
    waitingProcess: "İşlem bekliyor",
    products: "ürün",
    recentActivities: "Son Aktiviteler",
    systemActivities: "Sistemdeki son işlemler",
    openModule: "Modülü Aç",
    modules: {
      inventory: { title: "Stok Kartı", description: "Ürün ve stok yönetimi" },
      customers: { title: "Cari Kart", description: "Müşteri ve tedarikçi yönetimi" },
      invoices: { title: "Fatura İşlemleri", description: "Satış ve alış faturaları" },
      ecommerce: { title: "E-ticaret Entegrasyonu", description: "Online satış kanalları" },
      cash: { title: "Kasa İşlemleri", description: "Nakit ve banka hareketleri" },
      expenses: { title: "Gider Takibi", description: "İşletme giderleri" },
      retail: { title: "Perakende Satış", description: "Mağaza satış işlemleri" },
      logistics: { title: "Lojistik", description: "Kargo ve sevkiyat" },
      accounting: { title: "Muhasebe", description: "Mali işlemler" },
      reports: { title: "Raporlama", description: "İş zekası ve analizler" },
      returns: { title: "İade İşlemleri", description: "Ürün iade yönetimi" },
      branches: { title: "Şube Yönetimi", description: "Çoklu lokasyon yönetimi" },
      settings: { title: "Sistem Ayarları", description: "Genel sistem konfigürasyonu" },
    },
    activities: [
      { action: "Yeni fatura oluşturuldu", time: "2 dakika önce" },
      { action: "Stok güncellendi: Laptop Dell XPS", time: "15 dakika önce" },
      { action: "Yeni müşteri eklendi: ABC Ltd.", time: "1 saat önce" },
      { action: "Kasa hareketi: ₺5,000 giriş", time: "2 saat önce" },
      { action: "E-ticaret siparişi alındı", time: "3 saat önce" },
    ],
  },
  en: {
    title: "Business Management System",
    subtitle: "Manage Your Business from One Point",
    totalSales: "Total Sales",
    activeCustomers: "Active Customers",
    pendingOrders: "Pending Orders",
    stockValue: "Stock Value",
    thisMonth: "this month",
    newCustomers: "new customers",
    waitingProcess: "Waiting for process",
    products: "products",
    recentActivities: "Recent Activities",
    systemActivities: "Latest system transactions",
    openModule: "Open Module",
    modules: {
      inventory: { title: "Inventory Card", description: "Product and stock management" },
      customers: { title: "Customer Card", description: "Customer and supplier management" },
      invoices: { title: "Invoice Operations", description: "Sales and purchase invoices" },
      ecommerce: { title: "E-commerce Integration", description: "Online sales channels" },
      cash: { title: "Cash Operations", description: "Cash and bank transactions" },
      expenses: { title: "Expense Tracking", description: "Business expenses" },
      retail: { title: "Retail Sales", description: "Store sales operations" },
      logistics: { title: "Logistics", description: "Shipping and delivery" },
      accounting: { title: "Accounting", description: "Financial operations" },
      reports: { title: "Reporting", description: "Business intelligence and analytics" },
      returns: { title: "Return Operations", description: "Product return management" },
      branches: { title: "Branch Management", description: "Multi-location management" },
      settings: { title: "System Settings", description: "General system configuration" },
    },
    activities: [
      { action: "New invoice created", time: "2 minutes ago" },
      { action: "Stock updated: Laptop Dell XPS", time: "15 minutes ago" },
      { action: "New customer added: ABC Ltd.", time: "1 hour ago" },
      { action: "Cash transaction: ₺5,000 income", time: "2 hours ago" },
      { action: "E-commerce order received", time: "3 hours ago" },
    ],
  },
}

const modules = [
  {
    id: "inventory",
    icon: Package,
    color: "bg-blue-500",
    stats: { total: 1247, active: 1180 },
  },
  {
    id: "customers",
    icon: Users,
    color: "bg-green-500",
    stats: { total: 342, active: 298 },
  },
  {
    id: "invoices",
    icon: FileText,
    color: "bg-purple-500",
    stats: { total: 1856, pending: 23 },
  },
  {
    id: "ecommerce",
    icon: ShoppingCart,
    color: "bg-orange-500",
    stats: { orders: 156, revenue: "₺45,230" },
  },
  {
    id: "cash",
    icon: CreditCard,
    color: "bg-indigo-500",
    stats: { balance: "₺123,450", transactions: 89 },
  },
  {
    id: "expenses",
    icon: TrendingUp,
    color: "bg-red-500",
    stats: { monthly: "₺28,750", categories: 12 },
  },
  {
    id: "retail",
    icon: Store,
    color: "bg-teal-500",
    stats: { daily: "₺8,450", items: 234 },
  },
  {
    id: "logistics",
    icon: Truck,
    color: "bg-yellow-500",
    stats: { shipments: 67, pending: 12 },
  },
  {
    id: "accounting",
    icon: Calculator,
    color: "bg-pink-500",
    stats: { entries: 445, balance: "₺234,567" },
  },
  {
    id: "reports",
    icon: BarChart3,
    color: "bg-cyan-500",
    stats: { reports: 28, automated: 15 },
  },
  {
    id: "returns",
    icon: Receipt,
    color: "bg-violet-500",
    stats: { returns: 34, processed: 29 },
  },
  {
    id: "branches",
    icon: Building,
    color: "bg-emerald-500",
    stats: { branches: 5, active: 5 },
  },
  {
    id: "settings",
    icon: Settings,
    color: "bg-gray-500",
    stats: { users: 12, roles: 4 },
  },
]

export function ERPDashboard() {
  const [selectedModule, setSelectedModule] = useState<string | null>(null)
  const [language, setLanguage] = useState<"tr" | "en">("tr")

  useEffect(() => {
    
    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script")
      script.id = "google-translate-script"
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
      script.async = true
      document.head.appendChild(script)

      
      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "tr",
            includedLanguages: "tr,en",
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
          },
          "google_translate_element",
        )
      }
    }
  }, [])

  const toggleLanguage = () => {
    setLanguage(language === "tr" ? "en" : "tr")
  }

  const t = translations[language]

  if (selectedModule === "inventory") {
    return <InventoryManagement onBack={() => setSelectedModule(null)} language={language} />
  }

  if (selectedModule === "customers") {
    return <CustomerManagement onBack={() => setSelectedModule(null)} language={language} />
  }

  if (selectedModule === "invoices") {
    return <InvoiceManagement onBack={() => setSelectedModule(null)} language={language} />
  }

  if (selectedModule === "ecommerce") {
    return <EcommerceManagement onBack={() => setSelectedModule(null)} language={language} />
  }

  if (selectedModule === "cash") {
    return <CashManagement onBack={() => setSelectedModule(null)} language={language} />
  }

  if (selectedModule === "expenses") {
    return <ExpenseManagement onBack={() => setSelectedModule(null)} language={language} />
  }

  if (selectedModule === "retail") {
    return <RetailManagement onBack={() => setSelectedModule(null)} language={language} />
  }

  if (selectedModule === "logistics") {
    return <LogisticsManagement onBack={() => setSelectedModule(null)} language={language} />
  }

  if (selectedModule === "accounting") {
    return <AccountingManagement onBack={() => setSelectedModule(null)} language={language} />
  }

  if (selectedModule === "returns") {
    return <ReturnsManagement onBack={() => setSelectedModule(null)} language={language} />
  }

  if (selectedModule === "branches") {
    return <BranchManagement onBack={() => setSelectedModule(null)} language={language} />
  }

  if (selectedModule === "reports") {
    return <ReportsManagement onBack={() => setSelectedModule(null)} language={language} />
  }

  if (selectedModule === "settings") {
    return <AdminDashboard onBack={() => setSelectedModule(null)} language={language} />
  }

  return (
    <div className="min-h-screen bg-background">
      <div id="google_translate_element" style={{ position: "absolute", left: "-9999px", top: "-9999px" }}></div>

      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-start gap-1">
              <img src="/images/nexma-logo.png" alt="NEXMA" className="h-12 w-auto" />
              <p className="text-sm text-muted-foreground">{t.subtitle}</p>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleLanguage}
                className="flex items-center gap-2 bg-transparent hover:bg-accent"
              >
                {language === "tr" ? (
                  <>
                    <span className="text-lg">🇹🇷</span>
                    <span className="font-medium">TR</span>
                  </>
                ) : (
                  <>
                    <span className="text-lg">🇺🇸</span>
                    <span className="font-medium">EN</span>
                  </>
                )}
              </Button>
              <Badge variant="secondary">v2.1.0</Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{t.totalSales}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">₺456,789</div>
              <p className="text-xs text-green-600">+12.5% {t.thisMonth}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{t.activeCustomers}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">298</div>
              <p className="text-xs text-blue-600">+8 {t.newCustomers}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{t.pendingOrders}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">23</div>
              <p className="text-xs text-orange-600">{t.waitingProcess}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{t.stockValue}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">₺234,567</div>
              <p className="text-xs text-muted-foreground">1,180 {t.products}</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {modules.map((module) => {
            const IconComponent = module.icon
            const moduleTranslation = t.modules[module.id as keyof typeof t.modules]
            return (
              <Card
                key={module.id}
                className="cursor-pointer transition-all hover:shadow-lg hover:scale-105"
                onClick={() => setSelectedModule(module.id)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${module.color} text-white`}>
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{moduleTranslation.title}</CardTitle>
                      <CardDescription className="text-sm">{moduleTranslation.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {Object.entries(module.stats).map(([key, value]) => (
                      <div key={key} className="flex justify-between text-sm">
                        <span className="text-muted-foreground capitalize">{key}:</span>
                        <span className="font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-4 bg-transparent" variant="outline" size="sm">
                    {t.openModule}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>{t.recentActivities}</CardTitle>
            <CardDescription>{t.systemActivities}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {t.activities.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2 border-b border-border last:border-0"
                >
                  <div>
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {["invoice", "inventory", "customer", "cash", "ecommerce"][index]}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
