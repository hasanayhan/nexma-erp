"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Plus, Search, Filter, TrendingUp, Receipt } from "lucide-react"

interface ExpenseManagementProps {
  onBack: () => void
  language: "tr" | "en" // Added language prop
}

const translations = {
  tr: {
    back: "Geri",
    title: "Gider Takibi",
    subtitle: "İşletme giderlerini yönetin",
    overview: "Genel Bakış",
    expenses: "Giderler",
    categories: "Kategoriler",
    totalThisMonth: "Bu Ay Toplam",
    pendingApprovals: "Bekleyen Onaylar",
    categoryCount: "Kategori Sayısı",
    averageExpense: "Ortalama Gider",
    comparedToLastMonth: "+15.2% geçen aya göre",
    worthOf: "değerinde",
    activeCategories: "Aktif kategori",
    dailyAverage: "Günlük ortalama",
    categoryDistribution: "Kategori Dağılımı",
    expenseDistribution: "Giderlerin kategorilere göre dağılımı",
    recentExpenses: "Son Giderler",
    latestExpenseRecords: "En son eklenen gider kayıtları",
    searchExpense: "Gider ara...",
    filter: "Filtrele",
    newExpense: "Yeni Gider",
    addNewExpense: "Yeni Gider Ekle",
    createNewExpenseRecord: "Yeni bir gider kaydı oluşturun",
    description: "Açıklama",
    expenseDescription: "Gider açıklaması",
    amount: "Tutar",
    category: "Kategori",
    selectCategory: "Kategori seçin",
    date: "Tarih",
    notes: "Notlar",
    additionalNotes: "Ek notlar...",
    save: "Kaydet",
    cancel: "İptal",
    expenseList: "Gider Listesi",
    allExpenseRecords: "Tüm gider kayıtları",
    approved: "Onaylandı",
    pending: "Bekliyor",
    expenseCategories: "Gider Kategorileri",
    newCategory: "Yeni Kategori",
    expenseRecords: "gider kaydı",
    viewDetails: "Detayları Görüntüle",
    expenses_count: "gider",
    officeExpenses: "Ofis Giderleri",
    marketing: "Pazarlama",
    travel: "Seyahat",
    bills: "Faturalar",
    supplies: "Malzemeler",
    other: "Diğer",
  },
  en: {
    back: "Back",
    title: "Expense Tracking",
    subtitle: "Manage business expenses",
    overview: "Overview",
    expenses: "Expenses",
    categories: "Categories",
    totalThisMonth: "Total This Month",
    pendingApprovals: "Pending Approvals",
    categoryCount: "Category Count",
    averageExpense: "Average Expense",
    comparedToLastMonth: "+15.2% compared to last month",
    worthOf: "worth",
    activeCategories: "Active categories",
    dailyAverage: "Daily average",
    categoryDistribution: "Category Distribution",
    expenseDistribution: "Distribution of expenses by categories",
    recentExpenses: "Recent Expenses",
    latestExpenseRecords: "Latest expense records added",
    searchExpense: "Search expense...",
    filter: "Filter",
    newExpense: "New Expense",
    addNewExpense: "Add New Expense",
    createNewExpenseRecord: "Create a new expense record",
    description: "Description",
    expenseDescription: "Expense description",
    amount: "Amount",
    category: "Category",
    selectCategory: "Select category",
    date: "Date",
    notes: "Notes",
    additionalNotes: "Additional notes...",
    save: "Save",
    cancel: "Cancel",
    expenseList: "Expense List",
    allExpenseRecords: "All expense records",
    approved: "Approved",
    pending: "Pending",
    expenseCategories: "Expense Categories",
    newCategory: "New Category",
    expenseRecords: "expense records",
    viewDetails: "View Details",
    expenses_count: "expenses",
    officeExpenses: "Office Expenses",
    marketing: "Marketing",
    travel: "Travel",
    bills: "Bills",
    supplies: "Supplies",
    other: "Other",
  },
}

export function ExpenseManagement({ onBack, language }: ExpenseManagementProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddExpense, setShowAddExpense] = useState(false)

  const t = translations[language]

  const expenseCategories = [
    { id: "office", name: t.officeExpenses, total: "₺12,450", count: 23 },
    { id: "marketing", name: t.marketing, total: "₺8,750", count: 15 },
    { id: "travel", name: t.travel, total: "₺4,200", count: 8 },
    { id: "utilities", name: t.bills, total: "₺3,350", count: 12 },
    { id: "supplies", name: t.supplies, total: "₺2,800", count: 18 },
    { id: "other", name: t.other, total: "₺1,450", count: 7 },
  ]

  const recentExpenses = [
    {
      id: 1,
      description: language === "tr" ? "Ofis kiraları" : "Office rent",
      amount: "₺5,000",
      category: t.officeExpenses,
      date: "2024-01-15",
      status: "approved",
    },
    {
      id: 2,
      description: language === "tr" ? "Google Ads kampanyası" : "Google Ads campaign",
      amount: "₺2,500",
      category: t.marketing,
      date: "2024-01-14",
      status: "pending",
    },
    {
      id: 3,
      description: language === "tr" ? "İstanbul seyahat" : "Istanbul travel",
      amount: "₺1,200",
      category: t.travel,
      date: "2024-01-13",
      status: "approved",
    },
    {
      id: 4,
      description: language === "tr" ? "Elektrik faturası" : "Electricity bill",
      amount: "₺850",
      category: t.bills,
      date: "2024-01-12",
      status: "approved",
    },
    {
      id: 5,
      description: language === "tr" ? "Kırtasiye malzemeleri" : "Stationery supplies",
      amount: "₺320",
      category: t.supplies,
      date: "2024-01-11",
      status: "pending",
    },
  ]

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
            <TabsTrigger value="overview">{t.overview}</TabsTrigger>
            <TabsTrigger value="expenses">{t.expenses}</TabsTrigger>
            <TabsTrigger value="categories">{t.categories}</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{t.totalThisMonth}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">₺28,750</div>
                  <p className="text-xs text-red-600 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {t.comparedToLastMonth}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{t.pendingApprovals}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">8</div>
                  <p className="text-xs text-orange-600">₺4,570 {t.worthOf}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{t.categoryCount}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">12</div>
                  <p className="text-xs text-muted-foreground">{t.activeCategories}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{t.averageExpense}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">₺342</div>
                  <p className="text-xs text-muted-foreground">{t.dailyAverage}</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t.categoryDistribution}</CardTitle>
                  <CardDescription>{t.expenseDistribution}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {expenseCategories.map((category) => (
                      <div key={category.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{category.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {category.count} {t.expenses_count}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{category.total}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t.recentExpenses}</CardTitle>
                  <CardDescription>{t.latestExpenseRecords}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentExpenses.slice(0, 5).map((expense) => (
                      <div
                        key={expense.id}
                        className="flex items-center justify-between py-2 border-b border-border last:border-0"
                      >
                        <div>
                          <p className="font-medium">{expense.description}</p>
                          <p className="text-sm text-muted-foreground">{expense.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{expense.amount}</p>
                          <Badge variant={expense.status === "approved" ? "default" : "secondary"} className="text-xs">
                            {expense.status === "approved" ? t.approved : t.pending}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="expenses" className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder={t.searchExpense}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  {t.filter}
                </Button>
              </div>
              <Button onClick={() => setShowAddExpense(true)}>
                <Plus className="h-4 w-4 mr-2" />
                {t.newExpense}
              </Button>
            </div>

            {showAddExpense && (
              <Card>
                <CardHeader>
                  <CardTitle>{t.addNewExpense}</CardTitle>
                  <CardDescription>{t.createNewExpenseRecord}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="description">{t.description}</Label>
                      <Input id="description" placeholder={t.expenseDescription} />
                    </div>
                    <div>
                      <Label htmlFor="amount">{t.amount}</Label>
                      <Input id="amount" type="number" placeholder="0.00" />
                    </div>
                    <div>
                      <Label htmlFor="category">{t.category}</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder={t.selectCategory} />
                        </SelectTrigger>
                        <SelectContent>
                          {expenseCategories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="date">{t.date}</Label>
                      <Input id="date" type="date" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="notes">{t.notes}</Label>
                    <Textarea id="notes" placeholder={t.additionalNotes} />
                  </div>
                  <div className="flex gap-2">
                    <Button>{t.save}</Button>
                    <Button variant="outline" onClick={() => setShowAddExpense(false)}>
                      {t.cancel}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>{t.expenseList}</CardTitle>
                <CardDescription>{t.allExpenseRecords}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentExpenses.map((expense) => (
                    <div
                      key={expense.id}
                      className="flex items-center justify-between p-4 border border-border rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-red-100 rounded-lg">
                          <Receipt className="h-5 w-5 text-red-600" />
                        </div>
                        <div>
                          <p className="font-medium">{expense.description}</p>
                          <p className="text-sm text-muted-foreground">
                            {expense.category} • {expense.date}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">{expense.amount}</p>
                        <Badge variant={expense.status === "approved" ? "default" : "secondary"}>
                          {expense.status === "approved" ? t.approved : t.pending}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">{t.expenseCategories}</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                {t.newCategory}
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {expenseCategories.map((category) => (
                <Card key={category.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {category.name}
                      <Badge variant="secondary">{category.count}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-foreground mb-2">{category.total}</div>
                    <p className="text-sm text-muted-foreground">
                      {category.count} {t.expenseRecords}
                    </p>
                    <Button variant="outline" size="sm" className="w-full mt-4 bg-transparent">
                      {t.viewDetails}
                    </Button>
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
