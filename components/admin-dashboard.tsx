"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Users, Shield, Download, Upload, Trash2, Edit, Plus } from "lucide-react"

interface AdminDashboardProps {
  onBack: () => void
  language: "tr" | "en"
}

export function AdminDashboard({ onBack, language }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState("users")

  const translations = {
    tr: {
      // Header
      backToHome: "Ana Sayfa",
      systemManagement: "Sistem Yönetimi",
      systemDescription: "Kullanıcılar, ayarlar ve sistem konfigürasyonu",

      // Tabs
      users: "Kullanıcılar",
      roles: "Roller",
      settings: "Ayarlar",
      security: "Güvenlik",
      backup: "Yedekleme",

      // Users Management
      userManagement: "Kullanıcı Yönetimi",
      manageSystemUsers: "Sistem kullanıcılarını yönetin",
      newUser: "Yeni Kullanıcı",
      userList: "Kullanıcı Listesi",
      totalUsers: "Toplam",
      usersText: "kullanıcı",
      active: "Aktif",
      inactive: "Pasif",
      admin: "Admin",
      accounting: "Muhasebe",
      sales: "Satış",
      warehouse: "Depo",
      hoursAgo: "saat önce",
      dayAgo: "gün önce",
      weekAgo: "hafta önce",

      // Roles Management
      roleManagement: "Rol Yönetimi",
      manageUserRoles: "Kullanıcı rollerini ve izinlerini yönetin",
      user: "kullanıcı",
      permissions: "İzinler:",
      allPermissions: "Tüm İzinler",
      invoices: "Faturalar",
      reports: "Raporlar",
      cash: "Kasa",
      customers: "Müşteriler",
      orders: "Siparişler",
      stock: "Stok",
      logistics: "Lojistik",
      edit: "Düzenle",

      // System Settings
      systemSettings: "Sistem Ayarları",
      generalSystemConfig: "Genel sistem konfigürasyonu",
      generalSettings: "Genel Ayarlar",
      basicSystemConfig: "Temel sistem konfigürasyonu",
      companyName: "Şirket Adı",
      currency: "Para Birimi",
      turkishLira: "Türk Lirası (₺)",
      usDollar: "Amerikan Doları ($)",
      euro: "Euro (€)",
      timezone: "Saat Dilimi",
      istanbul: "İstanbul (UTC+3)",
      ankara: "Ankara (UTC+3)",
      systemFeatures: "Sistem Özellikleri",
      enableDisableFeatures: "Sistem özelliklerini etkinleştirin/devre dışı bırakın",
      autoBackup: "Otomatik Yedekleme",
      autoBackupDesc: "Günlük otomatik veri yedeklemesi",
      emailNotifications: "E-posta Bildirimleri",
      emailNotificationsDesc: "Sistem bildirimleri için e-posta gönderimi",
      twoFactorAuth: "İki Faktörlü Doğrulama",
      twoFactorAuthDesc: "Gelişmiş güvenlik için 2FA zorunluluğu",
      apiAccess: "API Erişimi",
      apiAccessDesc: "Harici uygulamalar için API erişimi",
      auditLog: "Denetim Günlüğü",
      auditLogDesc: "Tüm kullanıcı işlemlerini kaydet",

      // Security Settings
      securitySettings: "Güvenlik Ayarları",
      systemSecurityAccess: "Sistem güvenliği ve erişim kontrolü",
      passwordPolicy: "Şifre Politikası",
      userPasswordRequirements: "Kullanıcı şifre gereksinimleri",
      minPasswordLength: "Minimum Şifre Uzunluğu",
      uppercaseRequired: "Büyük harf zorunlu",
      numberRequired: "Sayı zorunlu",
      specialCharRequired: "Özel karakter zorunlu",
      sessionSettings: "Oturum Ayarları",
      userSessionManagement: "Kullanıcı oturum yönetimi",
      sessionTimeout: "Oturum Zaman Aşımı (dakika)",
      maxSessions: "Maksimum Eşzamanlı Oturum",
      logFailedAttempts: "Başarısız girişleri kaydet",

      // Backup Settings
      backupRestore: "Yedekleme ve Geri Yükleme",
      dataBackupSystemRestore: "Veri yedekleme ve sistem geri yükleme işlemleri",
      autoBackupSettings: "Otomatik Yedekleme",
      regularDataBackup: "Düzenli veri yedekleme ayarları",
      backupFrequency: "Yedekleme Sıklığı",
      hourly: "Saatlik",
      daily: "Günlük",
      weekly: "Haftalık",
      monthly: "Aylık",
      backupTime: "Yedekleme Saati",
      retentionPeriod: "Saklama Süresi (gün)",
      manualOperations: "Manuel İşlemler",
      instantBackupRestore: "Anlık yedekleme ve geri yükleme",
      backupNow: "Şimdi Yedekle",
      uploadBackup: "Yedek Yükle",
      recentBackups: "Son Yedeklemeler",
      daysAgo: "gün önce",
    },
    en: {
      // Header
      backToHome: "Home",
      systemManagement: "System Management",
      systemDescription: "Users, settings and system configuration",

      // Tabs
      users: "Users",
      roles: "Roles",
      settings: "Settings",
      security: "Security",
      backup: "Backup",

      // Users Management
      userManagement: "User Management",
      manageSystemUsers: "Manage system users",
      newUser: "New User",
      userList: "User List",
      totalUsers: "Total",
      usersText: "users",
      active: "Active",
      inactive: "Inactive",
      admin: "Admin",
      accounting: "Accounting",
      sales: "Sales",
      warehouse: "Warehouse",
      hoursAgo: "hours ago",
      dayAgo: "day ago",
      weekAgo: "week ago",

      // Roles Management
      roleManagement: "Role Management",
      manageUserRoles: "Manage user roles and permissions",
      user: "user",
      permissions: "Permissions:",
      allPermissions: "All Permissions",
      invoices: "Invoices",
      reports: "Reports",
      cash: "Cash",
      customers: "Customers",
      orders: "Orders",
      stock: "Stock",
      logistics: "Logistics",
      edit: "Edit",

      // System Settings
      systemSettings: "System Settings",
      generalSystemConfig: "General system configuration",
      generalSettings: "General Settings",
      basicSystemConfig: "Basic system configuration",
      companyName: "Company Name",
      currency: "Currency",
      turkishLira: "Turkish Lira (₺)",
      usDollar: "US Dollar ($)",
      euro: "Euro (€)",
      timezone: "Timezone",
      istanbul: "Istanbul (UTC+3)",
      ankara: "Ankara (UTC+3)",
      systemFeatures: "System Features",
      enableDisableFeatures: "Enable/disable system features",
      autoBackup: "Auto Backup",
      autoBackupDesc: "Daily automatic data backup",
      emailNotifications: "Email Notifications",
      emailNotificationsDesc: "Email sending for system notifications",
      twoFactorAuth: "Two-Factor Authentication",
      twoFactorAuthDesc: "2FA requirement for enhanced security",
      apiAccess: "API Access",
      apiAccessDesc: "API access for external applications",
      auditLog: "Audit Log",
      auditLogDesc: "Record all user operations",

      // Security Settings
      securitySettings: "Security Settings",
      systemSecurityAccess: "System security and access control",
      passwordPolicy: "Password Policy",
      userPasswordRequirements: "User password requirements",
      minPasswordLength: "Minimum Password Length",
      uppercaseRequired: "Uppercase required",
      numberRequired: "Number required",
      specialCharRequired: "Special character required",
      sessionSettings: "Session Settings",
      userSessionManagement: "User session management",
      sessionTimeout: "Session Timeout (minutes)",
      maxSessions: "Maximum Concurrent Sessions",
      logFailedAttempts: "Log failed attempts",

      // Backup Settings
      backupRestore: "Backup and Restore",
      dataBackupSystemRestore: "Data backup and system restore operations",
      autoBackupSettings: "Auto Backup",
      regularDataBackup: "Regular data backup settings",
      backupFrequency: "Backup Frequency",
      hourly: "Hourly",
      daily: "Daily",
      weekly: "Weekly",
      monthly: "Monthly",
      backupTime: "Backup Time",
      retentionPeriod: "Retention Period (days)",
      manualOperations: "Manual Operations",
      instantBackupRestore: "Instant backup and restore",
      backupNow: "Backup Now",
      uploadBackup: "Upload Backup",
      recentBackups: "Recent Backups",
      daysAgo: "days ago",
    },
  }

  const t = (key: string) => translations[language][key as keyof (typeof translations)[typeof language]] || key

  const users = [
    {
      id: 1,
      name: "Ahmet Yılmaz",
      email: "ahmet@sirket.com",
      role: t("admin"),
      status: t("active"),
      lastLogin: `2 ${t("hoursAgo")}`,
    },
    {
      id: 2,
      name: "Fatma Demir",
      email: "fatma@sirket.com",
      role: t("accounting"),
      status: t("active"),
      lastLogin: `1 ${t("dayAgo")}`,
    },
    {
      id: 3,
      name: "Mehmet Kaya",
      email: "mehmet@sirket.com",
      role: t("sales"),
      status: t("active"),
      lastLogin: `3 ${t("hoursAgo")}`,
    },
    {
      id: 4,
      name: "Ayşe Öz",
      email: "ayse@sirket.com",
      role: t("warehouse"),
      status: t("inactive"),
      lastLogin: `1 ${t("weekAgo")}`,
    },
  ]

  const systemSettings = [
    { key: "autoBackup", label: t("autoBackup"), description: t("autoBackupDesc"), enabled: true },
    {
      key: "emailNotifications",
      label: t("emailNotifications"),
      description: t("emailNotificationsDesc"),
      enabled: true,
    },
    {
      key: "twoFactorAuth",
      label: t("twoFactorAuth"),
      description: t("twoFactorAuthDesc"),
      enabled: false,
    },
    { key: "apiAccess", label: t("apiAccess"), description: t("apiAccessDesc"), enabled: true },
    { key: "auditLog", label: t("auditLog"), description: t("auditLogDesc"), enabled: true },
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
              <h1 className="text-2xl font-bold text-foreground">{t("systemManagement")}</h1>
              <p className="text-muted-foreground">{t("systemDescription")}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="users">{t("users")}</TabsTrigger>
            <TabsTrigger value="roles">{t("roles")}</TabsTrigger>
            <TabsTrigger value="settings">{t("settings")}</TabsTrigger>
            <TabsTrigger value="security">{t("security")}</TabsTrigger>
            <TabsTrigger value="backup">{t("backup")}</TabsTrigger>
          </TabsList>

          {/* Users Management */}
          <TabsContent value="users" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">{t("userManagement")}</h2>
                <p className="text-muted-foreground">{t("manageSystemUsers")}</p>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                {t("newUser")}
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>{t("userList")}</CardTitle>
                <CardDescription>
                  {t("totalUsers")} {users.length} {t("usersText")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-4 border border-border rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <Users className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">{user.name}</h3>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant={user.status === t("active") ? "default" : "secondary"}>{user.status}</Badge>
                        <Badge variant="outline">{user.role}</Badge>
                        <span className="text-sm text-muted-foreground">{user.lastLogin}</span>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Roles Management */}
          <TabsContent value="roles" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold">{t("roleManagement")}</h2>
              <p className="text-muted-foreground">{t("manageUserRoles")}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { name: t("admin"), users: 1, permissions: [t("allPermissions")], color: "bg-red-500" },
                {
                  name: t("accounting"),
                  users: 1,
                  permissions: [t("invoices"), t("reports"), t("cash")],
                  color: "bg-blue-500",
                },
                {
                  name: t("sales"),
                  users: 1,
                  permissions: [t("customers"), t("orders"), t("stock")],
                  color: "bg-green-500",
                },
                { name: t("warehouse"), users: 1, permissions: [t("stock"), t("logistics")], color: "bg-orange-500" },
              ].map((role) => (
                <Card key={role.name}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${role.color} text-white`}>
                        <Shield className="h-5 w-5" />
                      </div>
                      <div>
                        <CardTitle>{role.name}</CardTitle>
                        <CardDescription>
                          {role.users} {t("user")}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">{t("permissions")}</Label>
                      <div className="flex flex-wrap gap-2">
                        {role.permissions.map((permission) => (
                          <Badge key={permission} variant="secondary" className="text-xs">
                            {permission}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-4 bg-transparent">
                      {t("edit")}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* System Settings */}
          <TabsContent value="settings" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold">{t("systemSettings")}</h2>
              <p className="text-muted-foreground">{t("generalSystemConfig")}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t("generalSettings")}</CardTitle>
                  <CardDescription>{t("basicSystemConfig")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">{t("companyName")}</Label>
                    <Input id="companyName" defaultValue="ABC Ticaret Ltd. Şti." />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency">{t("currency")}</Label>
                    <Select defaultValue="try">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="try">{t("turkishLira")}</SelectItem>
                        <SelectItem value="usd">{t("usDollar")}</SelectItem>
                        <SelectItem value="eur">{t("euro")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">{t("timezone")}</Label>
                    <Select defaultValue="istanbul">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="istanbul">{t("istanbul")}</SelectItem>
                        <SelectItem value="ankara">{t("ankara")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t("systemFeatures")}</CardTitle>
                  <CardDescription>{t("enableDisableFeatures")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {systemSettings.map((setting) => (
                    <div key={setting.key} className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label className="text-sm font-medium">{setting.label}</Label>
                        <p className="text-xs text-muted-foreground">{setting.description}</p>
                      </div>
                      <Switch defaultChecked={setting.enabled} />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold">{t("securitySettings")}</h2>
              <p className="text-muted-foreground">{t("systemSecurityAccess")}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t("passwordPolicy")}</CardTitle>
                  <CardDescription>{t("userPasswordRequirements")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="minLength">{t("minPasswordLength")}</Label>
                    <Input id="minLength" type="number" defaultValue="8" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">{t("uppercaseRequired")}</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">{t("numberRequired")}</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">{t("specialCharRequired")}</Label>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t("sessionSettings")}</CardTitle>
                  <CardDescription>{t("userSessionManagement")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="sessionTimeout">{t("sessionTimeout")}</Label>
                    <Input id="sessionTimeout" type="number" defaultValue="60" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxSessions">{t("maxSessions")}</Label>
                    <Input id="maxSessions" type="number" defaultValue="3" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">{t("logFailedAttempts")}</Label>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Backup Settings */}
          <TabsContent value="backup" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold">{t("backupRestore")}</h2>
              <p className="text-muted-foreground">{t("dataBackupSystemRestore")}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t("autoBackupSettings")}</CardTitle>
                  <CardDescription>{t("regularDataBackup")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="backupFreq">{t("backupFrequency")}</Label>
                    <Select defaultValue="daily">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">{t("hourly")}</SelectItem>
                        <SelectItem value="daily">{t("daily")}</SelectItem>
                        <SelectItem value="weekly">{t("weekly")}</SelectItem>
                        <SelectItem value="monthly">{t("monthly")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="backupTime">{t("backupTime")}</Label>
                    <Input id="backupTime" type="time" defaultValue="02:00" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="retention">{t("retentionPeriod")}</Label>
                    <Input id="retention" type="number" defaultValue="30" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t("manualOperations")}</CardTitle>
                  <CardDescription>{t("instantBackupRestore")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    {t("backupNow")}
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Upload className="h-4 w-4 mr-2" />
                    {t("uploadBackup")}
                  </Button>
                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-2">{t("recentBackups")}</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>backup_2024_01_15.sql</span>
                        <span className="text-muted-foreground">2 {t("daysAgo")}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>backup_2024_01_14.sql</span>
                        <span className="text-muted-foreground">3 {t("daysAgo")}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>backup_2024_01_13.sql</span>
                        <span className="text-muted-foreground">4 {t("daysAgo")}</span>
                      </div>
                    </div>
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
