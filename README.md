# 🪁 Kitesurfen Paklijst — Denemarken

Interactieve paklijst voor je kitesurftrip naar Denemarken met Ripstar (4 juli).

## Features
- ✅ Afvinken per item, opgeslagen in je browser (localStorage)
- 📸 Bewijs foto's uploaden per categorie
- 📷 Screenshot exporteren als PNG
- 🔄 Reset knop

## Deploy naar GitHub Pages (3 stappen)

### 1. Maak een repo aan op GitHub
Ga naar github.com → New repository → Naam: `kitesurfen-paklijst`

### 2. Push de code
```bash
git init
git add .
git commit -m "🪁 Kitesurfen paklijst"
git branch -M main
git remote add origin https://github.com/JOUW-USERNAME/kitesurfen-paklijst.git
git push -u origin main
```

### 3. Zet GitHub Pages aan
- Ga naar je repo → **Settings** → **Pages**
- Bij "Source": kies **GitHub Actions**
- Klaar! Na ~1 minuut is je app live op:
  `https://JOUW-USERNAME.github.io/kitesurfen-paklijst/`

## Lokaal draaien
```bash
npm install
npm run dev
```
