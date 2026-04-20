// Add copy button to code blocks
document.addEventListener('DOMContentLoaded', function() {
    // Find all div elements with highlight class
    const codeBlocks = document.querySelectorAll('div.highlight');

    codeBlocks.forEach(function(div) {
        // Create copy button
        const copyButton = document.createElement('button');
        copyButton.className = 'copy';
        copyButton.innerHTML = '📋'; // Copy icon
        copyButton.title = 'Copy to clipboard';

        // Add click event
        copyButton.addEventListener('click', function() {
            const code = div.querySelector('code');
            if (code) {
                navigator.clipboard.writeText(code.textContent).then(function() {
                    // Show feedback
                    const original = copyButton.innerHTML;
                    copyButton.innerHTML = '✅';
                    setTimeout(function() {
                        copyButton.innerHTML = original;
                    }, 1000);
                }).catch(function(err) {
                    console.error('Failed to copy: ', err);
                });
            }
        });

        // Append button to div
        div.appendChild(copyButton);
    });
});