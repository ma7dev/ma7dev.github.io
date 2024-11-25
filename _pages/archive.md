---
layout: default
permalink: /archive/
title: archive
nav: true
nav_order: 1
pagination:
  enabled: true
  collection: posts
  permalink: /page/:num/
  per_page: 10
  sort_field: date
  sort_reverse: true
  trail:
    before: 1 # The number of links before the current page
    after: 3 # The number of links after the current page
---
<div class="post">

{% assign blog_name_size = site.blog_name | size %}
{% assign blog_description_size = site.blog_description | size %}

{% if blog_name_size > 0 or blog_description_size > 0 %}
  <div class="header-bar">
    <h1>{{ site.blog_name }}</h1>
    <h2>{{ site.blog_description }}</h2>
  </div>
{% endif %}

<div class="tag-category-list">
    <div class="categories-section">
        <h3>Categories</h3>
        <ul class="p-0 m-0">
            {% assign categories = site.posts | map: "categories" | flatten | uniq | compact %}
            {% assign category_counts = categories | map: downcase | group_by_exp: "item", "site.posts | where: 'categories', item | size" | sort: "name" | reverse %}
            {% for count_group in category_counts %}
                {% assign count = count_group.name | plus: 0 %}
                {% for category in categories %}
                    {% assign category_posts = site.posts | where: "categories", category %}
                    {% if category_posts.size == count %}
                        <li>
                            <i class="fa-solid fa-tag fa-sm"></i> 
                            <a href="{{ category | slugify | prepend: '/archive/category/' | relative_url }}">{{ category }}</a>
                            <span class="count">({{ count }})</span>
                        </li>
                    {% endif %}
                {% endfor %}
            {% endfor %}
        </ul>
    </div>

    <div class="tags-section">
        <h3>Tags</h3>
        <ul class="p-0 m-0">
            {% assign tags = site.posts | map: "tags" | flatten | uniq | compact %}
            {% assign tag_counts = tags | map: downcase | group_by_exp: "item", "site.posts | where: 'tags', item | size" | sort: "name" | reverse %}
            {% for count_group in tag_counts %}
                {% assign count = count_group.name | plus: 0 %}
                {% for tag in tags %}
                    {% assign tag_posts = site.posts | where: "tags", tag %}
                    {% if tag_posts.size == count %}
                        <li>
                            <i class="fa-solid fa-hashtag fa-sm"></i>
                            <a href="{{ tag | slugify | prepend: '/archive/tag/' | relative_url }}">{{ tag }}</a>
                            <span class="count">({{ count }})</span>
                        </li>
                    {% endif %}
                {% endfor %}
            {% endfor %}
        </ul>
    </div>
</div>

{% assign featured_posts = site.posts | where: "featured", "true" | where: "redirect", blank %}
{% if featured_posts.size > 0 %}
<br>

<div class="container featured-posts">
  {% assign is_even = featured_posts.size | modulo: 2 %}
  <div class="row row-cols-{% if featured_posts.size <= 2 or is_even == 0 %}2{% else %}3{% endif %}">
    {% for post in featured_posts %}
    <div class="col mb-4">
      <a href="{{ post.url | relative_url }}">
        <div class="card hoverable">
          <div class="row g-0">
            <div class="col-md-12">
              <div class="card-body">
                <div class="float-right">
                  <i class="fa-solid fa-thumbtack fa-xs"></i>
                </div>
                <h3 class="card-title text-lowercase">{{ post.title }}</h3>
                <p class="card-text">{{ post.description }}</p>

                {% assign read_time = post.content | number_of_words | divided_by: 180 | plus: 1 %}
                {% assign year = post.date | date: "%Y" %}

                <p class="post-meta">
                  {{ read_time }} min read &nbsp; &middot; &nbsp;
                  <a href="{{ year | prepend: '/archive/' | prepend: site.baseurl}}">
                    <i class="fa-solid fa-calendar fa-sm"></i> {{ year }}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
    {% endfor %}
  </div>
</div>
<hr>
{% endif %}

{% if page.pagination.enabled %}
  {% assign postlist = paginator.posts %}
{% else %}
  {% assign postlist = site.posts %}
{% endif %}

{% assign posts_by_year = postlist | group_by_exp:"post", "post.date | date: '%Y'" %}

<div class="archive-years">
  {% for year in posts_by_year %}
    <h2 class="archive-year">{{ year.name }}</h2>
    <div class="table-responsive">
      <table class="table table-hover">
        {% for post in year.items %}
          {% assign read_time = post.content | number_of_words | divided_by: 180 | plus: 1 %}
          {% assign tags = post.tags | join: "" %}
          {% assign categories = post.categories | join: "" %}

          <tr>
            <td style="width: 120px; vertical-align: top;">
              {{ post.date | date: '%B %d' }}
            </td>
            <td>
              <div class="post-entry">
                <h4 class="post-title mb-1">
                  {% if post.redirect contains 'substack.com' %}
                    <a href="{{ post.redirect }}" target="_blank">{{ post.title }}</a>
                    <svg xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 448 511.471" width="1.5rem" height="1.5rem" title="substack.com">
                      <path fill="#FF681A" d="M0 0h448v62.804H0V0zm0 229.083h448v282.388L223.954 385.808 0 511.471V229.083zm0-114.542h448v62.804H0v-62.804z"/>
                    </svg>
                  {% else %}
                    <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
                  {% endif %}
                </h4>
                <p class="post-description mb-1">{{ post.description }}</p>
                <div class="post-meta small">
                  {{ read_time }} min read
                  {% if post.redirect contains 'substack.com' %}
                    &nbsp; &middot; &nbsp;
                    <a href="{{ 'newsletter' | slugify | prepend: '/archive/category/' | prepend: site.baseurl}}" class="text-muted">
                      <i class="fa-solid fa-tag fa-xs"></i> newsletter</a>
                  {% endif %}
                  {% if categories != "" %}
                    &nbsp; &middot; &nbsp;
                    {% for category in post.categories %}
                      <a href="{{ category | slugify | prepend: '/archive/category/' | prepend: site.baseurl}}" class="text-muted">
                        <i class="fa-solid fa-tag fa-xs"></i> {{ category }}</a>{% unless forloop.last %}, {% endunless %}
                    {% endfor %}
                  {% endif %}
                  {% if tags != "" %}
                    &nbsp; &middot; &nbsp;
                    {% for tag in post.tags %}
                      <a href="{{ tag | slugify | prepend: '/archive/tag/' | prepend: site.baseurl}}" class="text-muted">
                        <i class="fa-solid fa-hashtag fa-xs"></i> {{ tag }}</a>{% unless forloop.last %}, {% endunless %}
                    {% endfor %}
                  {% endif %}
                </div>
              </div>
            </td>
          </tr>
        {% endfor %}
      </table>
    </div>
  {% endfor %}
</div>

{% if page.pagination.enabled %}
  {% include pagination.liquid %}
{% endif %}

</div>
