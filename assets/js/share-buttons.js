document.addEventListener('DOMContentLoaded', function() {
    // Share buttons functionality
    const shareButtons = document.querySelectorAll('.share-button');
    
    shareButtons.forEach(button => {
        button.addEventListener('click', async function(e) {
            e.preventDefault();
            const type = this.dataset.share;
            const url = window.location.href;
            const title = document.title.replace(' | ma7.dev', '');
            const metaDescription = document.querySelector('meta[name="description"]');
            const description = metaDescription ? metaDescription.content : '';
            
            switch(type) {
                case 'twitter':
                    // Format: "Title" by @author URL
                    let xText = `${title} by @ma7dev`;
                    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(xText)}&url=${encodeURIComponent(url)}`, '_blank', 'width=550,height=420');
                    break;
                case 'linkedin':
                    // LinkedIn's sharing dialog - using current working format
                    // As of 2024, LinkedIn only accepts the URL parameter, stripping others
                    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank', 'width=550,height=420');
                    break;
                case 'copy':
                    try {
                        await navigator.clipboard.writeText(url);
                        const tooltip = this.querySelector('.tooltip-text');
                        
                        // Show the tooltip
                        tooltip.style.opacity = '1';
                        tooltip.style.visibility = 'visible';
                        
                        // Hide the tooltip after 2 seconds
                        setTimeout(() => {
                            tooltip.style.opacity = '0';
                            tooltip.style.visibility = 'hidden';
                        }, 2000);
                    } catch (err) {
                        console.error('Failed to copy:', err);
                    }
                    break;
            }
        });
    });
}); 