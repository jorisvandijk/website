---
layout: default
title: Blog
nav_exclude: true
permalink: /blog/
---

# Blog

{% for post in site.posts %}
<div class="post-entry">
  <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
  <p class="post-meta">{{ post.date | date: "%B %d, %Y" }}</p>
  <p>{{ post.excerpt }}</p>
  <a href="{{ post.url | relative_url }}">Read more...</a>
</div>
{% endfor %}
