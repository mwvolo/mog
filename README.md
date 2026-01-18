# 🏠 Move Out Guide

A mobile-first budgeting and planning tool for first-time renters.

## Live Demo

After deploying, your site will be at: `https://YOUR-USERNAME.github.io/move-out-guide/`

---

## 🚀 Deploy to GitHub Pages (5 minutes)

### Step 1: Create a GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Name it `move-out-guide` (or whatever you want)
3. Keep it **Public** 
4. Don't add README/gitignore (we have those)
5. Click **Create repository**

### Step 2: Push the Code

Open your terminal and run:

```bash
cd move-out-guide-deploy

# Initialize git
git init
git add .
git commit -m "Initial commit"

# Connect to your repo (replace YOUR-USERNAME)
git remote add origin https://github.com/YOUR-USERNAME/move-out-guide.git
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repo on GitHub
2. Click **Settings** (top menu)
3. Click **Pages** (left sidebar)
4. Under "Build and deployment":
   - Source: **GitHub Actions**
5. That's it! The workflow will auto-run.

### Step 4: Wait & Visit

1. Click the **Actions** tab to watch it build (~2 min)
2. Once the green checkmark appears, visit:
   ```
   https://YOUR-USERNAME.github.io/move-out-guide/
   ```

---

## 📱 Share It

Send your nephew this link:
```
https://YOUR-USERNAME.github.io/move-out-guide/
```

They can add it to their phone's home screen:
- **iPhone**: Safari → Share → Add to Home Screen
- **Android**: Chrome → Menu → Add to Home Screen

---

## 🛠 Local Development

```bash
npm install
npm run dev
```

Then open http://localhost:5173

---

## 📁 Project Structure

```
move-out-guide/
├── src/
│   ├── MoveOutGuide.jsx   # Main component
│   ├── App.jsx            # App wrapper
│   ├── main.jsx           # Entry point
│   └── index.css          # Tailwind + custom styles
├── .github/
│   └── workflows/
│       └── deploy.yml     # Auto-deploy workflow
├── index.html
├── vite.config.js         # ⚠️ Change 'base' if you rename repo
├── tailwind.config.js
└── package.json
```

---

## ⚠️ If You Rename the Repo

Update `vite.config.js`:

```js
export default defineConfig({
  plugins: [react()],
  base: '/YOUR-NEW-REPO-NAME/', // Must match repo name!
})
```

Then push the change.

---

Built with 💜 by uncles who want to see the kid win.
