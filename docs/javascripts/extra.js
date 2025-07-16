javascript
document.addEventListener("DOMContentLoaded", function() {
    mermaid.initialize({
        startOnLoad: true,
        theme: "default",
        flowchart: { 
            useMaxWidth: false, 
            htmlLabels: true 
        }
    });
});
