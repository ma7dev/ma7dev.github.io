/**
 * Semantic Zoom - Enables collapsible sections in articles
 * Progressive enhancement: Works without JavaScript but enhances with it
 */
document.addEventListener('DOMContentLoaded', function() {
  // Find all article sections
  const articleSections = document.querySelectorAll('.article-content h2, .article-content h3');
  
  // Skip if no sections found
  if (!articleSections.length) return;
  
  // Add semantic zoom functionality to each heading
  articleSections.forEach(heading => {
    // Create toggle button
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'semantic-zoom-toggle';
    toggleBtn.setAttribute('aria-expanded', 'true');
    toggleBtn.innerHTML = `
      <svg class="chevron-down" width="16" height="16" viewBox="0 0 16 16">
        <path fill="currentColor" d="M7.976 10.072l4.357-4.357.62.618L8.284 11h-.618L3 6.333l.619-.618 4.357 4.357z"></path>
      </svg>
    `;
    
    // Add toggle button to heading
    heading.appendChild(toggleBtn);
    
    // Find content to toggle (everything between this heading and the next heading of same or higher level)
    let content = [];
    let nextElement = heading.nextElementSibling;
    
    // Continue until we reach next heading of same or higher level
    while (nextElement && 
           !(nextElement.tagName === heading.tagName || 
             (heading.tagName === 'H3' && nextElement.tagName === 'H2'))) {
      content.push(nextElement);
      nextElement = nextElement.nextElementSibling;
    }
    
    // Add click event
    toggleBtn.addEventListener('click', function(e) {
      e.preventDefault();
      
      const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
      toggleBtn.setAttribute('aria-expanded', !isExpanded);
      
      // Toggle content visibility
      content.forEach(element => {
        element.style.display = isExpanded ? 'none' : '';
      });
      
      // Add semantic-zoom-collapsed class to heading
      heading.classList.toggle('semantic-zoom-collapsed', !isExpanded);
    });
  });
  
  // Add semantic zoom stylesheet
  const style = document.createElement('style');
  style.textContent = `
    .semantic-zoom-toggle {
      background: transparent;
      border: none;
      color: var(--global-theme-color);
      cursor: pointer;
      padding: 0 0.5rem;
      margin-left: 0.5rem;
      transition: transform 0.2s ease;
    }
    
    .semantic-zoom-collapsed .semantic-zoom-toggle {
      transform: rotate(-90deg);
    }
    
    .semantic-zoom-toggle:hover {
      opacity: 0.8;
    }
    
    .semantic-zoom-toggle:focus {
      outline: none;
      box-shadow: 0 0 0 2px rgba(var(--global-theme-color-rgb), 0.3);
      border-radius: 4px;
    }
  `;
  document.head.appendChild(style);
}); 