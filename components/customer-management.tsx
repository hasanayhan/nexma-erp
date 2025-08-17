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
  Edit,
  Trash2,
  Users,
  Building2,
  Phone,
  TrendingUp,
  AlertCircle,
} from "lucide-react"

interface Customer {
  id: string
  code: string
  name: string
  type: "customer" | "supplier" | "both"
  taxNumber: string
  phone: string
  email: string
  address: string
  city: string
  country: string
  creditLimit: number
  balance: number
  paymentTerm: number
  contactPerson: string
  status: "active" | "inactive"
  lastTransaction: string
  totalTransactions: number
}

interface CustomerManagementProps {
  onBack: () => void
  language: "tr" | "en"
}

const mockCustomers: Customer[] = [
  {
    id: "1",
    code: "C001",
    name: "ABC Teknoloji Ltd. Şti.",
    type: "customer",
    taxNumber: "1234567890",
    phone: "+90 212 555 0101",
    email: "info@abcteknoloji.com",
    address: "Maslak Mahallesi, Teknoloji Cad. No:15",
    city: "İstanbul",
    country: "Türkiye",
    creditLimit: 50000,
    balance: -12500,
    paymentTerm: 30,
    contactPerson: "Ahmet Yılmaz",
    status: "active",
    lastTransaction: "2024-01-15",
    totalTransactions: 45,
  },
  {
    id: "2",
    code: "S001",
    name: "Dell Türkiye A.Ş.",
    type: "supplier",
    taxNumber: "9876543210",
    phone: "+90 216 555 0202",
    email: "orders@dell.com.tr",
    address: "Ataşehir, Ticaret Merkezi B Blok",
    city: "İstanbul",
    country: "Türkiye",
    creditLimit: 100000,
    balance: 25000,
    paymentTerm: 45,
    contactPerson: "Mehmet Kaya",
    status: "active",
    lastTransaction: "2024-01-14",
    totalTransactions: 78,
  },
  {
    id: "3",
    code: "C002",
    name: "XYZ Danışmanlık",
    type: "both",
    taxNumber: "5555666677",
    phone: "+90 312 555 0303",
    email: "contact@xyzdanismanlik.com",
    address: "Çankaya, İş Merkezi A Blok Kat:5",
    city: "Ankara",
    country: "Türkiye",
    creditLimit: 30000,
    balance: -5000,
    paymentTerm: 15,
    contactPerson: "Ayşe Demir",
    status: "active",
    lastTransaction: "2024-01-13",
    totalTransactions: 23,
  },
]

export function CustomerManagement({ onBack, language }: CustomerManagementProps) {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null)
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)

  const [newCustomer, setNewCustomer] = useState<Partial<Customer>>({
    code: "",
    name: "",
    type: "customer",
    taxNumber: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    country: "Türkiye",
    creditLimit: 0,
    balance: 0,
    paymentTerm: 30,
    contactPerson: "",
    status: "active",
  })

  const customerTypes = ["all", "customer", "supplier", "both"]
  const cities = ["İstanbul", "Ankara", "İzmir", "Bursa", "Antalya", "Adana", "Konya", "Gaziantep"]

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.taxNumber.includes(searchTerm)
    const matchesType = selectedType === "all" || customer.type === selectedType
    return matchesSearch && matchesType
  })

  const totalCustomers = customers.filter((c) => c.type === "customer" || c.type === "both").length
  const totalSuppliers = customers.filter((c) => c.type === "supplier" || c.type === "both").length
  const totalReceivables = customers.reduce((sum, c) => sum + (c.balance < 0 ? Math.abs(c.balance) : 0), 0)
  const totalPayables = customers.reduce((sum, c) => sum + (c.balance > 0 ? c.balance : 0), 0)

  const handleAddCustomer = () => {
    if (newCustomer.name && newCustomer.code) {
      const customer: Customer = {
        ...(newCustomer as Customer),
        id: Date.now().toString(),
        lastTransaction: new Date().toISOString().split("T")[0],
        totalTransactions: 0,
      }
      setCustomers([...customers, customer])
      resetForm()
      setIsAddDialogOpen(false)
    }
  }

  const handleEditCustomer = (customer: Customer) => {
    setEditingCustomer(customer)
    setNewCustomer(customer)
    setIsAddDialogOpen(true)
  }

  const handleUpdateCustomer = () => {
    if (editingCustomer && newCustomer.name && newCustomer.code) {
      const updatedCustomers = customers.map((c) =>
        c.id === editingCustomer.id
          ? {
              ...(newCustomer as Customer),
              id: editingCustomer.id,
              lastTransaction: editingCustomer.lastTransaction,
              totalTransactions: editingCustomer.totalTransactions,
            }
          : c,
      )
      setCustomers(updatedCustomers)
      setEditingCustomer(null)
      resetForm()
      setIsAddDialogOpen(false)
    }
  }

  const handleDeleteCustomer = (id: string) => {
    setCustomers(customers.filter((c) => c.id !== id))
  }

  const resetForm = () => {
    setNewCustomer({
      code: "",
      name: "",
      type: "customer",
      taxNumber: "",
      phone: "",
      email: "",
      address: "",
      city: "",
      country: "Türkiye",
      creditLimit: 0,
      balance: 0,
      paymentTerm: 30,
      contactPerson: "",
      status: "active",
    })
  }

  const translations = {
    tr: {
      
      backToHome: "Ana Sayfa",
      customerManagement: "Cari Yönetimi",
      customerSupplierCards: "Müşteri ve tedarikçi kartları",
      newCustomer: "Yeni Cari",

      editCustomer: "Cari Düzenle",
      addNewCustomer: "Yeni Cari Ekle",
      fillCustomerInfo: "Müşteri veya tedarikçi bilgilerini doldurun.",

      generalInfo: "Genel Bilgiler",
      contact: "İletişim",
      financialInfo: "Mali Bilgiler",

      
      customerCode: "Cari Kodu",
      customerType: "Cari Tipi",
      customer: "Müşteri",
      supplier: "Tedarikçi",
      customerSupplier: "Müşteri/Tedarikçi",
      companyPersonName: "Firma/Kişi Adı",
      taxTcNumber: "Vergi/TC No",
      authorizedPerson: "Yetkili Kişi",
      phone: "Telefon",
      email: "E-posta",
      address: "Adres",
      city: "Şehir",
      country: "Ülke",
      creditLimit: "Kredi Limiti (₺)",
      paymentTerm: "Ödeme Vadesi (Gün)",
      balance: "Bakiye (₺)",
      status: "Durum",
      active: "Aktif",
      inactive: "Pasif",

      
      totalCustomers: "Toplam Müşteri",
      totalSuppliers: "Toplam Tedarikçi",
      totalReceivables: "Toplam Alacak",
      totalPayables: "Toplam Borç",
      activeCustomerCount: "Aktif müşteri sayısı",
      activeSupplierCount: "Aktif tedarikçi sayısı",
      customerReceivables: "Müşteri alacakları",
      supplierPayables: "Tedarikçi borçları",

      
      searchPlaceholder: "Firma adı, kodu veya vergi numarası ile ara...",
      allCustomers: "Tüm Cariler",
      customers: "Müşteriler",
      suppliers: "Tedarikçiler",

      
      customerList: "Cari Listesi",
      showingCustomers: "cari gösteriliyor",
      code: "Kod",
      companyPerson: "Firma/Kişi",
      type: "Tip",
      actions: "İşlemler",

      
      cancel: "İptal",
      save: "Kaydet",
      update: "Güncelle",

      
      codeExample: "Örn: C001",
      enterCompanyName: "Firma veya kişi adını girin",
      taxNumber: "Vergi numarası",
      authorizedPersonName: "Yetkili kişi adı",
      phoneExample: "+90 212 555 0101",
      emailExample: "info@firma.com",
      fullAddress: "Tam adres bilgisi",
      selectCity: "Şehir seçin",
      balanceNote: "Pozitif: Borç, Negatif: Alacak",
    },
    en: {
      
      backToHome: "Home",
      customerManagement: "Customer Management",
      customerSupplierCards: "Customer and supplier cards",
      newCustomer: "New Customer",

      
      editCustomer: "Edit Customer",
      addNewCustomer: "Add New Customer",
      fillCustomerInfo: "Fill in customer or supplier information.",

      
      generalInfo: "General Information",
      contact: "Contact",
      financialInfo: "Financial Information",

      
      customerCode: "Customer Code",
      customerType: "Customer Type",
      customer: "Customer",
      supplier: "Supplier",
      customerSupplier: "Customer/Supplier",
      companyPersonName: "Company/Person Name",
      taxTcNumber: "Tax/ID Number",
      authorizedPerson: "Authorized Person",
      phone: "Phone",
      email: "Email",
      address: "Address",
      city: "City",
      country: "Country",
      creditLimit: "Credit Limit (₺)",
      paymentTerm: "Payment Term (Days)",
      balance: "Balance (₺)",
      status: "Status",
      active: "Active",
      inactive: "Inactive",

      
      totalCustomers: "Total Customers",
      totalSuppliers: "Total Suppliers",
      totalReceivables: "Total Receivables",
      totalPayables: "Total Payables",
      activeCustomerCount: "Active customer count",
      activeSupplierCount: "Active supplier count",
      customerReceivables: "Customer receivables",
      supplierPayables: "Supplier payables",

      
      searchPlaceholder: "Search by company name, code or tax number...",
      allCustomers: "All Customers",
      customers: "Customers",
      suppliers: "Suppliers",

      
      customerList: "Customer List",
      showingCustomers: "customers showing",
      code: "Code",
      companyPerson: "Company/Person",
      type: "Type",
      actions: "Actions",

      
      cancel: "Cancel",
      save: "Save",
      update: "Update",

      
      codeExample: "Ex: C001",
      enterCompanyName: "Enter company or person name",
      taxNumber: "Tax number",
      authorizedPersonName: "Authorized person name",
      phoneExample: "+90 212 555 0101",
      emailExample: "info@company.com",
      fullAddress: "Full address information",
      selectCity: "Select city",
      balanceNote: "Positive: Debt, Negative: Receivable",
    },
  }

  const t = (key: keyof typeof translations.tr) => translations[language][key]

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "customer":
        return t("customer")
      case "supplier":
        return t("supplier")
      case "both":
        return t("customerSupplier")
      default:
        return type
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "customer":
        return "bg-blue-500"
      case "supplier":
        return "bg-green-500"
      case "both":
        return "bg-purple-500"
      default:
        return "bg-gray-500"
    }
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
                <h1 className="text-2xl font-bold text-foreground">{t("customerManagement")}</h1>
                <p className="text-muted-foreground">{t("customerSupplierCards")}</p>
              </div>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  onClick={() => {
                    setEditingCustomer(null)
                    resetForm()
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  {t("newCustomer")}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{editingCustomer ? t("editCustomer") : t("addNewCustomer")}</DialogTitle>
                  <DialogDescription>{t("fillCustomerInfo")}</DialogDescription>
                </DialogHeader>
                <Tabs defaultValue="general" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="general">{t("generalInfo")}</TabsTrigger>
                    <TabsTrigger value="contact">{t("contact")}</TabsTrigger>
                    <TabsTrigger value="financial">{t("financialInfo")}</TabsTrigger>
                  </TabsList>
                  <TabsContent value="general" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="code">{t("customerCode")}</Label>
                        <Input
                          id="code"
                          value={newCustomer.code}
                          onChange={(e) => setNewCustomer({ ...newCustomer, code: e.target.value })}
                          placeholder={t("codeExample")}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="type">{t("customerType")}</Label>
                        <Select
                          value={newCustomer.type}
                          onValueChange={(value: any) => setNewCustomer({ ...newCustomer, type: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="customer">{t("customer")}</SelectItem>
                            <SelectItem value="supplier">{t("supplier")}</SelectItem>
                            <SelectItem value="both">{t("customerSupplier")}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2 col-span-2">
                        <Label htmlFor="name">{t("companyPersonName")}</Label>
                        <Input
                          id="name"
                          value={newCustomer.name}
                          onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                          placeholder={t("enterCompanyName")}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="taxNumber">{t("taxTcNumber")}</Label>
                        <Input
                          id="taxNumber"
                          value={newCustomer.taxNumber}
                          onChange={(e) => setNewCustomer({ ...newCustomer, taxNumber: e.target.value })}
                          placeholder={t("taxNumber")}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contactPerson">{t("authorizedPerson")}</Label>
                        <Input
                          id="contactPerson"
                          value={newCustomer.contactPerson}
                          onChange={(e) => setNewCustomer({ ...newCustomer, contactPerson: e.target.value })}
                          placeholder={t("authorizedPersonName")}
                        />
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="contact" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">{t("phone")}</Label>
                        <Input
                          id="phone"
                          value={newCustomer.phone}
                          onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                          placeholder={t("phoneExample")}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">{t("email")}</Label>
                        <Input
                          id="email"
                          type="email"
                          value={newCustomer.email}
                          onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                          placeholder={t("emailExample")}
                        />
                      </div>
                      <div className="space-y-2 col-span-2">
                        <Label htmlFor="address">{t("address")}</Label>
                        <Textarea
                          id="address"
                          value={newCustomer.address}
                          onChange={(e) => setNewCustomer({ ...newCustomer, address: e.target.value })}
                          placeholder={t("fullAddress")}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="city">{t("city")}</Label>
                        <Select
                          value={newCustomer.city}
                          onValueChange={(value) => setNewCustomer({ ...newCustomer, city: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder={t("selectCity")} />
                          </SelectTrigger>
                          <SelectContent>
                            {cities.map((city) => (
                              <SelectItem key={city} value={city}>
                                {city}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country">{t("country")}</Label>
                        <Input
                          id="country"
                          value={newCustomer.country}
                          onChange={(e) => setNewCustomer({ ...newCustomer, country: e.target.value })}
                        />
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="financial" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="creditLimit">{t("creditLimit")}</Label>
                        <Input
                          id="creditLimit"
                          type="number"
                          value={newCustomer.creditLimit}
                          onChange={(e) =>
                            setNewCustomer({ ...newCustomer, creditLimit: Number.parseFloat(e.target.value) || 0 })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="paymentTerm">{t("paymentTerm")}</Label>
                        <Input
                          id="paymentTerm"
                          type="number"
                          value={newCustomer.paymentTerm}
                          onChange={(e) =>
                            setNewCustomer({ ...newCustomer, paymentTerm: Number.parseInt(e.target.value) || 0 })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="balance">{t("balance")}</Label>
                        <Input
                          id="balance"
                          type="number"
                          value={newCustomer.balance}
                          onChange={(e) =>
                            setNewCustomer({ ...newCustomer, balance: Number.parseFloat(e.target.value) || 0 })
                          }
                          placeholder={t("balanceNote")}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="status">{t("status")}</Label>
                        <Select
                          value={newCustomer.status}
                          onValueChange={(value: any) => setNewCustomer({ ...newCustomer, status: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">{t("active")}</SelectItem>
                            <SelectItem value="inactive">{t("inactive")}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
                <div className="flex justify-end gap-2 mt-6">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    {t("cancel")}
                  </Button>
                  <Button onClick={editingCustomer ? handleUpdateCustomer : handleAddCustomer}>
                    {editingCustomer ? t("update") : t("save")}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Users className="h-4 w-4" />
                {t("totalCustomers")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{totalCustomers}</div>
              <p className="text-xs text-muted-foreground">{t("activeCustomerCount")}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                {t("totalSuppliers")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{totalSuppliers}</div>
              <p className="text-xs text-muted-foreground">{t("activeSupplierCount")}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                {t("totalReceivables")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">₺{totalReceivables.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">{t("customerReceivables")}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                {t("totalPayables")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">₺{totalPayables.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">{t("supplierPayables")}</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
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
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-full md:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("allCustomers")}</SelectItem>
                  <SelectItem value="customer">{t("customers")}</SelectItem>
                  <SelectItem value="supplier">{t("suppliers")}</SelectItem>
                  <SelectItem value="both">{t("customerSupplier")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Customers Table */}
        <Card>
          <CardHeader>
            <CardTitle>{t("customerList")}</CardTitle>
            <CardDescription>
              {filteredCustomers.length} {t("showingCustomers")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("code")}</TableHead>
                  <TableHead>{t("companyPerson")}</TableHead>
                  <TableHead>{t("type")}</TableHead>
                  <TableHead>{t("phone")}</TableHead>
                  <TableHead>{t("city")}</TableHead>
                  <TableHead>{t("balance")}</TableHead>
                  <TableHead>{t("creditLimit")}</TableHead>
                  <TableHead>{t("status")}</TableHead>
                  <TableHead>{t("actions")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell className="font-medium">{customer.code}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{customer.name}</p>
                        <p className="text-xs text-muted-foreground">{customer.contactPerson}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getTypeColor(customer.type)} text-white`}>
                        {getTypeLabel(customer.type)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {customer.phone}
                      </div>
                    </TableCell>
                    <TableCell>{customer.city}</TableCell>
                    <TableCell>
                      <span
                        className={
                          customer.balance < 0
                            ? "text-green-600 font-medium"
                            : customer.balance > 0
                              ? "text-red-600 font-medium"
                              : ""
                        }
                      >
                        ₺{Math.abs(customer.balance).toLocaleString()}
                        {customer.balance < 0 && " (A)"}
                        {customer.balance > 0 && " (B)"}
                      </span>
                    </TableCell>
                    <TableCell>₺{customer.creditLimit.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant={customer.status === "active" ? "default" : "secondary"}>
                        {customer.status === "active" ? t("active") : t("inactive")}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEditCustomer(customer)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteCustomer(customer.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
