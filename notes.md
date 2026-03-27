---
title: Notes
permalink: /notes/
layout: page
---

Vietnamese: [nipponkiyoshi.com](https://nipponkiyoshi.com/)

Trang này tôi chủ yếu để tiếng Anh. Tôi cũng viết Blog bằng tiếng Việt, chia sẻ nhiều thứ về kinh tế học, Nhật Bản, kinh nghiệm học tập và những thứ tôi thấy thú vị. Mọi người có thể tìm hiểu thêm về [blog tại đây](https://nipponkiyoshi.com/).

<div class="posts">
  {% for post in site.posts %}
    <article class="post">

      <h1><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></h1>

      <div class="entry">
        {{ post.excerpt }}
      </div>

      <a href="{{ site.baseurl }}{{ post.url }}" class="read-more">Read More</a>
    </article>
  {% endfor %}
</div>