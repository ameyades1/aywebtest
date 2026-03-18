# AntarYog Frontend Architecture Plan

## 🎯 Goal
Clean up vibe-coded HTML into a maintainable, scalable structure using:
- Shared components
- Reusable templates
- Separation of concerns

---

# 🧠 Overall Architecture

We divide the project into **3 layers**:

## 1. Layout (Shared)
Used across all pages:
- Navbar
- Footer
- Fonts & theme

## 2. Page Templates
Static content pages:
- Vision
- Mission
- Landing

## 3. App Pages (Later Stage)
Interactive pages:
- Login
- Profile

---

# 📁 Folder Structure

```
/project
│
├── /assets
│   ├── logo.png
│   └── images/
│
├── /components
│   ├── navbar.html
│   └── footer.html
│
├── /css
│   └── styles.css
│
├── /js
│   └── main.js
│
├── /pages
│   ├── vision.html
│   └── mission.html
│
└── index.html (landing page)
```


---

# 🎨 Shared Styles

## `/css/styles.css`

```css
body {
  font-family: 'Inter', sans-serif;
  color: #5C3010;
  background-color: #F9F6F0;
}

h1, h2, h3 {
  font-family: 'Lora', serif;
}

.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.section {
  padding: 4rem 0;
}

.card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  border-left: 4px solid #B87333;
  box-shadow: 0 2px 8px rgba(92, 48, 16, 0.05);
}

.text-muted {
  color: #7A6858;
}
```

## 🧩 Shared Components

### `/components/navbar.html`

```html
<header class="bg-white border-b shadow-sm">
  <div class="container flex justify-between items-center py-4">

    <img src="/assets/logo.png" class="h-10">

    <nav class="space-x-6 text-sm font-medium">
      <a href="/index.html">Home</a>
      <a href="/pages/vision.html">Vision</a>
      <a href="/pages/mission.html">Mission</a>
    </nav>

  </div>
</header>
```

### `/components/footer.html`

```html
<footer class="bg-[#5C3010] text-white mt-16">
  <div class="container py-10 text-sm">

    <p class="mb-4">
      AntarYog Foundation
    </p>

    <p class="text-white/70">
      © 2026 AntarYog Foundation. All rights reserved.
    </p>

  </div>
</footer>
```

## 📄 Vision Page Template

### `/pages/vision.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Vision</title>

  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="/css/styles.css">

  <link href="https://fonts.googleapis.com/css2?family=Inter&family=Lora&display=swap" rel="stylesheet">
</head>

<body>

  <div id="navbar"></div>

  <section class="section text-center">
    <h1 class="text-4xl font-bold mb-4">Our Vision</h1>
    <p class="text-muted text-lg">जनहिताय स्वयम् मोक्षाय च</p>
  </section>

  <main class="container">
    <div class="card space-y-5">
      <p>Vision content here...</p>
    </div>
  </main>

  <div id="footer"></div>

  <script src="/js/main.js"></script>

</body>
</html>
```

## 📄 Mission Page

Copy vision.html
Rename to mission.html

Update:
- Title
- Heading
- Content

## ⚙️ Component Loader

### `/js/main.js`

```javascript
async function loadComponent(id, file) {
  const res = await fetch(file);
  const html = await res.text();
  document.getElementById(id).innerHTML = html;
}

loadComponent("navbar", "/components/navbar.html");
loadComponent("footer", "/components/footer.html");
```
