---
layout: page
title: Announcements
permalink: /announcements/
nav: true
nav_order: 4
---

<div class="x-article-container">
  <div class="x-article-header">
    <h1>Announcements</h1>
  </div>
  
  <!-- Article list in X.com style -->
    <div class="x-timeline">
    <!-- Articles tab -->
    <div class="x-section-visible" id="articles-section">
      <div class="posts-list">
        <!-- Highlighted post -->
        {% assign highlighted_post = site.posts | where: "highlight", true | where_exp: "post", "post.categories contains 'announcement'" | first %}
        {% if highlighted_post %}
        <div class="pinned-post-badge">
          <i class="fa-solid fa-star"></i> Highlight
        </div>
        {% include post-card.liquid post=highlighted_post %}
        <hr class="divider">
        {% endif %}

        <!-- Regular article posts with pagination -->
        {% assign articles = site.posts | where_exp: "post", "post.categories contains 'announcement'" | where: "publish", true | sort: "date" | reverse %}
        {% if articles.size > 0 %}
        <!-- Pagination variables -->
        {% assign posts_per_page = 10 %}
        {% assign total_posts = articles.size %}
        {% assign total_pages = total_posts | divided_by: posts_per_page %}
        {% assign remainder = total_posts | modulo: posts_per_page %}
        {% if remainder != 0 %}
          {% assign total_pages = total_pages | plus: 1 %}
        {% endif %}
        
        <!-- Load all articles but with pagination classes -->
        <div id="all-articles">
          {% for post in articles %}
            {% assign page_number = forloop.index0 | divided_by: posts_per_page | plus: 1 %}
            <div class="article-item" data-page="{{ page_number }}">
              {% include post-card.liquid post=post %}
            </div>
          {% endfor %}
        </div>
        
        <!-- Pagination controls -->
        {% if total_posts > posts_per_page %}
        <div class="x-pagination">
          <a href="#" class="x-pagination-btn x-pagination-prev disabled" id="prev-page">
            <i class="fa-solid fa-chevron-left"></i> Previous
          </a>
          
          <div class="x-pagination-pages" id="page-indicator">
            Page 1 of {{ total_pages }}
          </div>
          
          <a href="#" class="x-pagination-btn x-pagination-next" id="next-page">
            Next <i class="fa-solid fa-chevron-right"></i>
          </a>
        </div>
        {% endif %}
        {% else %}
        <div class="x-article-empty">
          <p>No announcements found</p>
          <img src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2dpcWQ1Z2g4cXcweG5qeDF2czg4cHg3NGhoeXdndTAzcDZ4ejBhbiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/vR1dPIYzQmkRzLZk2w/giphy.gif" alt="No articles found" style="max-width: 100%; margin-top: 15px; display: block; margin-left: auto; margin-right: auto;">
        </div>
        {% endif %}
      </div>
    </div>
  </div>
</div>

<style>
:root {
  --x-font: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  --x-blue: #1DA1F2;
  --x-black: #14171A;
  --x-dark-gray: #657786;
  --x-light-gray: #AAB8C2;
  --x-extra-light-gray: #E1E8ED;
  --x-lightest-gray: #F5F8FA;
}

/* X.com article styling */
.x-article-container {
  margin: 0 auto;
  font-family: var(--x-font);
}

.x-article-header {
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 1px solid var(--x-extra-light-gray);
}

.x-article-header h1 {
  font-size: 28px;
  font-weight: 800;
  margin-bottom: 8px;
  font-family: var(--x-font);
}

.x-article-description {
  color: var(--x-dark-gray);
  font-size: 15px;
  margin: 0;
}

.x-article-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.x-article-card {
  padding: 16px;
  border-radius: 12px;
  background-color: white;
  border: 1px solid var(--x-extra-light-gray);
  transition: background-color 0.2s;
}

.x-article-card:hover {
  background-color: var(--x-lightest-gray);
}

.x-article-meta {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.x-article-date {
  color: var(--x-dark-gray);
  font-size: 14px;
}

.text-muted {
  color: #8899a6;
  font-size: 0.8rem;
}

.x-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.x-badge-highlight {
  background-color: rgba(29, 161, 242, 0.1);
  color: var(--x-blue);
}

.x-badge-popular {
  background-color: rgba(255, 173, 31, 0.1);
  color: #FFAD1F;
}

.x-badge-new {
  background-color: rgba(77, 208, 117, 0.1);
  color: #4DD075;
}

.x-article-title {
  font-size: 18px;
  font-weight: 700;
  margin: 0 0 10px 0;
  line-height: 1.3;
  font-family: var(--x-font);
}

.x-article-title a {
  color: var(--x-black);
  text-decoration: none;
}

.x-article-title a:hover {
  color: var(--x-blue);
}

.x-article-excerpt {
  color: var(--x-dark-gray);
  font-size: 15px;
  margin: 0 0 15px 0;
  line-height: 1.4;
}

.x-article-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
}

.x-article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.x-category {
  font-size: 14px;
  color: var(--x-dark-gray);
  background-color: var(--x-lightest-gray);
  padding: 3px 10px;
  border-radius: 16px;
  text-decoration: none;
}

.x-category:hover {
  background-color: rgba(29, 161, 242, 0.1);
  color: var(--x-blue);
  text-decoration: none;
}

.x-tag {
  font-size: 14px;
  color: var(--x-blue);
  text-decoration: none;
}

.x-tag:hover {
  text-decoration: underline;
}

.x-article-stats {
  display: flex;
  align-items: center;
  gap: 15px;
}

.x-read-time {
  color: var(--x-dark-gray);
  font-size: 14px;
}

/* Pagination styles */
.x-pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid var(--x-extra-light-gray);
}

.x-pagination-btn {
  display: inline-flex;
  align-items: center;
  padding: 8px 16px;
  border-radius: 20px;
  background-color: var(--x-blue);
  color: white;
  font-weight: 600;
  text-decoration: none;
  transition: background-color 0.2s;
}

.x-pagination-btn:hover {
  background-color: #1a91da;
  text-decoration: none;
  color: white;
}

.x-pagination-btn.disabled {
  background-color: var(--x-extra-light-gray);
  color: var(--x-dark-gray);
  cursor: not-allowed;
  pointer-events: none;
}

.x-pagination-pages {
  font-size: 14px;
  color: var(--x-dark-gray);
}

.x-pagination-prev i {
  margin-right: 5px;
}

.x-pagination-next i {
  margin-left: 5px;
}

/* Article pagination */
.article-item {
  display: none;
}

.article-item.active {
  display: block;
}

/* Dark mode pagination */
.dark-mode .x-pagination {
  border-color: #38444d;
}

.dark-mode .x-pagination-btn.disabled {
  background-color: #192734;
  color: #8899a6;
}

.dark-mode .x-pagination-pages {
  color: #8899a6;
}

/* Dark mode support */
.dark-mode .x-article-card {
  background-color: #192734;
  border-color: #38444d;
}

.dark-mode .x-article-card:hover {
  background-color: #22303c;
}

.dark-mode .x-article-title a {
  color: #fff;
}

.dark-mode .x-article-excerpt {
  color: #8899a6;
}

.dark-mode .x-category {
  background-color: #192734;
  color: #8899a6;
}

.dark-mode .x-article-date, 
.dark-mode .x-read-time {
  color: #8899a6;
}

.dark-mode .text-muted {
  color: #657786;
}
</style>

<script>
  // Define the missing initTheme function
//   function initTheme() {
//     const userPref = localStorage.getItem('theme');
//     if (userPref === 'dark') {
//       document.body.classList.add('dark-mode');
//     } else if (userPref === 'light') {
//       document.body.classList.add('light-mode');
//     } else {
//       // Default or system preference
//       if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
//         document.body.classList.add('dark-mode');
//       }
//     }
//   }
  
  // Initialize theme when page loads
  document.addEventListener('DOMContentLoaded', function() {
    // initTheme();
    initPagination();
  });
  
  // Client-side pagination
  function initPagination() {
    const articles = document.querySelectorAll('.article-item');
    const prevBtn = document.getElementById('prev-page');
    const nextBtn = document.getElementById('next-page');
    const pageIndicator = document.getElementById('page-indicator');
    
    // Get current page from URL or default to 1
    const urlParams = new URLSearchParams(window.location.search);
    let currentPage = parseInt(urlParams.get('page')) || 1;
    
    // Calculate total pages
    const totalPages = Math.ceil(articles.length / 10);
    
    // Ensure current page is valid
    if (currentPage < 1) currentPage = 1;
    if (currentPage > totalPages) currentPage = totalPages;
    
    // Update URL with current page
    if (!urlParams.has('page') || parseInt(urlParams.get('page')) !== currentPage) {
      const url = new URL(window.location);
      url.searchParams.set('page', currentPage);
      window.history.replaceState({}, '', url);
    }
    
    // Function to show articles for current page
    function showPage(page) {
      // Hide all articles
      articles.forEach(article => {
        article.classList.remove('active');
      });
      
      // Show articles for current page
      articles.forEach(article => {
        if (parseInt(article.dataset.page) === page) {
          article.classList.add('active');
        }
      });
      
      // Update pagination buttons
      prevBtn.classList.toggle('disabled', page <= 1);
      nextBtn.classList.toggle('disabled', page >= totalPages);
      
      // Update page indicator
      pageIndicator.textContent = `Page ${page} of ${totalPages}`;
      
      // Update URL
      const url = new URL(window.location);
      url.searchParams.set('page', page);
      window.history.pushState({}, '', url);
    }
    
    // Show initial page
    showPage(currentPage);
    
    // Add event listeners to pagination buttons
    prevBtn.addEventListener('click', function(e) {
      e.preventDefault();
      if (currentPage > 1) {
        currentPage--;
        showPage(currentPage);
      }
    });
    
    nextBtn.addEventListener('click', function(e) {
      e.preventDefault();
      if (currentPage < totalPages) {
        currentPage++;
        showPage(currentPage);
      }
    });
    
    // Handle browser back/forward buttons
    window.addEventListener('popstate', function() {
      const urlParams = new URLSearchParams(window.location.search);
      currentPage = parseInt(urlParams.get('page')) || 1;
      showPage(currentPage);
    });
  }
</script> 