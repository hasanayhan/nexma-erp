"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Plus, Search, Calculator, TrendingUp, TrendingDown, FileText } from "lucide-react"

interface AccountingManagementProps {
  onBack: () => void
  language: "tr" | "en" // Added language prop
}

const translations = {
  tr: {
    back: "Geri",
    title: "Muhasebe Yönetimi",
    subtitle: "Mali işlemler ve raporlama",
    overview: "Genel Bakış",
    chartOfAccounts: "Hesap Planı",
    journal: "Yevmiye",
    financialReports: "Mali Raporlar",
    totalAssets: "Toplam Varlık",
    totalLiabilities: "Toplam Borç",
    netProfit: "Net Kar",
    journalEntries: "Yevmiye Kayıtları",
    thisMonth: "bu ay",
    accountTypesDistribution: "Hesap Türleri Dağılımı",
    assetLiabilityEquityDistribution: "Varlık, borç ve sermaye dağılımı",
    assets: "Varlıklar",
    liabilities: "Borçlar",
    income: "Gelirler",
    accounts: "hesap",
    recentJournalEntries: "Son Yevmiye Kayıtları",
    latestAccountingRecords: "En son eklenen muhasebe kayıtları",
    approved: "Onaylandı",
    pending: "Bekliyor",
    searchAccount: "Hesap ara...",
    type: "Tür",
    all: "Tümü",
    asset: "Varlık",
    liability: "Borç",
    equity: "Sermaye",
    expense: "Gider",
    newAccount: "Yeni Hesap",
    accountsAndBalances: "Muhasebe hesapları ve bakiyeleri",
    debit: "Borç",
    credit: "Alacak",
    searchJournal: "Yevmiye ara...",
    status: "Durum",
    newEntry: "Yeni Kayıt",
    journalBook: "Yevmiye Defteri",
    accountingRecords: "Muhasebe kayıtları",
    trialBalance: "Mizan",
    incomeStatement: "Gelir Tablosu",
    balanceSheet: "Bilanço",
    cashFlow: "Nakit Akış",
    accountBalancesSummary: "Hesap bakiyeleri özeti",
    periodProfitLoss: "Dönem kar/zarar durumu",
    financialPositionStatement: "Mali durum tablosu",
    cashInflowOutflowReport: "Nakit giriş/çıkış raporu",
    january2024: "Ocak 2024",
    period: "Dönem",
    view: "Görüntüle",
    download: "İndir",
    quickFinancialSummary: "Hızlı Mali Özet",
    basicFinancialIndicators: "Temel mali göstergeler",
    equity2: "Öz Sermaye",
    cashSale: "Nakit satış",
    goodsPurchase: "Mal alımı",
    bankTransfer: "Banka transferi",
    cash: "Kasa",
    banks: "Bankalar",
    customers: "Alıcılar",
    tradeGoods: "Ticari Mallar",
    suppliers: "Satıcılar",
    sales: "Satışlar",
  },
  en: {
    back: "Back",
    title: "Accounting Management",
    subtitle: "Financial operations and reporting",
    overview: "Overview",
    chartOfAccounts: "Chart of Accounts",
    journal: "Journal",
    financialReports: "Financial Reports",
    totalAssets: "Total Assets",
    totalLiabilities: "Total Liabilities",
    netProfit: "Net Profit",
    journalEntries: "Journal Entries",
    thisMonth: "this month",
    accountTypesDistribution: "Account Types Distribution",
    assetLiabilityEquityDistribution: "Asset, liability and equity distribution",
    assets: "Assets",
    liabilities: "Liabilities",
    income: "Income",
    accounts: "accounts",
    recentJournalEntries: "Recent Journal Entries",
    latestAccountingRecords: "Latest accounting records added",
    approved: "Approved",
    pending: "Pending",
    searchAccount: "Search account...",
    type: "Type",
    all: "All",
    asset: "Asset",
    liability: "Liability",
    equity: "Equity",
    expense: "Expense",
    newAccount: "New Account",
    accountsAndBalances: "Accounting accounts and balances",
    debit: "Debit",
    credit: "Credit",
    searchJournal: "Search journal...",
    status: "Status",
    newEntry: "New Entry",
    journalBook: "Journal Book",
    accountingRecords: "Accounting records",
    trialBalance: "Trial Balance",
    incomeStatement: "Income Statement",
    balanceSheet: "Balance Sheet",
    cashFlow: "Cash Flow",
    accountBalancesSummary: "Account balances summary",
    periodProfitLoss: "Period profit/loss status",
    financialPositionStatement: "Financial position statement",
    cashInflowOutflowReport: "Cash inflow/outflow report",
    january2024: "January 2024",
    period: "Period",
    view: "View",
    download: "Download",
    quickFinancialSummary: "Quick Financial Summary",
    basicFinancialIndicators: "Basic financial indicators",
    equity2: "Equity",
    cashSale: "Cash sale",
    goodsPurchase: "Goods purchase",
    bankTransfer: "Bank transfer",
    cash: "Cash",
    banks: "Banks",
    customers: "Customers",
    tradeGoods: "Trade Goods",
    suppliers: "Suppliers",
    sales: "Sales",
  },
}

export function AccountingManagement({ onBack, language }: AccountingManagementProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")

  const t = translations[language] // Added translation helper

  const accounts = [
    { code: "100", name: t.cash, type: t.asset, balance: "₺123,450", debit: "₺156,780", credit: "₺33,330" },
    { code: "102", name: t.banks, type: t.asset, balance: "₺456,789", debit: "₺523,890", credit: "₺67,101" },
    { code: "120", name: t.customers, type: t.asset, balance: "₺234,567", debit: "₺345,678", credit: "₺111,111" },
    { code: "153", name: t.tradeGoods, type: t.asset, balance: "₺789,123", debit: "₺890,234", credit: "₺101,111" },
    { code: "320", name: t.suppliers, type: t.liability, balance: "₺167,890", debit: "₺45,670", credit: "₺213,560" },
    { code: "600", name: t.sales, type: t.income, balance: "₺1,234,567", debit: "₺0", credit: "₺1,234,567" },
  ]

  const journalEntries = [
    {
      id: "YKM001",
      date: "2024-01-15",
      description: t.cashSale,
      debitAccount: `100 - ${t.cash}`,
      creditAccount: `600 - ${t.sales}`,
      amount: "₺5,000",
      status: "approved",
    },
    {
      id: "YKM002",
      date: "2024-01-15",
      description: t.goodsPurchase,
      debitAccount: `153 - ${t.tradeGoods}`,
      creditAccount: `320 - ${t.suppliers}`,
      amount: "₺12,500",
      status: "pending",
    },
    {
      id: "YKM003",
      date: "2024-01-14",
      description: t.bankTransfer,
      debitAccount: `102 - ${t.banks}`,
      creditAccount: `100 - ${t.cash}`,
      amount: "₺25,000",
      status: "approved",
    },
  ]

  const reports = [
    { name: t.trialBalance, description: t.accountBalancesSummary, period: t.january2024 },
    { name: t.incomeStatement, description: t.periodProfitLoss, period: t.january2024 },
    { name: t.balanceSheet, description: t.financialPositionStatement, period: "31.01.2024" },
    { name: t.cashFlow, description: t.cashInflowOutflowReport, period: t.january2024 },
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
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">{t.overview}</TabsTrigger>
            <TabsTrigger value="accounts">{t.chartOfAccounts}</TabsTrigger>
            <TabsTrigger value="journal">{t.journal}</TabsTrigger>
            <TabsTrigger value="reports">{t.financialReports}</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{t.totalAssets}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">₺1,603,929</div>
                  <p className="text-xs text-green-600 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +8.5% {t.thisMonth}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{t.totalLiabilities}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">₺167,890</div>
                  <p className="text-xs text-red-600 flex items-center">
                    <TrendingDown className="h-3 w-3 mr-1" />
                    -3.2% {t.thisMonth}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{t.netProfit}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">₺234,567</div>
                  <p className="text-xs text-green-600">{t.thisMonth}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{t.journalEntries}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">445</div>
                  <p className="text-xs text-muted-foreground">{t.thisMonth}</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t.accountTypesDistribution}</CardTitle>
                  <CardDescription>{t.assetLiabilityEquityDistribution}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{t.assets}</p>
                        <p className="text-sm text-muted-foreground">4 {t.accounts}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">₺1,603,929</p>
                        <p className="text-sm text-green-600">+8.5%</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{t.liabilities}</p>
                        <p className="text-sm text-muted-foreground">1 {t.accounts}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">₺167,890</p>
                        <p className="text-sm text-red-600">-3.2%</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{t.income}</p>
                        <p className="text-sm text-muted-foreground">1 {t.accounts}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">₺1,234,567</p>
                        <p className="text-sm text-green-600">+12.8%</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t.recentJournalEntries}</CardTitle>
                  <CardDescription>{t.latestAccountingRecords}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {journalEntries.slice(0, 4).map((entry) => (
                      <div
                        key={entry.id}
                        className="flex items-center justify-between py-2 border-b border-border last:border-0"
                      >
                        <div>
                          <p className="font-medium">{entry.description}</p>
                          <p className="text-sm text-muted-foreground">
                            {entry.id} • {entry.date}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{entry.amount}</p>
                          <Badge variant={entry.status === "approved" ? "default" : "secondary"} className="text-xs">
                            {entry.status === "approved" ? t.approved : t.pending}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="accounts" className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder={t.searchAccount}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Select>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder={t.type} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t.all}</SelectItem>
                    <SelectItem value="asset">{t.asset}</SelectItem>
                    <SelectItem value="liability">{t.liability}</SelectItem>
                    <SelectItem value="equity">{t.equity}</SelectItem>
                    <SelectItem value="income">{t.income}</SelectItem>
                    <SelectItem value="expense">{t.expense}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                {t.newAccount}
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>{t.chartOfAccounts}</CardTitle>
                <CardDescription>{t.accountsAndBalances}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {accounts.map((account) => (
                    <div
                      key={account.code}
                      className="flex items-center justify-between p-4 border border-border rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Calculator className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">
                            {account.code} - {account.name}
                          </p>
                          <p className="text-sm text-muted-foreground">{account.type}</p>
                          <p className="text-sm text-muted-foreground">
                            {t.debit}: {account.debit} • {t.credit}: {account.credit}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">{account.balance}</p>
                        <Badge variant="secondary">{account.type}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="journal" className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder={t.searchJournal}
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
                    <SelectItem value="approved">{t.approved}</SelectItem>
                    <SelectItem value="pending">{t.pending}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                {t.newEntry}
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>{t.journalBook}</CardTitle>
                <CardDescription>{t.accountingRecords}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {journalEntries.map((entry) => (
                    <div key={entry.id} className="p-4 border border-border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="font-medium">
                            {entry.id} - {entry.description}
                          </p>
                          <p className="text-sm text-muted-foreground">{entry.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">{entry.amount}</p>
                          <Badge variant={entry.status === "approved" ? "default" : "secondary"}>
                            {entry.status === "approved" ? t.approved : t.pending}
                          </Badge>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">{t.debit}:</p>
                          <p className="font-medium">{entry.debitAccount}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">{t.credit}:</p>
                          <p className="font-medium">{entry.creditAccount}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reports.map((report, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {report.name}
                      <FileText className="h-5 w-5 text-muted-foreground" />
                    </CardTitle>
                    <CardDescription>{report.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {t.period}: {report.period}
                    </p>
                    <div className="flex gap-2">
                      <Button size="sm">{t.view}</Button>
                      <Button variant="outline" size="sm">
                        {t.download}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>{t.quickFinancialSummary}</CardTitle>
                <CardDescription>{t.basicFinancialIndicators}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">₺1,603,929</p>
                    <p className="text-sm text-muted-foreground">{t.totalAssets}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-red-600">₺167,890</p>
                    <p className="text-sm text-muted-foreground">{t.totalLiabilities}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">₺1,436,039</p>
                    <p className="text-sm text-muted-foreground">{t.equity2}</p>
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
