<?php
// Simulate PHP backend data
$userId = "user_php_101";
$userTheme = "dark";
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Approach 1: Web Components (Declarative HTML)</title>
    <style>
        body { font-family: system-ui, sans-serif; margin: 2rem; background: #f8fafc; color: #0f172a; }
        .nav { margin-bottom: 2rem; }
        .nav a { margin-right: 1rem; color: #2563eb; text-decoration: none; font-weight: bold; }
        .card { background: white; padding: 1.5rem; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); margin-bottom: 1.5rem; }
        .badge { background: #dbeafe; color: #1e40af; padding: 2px 8px; border-radius: 4px; font-size: 0.85rem; }
    </style>

    <!-- Dynamic Import Map Generation with GCP -> Azure Fallback -->
    <script>
      (async function initVendorImports() {
        const primaryGCP = './assets/react.mjs';
        const backupAzure = './assets/react.mjs'; // Backup URL simulation

        let resolvedReactUrl = primaryGCP;

        try {
          // Test primary GCP bucket (or intentionally fail to test fallback)
          const res = await fetch(primaryGCP, { method: 'HEAD' });
          if (!res.ok) throw new Error('Primary GCP bucket down');
          console.log('✅ Option A: Primary GCP Vendor Storage Active');
        } catch (err) {
          console.warn('⚠️ Option A: Primary storage failed! Falling back to Azure...', err);
          resolvedReactUrl = backupAzure;
        }

        // Dynamically create the native Import Map
        const importMap = {
          imports: {
            "react": resolvedReactUrl,
            "react-dom/client": resolvedReactUrl.replace('react.mjs', 'react-dom-client.mjs')
          }
        };

        const mapScript = document.createElement('script');
        mapScript.type = 'importmap';
        mapScript.textContent = JSON.stringify(importMap);
        document.head.appendChild(mapScript);
      })();
    </script>

    <!-- Web Component stylesheet -->
    <link rel="stylesheet" href="./assets/web.css">

    <!-- Web Component ES Module script -->
    <script type="module" src="./assets/budget-tracker.js"></script>
</head>
<body>

    <div class="nav">
        <a href="index.php">← Back to Comparison Dashboard</a>
    </div>

    <h1>Approach 1: Web Component Architecture (`r2wc`)</h1>
    <p>This approach uses <strong>Declarative HTML</strong>. The PHP server outputs custom HTML tags directly.</p>

    <div class="card">
        <h3>PHP Rendered Custom HTML Tag:</h3>
        
        <!-- Native Declarative Custom Element -->
        <budget-tracker-widget 
            user-id="<?php echo htmlspecialchars($userId); ?>" 
            theme="<?php echo htmlspecialchars($userTheme); ?>">
        </budget-tracker-widget>
    </div>

    <div class="card">
        <h4>How Event Communication Works here:</h4>
        <p>Listen for events on the widget or parent container via standard DOM events:</p>
        <script>
            // Event delegation on document or widget
            document.addEventListener('DOMContentLoaded', () => {
                const widget = document.querySelector('budget-tracker-widget');
                if (widget) {
                    widget.addEventListener('onItemAdded', (e) => {
                        console.log('PHP caught event from Web Component:', e.detail);
                    });
                }
            });
        </script>
    </div>

</body>
</html>
