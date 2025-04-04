// Run this code in your browser console when viewing a post
(function() {
  // 1. Adjust the share section title to match discussion section title
  const shareHeading = document.querySelector('.share-section h3');
  if (shareHeading) {
    // Match the Discussion heading style
    shareHeading.style.fontSize = '1.3rem';
    shareHeading.style.fontWeight = '600';
    
    // Change the text to match the "Join the discussion" phrasing
    shareHeading.textContent = 'Share this article';
  }

  // 2. Adjust button sizes and spacing to match the discussion buttons
  const shareButtons = document.querySelectorAll('.share-button');
  shareButtons.forEach(button => {
    // Match the Discuss buttons size and padding
    button.style.padding = '0.6rem 1.2rem';
    button.style.fontSize = '1rem';
    
    // Increase icon size
    const icon = button.querySelector('i');
    if (icon) {
      icon.style.fontSize = '1.1rem';
    }
  });

  // 3. Adjust gap between buttons
  const shareButtonsContainer = document.querySelector('.share-buttons');
  if (shareButtonsContainer) {
    shareButtonsContainer.style.gap = '1rem';
  }

  // 4. Add transition animation to match discussion section
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    .share-section {
      animation: fadeIn 0.5s ease-in-out;
    }
    @keyframes fadeIn {
      from { opacity: 0.7; }
      to { opacity: 1; }
    }
    
    /* Make the share buttons slightly larger like discussion buttons */
    .share-button {
      padding: 0.6rem 1.2rem !important;
      font-size: 1rem !important;
    }
    
    .share-button i {
      font-size: 1.1rem !important;
    }
    
    /* Match spacing */
    .share-buttons {
      gap: 1rem !important;
    }
    
    /* Add subtle hover animation matching discussion buttons */
    .share-button:hover {
      transform: translateY(-1px);
      transition: transform 0.2s;
    }
  `;
  document.head.appendChild(styleSheet);

  console.log('✅ Share section styling has been updated to match the discussion section!');
})(); 