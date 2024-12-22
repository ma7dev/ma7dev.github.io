<!-- ---
layout: default
permalink: /archive/
title: Archive
nav: true
nav_order: 1
---
<div class="post">

<div class="tag-category-list">
    <div class="categories-section">
        <h3><i class="fa-solid fa-tag fa-sm"></i> Categories</h3>
        <ul class="p-0 m-0">
            {% assign sorted_categories = site.posts | map: "categories" | flatten | uniq | compact | group_by_exp: "item", "item" | map: "name" | sort_by: "size" %}
            {% for category in sorted_categories %}
                {% assign count = site.posts | where: "categories", category | size %}
                <li>
                    <a href="{{ category | slugify | prepend: '/archive/category/' | relative_url }}">{{ category }}</a>
                    <span class="count">({{ count }})</span>
                </li>
            {% endfor %}
        </ul>
    </div>

    <div class="tags-section">
        <h3><i class="fa-solid fa-hashtag fa-sm"></i> Tags</h3>
        <ul class="p-0 m-0">
            {% assign sorted_tags = site.posts | map: "tags" | flatten | uniq | compact | group_by_exp: "item", "item" | map: "name" | sort_by: "size" %}
            {% for tag in sorted_tags %}
                {% assign count = site.posts | where: "tags", tag | size %}
                <li>
                    <a href="{{ tag | slugify | prepend: '/archive/tag/' | relative_url }}">{{ tag }}</a>
                    <span class="count">({{ count }})</span>
                </li>
            {% endfor %}
        </ul>
    </div>
</div>

<!-- custom plugin that creates sortable_date to sort posts by last_updated (if exists) or date (if not) -->
{% assign sorted_posts = site.posts | sort: "sortable_date" | reverse %}
<div class="archive-posts">
    <div class="table-responsive">
      <table class="table table-sm table-borderless">
        {% for post in sorted_posts %}
          <tr>
            <th scope="row" style="width: 20%">
              {% if post.last_updated %}
                <span title="Created at {{ post.date | date: '%b %d, %Y' }} - Updated at {{ post.last_updated | date: '%b %d, %Y' }}">{{ post.last_updated | date: '%b %d, %Y' }}<br><sup class="text-muted">({{ post.date | date: '%b %d, %Y' }})</sup></span>
              {% else %}
                <span title="Created at {{ post.date | date: '%b %d, %Y' }}">{{ post.date | date: '%b %d, %Y' }}</span>
              {% endif %}
            </th>
            <td>
              {% if post.redirect == blank %}
                <a class="post-link" href="{{ post.url | relative_url }}">{{ post.title }}</a>
              {% elsif post.redirect contains '://' %}
                <a class="post-link" href="{{ post.redirect }}" target="_blank">{{ post.title }}</a>
                  <svg width="2rem" height="2rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9"
                      class="icon_svg-stroke"
                      stroke="#999"
                      stroke-width="1.5"
                      fill="none"
                      fill-rule="evenodd"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
              {% else %}
                <a class="post-link" href="{{ post.redirect | relative_url }}">{{ post.title }}</a>
              {% endif %}
                {% assign post_date_in_seconds = post.date | date: "%s" %}
                {% assign current_date_in_seconds = site.time | date: "%s" %}
                {% assign days_since = current_date_in_seconds | minus: post_date_in_seconds | divided_by: 86400 | floor %}
                {% if days_since <= 30 %}<span title="New post (less than 30 days old)">🆕</span>{% endif %}

              {% if post.popular %}<span title="Popular post">🔥</span>{% endif %}
              {% if post.featured %}<span title="Featured post">📌</span>{% endif %}

              <div class="post-metadata d-flex flex-wrap gap-3 mt-1">
                {% assign words = post.content | number_of_words %}
                {% assign read_time = words | divided_by: 180 | plus: 1 %}
                <span class="reading-time text-muted">
                  <i class="fa-regular fa-clock fa-sm me-1"></i> {{ read_time }} min read
                </span>
                &nbsp;
                &nbsp;
                {% if post.categories.size > 0 or post.redirect contains 'substack.com' %}
                  <span class="categories">
                    <i class="fa-solid fa-tag fa-sm"></i>
                    {% if post.redirect contains 'substack.com' %}
                      <a href="{{ 'newsletters' | slugify | prepend: '/archive/category/' | relative_url }}" class="text-decoration-none">Newsletter</a>
                    {% endif %}
                    {% for category in post.categories %}
                      <a href="{{ category | slugify | prepend: '/archive/category/' | relative_url }}" class="text-decoration-none">{{ category }}</a>{% unless forloop.last %}, {% endunless %}
                    {% endfor %}
                  </span>
                {% endif %}
                &nbsp;
                {% if post.tags.size > 0 %}
                  <span class="tags">
                    <i class="fa-solid fa-hashtag fa-sm"></i> {% for tag in post.tags %}<a href="{{ tag | slugify | prepend: '/archive/tag/' | relative_url }}" class="text-decoration-none">{{ tag }}</a>{% unless forloop.last %}, {% endunless %}{% endfor %}
                  </span>
                {% endif %}
              </div>
            </td>
        </tr>
        {% endfor %}
      </table>
    </div>
</div>

{% assign posts_by_year = sorted_posts | group_by_exp: "post", "post.sortable_date | date: '%Y'" %}

<!-- <div class="archive-years">
  {% for year in posts_by_year %}
    <h2 class="archive-year">{{ year.name }}</h2>
    <div class="table-responsive">
      <table class="table table-sm table-borderless">
        {% for post in year.items %}
          <tr>
            <th scope="row" style="width: 20%">
              {% if post.last_updated %}
                <span title="Created at {{ post.date | date: '%b %d, %Y' }} - Updated at {{ post.last_updated | date: '%b %d, %Y' }}"><span class="text-muted">{{ post.date | date: '%b %d, %Y' }}</span> - <br> {{ post.last_updated | date: '%b %d, %Y' }}</span>
              {% else %}
                <span title="Created at {{ post.date | date: '%b %d, %Y' }}">{{ post.date | date: '%b %d, %Y' }}</span>
              {% endif %}
            </th>
            <td>
              {% if post.redirect == blank %}
                <a class="post-link" href="{{ post.url | relative_url }}">{{ post.title }}</a>
              {% elsif post.redirect contains '://' %}
                <a class="post-link" href="{{ post.redirect }}" target="_blank">{{ post.title }}</a>
                  <svg width="2rem" height="2rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9"
                      class="icon_svg-stroke"
                      stroke="#999"
                      stroke-width="1.5"
                      fill="none"
                      fill-rule="evenodd"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
              {% else %}
                <a class="post-link" href="{{ post.redirect | relative_url }}">{{ post.title }}</a>
              {% endif %}
                {% assign post_date_in_seconds = post.date | date: "%s" %}
                {% assign current_date_in_seconds = site.time | date: "%s" %}
                {% assign days_since = current_date_in_seconds | minus: post_date_in_seconds | divided_by: 86400 | floor %}
                {% if days_since <= 30 %}<span title="New post (less than 30 days old)">🆕</span>{% endif %}

              {% if post.popular %}<span title="Popular post">🔥</span>{% endif %}
              {% if post.featured %}<span title="Featured post">📌</span>{% endif %}

              <div class="post-metadata d-flex flex-wrap gap-3 mt-1">
                {% assign words = post.content | number_of_words %}
                {% assign read_time = words | divided_by: 180 | plus: 1 %}
                <span class="reading-time text-muted">
                  <i class="fa-regular fa-clock fa-sm me-1"></i> {{ read_time }} min read
                </span>
                &nbsp;
                &nbsp;
                {% if post.categories.size > 0 or post.redirect contains 'substack.com' %}
                  <span class="categories">
                    {% if post.redirect contains 'substack.com' %}
                      <i class="fa-solid fa-tag fa-sm"></i>
                      <a href="{{ 'newsletters' | slugify | prepend: '/archive/category/' | relative_url }}" class="text-decoration-none">Newsletter</a>
                    {% endif %}
                    {% for category in post.categories %}
                      <i class="fa-solid fa-tag fa-sm"></i>
                      <a href="{{ category | slugify | prepend: '/archive/category/' | relative_url }}" class="text-decoration-none">{{ category }}</a>{% unless forloop.last %} · {% endunless %}
                    {% endfor %}
                  </span>
                {% endif %}
                &nbsp;
                {% if post.tags.size > 0 %}
                  <span class="tags">
                    {% for tag in post.tags %}
                      <i class="fa-solid fa-hashtag fa-sm"></i>
                      <a href="{{ tag | slugify | prepend: '/archive/tag/' | relative_url }}" class="text-decoration-none">{{ tag }}</a>{% unless forloop.last %} · {% endunless %}
                    {% endfor %}
                  </span>
                {% endif %}
              </div>
            </td>
          </tr>
        {% endfor %}
      </table>
    </div>
  {% endfor %}
</div> -->

{% if page.pagination.enabled %}
  {% include pagination.liquid %}
{% endif %}

</div> -->
