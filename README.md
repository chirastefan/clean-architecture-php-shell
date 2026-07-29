# Clean Architecture PHP Shell

A reference project demonstrating three distinct architectural patterns for integrating modern **React Micro-Frontends (MFE)** into a **legacy PHP 5** environment, complete with shared vendor dependency resolution and cloud storage fallback resilience.

---

## 🚀 Overview of the 3 Integration Approaches

| Approach | Pattern | HTML Markup | Loading Mechanism | Best For |
| :--- | :--- | :--- | :--- | :--- |
| **Approach 1** | Web Components (`r2wc`) | Declarative Custom Tag (`<budget-tracker-widget>`) | Dynamic Import Map with `fetch()` HEAD health check | Client-side cloud storage fallback resilience with HTML-first templates |
| **Approach 2** | Simulated Module Federation | Placeholder Container (`<div id="...">`) | Imperative `loadVendorWithFallback()` + `import()` + `mount()` | Pure JavaScript remotes exporting imperative lifecycle APIs |
| **Approach 3** | Non-blocking Script Tag (`defer`) | Declarative Custom Tag (`<budget-tracker-widget>`) | Native `<script type="module" src="..." defer>` | **Gold Standard for 99% of production PHP apps** (Cleanest DX + optimal parallel downloads) |

---

## 📁 Project Structure

```
clean-architecture-php-shell/
├── index.php / index.html                         # Comparison Dashboard
├── approach-1-wc.php / approach-1-wc.html         # Approach 1 Demo Page
├── approach-2-federation.php / approach-2-federation.html # Approach 2 Demo Page
├── approach-3-defer.php / approach-3-defer.html   # Approach 3 Demo Page
└── assets/
    ├── react.mjs                                  # Shared React ES Module vendor
    ├── react-dom-client.mjs                       # Shared ReactDOM client ES Module vendor
    ├── budget-tracker.js                          # Web Component bundle (built from clean-architecture-monorepo)
    ├── web.css                                    # Web Component stylesheet
    └── federated-tracker.js                       # Remote Module exporting imperative mount() API
```

---

## 🛠️ How it Works

### Approach 1: Web Component + Dynamic Import Map Fallback
- **PHP Markup:** `<budget-tracker-widget user-id="101" theme="dark"></budget-tracker-widget>`
- Checks primary cloud storage availability (`GCP`), falling back to secondary (`Azure`). Dynamically generates `<script type="importmap">` before loading the Web Component script.

### Approach 2: Simulated Module Federation (Imperative Preload & Mount)
- **PHP Markup:** `<div id="federated-container"></div>`
- Uses a `try / catch` preloader function `loadVendorWithFallback()` in JavaScript to load shared React vendors, injects the Import Map dynamically, and imperatively mounts the remote React app into the DOM container.

### Approach 3: Script Tag with `defer`
- **PHP Markup:** `<budget-tracker-widget user-id="303" theme="dark"></budget-tracker-widget>`
- Placed in `<head>`:
  ```html
  <script type="importmap">
    {
      "imports": {
        "react": "./assets/react.mjs",
        "react-dom/client": "./assets/react-dom-client.mjs"
      }
    }
  </script>
  <script type="module" src="./assets/budget-tracker.js" defer></script>
  ```
- Non-blocking parallel download during HTML parsing, executing strictly in order once DOM parsing finishes.

---

## 💻 Running Locally

You can run a local HTTP server in this directory:

```bash
# Using Node.js npx serve
npx serve .

# OR using built-in PHP server (if PHP CLI is installed)
php -S localhost:8080
```

Open `http://localhost:3000` (or `http://localhost:8080`) to test the comparison dashboard.
