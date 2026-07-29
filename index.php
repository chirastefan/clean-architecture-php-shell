<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>PHP Shell App - MFE Integration Comparison</title>
    <style>
        body { font-family: system-ui, sans-serif; margin: 3rem; background: #0f172a; color: #f8fafc; }
        .container { max-width: 1100px; margin: 0 auto; }
        h1 { color: #38bdf8; font-size: 2.2rem; }
        p { color: #94a3b8; font-size: 1.1rem; line-height: 1.6; }
        .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin-top: 2rem; }
        .card { background: #1e293b; border: 1px solid #334155; padding: 2rem; border-radius: 12px; transition: transform 0.2s, border-color 0.2s; display: flex; flex-direction: column; justify-content: space-between; }
        .card:hover { transform: translateY(-4px); border-color: #38bdf8; }
        .card h2 { margin-top: 0; color: #f1f5f9; }
        .card p { font-size: 0.95rem; color: #cbd5e1; }
        .btn { display: inline-block; margin-top: 1rem; padding: 10px 20px; background: #0284c7; color: white; border-radius: 6px; text-decoration: none; font-weight: 600; text-align: center; }
        .btn:hover { background: #0369a1; }
        .tag { display: inline-block; background: #0369a1; color: #e0f2fe; padding: 4px 10px; border-radius: 9999px; font-size: 0.8rem; font-weight: bold; margin-bottom: 1rem; align-self: flex-start; }
    </style>
</head>
<body>

    <div class="container">
        <h1>Clean Architecture PHP Shell</h1>
        <p>This application demonstrates three distinct architectural patterns for integrating modern React Micro-Frontends into a legacy PHP 5 environment with resilient vendor loading.</p>

        <div class="grid">
            
            <div class="card">
                <div>
                    <span class="tag">APPROACH 1</span>
                    <h2>Web Components (`r2wc`)</h2>
                    <p>Uses native <code>&lt;custom-element&gt;</code> HTML tags. Uses a dynamic <code>importmap</code> script with <code>fetch()</code> fallback for vendor resilience.</p>
                </div>
                <a href="approach-1-wc.php" class="btn">View Web Component Demo →</a>
            </div>

            <div class="card">
                <div>
                    <span class="tag">APPROACH 2</span>
                    <h2>Simulated Module Federation</h2>
                    <p>Uses PHP placeholder <code>&lt;div&gt;</code> tags. Uses explicit <code>loadVendorWithFallback()</code> helper with <code>try / catch</code> & dynamic <code>import()</code> to imperatively mount remote components.</p>
                </div>
                <a href="approach-2-federation.php" class="btn">View Federation Demo →</a>
            </div>

            <div class="card">
                <div>
                    <span class="tag">APPROACH 3</span>
                    <h2>Script Tag with `defer`</h2>
                    <p>Uses standard <code>&lt;script src="..." defer&gt;</code> tags in <code>&lt;head&gt;</code>. Downloads non-blocking in parallel and executes in order once DOM parsing completes.</p>
                </div>
                <a href="approach-3-defer.php" class="btn">View Script Defer Demo →</a>
            </div>

        </div>
    </div>

</body>
</html>
