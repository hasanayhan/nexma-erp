# 🤝 **Katkıda Bulunma Rehberi** / **Contributing Guidelines**

Bu projeye katkıda bulunmak istediğiniz için teşekkür ederiz! / Thank you for your interest in contributing to this project!

## 📋 **İçindekiler** / **Table of Contents**

- [Kod Yazma Kuralları](#kod-yazma-kuralları)
- [Geliştirme Süreci](#geliştirme-süreci)
- [Pull Request Süreci](#pull-request-süreci)
- [Raporlama](#raporlama)

## 🎯 **Kod Yazma Kuralları** / **Code Writing Rules**

### **TypeScript Standartları**
- **Strict Mode** kullanın / Use **Strict Mode**
- **Interface** tanımlarını ekleyin / Add **Interface** definitions
- **Type annotations** kullanın / Use **Type annotations**
- **Generic types** ile esneklik sağlayın / Provide flexibility with **Generic types**

### **React Best Practices**
- **Functional Components** kullanın / Use **Functional Components**
- **Hooks** ile state yönetimi / State management with **Hooks**
- **Props interface** tanımlayın / Define **Props interface**
- **Error boundaries** ekleyin / Add **Error boundaries**

### **CSS & Styling**
- **Tailwind CSS** utility classes kullanın / Use **Tailwind CSS** utility classes
- **CSS variables** ile tema desteği / Theme support with **CSS variables**
- **Responsive design** prensiplerini uygulayın / Apply **Responsive design** principles
- **Accessibility** standartlarına uyun / Follow **Accessibility** standards

## 🚀 **Geliştirme Süreci** / **Development Process**

### **1. Repository'yi Fork Edin**
```bash
# GitHub'da Fork butonuna tıklayın
# Sonra local'e klonlayın
git clone https://github.com/YOUR_USERNAME/nexma-erp.git
cd nexma-erp
```

### **2. Development Branch Oluşturun**
```bash
# Ana branch'i güncelleyin
git checkout main
git pull origin main

# Feature branch oluşturun
git checkout -b feature/amazing-feature
```

### **3. Geliştirme Yapın**
```bash
# Bağımlılıkları yükleyin
pnpm install

# Geliştirme sunucusunu başlatın
pnpm dev

# Kod formatını kontrol edin
pnpm lint
pnpm format
```

### **4. Commit Yapın**
```bash
# Değişiklikleri ekleyin
git add .

# Conventional commit formatında commit yapın
git commit -m "feat: add new inventory module"
git commit -m "fix: resolve customer search bug"
git commit -m "docs: update README with new features"
```

## 🔄 **Pull Request Süreci** / **Pull Request Process**

### **PR Açmadan Önce**
- [ ] **Tests** yazıldı / **Tests** written
- [ ] **Documentation** güncellendi / **Documentation** updated
- [ ] **Code review** yapıldı / **Code review** completed
- [ ] **Linting** hatası yok / No **Linting** errors

### **PR Template**
```markdown
## 📝 **Değişiklik Açıklaması** / **Change Description**

### **Ne yapıldı?** / **What was done?**
- Açıklama / Description

### **Test Edildi mi?** / **Was it tested?**
- [ ] Evet / Yes
- [ ] Hayır / No

### **Screenshots** (gerekirse / if needed)
![Screenshot](link)

### **Checklist**
- [ ] Kod standartlarına uygun / Follows code standards
- [ ] TypeScript tip güvenliği / TypeScript type safety
- [ ] Responsive tasarım / Responsive design
- [ ] Accessibility standartları / Accessibility standards
```

## 🐛 **Raporlama** / **Reporting**

### **Bug Report Template**
```markdown
## 🐛 **Bug Raporu** / **Bug Report**

### **Açıklama** / **Description**
Bug'ın ne olduğunu açıklayın / Describe what the bug is

### **Tekrar Üretme** / **Reproduction**
1. Adım 1 / Step 1
2. Adım 2 / Step 2
3. Adım 3 / Step 3

### **Beklenen Davranış** / **Expected Behavior**
Ne olması gerekiyordu? / What should have happened?

### **Gerçek Davranış** / **Actual Behavior**
Ne oldu? / What happened?

### **Screenshots**
![Screenshot](link)

### **Environment**
- OS: Windows 10
- Browser: Chrome 120
- Version: v2.1.0
```

### **Feature Request Template**
```markdown
## ✨ **Özellik İsteği** / **Feature Request**

### **Problem** / **Problem**
Hangi problemi çözmek istiyorsunuz? / What problem are you trying to solve?

### **Solution** / **Solution**
Önerdiğiniz çözüm nedir? / What is your proposed solution?

### **Alternatives** / **Alternatives**
Başka alternatifler düşündünüz mü? / Have you considered alternatives?

### **Additional Context** / **Additional Context**
Ek bilgi ekleyin / Add any other context
```

## 📚 **Yararlı Linkler** / **Useful Links**

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Shadcn/ui](https://ui.shadcn.com)

## 🎉 **Teşekkürler** / **Thank You**

Katkıda bulunduğunuz için teşekkür ederiz! / Thank you for contributing!

---

**Made with ❤️ by HSNCODE Team**
