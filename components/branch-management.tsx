"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Plus, Search, Building, Users, MapPin, Phone, Mail } from "lucide-react"

interface BranchManagementProps {
  onBack: () => void
  language: "tr" | "en"
}

export function BranchManagement({ onBack, language }: BranchManagementProps) {
  const translations = {
    tr: {
      title: "Şube Yönetimi",
      subtitle: "Çoklu lokasyon yönetimi",
      back: "Geri",
      branches: "Şubeler",
      performance: "Performans",
      reports: "Raporlar",
      totalBranches: "Toplam Şube",
      totalEmployees: "Toplam Çalışan",
      totalRevenue: "Toplam Gelir",
      averagePerformance: "Ortalama Performans",
      active: "Aktif",
      planning: "Planlama",
      inactive: "Pasif",
      unknown: "Bilinmiyor",
      activeStatus: "4 aktif, 1 planlama",
      allBranches: "Tüm şubeler",
      thisMonth: "Bu ay",
      growthRate: "Büyüme oranı",
      searchBranch: "Şube ara...",
      status: "Durum",
      all: "Tümü",
      newBranch: "Yeni Şube",
      addNewBranch: "Yeni Şube Ekle",
      addNewBranchDesc: "Yeni bir şube lokasyonu oluşturun",
      branchName: "Şube Adı",
      city: "Şehir",
      district: "İlçe",
      phone: "Telefon",
      email: "E-posta",
      branchManager: "Şube Müdürü",
      address: "Adres",
      save: "Kaydet",
      cancel: "İptal",
      employees: "çalışan",
      revenue: "Gelir",
      expenses: "Gider",
      details: "Detaylar",
      edit: "Düzenle",
      branchPerformanceComparison: "Şube Performans Karşılaştırması",
      branchPerformanceDesc: "Şubelerin gelir ve büyüme performansı",
      cityDistribution: "Şehir Bazında Dağılım",
      cityDistributionDesc: "Şubelerin şehirlere göre dağılımı",
      employeeDistribution: "Çalışan Dağılımı",
      employeeDistributionDesc: "Şubelerdeki çalışan sayıları",
      branch: "şube",
      consolidationReport: "Konsolidasyon Raporu",
      consolidationReportDesc: "Tüm şubelerin birleşik raporu",
      period: "Dönem: Ocak 2024",
      totalRevenueReport: "Toplam gelir",
      downloadReport: "Raporu İndir",
      branchComparison: "Şube Karşılaştırma",
      branchComparisonDesc: "Şubeler arası performans analizi",
      best: "En iyi: Merkez Şube",
      viewAnalysis: "Analizi Görüntüle",
      costAnalysis: "Maliyet Analizi",
      costAnalysisDesc: "Şube bazında maliyet raporu",
      totalExpenses: "Toplam gider",
      allBranchesReport: "Tüm şubeler",
      viewDetails: "Detayları İncele",
      branchPerformanceSummary: "Şube Performans Özeti",
      branchPerformanceSummaryDesc: "Aylık performans göstergeleri",
      totalRevenueKpi: "Toplam Gelir",
      totalExpensesKpi: "Toplam Gider",
      netProfit: "Net Kar",
      profitMargin: "Kar Marjı",
      new: "Yeni",
    },
    en: {
      title: "Branch Management",
      subtitle: "Multi-location management",
      back: "Back",
      branches: "Branches",
      performance: "Performance",
      reports: "Reports",
      totalBranches: "Total Branches",
      totalEmployees: "Total Employees",
      totalRevenue: "Total Revenue",
      averagePerformance: "Average Performance",
      active: "Active",
      planning: "Planning",
      inactive: "Inactive",
      unknown: "Unknown",
      activeStatus: "4 active, 1 planning",
      allBranches: "All branches",
      thisMonth: "This month",
      growthRate: "Growth rate",
      searchBranch: "Search branch...",
      status: "Status",
      all: "All",
      newBranch: "New Branch",
      addNewBranch: "Add New Branch",
      addNewBranchDesc: "Create a new branch location",
      branchName: "Branch Name",
      city: "City",
      district: "District",
      phone: "Phone",
      email: "Email",
      branchManager: "Branch Manager",
      address: "Address",
      save: "Save",
      cancel: "Cancel",
      employees: "employees",
      revenue: "Revenue",
      expenses: "Expenses",
      details: "Details",
      edit: "Edit",
      branchPerformanceComparison: "Branch Performance Comparison",
      branchPerformanceDesc: "Revenue and growth performance of branches",
      cityDistribution: "City Distribution",
      cityDistributionDesc: "Distribution of branches by cities",
      employeeDistribution: "Employee Distribution",
      employeeDistributionDesc: "Number of employees in branches",
      branch: "branch",
      consolidationReport: "Consolidation Report",
      consolidationReportDesc: "Combined report of all branches",
      period: "Period: January 2024",
      totalRevenueReport: "Total revenue",
      downloadReport: "Download Report",
      branchComparison: "Branch Comparison",
      branchComparisonDesc: "Inter-branch performance analysis",
      best: "Best: Central Branch",
      viewAnalysis: "View Analysis",
      costAnalysis: "Cost Analysis",
      costAnalysisDesc: "Branch-based cost report",
      totalExpenses: "Total expenses",
      allBranchesReport: "All branches",
      viewDetails: "View Details",
      branchPerformanceSummary: "Branch Performance Summary",
      branchPerformanceSummaryDesc: "Monthly performance indicators",
      totalRevenueKpi: "Total Revenue",
      totalExpensesKpi: "Total Expenses",
      netProfit: "Net Profit",
      profitMargin: "Profit Margin",
      new: "New",
    },
  }

  const t = (key: keyof typeof translations.tr) => translations[language][key]

  const [activeTab, setActiveTab] = useState("branches")
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddBranch, setShowAddBranch] = useState(false)

  const branches = [
    {
      id: "SB001",
      name: "Merkez Şube",
      city: "İstanbul",
      district: "Kadıköy",
      address: "Bağdat Caddesi No: 123",
      phone: "+90 216 555 0101",
      email: "merkez@sirket.com",
      manager: "Ahmet Yılmaz",
      employees: 15,
      status: "active",
      revenue: "₺456,789",
      expenses: "₺123,456",
    },
    {
      id: "SB002",
      name: "Ankara Şubesi",
      city: "Ankara",
      district: "Çankaya",
      address: "Tunalı Hilmi Caddesi No: 456",
      phone: "+90 312 555 0202",
      email: "ankara@sirket.com",
      manager: "Fatma Kaya",
      employees: 12,
      status: "active",
      revenue: "₺234,567",
      expenses: "₺89,123",
    },
    {
      id: "SB003",
      name: "İzmir Şubesi",
      city: "İzmir",
      district: "Bornova",
      address: "Ege Üniversitesi Caddesi No: 789",
      phone: "+90 232 555 0303",
      email: "izmir@sirket.com",
      manager: "Mehmet Demir",
      employees: 8,
      status: "active",
      revenue: "₺178,234",
      expenses: "₺67,890",
    },
    {
      id: "SB004",
      name: "Bursa Şubesi",
      city: "Bursa",
      district: "Osmangazi",
      address: "Atatürk Caddesi No: 321",
      phone: "+90 224 555 0404",
      email: "bursa@sirket.com",
      manager: "Ayşe Öz",
      employees: 6,
      status: "planning",
      revenue: "₺0",
      expenses: "₺45,000",
    },
    {
      id: "SB005",
      name: "Antalya Şubesi",
      city: "Antalya",
      district: "Muratpaşa",
      address: "Lara Caddesi No: 654",
      phone: "+90 242 555 0505",
      email: "antalya@sirket.com",
      manager: "Can Arslan",
      employees: 10,
      status: "active",
      revenue: "₺298,456",
      expenses: "₺98,765",
    },
  ]

  const branchPerformance = [
    { branch: "Merkez Şube", revenue: "₺456,789", growth: "+15.2%", employees: 15 },
    { branch: "Antalya Şubesi", revenue: "₺298,456", growth: "+12.8%", employees: 10 },
    { branch: "Ankara Şubesi", revenue: "₺234,567", growth: "+8.5%", employees: 12 },
    { branch: "İzmir Şubesi", revenue: "₺178,234", growth: "+6.2%", employees: 8 },
    { branch: "Bursa Şubesi", revenue: "₺0", growth: "Yeni", employees: 6 },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "planning":
        return "bg-yellow-500"
      case "inactive":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return t("active")
      case "planning":
        return t("planning")
      case "inactive":
        return t("inactive")
      default:
        return t("unknown")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t("back")}
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">{t("title")}</h1>
              <p className="text-muted-foreground">{t("subtitle")}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="branches">{t("branches")}</TabsTrigger>
            <TabsTrigger value="performance">{t("performance")}</TabsTrigger>
            <TabsTrigger value="reports">{t("reports")}</TabsTrigger>
          </TabsList>

          <TabsContent value="branches" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{t("totalBranches")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">5</div>
                  <p className="text-xs text-green-600">{t("activeStatus")}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{t("totalEmployees")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">51</div>
                  <p className="text-xs text-blue-600">{t("allBranches")}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{t("totalRevenue")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">₺1,168,046</div>
                  <p className="text-xs text-green-600">{t("thisMonth")}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{t("averagePerformance")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">%10.7</div>
                  <p className="text-xs text-green-600">{t("growthRate")}</p>
                </CardContent>
              </Card>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder={t("searchBranch")}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Select>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder={t("status")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("all")}</SelectItem>
                    <SelectItem value="active">{t("active")}</SelectItem>
                    <SelectItem value="planning">{t("planning")}</SelectItem>
                    <SelectItem value="inactive">{t("inactive")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={() => setShowAddBranch(true)}>
                <Plus className="h-4 w-4 mr-2" />
                {t("newBranch")}
              </Button>
            </div>

            {showAddBranch && (
              <Card>
                <CardHeader>
                  <CardTitle>{t("addNewBranch")}</CardTitle>
                  <CardDescription>{t("addNewBranchDesc")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">{t("branchName")}</label>
                      <Input placeholder={t("branchName")} />
                    </div>
                    <div>
                      <label className="text-sm font-medium">{t("city")}</label>
                      <Input placeholder={t("city")} />
                    </div>
                    <div>
                      <label className="text-sm font-medium">{t("district")}</label>
                      <Input placeholder={t("district")} />
                    </div>
                    <div>
                      <label className="text-sm font-medium">{t("phone")}</label>
                      <Input placeholder="+90 XXX XXX XX XX" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">{t("email")}</label>
                      <Input type="email" placeholder="sube@sirket.com" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">{t("branchManager")}</label>
                      <Input placeholder={t("branchManager")} />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">{t("address")}</label>
                    <Textarea placeholder={t("address")} />
                  </div>
                  <div className="flex gap-2">
                    <Button>{t("save")}</Button>
                    <Button variant="outline" onClick={() => setShowAddBranch(false)}>
                      {t("cancel")}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {branches.map((branch) => (
                <Card key={branch.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Building className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{branch.name}</CardTitle>
                          <CardDescription>
                            {branch.city}, {branch.district}
                          </CardDescription>
                        </div>
                      </div>
                      <Badge className={`${getStatusColor(branch.status)} text-white`}>
                        {getStatusText(branch.status)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{branch.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{branch.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{branch.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {branch.manager} • {branch.employees} {t("employees")}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                      <div>
                        <p className="text-sm text-muted-foreground">{t("revenue")}</p>
                        <p className="font-bold text-green-600">{branch.revenue}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{t("expenses")}</p>
                        <p className="font-bold text-red-600">{branch.expenses}</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        {t("details")}
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        {t("edit")}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t("branchPerformanceComparison")}</CardTitle>
                <CardDescription>{t("branchPerformanceDesc")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {branchPerformance.map((branch, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-muted-foreground">#{index + 1}</div>
                        </div>
                        <div>
                          <p className="font-medium">{branch.branch}</p>
                          <p className="text-sm text-muted-foreground">
                            {branch.employees} {t("employees")}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">{branch.revenue}</p>
                        <Badge variant={branch.growth.includes("+") ? "default" : "secondary"}>
                          {branch.growth === "Yeni" ? t("new") : branch.growth}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t("cityDistribution")}</CardTitle>
                  <CardDescription>{t("cityDistributionDesc")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { city: "İstanbul", branches: 1, revenue: "₺456,789" },
                      { city: "Antalya", branches: 1, revenue: "₺298,456" },
                      { city: "Ankara", branches: 1, revenue: "₺234,567" },
                      { city: "İzmir", branches: 1, revenue: "₺178,234" },
                      { city: "Bursa", branches: 1, revenue: "₺0" },
                    ].map((city, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{city.city}</p>
                          <p className="text-sm text-muted-foreground">
                            {city.branches} {t("branch")}
                          </p>
                        </div>
                        <span className="font-medium">{city.revenue}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t("employeeDistribution")}</CardTitle>
                  <CardDescription>{t("employeeDistributionDesc")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {branches.map((branch) => (
                      <div key={branch.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{branch.name}</p>
                          <p className="text-sm text-muted-foreground">{branch.manager}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{branch.employees}</p>
                          <p className="text-sm text-muted-foreground">{t("employees")}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t("consolidationReport")}</CardTitle>
                  <CardDescription>{t("consolidationReportDesc")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">{t("period")}</p>
                    <p className="text-2xl font-bold">₺1,168,046</p>
                    <p className="text-sm text-green-600">{t("totalRevenueReport")}</p>
                  </div>
                  <Button size="sm" className="w-full mt-4">
                    {t("downloadReport")}
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t("branchComparison")}</CardTitle>
                  <CardDescription>{t("branchComparisonDesc")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">{t("best")}</p>
                    <p className="text-2xl font-bold">%15.2</p>
                    <p className="text-sm text-green-600">{t("growthRate")}</p>
                  </div>
                  <Button size="sm" className="w-full mt-4">
                    {t("viewAnalysis")}
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t("costAnalysis")}</CardTitle>
                  <CardDescription>{t("costAnalysisDesc")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">{t("totalExpenses")}</p>
                    <p className="text-2xl font-bold">₺424,234</p>
                    <p className="text-sm text-red-600">{t("allBranchesReport")}</p>
                  </div>
                  <Button size="sm" className="w-full mt-4">
                    {t("viewDetails")}
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>{t("branchPerformanceSummary")}</CardTitle>
                <CardDescription>{t("branchPerformanceSummaryDesc")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">₺1,168,046</p>
                    <p className="text-sm text-muted-foreground">{t("totalRevenueKpi")}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-red-600">₺424,234</p>
                    <p className="text-sm text-muted-foreground">{t("totalExpensesKpi")}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">₺743,812</p>
                    <p className="text-sm text-muted-foreground">{t("netProfit")}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">%63.7</p>
                    <p className="text-sm text-muted-foreground">{t("profitMargin")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
