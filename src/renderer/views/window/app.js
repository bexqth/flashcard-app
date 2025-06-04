
async function showView(viewName) {
    await loadHTMLFile(`../${viewName}/index.html`);
    await loadCSSFile(`../${viewName}/styles.css`);
    await loadJSFile(`../${viewName}/app.js`);
}

async function loadHTMLFile(filePath) {
    try {
        const response = await fetch(filePath);
        
        if (!response.ok) {
            throw new Error(`File not found: ${filePath} (Status: ${response.status})`);
        }
        
        const html = await response.text();
        document.getElementById('view-container').innerHTML = html;
        
    } catch (error) {
        document.getElementById('view-container').innerHTML = 
            `<div class="p-4">
                <h2>Error loading page</h2>
                <p>File: ${filePath}</p>
                <p>Error: ${error.message}</p>
            </div>`;
    }
}

async function loadCSSFile(filePath) {
   try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`File not found: ${filePath} (Status: ${response.status})`);
        }

        const css = await response.text();
        const style = document.createElement('style');
        style.textContent = css;
        document.head.appendChild(style);
   } catch (error) {
        console.error('Error loading CSS:', error);
   }
}

async function loadJSFile(filePath) {
    try {
        const response = await fetch(filePath);
        
        if (!response.ok) {
            throw new Error(`File not found: ${filePath} (Status: ${response.status})`);
        }

        const js = await response.text();
 
        const existingScript = document.getElementById('current-view-script');
        if (existingScript) {
            existingScript.remove();
        }
        
        const script = document.createElement('script');
        script.id = 'current-view-script';
        script.textContent = js;
        document.head.appendChild(script);
        
        console.log('JavaScript loaded:', filePath);
        
    } catch (error) {
        console.log('Javascript not found:', filePath);
    }
}