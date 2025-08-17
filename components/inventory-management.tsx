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
import {
  ArrowLeft,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Package,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
} from "lucide-react"

interface Product {
  id: string
  code: string
  name: string
  category: string
  unit: string
  stock: number
  minStock: number
  buyPrice: number
  sellPrice: number
  supplier: string
  description: string
  status: "active" | "inactive"
  lastUpdated: string
}

interface InventoryManagementProps {
  onBack: () => void
  language: "tr" | "en" 
}

const translations = {
  tr: {
    title: "Stok Yönetimi",
    subtitle: "Ürün ve stok kartları",
    backButton: "Ana Sayfa",
    newProduct: "Yeni Ürün",
    editProduct: "Ürün Düzenle",
    addProduct: "Yeni Ürün Ekle",
    fillProductInfo: "Ürün bilgilerini doldurun ve kaydedin.",
    productCode: "Ürün Kodu",
    productName: "Ürün Adı",
    category: "Kategori",
    unit: "Birim",
    currentStock: "Mevcut Stok",
    minStock: "Minimum Stok",
    buyPrice: "Alış Fiyatı (₺)",
    sellPrice: "Satış Fiyatı (₺)",
    supplier: "Tedarikçi",
    description: "Açıklama",
    cancel: "İptal",
    save: "Kaydet",
    update: "Güncelle",
    totalProducts: "Toplam Ürün",
    lowStock: "Düşük Stok",
    stockValue: "Stok Değeri",
    categories: "Kategoriler",
    activeProducts: "Aktif ürün sayısı",
    minLevel: "Minimum seviyede",
    totalValue: "Toplam değer",
    differentCategories: "Farklı kategori",
    searchPlaceholder: "Ürün adı veya kodu ile ara...",
    allCategories: "Tüm Kategoriler",
    productList: "Ürün Listesi",
    showingProducts: "ürün gösteriliyor",
    code: "Kod",
    name: "Ürün Adı",
    stock: "Stok",
    status: "Durum",
    actions: "İşlemler",
    active: "Aktif",
    inactive: "Pasif",
  },
  en: {
    title: "Inventory Management",
    subtitle: "Product and stock cards",
    backButton: "Home",
    newProduct: "New Product",
    editProduct: "Edit Product",
    addProduct: "Add New Product",
    fillProductInfo: "Fill in product information and save.",
    productCode: "Product Code",
    productName: "Product Name",
    category: "Category",
    unit: "Unit",
    currentStock: "Current Stock",
    minStock: "Minimum Stock",
    buyPrice: "Buy Price (₺)",
    sellPrice: "Sell Price (₺)",
    supplier: "Supplier",
    description: "Description",
    cancel: "Cancel",
    save: "Save",
    update: "Update",
    totalProducts: "Total Products",
    lowStock: "Low Stock",
    stockValue: "Stock Value",
    categories: "Categories",
    activeProducts: "Active product count",
    minLevel: "At minimum level",
    totalValue: "Total value",
    differentCategories: "Different categories",
    searchPlaceholder: "Search by product name or code...",
    allCategories: "All Categories",
    productList: "Product List",
    showingProducts: "products showing",
    code: "Code",
    name: "Product Name",
    stock: "Stock",
    status: "Status",
    actions: "Actions",
    active: "Active",
    inactive: "Inactive",
  },
}

export function InventoryManagement({ onBack, language }: InventoryManagementProps) {
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      code: "LP001",
      name: "Dell XPS 13 Laptop",
      category: "Bilgisayar",
      unit: "Adet",
      stock: 15,
      minStock: 5,
      buyPrice: 8500,
      sellPrice: 12000,
      supplier: "Dell Türkiye",
      description: "13 inç ultrabook, Intel i7, 16GB RAM",
      status: "active",
      lastUpdated: "2024-01-15",
    },
    {
      id: "2",
      code: "MS001",
      name: "Logitech MX Master 3",
      category: "Aksesuar",
      unit: "Adet",
      stock: 3,
      minStock: 10,
      buyPrice: 450,
      sellPrice: 650,
      supplier: "Logitech",
      description: "Kablosuz ergonomik mouse",
      status: "active",
      lastUpdated: "2024-01-14",
    },
    {
      id: "3",
      code: "KB001",
      name: "Mechanical Keyboard",
      category: "Aksesuar",
      unit: "Adet",
      stock: 25,
      minStock: 8,
      buyPrice: 350,
      sellPrice: 550,
      supplier: "Keychron",
      description: "RGB mekanik klavye",
      status: "active",
      lastUpdated: "2024-01-13",
    },
  ])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    code: "",
    name: "",
    category: "",
    unit: "Adet",
    stock: 0,
    minStock: 0,
    buyPrice: 0,
    sellPrice: 0,
    supplier: "",
    description: "",
    status: "active",
  })

  const categories = ["all", "Bilgisayar", "Aksesuar", "Yazılım", "Donanım"]
  const units = ["Adet", "Kg", "Litre", "Metre", "Paket"]

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.code.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const lowStockProducts = products.filter((p) => p.stock <= p.minStock)
  const totalValue = products.reduce((sum, p) => sum + p.stock * p.buyPrice, 0)

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.code) {
      const product: Product = {
        ...(newProduct as Product),
        id: Date.now().toString(),
        lastUpdated: new Date().toISOString().split("T")[0],
      }
      setProducts([...products, product])
      setNewProduct({
        code: "",
        name: "",
        category: "",
        unit: "Adet",
        stock: 0,
        minStock: 0,
        buyPrice: 0,
        sellPrice: 0,
        supplier: "",
        description: "",
        status: "active",
      })
      setIsAddDialogOpen(false)
    }
  }

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product)
    setNewProduct(product)
    setIsAddDialogOpen(true)
  }

  const handleUpdateProduct = () => {
    if (editingProduct && newProduct.name && newProduct.code) {
      const updatedProducts = products.map((p) =>
        p.id === editingProduct.id
          ? { ...(newProduct as Product), id: editingProduct.id, lastUpdated: new Date().toISOString().split("T")[0] }
          : p,
      )
      setProducts(updatedProducts)
      setEditingProduct(null)
      setNewProduct({
        code: "",
        name: "",
        category: "",
        unit: "Adet",
        stock: 0,
        minStock: 0,
        buyPrice: 0,
        sellPrice: 0,
        supplier: "",
        description: "",
        status: "active",
      })
      setIsAddDialogOpen(false)
    }
  }

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id))
  }

  const t = translations[language] 

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t.backButton} {/* Using translation */}
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">{t.title}</h1>
                <p className="text-muted-foreground">{t.subtitle}</p>
              </div>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  onClick={() => {
                    setEditingProduct(null)
                    setNewProduct({
                      code: "",
                      name: "",
                      category: "",
                      unit: "Adet",
                      stock: 0,
                      minStock: 0,
                      buyPrice: 0,
                      sellPrice: 0,
                      supplier: "",
                      description: "",
                      status: "active",
                    })
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  {t.newProduct}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>{editingProduct ? t.editProduct : t.addProduct}</DialogTitle>
                  <DialogDescription>{t.fillProductInfo}</DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="code">{t.productCode}</Label>
                    <Input
                      id="code"
                      value={newProduct.code}
                      onChange={(e) => setNewProduct({ ...newProduct, code: e.target.value })}
                      placeholder="Örn: LP001"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name">{t.productName}</Label>
                    <Input
                      id="name"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      placeholder="Ürün adını girin"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">{t.category}</Label>
                    <Select
                      value={newProduct.category}
                      onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t.category} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Bilgisayar">{t.category}</SelectItem>
                        <SelectItem value="Aksesuar">{t.category}</SelectItem>
                        <SelectItem value="Yazılım">{t.category}</SelectItem>
                        <SelectItem value="Donanım">{t.category}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="unit">{t.unit}</Label>
                    <Select
                      value={newProduct.unit}
                      onValueChange={(value) => setNewProduct({ ...newProduct, unit: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {units.map((unit) => (
                          <SelectItem key={unit} value={unit}>
                            {unit}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stock">{t.currentStock}</Label>
                    <Input
                      id="stock"
                      type="number"
                      value={newProduct.stock}
                      onChange={(e) => setNewProduct({ ...newProduct, stock: Number.parseInt(e.target.value) || 0 })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="minStock">{t.minStock}</Label>
                    <Input
                      id="minStock"
                      type="number"
                      value={newProduct.minStock}
                      onChange={(e) => setNewProduct({ ...newProduct, minStock: Number.parseInt(e.target.value) || 0 })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="buyPrice">{t.buyPrice}</Label>
                    <Input
                      id="buyPrice"
                      type="number"
                      value={newProduct.buyPrice}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, buyPrice: Number.parseFloat(e.target.value) || 0 })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sellPrice">{t.sellPrice}</Label>
                    <Input
                      id="sellPrice"
                      type="number"
                      value={newProduct.sellPrice}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, sellPrice: Number.parseFloat(e.target.value) || 0 })
                      }
                    />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="supplier">{t.supplier}</Label>
                    <Input
                      id="supplier"
                      value={newProduct.supplier}
                      onChange={(e) => setNewProduct({ ...newProduct, supplier: e.target.value })}
                      placeholder="Tedarikçi adı"
                    />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="description">{t.description}</Label>
                    <Textarea
                      id="description"
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                      placeholder="Ürün açıklaması"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    {t.cancel}
                  </Button>
                  <Button onClick={editingProduct ? handleUpdateProduct : handleAddProduct}>
                    {editingProduct ? t.update : t.save}
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
                <Package className="h-4 w-4" />
                {t.totalProducts}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{products.length}</div>
              <p className="text-xs text-muted-foreground">{t.activeProducts}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                {t.lowStock}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{lowStockProducts.length}</div>
              <p className="text-xs text-muted-foreground">{t.minLevel}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                {t.stockValue}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">₺{totalValue.toLocaleString()}</div>
              <p className="text-xs text-green-600">{t.totalValue}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <TrendingDown className="h-4 w-4" />
                {t.categories}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{categories.length - 1}</div>
              <p className="text-xs text-muted-foreground">{t.differentCategories}</p>
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
                    placeholder={t.searchPlaceholder}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t.allCategories}</SelectItem>
                  {categories.slice(1).map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Products Table */}
        <Card>
          <CardHeader>
            <CardTitle>{t.productList}</CardTitle>
            <CardDescription>
              {filteredProducts.length} {t.showingProducts}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t.code}</TableHead>
                  <TableHead>{t.name}</TableHead>
                  <TableHead>{t.category}</TableHead>
                  <TableHead>{t.stock}</TableHead>
                  <TableHead>{t.unit}</TableHead>
                  <TableHead>{t.buyPrice}</TableHead>
                  <TableHead>{t.sellPrice}</TableHead>
                  <TableHead>{t.status}</TableHead>
                  <TableHead>{t.actions}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.code}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{product.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className={product.stock <= product.minStock ? "text-orange-600 font-medium" : ""}>
                          {product.stock}
                        </span>
                        {product.stock <= product.minStock && <AlertTriangle className="h-4 w-4 text-orange-600" />}
                      </div>
                    </TableCell>
                    <TableCell>{product.unit}</TableCell>
                    <TableCell>₺{product.buyPrice.toLocaleString()}</TableCell>
                    <TableCell>₺{product.sellPrice.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant={product.status === "active" ? "default" : "secondary"}>
                        {product.status === "active" ? t.active : t.inactive}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEditProduct(product)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteProduct(product.id)}>
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
