"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Plus, Search, CreditCard, Banknote, Receipt } from "lucide-react"

interface RetailManagementProps {
  onBack: () => void
  language: "tr" | "en" // Added language prop
}

const translations = {
  tr: {
    back: "Geri",
    title: "Perakende Satış",
    subtitle: "Mağaza satış işlemleri",
    pointOfSale: "Satış Noktası",
    dailySales: "Günlük Satışlar",
    reports: "Raporlar",
    productSearch: "Ürün Arama",
    searchPlaceholder: "Ürün adı veya barkod...",
    pieces: "adet",
    barcode: "Barkod",
    addToCart: "Sepete Ekle",
    cart: "Sepet",
    products: "ürün",
    emptyCart: "Sepet boş",
    total: "Toplam",
    creditCard: "Kredi Kartı",
    cash: "Nakit",
    dailySalesAmount: "Günlük Satış",
    salesCount: "Satış Adedi",
    averageBasket: "Ortalama Sepet",
    cashCard: "Nakit/Kart",
    yesterday: "+12.5% dün",
    transactions: "15 işlem",
    perTransaction: "İşlem başına",
    paymentRatio: "Ödeme oranı",
    todaysSales: "Bugünkü Satışlar",
    dailyTransactions: "Günlük satış işlemleri",
    sale: "Satış",
    weeklySalesTrend: "Haftalık Satış Trendi",
    last7Days: "Son 7 günün satış performansı",
    topSellingProducts: "En Çok Satan Ürünler",
    popularProducts: "Bu ayki en popüler ürünler",
    monday: "Pazartesi",
    tuesday: "Salı",
    wednesday: "Çarşamba",
    thursday: "Perşembe",
    friday: "Cuma",
    saturday: "Cumartesi",
    sunday: "Pazar",
  },
  en: {
    back: "Back",
    title: "Retail Sales",
    subtitle: "Store sales operations",
    pointOfSale: "Point of Sale",
    dailySales: "Daily Sales",
    reports: "Reports",
    productSearch: "Product Search",
    searchPlaceholder: "Product name or barcode...",
    pieces: "pcs",
    barcode: "Barcode",
    addToCart: "Add to Cart",
    cart: "Cart",
    products: "products",
    emptyCart: "Cart is empty",
    total: "Total",
    creditCard: "Credit Card",
    cash: "Cash",
    dailySalesAmount: "Daily Sales",
    salesCount: "Sales Count",
    averageBasket: "Average Basket",
    cashCard: "Cash/Card",
    yesterday: "+12.5% yesterday",
    transactions: "15 transactions",
    perTransaction: "Per transaction",
    paymentRatio: "Payment ratio",
    todaysSales: "Today's Sales",
    dailyTransactions: "Daily sales transactions",
    sale: "Sale",
    weeklySalesTrend: "Weekly Sales Trend",
    last7Days: "Last 7 days sales performance",
    topSellingProducts: "Top Selling Products",
    popularProducts: "This month's most popular products",
    monday: "Monday",
    tuesday: "Tuesday",
    wednesday: "Wednesday",
    thursday: "Thursday",
    friday: "Friday",
    saturday: "Saturday",
    sunday: "Sunday",
  },
}

export function RetailManagement({ onBack, language }: RetailManagementProps) {
  const [activeTab, setActiveTab] = useState("pos")
  const [cart, setCart] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  const t = translations[language] // Added translation helper

  const products = [
    { id: 1, name: "Laptop Dell XPS", price: 25000, stock: 15, barcode: "1234567890" },
    { id: 2, name: "iPhone 15 Pro", price: 45000, stock: 8, barcode: "2345678901" },
    { id: 3, name: "Samsung Galaxy S24", price: 35000, stock: 12, barcode: "3456789012" },
    { id: 4, name: "MacBook Air M3", price: 55000, stock: 6, barcode: "4567890123" },
    { id: 5, name: "iPad Pro", price: 30000, stock: 10, barcode: "5678901234" },
  ]

  const todaySales = [
    { id: 1, time: "14:30", items: 3, total: "₺2,450", payment: language === "tr" ? "Kredi Kartı" : "Credit Card" },
    { id: 2, time: "14:15", items: 1, total: "₺850", payment: language === "tr" ? "Nakit" : "Cash" },
    { id: 3, time: "13:45", items: 2, total: "₺1,200", payment: language === "tr" ? "Kredi Kartı" : "Credit Card" },
    { id: 4, time: "13:20", items: 1, total: "₺450", payment: language === "tr" ? "Nakit" : "Cash" },
    { id: 5, time: "12:55", items: 4, total: "₺3,200", payment: language === "tr" ? "Kredi Kartı" : "Credit Card" },
  ]

  const addToCart = (product: any) => {
    const existingItem = cart.find((item) => item.id === product.id)
    if (existingItem) {
      setCart(cart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)))
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
  }

  const removeFromCart = (productId: number) => {
    setCart(cart.filter((item) => item.id !== productId))
  }

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
    } else {
      setCart(cart.map((item) => (item.id === productId ? { ...item, quantity } : item)))
    }
  }

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
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
            <TabsTrigger value="pos">{t.pointOfSale}</TabsTrigger>
            <TabsTrigger value="sales">{t.dailySales}</TabsTrigger>
            <TabsTrigger value="reports">{t.reports}</TabsTrigger>
          </TabsList>

          <TabsContent value="pos" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{t.productSearch}</CardTitle>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        placeholder={t.searchPlaceholder}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {products
                        .filter(
                          (product) =>
                            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            product.barcode.includes(searchTerm),
                        )
                        .map((product) => (
                          <div key={product.id} className="p-4 border border-border rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-medium">{product.name}</h3>
                              <Badge variant="secondary">
                                {product.stock} {t.pieces}
                              </Badge>
                            </div>
                            <p className="text-2xl font-bold text-foreground mb-2">₺{product.price.toLocaleString()}</p>
                            <p className="text-sm text-muted-foreground mb-3">
                              {t.barcode}: {product.barcode}
                            </p>
                            <Button
                              onClick={() => addToCart(product)}
                              className="w-full"
                              disabled={product.stock === 0}
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              {t.addToCart}
                            </Button>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {t.cart}
                      <Badge variant="secondary">
                        {cart.length} {t.products}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {cart.length === 0 ? (
                      <p className="text-muted-foreground text-center py-8">{t.emptyCart}</p>
                    ) : (
                      <div className="space-y-4">
                        {cart.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center justify-between p-3 border border-border rounded-lg"
                          >
                            <div>
                              <p className="font-medium">{item.name}</p>
                              <p className="text-sm text-muted-foreground">₺{item.price.toLocaleString()}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                -
                              </Button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                +
                              </Button>
                            </div>
                          </div>
                        ))}

                        <div className="border-t border-border pt-4">
                          <div className="flex items-center justify-between text-lg font-bold">
                            <span>{t.total}:</span>
                            <span>₺{getCartTotal().toLocaleString()}</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Button className="w-full" size="lg">
                            <CreditCard className="h-4 w-4 mr-2" />
                            {t.creditCard}
                          </Button>
                          <Button variant="outline" className="w-full bg-transparent" size="lg">
                            <Banknote className="h-4 w-4 mr-2" />
                            {t.cash}
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="sales" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{t.dailySalesAmount}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">₺8,450</div>
                  <p className="text-xs text-green-600">{t.yesterday}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{t.salesCount}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">234</div>
                  <p className="text-xs text-blue-600">{t.transactions}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{t.averageBasket}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">₺563</div>
                  <p className="text-xs text-muted-foreground">{t.perTransaction}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{t.cashCard}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">60/40</div>
                  <p className="text-xs text-muted-foreground">{t.paymentRatio}</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>{t.todaysSales}</CardTitle>
                <CardDescription>{t.dailyTransactions}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todaySales.map((sale) => (
                    <div
                      key={sale.id}
                      className="flex items-center justify-between p-4 border border-border rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <Receipt className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">
                            {t.sale} #{sale.id}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {sale.time} • {sale.items} {t.products}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">{sale.total}</p>
                        <Badge variant="secondary">{sale.payment}</Badge>
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
                  <CardTitle>{t.weeklySalesTrend}</CardTitle>
                  <CardDescription>{t.last7Days}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { day: t.monday, amount: "₺6,200" },
                      { day: t.tuesday, amount: "₺7,800" },
                      { day: t.wednesday, amount: "₺5,400" },
                      { day: t.thursday, amount: "₺8,900" },
                      { day: t.friday, amount: "₺12,300" },
                      { day: t.saturday, amount: "₺15,600" },
                      { day: t.sunday, amount: "₺8,450" },
                    ].map((day, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm">{day.day}</span>
                        <span className="font-medium">{day.amount}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t.topSellingProducts}</CardTitle>
                  <CardDescription>{t.popularProducts}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { product: "iPhone 15 Pro", sales: 45, revenue: "₺2,025,000" },
                      { product: "Samsung Galaxy S24", sales: 38, revenue: "₺1,330,000" },
                      { product: "MacBook Air M3", sales: 22, revenue: "₺1,210,000" },
                      { product: "iPad Pro", sales: 31, revenue: "₺930,000" },
                      { product: "Laptop Dell XPS", sales: 28, revenue: "₺700,000" },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{item.product}</p>
                          <p className="text-sm text-muted-foreground">
                            {item.sales} {t.pieces}
                          </p>
                        </div>
                        <span className="font-medium">{item.revenue}</span>
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
