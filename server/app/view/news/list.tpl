<!--
 * @Description: 
 * @version: 
 * @Author: LuyunSheng
 * @Date: 2022-09-01 14:49:00
 * @LastEditTime: 2022-09-01 14:52:27
-->
<!-- app/view/news/list.tpl -->
<html>

<head>
    <title>Hacker News</title>
    <link rel="stylesheet" href="/public/css/news.css" />
</head>

<body>
    <ul class="news-view view">
        {% for item in list %}
        <li class="item">
            <a href="{{ item.url }}">{{ item.title }}</a>
        </li>
        {% endfor %}
    </ul>
</body>

</html>