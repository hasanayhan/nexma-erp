"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
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
  CreditCard,
  Banknote,
  ArrowUpRight,
  ArrowDownLeft,
  Building2,
  Wallet,
  TrendingUp,
  TrendingDown,
  RefreshCw,
} from "lucide-react"

interface CashAccount {
  id: string
  name: string
  type: "cash" | "bank" | "credit_card"
  accountNumber?: string
  bankName?: string
  balance: number
  currency: string
  status: "active" | "inactive"
  description: string
}

interface CashTransaction {
  id: string
  accountId: string
  accountName: string
  type: "income" | "expense" | "transfer_in" | "transfer_out"
  amount: number
  description: string
  category: string
  date: string
  reference: string
  status: "completed" | "pending" | "cancelled"
  relatedAccountId?: string
  relatedAccountName?: string
}

interface CashManagementProps {
  onBack: () => void
  language: "tr" | "en"
}

const translations = {
  tr: {
    
    mainPage: "Ana Sayfa",
    cashManagement: "Kasa Yönetimi",
    cashAndBankAccounts: "Nakit ve banka hesapları",
    addAccount: "Hesap Ekle",
    addTransaction: "İşlem Ekle",
    moneyTransfer: "Para Transferi",

    
    cash: "Nakit",
    bank: "Banka",
    creditCard: "Kredi Kartı",
    bankAccount: "Banka Hesabı",

    
    income: "Gelir",
    expense: "Gider",
    transferIn: "Transfer (Gelen)",
    transferOut: "Transfer (Giden)",

    
    totalBalance: "Toplam Bakiye",
    totalIncome: "Toplam Gelir",
    totalExpense: "Toplam Gider",
    pendingTransactions: "Bekleyen İşlemler",
    accounts: "hesap",
    thisMonth: "Bu ay",
    awaitingApproval: "Onay bekliyor",

    
    overview: "Genel Bakış",
    accountsTab: "Hesaplar",
    transactionsTab: "İşlemler",

    accountBalances: "Hesap Bakiyeleri",
    currentStatusAllAccounts: "Tüm hesapların güncel durumu",
    recentTransactions: "Son İşlemler",
    last5Transactions: "En son 5 işlem",
    debt: "Borç",

    addNewAccount: "Yeni Hesap Ekle",
    enterAccountInfo: "Nakit veya banka hesabı bilgilerini girin.",
    accountName: "Hesap Adı",
    enterAccountName: "Hesap adını girin",
    accountType: "Hesap Tipi",
    bankName: "Banka Adı",
    enterBankName: "Banka adını girin",
    accountNumber: "Hesap Numarası",
    enterAccountNumber: "Hesap numarasını girin",
    currency: "Para Birimi",
    initialBalance: "Başlangıç Bakiyesi",
    description: "Açıklama",
    accountDescription: "Hesap açıklaması",
    cancel: "İptal",
    save: "Kaydet",

    addNewTransaction: "Yeni İşlem Ekle",
    enterTransactionInfo: "Gelir veya gider işlemi bilgilerini girin.",
    account: "Hesap",
    selectAccount: "Hesap seçin",
    transactionType: "İşlem Tipi",
    amount: "Tutar",
    category: "Kategori",
    selectCategory: "Kategori seçin",
    transactionDescription: "İşlem açıklaması",
    reference: "Referans",
    referenceNote: "Fatura no, makbuz no vb.",
    date: "Tarih",

    moneyTransferTitle: "Para Transferi",
    transferBetweenAccounts: "Hesaplar arası para transferi yapın.",
    senderAccount: "Gönderen Hesap",
    selectSenderAccount: "Gönderen hesap seçin",
    receiverAccount: "Alıcı Hesap",
    selectReceiverAccount: "Alıcı hesap seçin",
    transferAmount: "Transfer Tutarı",
    transferDescription: "Transfer açıklaması",
    transferReference: "Transfer referansı",
    makeTransfer: "Transfer Yap",

    active: "Aktif",
    inactive: "Pasif",
    balance: "Bakiye",

    searchPlaceholder: "Açıklama veya referans ile ara...",
    allAccounts: "Tüm Hesaplar",
    allTransactions: "Tüm İşlemler",

    transactionList: "İşlem Listesi",
    showingTransactions: "işlem gösteriliyor",
    accountCol: "Hesap",
    transactionTypeCol: "İşlem Tipi",
    descriptionCol: "Açıklama",
    categoryCol: "Kategori",
    amountCol: "Tutar",
    referenceCol: "Referans",
    statusCol: "Durum",

    completed: "Tamamlandı",
    pending: "Bekliyor",
    cancelled: "İptal",

    sales: "Satış",
    rent: "Kira",
    salary: "Maaş",
    materials: "Malzeme",
    shipping: "Kargo",
    tax: "Vergi",
    transfer: "Transfer",
    other: "Diğer",
  },
  en: {
    mainPage: "Main Page",
    cashManagement: "Cash Management",
    cashAndBankAccounts: "Cash and bank accounts",
    addAccount: "Add Account",
    addTransaction: "Add Transaction",
    moneyTransfer: "Money Transfer",

    cash: "Cash",
    bank: "Bank",
    creditCard: "Credit Card",
    bankAccount: "Bank Account",

    income: "Income",
    expense: "Expense",
    transferIn: "Transfer (Incoming)",
    transferOut: "Transfer (Outgoing)",

    totalBalance: "Total Balance",
    totalIncome: "Total Income",
    totalExpense: "Total Expense",
    pendingTransactions: "Pending Transactions",
    accounts: "accounts",
    thisMonth: "This month",
    awaitingApproval: "Awaiting approval",

    overview: "Overview",
    accountsTab: "Accounts",
    transactionsTab: "Transactions",

    accountBalances: "Account Balances",
    currentStatusAllAccounts: "Current status of all accounts",
    recentTransactions: "Recent Transactions",
    last5Transactions: "Last 5 transactions",
    debt: "Debt",

    addNewAccount: "Add New Account",
    enterAccountInfo: "Enter cash or bank account information.",
    accountName: "Account Name",
    enterAccountName: "Enter account name",
    accountType: "Account Type",
    bankName: "Bank Name",
    enterBankName: "Enter bank name",
    accountNumber: "Account Number",
    enterAccountNumber: "Enter account number",
    currency: "Currency",
    initialBalance: "Initial Balance",
    description: "Description",
    accountDescription: "Account description",
    cancel: "Cancel",
    save: "Save",

    addNewTransaction: "Add New Transaction",
    enterTransactionInfo: "Enter income or expense transaction information.",
    account: "Account",
    selectAccount: "Select account",
    transactionType: "Transaction Type",
    amount: "Amount",
    category: "Category",
    selectCategory: "Select category",
    transactionDescription: "Transaction description",
    reference: "Reference",
    referenceNote: "Invoice no, receipt no, etc.",
    date: "Date",

    moneyTransferTitle: "Money Transfer",
    transferBetweenAccounts: "Transfer money between accounts.",
    senderAccount: "Sender Account",
    selectSenderAccount: "Select sender account",
    receiverAccount: "Receiver Account",
    selectReceiverAccount: "Select receiver account",
    transferAmount: "Transfer Amount",
    transferDescription: "Transfer description",
    transferReference: "Transfer reference",
    makeTransfer: "Make Transfer",

    active: "Active",
    inactive: "Inactive",
    balance: "Balance",

    searchPlaceholder: "Search by description or reference...",
    allAccounts: "All Accounts",
    allTransactions: "All Transactions",

    transactionList: "Transaction List",
    showingTransactions: "transactions showing",
    accountCol: "Account",
    transactionTypeCol: "Transaction Type",
    descriptionCol: "Description",
    categoryCol: "Category",
    amountCol: "Amount",
    referenceCol: "Reference",
    statusCol: "Status",

    completed: "Completed",
    pending: "Pending",
    cancelled: "Cancelled",

    sales: "Sales",
    rent: "Rent",
    salary: "Salary",
    materials: "Materials",
    shipping: "Shipping",
    tax: "Tax",
    transfer: "Transfer",
    other: "Other",
  },
}

const mockAccounts: CashAccount[] = [
  {
    id: "1",
    name: "Cash Account",
    type: "cash",
    balance: 1000,
    currency: "TRY",
    status: "active",
    description: "Main cash account",
  },
  {
    id: "2",
    name: "Bank Account",
    type: "bank",
    accountNumber: "123456789",
    bankName: "XYZ Bank",
    balance: 2000,
    currency: "TRY",
    status: "active",
    description: "Main bank account",
  },
]

const mockTransactions: CashTransaction[] = [
  {
    id: "1",
    accountId: "1",
    accountName: "Cash Account",
    type: "income",
    amount: 500,
    description: "Salary",
    category: "Salary",
    date: "2023-10-01",
    reference: "REF123",
    status: "completed",
  },
  {
    id: "2",
    accountId: "2",
    accountName: "Bank Account",
    type: "expense",
    amount: 300,
    description: "Rent",
    category: "Rent",
    date: "2023-10-02",
    reference: "REF456",
    status: "completed",
  },
]

export function CashManagement({ onBack, language }: CashManagementProps) {
  const t = (key: keyof typeof translations.tr) => translations[language][key]

  const [accounts, setAccounts] = useState<CashAccount[]>(mockAccounts)
  const [transactions, setTransactions] = useState<CashTransaction[]>(mockTransactions)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedAccount, setSelectedAccount] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [isAccountDialogOpen, setIsAccountDialogOpen] = useState(false)
  const [isTransactionDialogOpen, setIsTransactionDialogOpen] = useState(false)
  const [isTransferDialogOpen, setIsTransferDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  const [newAccount, setNewAccount] = useState<Partial<CashAccount>>({
    name: "",
    type: "cash",
    accountNumber: "",
    bankName: "",
    balance: 0,
    currency: "TRY",
    status: "active",
    description: "",
  })

  const [newTransaction, setNewTransaction] = useState<Partial<CashTransaction>>({
    accountId: "",
    type: "income",
    amount: 0,
    description: "",
    category: "",
    date: new Date().toISOString().split("T")[0],
    reference: "",
    status: "completed",
  })

  const [transferData, setTransferData] = useState({
    fromAccountId: "",
    toAccountId: "",
    amount: 0,
    description: "",
    reference: "",
  })

  const transactionTypes = ["all", "income", "expense", "transfer_in", "transfer_out"]
  const categories = [
    t("sales"),
    t("rent"),
    t("salary"),
    t("materials"),
    t("shipping"),
    t("tax"),
    t("transfer"),
    t("other"),
  ]
  const currencies = ["TRY", "USD", "EUR"]

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.reference.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesAccount = selectedAccount === "all" || transaction.accountId === selectedAccount
    const matchesType = selectedType === "all" || transaction.type === selectedType
    return matchesSearch && matchesAccount && matchesType
  })

  const totalBalance = accounts.reduce((sum, account) => {
    if (account.currency === "TRY") return sum + account.balance
    if (account.currency === "USD") return sum + account.balance * 30 // Mock exchange rate
    if (account.currency === "EUR") return sum + account.balance * 33 // Mock exchange rate
    return sum
  }, 0)

  const totalIncome = transactions
    .filter((t) => t.type === "income" && t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0)

  const totalExpense = transactions
    .filter((t) => t.type === "expense" && t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0)

  const pendingTransactions = transactions.filter((t) => t.status === "pending").length

  const getAccountTypeIcon = (type: string) => {
    switch (type) {
      case "cash":
        return Banknote
      case "bank":
        return Building2
      case "credit_card":
        return CreditCard
      default:
        return Wallet
    }
  }

  const getAccountTypeLabel = (type: string) => {
    switch (type) {
      case "cash":
        return t("cash")
      case "bank":
        return t("bank")
      case "credit_card":
        return t("creditCard")
      default:
        return type
    }
  }

  const getTransactionTypeLabel = (type: string) => {
    switch (type) {
      case "income":
        return t("income")
      case "expense":
        return t("expense")
      case "transfer_in":
        return t("transferIn")
      case "transfer_out":
        return t("transferOut")
      default:
        return type
    }
  }

  const getTransactionTypeColor = (type: string) => {
    switch (type) {
      case "income":
        return "bg-green-500"
      case "expense":
        return "bg-red-500"
      case "transfer_in":
        return "bg-blue-500"
      case "transfer_out":
        return "bg-purple-500"
      default:
        return "bg-gray-500"
    }
  }

  const handleAddAccount = () => {
    if (newAccount.name) {
      const account: CashAccount = {
        ...(newAccount as CashAccount),
        id: Date.now().toString(),
      }
      setAccounts([...accounts, account])
      setNewAccount({
        name: "",
        type: "cash",
        accountNumber: "",
        bankName: "",
        balance: 0,
        currency: "TRY",
        status: "active",
        description: "",
      })
      setIsAccountDialogOpen(false)
    }
  }

  const handleAddTransaction = () => {
    if (newTransaction.accountId && newTransaction.amount && newTransaction.description) {
      const transaction: CashTransaction = {
        ...(newTransaction as CashTransaction),
        id: Date.now().toString(),
        accountName: accounts.find((a) => a.id === newTransaction.accountId)?.name || "",
      }
      setTransactions([...transactions, transaction])

      setAccounts(
        accounts.map((account) => {
          if (account.id === newTransaction.accountId) {
            const balanceChange = newTransaction.type === "income" ? newTransaction.amount! : -newTransaction.amount!
            return { ...account, balance: account.balance + balanceChange }
          }
          return account
        }),
      )

      setNewTransaction({
        accountId: "",
        type: "income",
        amount: 0,
        description: "",
        category: "",
        date: new Date().toISOString().split("T")[0],
        reference: "",
        status: "completed",
      })
      setIsTransactionDialogOpen(false)
    }
  }

  const handleTransfer = () => {
    if (transferData.fromAccountId && transferData.toAccountId && transferData.amount) {
      const fromAccount = accounts.find((a) => a.id === transferData.fromAccountId)
      const toAccount = accounts.find((a) => a.id === transferData.toAccountId)

      if (fromAccount && toAccount) {
        const transferRef = `TRF-${Date.now()}`

        const outTransaction: CashTransaction = {
          id: Date.now().toString(),
          accountId: transferData.fromAccountId,
          accountName: fromAccount.name,
          type: "transfer_out",
          amount: transferData.amount,
          description: transferData.description,
          category: "Transfer",
          date: new Date().toISOString().split("T")[0],
          reference: transferRef,
          status: "completed",
          relatedAccountId: transferData.toAccountId,
          relatedAccountName: toAccount.name,
        }

        const inTransaction: CashTransaction = {
          id: (Date.now() + 1).toString(),
          accountId: transferData.toAccountId,
          accountName: toAccount.name,
          type: "transfer_in",
          amount: transferData.amount,
          description: transferData.description,
          category: "Transfer",
          date: new Date().toISOString().split("T")[0],
          reference: transferRef,
          status: "completed",
          relatedAccountId: transferData.fromAccountId,
          relatedAccountName: fromAccount.name,
        }

        setTransactions([...transactions, outTransaction, inTransaction])

        setAccounts(
          accounts.map((account) => {
            if (account.id === transferData.fromAccountId) {
              return { ...account, balance: account.balance - transferData.amount }
            }
            if (account.id === transferData.toAccountId) {
              return { ...account, balance: account.balance + transferData.amount }
            }
            return account
          }),
        )

        setTransferData({
          fromAccountId: "",
          toAccountId: "",
          amount: 0,
          description: "",
          reference: "",
        })
        setIsTransferDialogOpen(false)
      }
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* ÜSTBİLGİ */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t("mainPage")}
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">{t("cashManagement")}</h1>
                <p className="text-muted-foreground">{t("cashAndBankAccounts")}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Dialog open={isAccountDialogOpen} onOpenChange={setIsAccountDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    {t("addAccount")}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{t("addNewAccount")}</DialogTitle>
                    <DialogDescription>{t("enterAccountInfo")}</DialogDescription>
                  </DialogHeader>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label>{t("accountName")}</Label>
                      <Input
                        value={newAccount.name}
                        onChange={(e) => setNewAccount({ ...newAccount, name: e.target.value })}
                        placeholder={t("enterAccountName")}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>{t("accountType")}</Label>
                      <Select
                        value={newAccount.type}
                        onValueChange={(value: any) => setNewAccount({ ...newAccount, type: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cash">{t("cash")}</SelectItem>
                          <SelectItem value="bank">{t("bankAccount")}</SelectItem>
                          <SelectItem value="credit_card">{t("creditCard")}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {newAccount.type !== "cash" && (
                      <>
                        <div className="space-y-2">
                          <Label>{t("bankName")}</Label>
                          <Input
                            value={newAccount.bankName}
                            onChange={(e) => setNewAccount({ ...newAccount, bankName: e.target.value })}
                            placeholder={t("enterBankName")}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>{t("accountNumber")}</Label>
                          <Input
                            value={newAccount.accountNumber}
                            onChange={(e) => setNewAccount({ ...newAccount, accountNumber: e.target.value })}
                            placeholder={t("enterAccountNumber")}
                          />
                        </div>
                      </>
                    )}
                    <div className="space-y-2">
                      <Label>{t("currency")}</Label>
                      <Select
                        value={newAccount.currency}
                        onValueChange={(value) => setNewAccount({ ...newAccount, currency: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {currencies.map((currency) => (
                            <SelectItem key={currency} value={currency}>
                              {currency}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>{t("initialBalance")}</Label>
                      <Input
                        type="number"
                        value={newAccount.balance}
                        onChange={(e) =>
                          setNewAccount({ ...newAccount, balance: Number.parseFloat(e.target.value) || 0 })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>{t("description")}</Label>
                      <Textarea
                        value={newAccount.description}
                        onChange={(e) => setNewAccount({ ...newAccount, description: e.target.value })}
                        placeholder={t("accountDescription")}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline" onClick={() => setIsAccountDialogOpen(false)}>
                      {t("cancel")}
                    </Button>
                    <Button onClick={handleAddAccount}>{t("save")}</Button>
                  </div>
                </DialogContent>
              </Dialog>
              <Dialog open={isTransactionDialogOpen} onOpenChange={setIsTransactionDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    {t("addTransaction")}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{t("addNewTransaction")}</DialogTitle>
                    <DialogDescription>{t("enterTransactionInfo")}</DialogDescription>
                  </DialogHeader>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label>{t("account")}</Label>
                      <Select
                        value={newTransaction.accountId}
                        onValueChange={(value) => setNewTransaction({ ...newTransaction, accountId: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={t("selectAccount")} />
                        </SelectTrigger>
                        <SelectContent>
                          {accounts.map((account) => (
                            <SelectItem key={account.id} value={account.id}>
                              {account.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>{t("transactionType")}</Label>
                      <Select
                        value={newTransaction.type}
                        onValueChange={(value: any) => setNewTransaction({ ...newTransaction, type: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="income">{t("income")}</SelectItem>
                          <SelectItem value="expense">{t("expense")}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>{t("amount")}</Label>
                      <Input
                        type="number"
                        value={newTransaction.amount}
                        onChange={(e) =>
                          setNewTransaction({ ...newTransaction, amount: Number.parseFloat(e.target.value) || 0 })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>{t("category")}</Label>
                      <Select
                        value={newTransaction.category}
                        onValueChange={(value) => setNewTransaction({ ...newTransaction, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={t("selectCategory")} />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>{t("description")}</Label>
                      <Input
                        value={newTransaction.description}
                        onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
                        placeholder={t("transactionDescription")}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>{t("reference")}</Label>
                      <Input
                        value={newTransaction.reference}
                        onChange={(e) => setNewTransaction({ ...newTransaction, reference: e.target.value })}
                        placeholder={t("referenceNote")}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>{t("date")}</Label>
                      <Input
                        type="date"
                        value={newTransaction.date}
                        onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline" onClick={() => setIsTransactionDialogOpen(false)}>
                      {t("cancel")}
                    </Button>
                    <Button onClick={handleAddTransaction}>{t("save")}</Button>
                  </div>
                </DialogContent>
              </Dialog>
              <Dialog open={isTransferDialogOpen} onOpenChange={setIsTransferDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    {t("moneyTransfer")}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{t("moneyTransferTitle")}</DialogTitle>
                    <DialogDescription>{t("transferBetweenAccounts")}</DialogDescription>
                  </DialogHeader>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label>{t("senderAccount")}</Label>
                      <Select
                        value={transferData.fromAccountId}
                        onValueChange={(value) => setTransferData({ ...transferData, fromAccountId: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={t("selectSenderAccount")} />
                        </SelectTrigger>
                        <SelectContent>
                          {accounts.map((account) => (
                            <SelectItem key={account.id} value={account.id}>
                              {account.name} (₺{account.balance.toLocaleString()})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>{t("receiverAccount")}</Label>
                      <Select
                        value={transferData.toAccountId}
                        onValueChange={(value) => setTransferData({ ...transferData, toAccountId: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={t("selectReceiverAccount")} />
                        </SelectTrigger>
                        <SelectContent>
                          {accounts
                            .filter((account) => account.id !== transferData.fromAccountId)
                            .map((account) => (
                              <SelectItem key={account.id} value={account.id}>
                                {account.name} (₺{account.balance.toLocaleString()})
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>{t("transferAmount")}</Label>
                      <Input
                        type="number"
                        value={transferData.amount}
                        onChange={(e) =>
                          setTransferData({ ...transferData, amount: Number.parseFloat(e.target.value) || 0 })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>{t("description")}</Label>
                      <Input
                        value={transferData.description}
                        onChange={(e) => setTransferData({ ...transferData, description: e.target.value })}
                        placeholder={t("transferDescription")}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>{t("reference")}</Label>
                      <Input
                        value={transferData.reference}
                        onChange={(e) => setTransferData({ ...transferData, reference: e.target.value })}
                        placeholder={t("transferReference")}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline" onClick={() => setIsTransferDialogOpen(false)}>
                      {t("cancel")}
                    </Button>
                    <Button onClick={handleTransfer}>{t("makeTransfer")}</Button>
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
                <Wallet className="h-4 w-4" />
                {t("totalBalance")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">₺{totalBalance.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {accounts.length} {t("accounts")}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                {t("totalIncome")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">₺{totalIncome.toLocaleString()}</div>
              <p className="text-xs text-green-600">{t("thisMonth")}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <TrendingDown className="h-4 w-4" />
                {t("totalExpense")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">₺{totalExpense.toLocaleString()}</div>
              <p className="text-xs text-red-600">{t("thisMonth")}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                {t("pendingTransactions")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{pendingTransactions}</div>
              <p className="text-xs text-muted-foreground">{t("awaitingApproval")}</p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">{t("overview")}</TabsTrigger>
            <TabsTrigger value="accounts">{t("accountsTab")}</TabsTrigger>
            <TabsTrigger value="transactions">{t("transactionsTab")}</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t("accountBalances")}</CardTitle>
                  <CardDescription>{t("currentStatusAllAccounts")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {accounts.map((account) => {
                      const IconComponent = getAccountTypeIcon(account.type)
                      return (
                        <div key={account.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-muted">
                              <IconComponent className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="font-medium">{account.name}</p>
                              <p className="text-xs text-muted-foreground">{getAccountTypeLabel(account.type)}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className={`font-medium ${account.balance < 0 ? "text-red-600" : "text-foreground"}`}>
                              {account.currency === "TRY" ? "₺" : account.currency + " "}
                              {Math.abs(account.balance).toLocaleString()}
                              {account.balance < 0 && ` (${t("debt")})`}
                            </p>
                            <Badge variant="secondary" className="text-xs">
                              {account.currency}
                            </Badge>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>{t("recentTransactions")}</CardTitle>
                  <CardDescription>{t("last5Transactions")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {transactions.slice(0, 5).map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className={`p-1 rounded-full ${
                              transaction.type === "income" || transaction.type === "transfer_in"
                                ? "bg-green-100"
                                : "bg-red-100"
                            }`}
                          >
                            {transaction.type === "income" || transaction.type === "transfer_in" ? (
                              <ArrowDownLeft className="h-3 w-3 text-green-600" />
                            ) : (
                              <ArrowUpRight className="h-3 w-3 text-red-600" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-sm">{transaction.description}</p>
                            <p className="text-xs text-muted-foreground">{transaction.accountName}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p
                            className={`font-medium text-sm ${
                              transaction.type === "income" || transaction.type === "transfer_in"
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {transaction.type === "income" || transaction.type === "transfer_in" ? "+" : "-"}₺
                            {transaction.amount.toLocaleString()}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(transaction.date).toLocaleDateString(language === "tr" ? "tr-TR" : "en-US")}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="accounts" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {accounts.map((account) => {
                const IconComponent = getAccountTypeIcon(account.type)
                return (
                  <Card key={account.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          <IconComponent className="h-5 w-5" />
                          {account.name}
                        </CardTitle>
                        <Badge variant={account.status === "active" ? "default" : "secondary"}>
                          {account.status === "active" ? t("active") : t("inactive")}
                        </Badge>
                      </div>
                      <CardDescription>{getAccountTypeLabel(account.type)}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{t("balance")}:</span>
                          <span className={`font-medium ${account.balance < 0 ? "text-red-600" : "text-foreground"}`}>
                            {account.currency === "TRY" ? "₺" : account.currency + " "}
                            {Math.abs(account.balance).toLocaleString()}
                            {account.balance < 0 && ` (${t("debt")})`}
                          </span>
                        </div>
                        {account.bankName && (
                          <div className="flex justify-between text-sm">
                            <span>{t("bank")}:</span>
                            <span className="font-medium">{account.bankName}</span>
                          </div>
                        )}
                        {account.accountNumber && (
                          <div className="flex justify-between text-sm">
                            <span>{t("accountNumber")}:</span>
                            <span className="font-medium">{account.accountNumber}</span>
                          </div>
                        )}
                        <div className="flex justify-between text-sm">
                          <span>{t("currency")}:</span>
                          <Badge variant="secondary">{account.currency}</Badge>
                        </div>
                      </div>
                      {account.description && (
                        <div className="p-3 bg-muted rounded-lg">
                          <p className="text-sm">{account.description}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
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
                  <Select value={selectedAccount} onValueChange={setSelectedAccount}>
                    <SelectTrigger className="w-full md:w-48">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t("allAccounts")}</SelectItem>
                      {accounts.map((account) => (
                        <SelectItem key={account.id} value={account.id}>
                          {account.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t("allTransactions")}</SelectItem>
                      <SelectItem value="income">{t("income")}</SelectItem>
                      <SelectItem value="expense">{t("expense")}</SelectItem>
                      <SelectItem value="transfer_in">{t("transferIn")}</SelectItem>
                      <SelectItem value="transfer_out">{t("transferOut")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Transactions Table */}
            <Card>
              <CardHeader>
                <CardTitle>{t("transactionList")}</CardTitle>
                <CardDescription>
                  {filteredTransactions.length} {t("showingTransactions")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t("date")}</TableHead>
                      <TableHead>{t("accountCol")}</TableHead>
                      <TableHead>{t("transactionTypeCol")}</TableHead>
                      <TableHead>{t("descriptionCol")}</TableHead>
                      <TableHead>{t("categoryCol")}</TableHead>
                      <TableHead>{t("amountCol")}</TableHead>
                      <TableHead>{t("referenceCol")}</TableHead>
                      <TableHead>{t("statusCol")}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTransactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>
                          {new Date(transaction.date).toLocaleDateString(language === "tr" ? "tr-TR" : "en-US")}
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{transaction.accountName}</p>
                            {transaction.relatedAccountName && (
                              <p className="text-xs text-muted-foreground">→ {transaction.relatedAccountName}</p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={`${getTransactionTypeColor(transaction.type)} text-white`}>
                            {getTransactionTypeLabel(transaction.type)}
                          </Badge>
                        </TableCell>
                        <TableCell>{transaction.description}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{transaction.category}</Badge>
                        </TableCell>
                        <TableCell>
                          <span
                            className={`font-medium ${
                              transaction.type === "income" || transaction.type === "transfer_in"
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {transaction.type === "income" || transaction.type === "transfer_in" ? "+" : "-"}₺
                            {transaction.amount.toLocaleString()}
                          </span>
                        </TableCell>
                        <TableCell>{transaction.reference}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              transaction.status === "completed"
                                ? "default"
                                : transaction.status === "pending"
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {transaction.status === "completed"
                              ? t("completed")
                              : transaction.status === "pending"
                                ? t("pending")
                                : t("cancelled")}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
