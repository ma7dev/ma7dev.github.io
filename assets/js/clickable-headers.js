document.addEventListener('DOMContentLoaded', function() {
    const headers = document.querySelectorAll('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]');
    
    headers.forEach(header => {
        // Create the link wrapper
        const link = document.createElement('a');
        link.href = `#${header.id}`;
        link.classList.add('header-link');
        
        // Move the header's content inside the link
        while (header.firstChild) {
            link.appendChild(header.firstChild);
        }
        
        // Create the anchor icon
        const anchor = document.createElement('span');
        anchor.innerHTML = '#';
        anchor.classList.add('header-anchor');
        link.appendChild(anchor);
        
        // Add the link to the header
        header.appendChild(link);
    });
}); 