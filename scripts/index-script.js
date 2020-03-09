$(document).ready(function () {
    var loadMore = $('#loadMore');
    $.ajax({
        url: "https://jsonplaceholder.typicode.com/posts",
        Type: "GET",
        success: function (resp) {
            var number;
            var heading;
            var body;
            var article;
            var arr = [];
            var start = 0;
            var end = 10;
            var list;

            //store API data on LocalStorage
            if (localStorage.getItem('dataArr')) {
                list = JSON.parse(localStorage.getItem('dataArr'));
            } else {
                localStorage.setItem('dataArr', JSON.stringify(resp));
                list = resp;
            }


            //show data in DOM
            for (var i = 0; i < list.length; i++) {
                number = $('<span>').html(list[i].id);
                heading = $('<h2>').html(list[i].title);
                body = $('<p>').html(list[i].body);
                article = $('<article>');
                article.append(number);
                article.append(heading);
                article.append(body);
                arr.push(article);
            }

            $('main').append(arr.slice(start, end));


            // handle load more action 
            // show 10 items at first , then increase by 10 items on click
            loadMore.on('click', function () {
                $("table").append(arr.slice(start + 10, end + 10));
                start += 10;
                end += 10;
                list.length -= 10;

                if (list.length != 10) {
                    loadMore.css('visibility', 'visible');
                } else {
                    loadMore.css('visibility', 'hidden');
                }
            })
        },
    });

})