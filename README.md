# 🪁 Kitesurfen Paklijst — Denemarken

Interactieve paklijst voor je kitesurftrip naar Denemarken met Ripstar (4 juli).

## Features
- ✅ Afvinken per item, opgeslagen in je browser (localStorage)
- 📸 Bewijs foto's uploaden per categorie
- 👗 Outfits samenstellen uit kledingfoto's
- 📷 Screenshot exporteren als PNG
- 🔄 Reset knop

### 📱 Mobiele features
- ⬇️ **Installeerbaar** als app op je telefoon (PWA, "Add to Home Screen")
- 📡 **Offline** bruikbaar via service worker — werkt ook zonder bereik op het strand
- 🌬️ **Live wind** voor de kitespot (Open-Meteo) met "kan ik kiten?"-oordeel
- 🔍 **Zoeken** door alle items
- 📤 **Delen** van je voortgang via de native share-sheet
- 📳 **Haptische feedback** bij afvinken
- 🎉 **Confetti** als alles ingepakt is

## Codestructuur
SOLID/clean-code opzet — data, logica en UI zijn gescheiden:
- `src/data/` — de paklijst als pure data (single source of truth)
- `src/constants/` — thema-tokens & storage-keys
- `src/hooks/` — herbruikbare logica (`useLocalStorage`, `usePackingList`, `usePhotos`, …)
- `src/components/` — presentatie-componenten (stateless waar mogelijk)
- `src/utils/` — losse helpers (device-API's, share)
- `src/App.jsx` — dunne composition root

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
