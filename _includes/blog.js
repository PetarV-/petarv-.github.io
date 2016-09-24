(function(entrypoint) {
        entrypoint(window.jQuery, window, document);
}(function($, window, document) {
    var posts, months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];

    /* To avoid the usage of a heavyweight library such as Moment.js, as we
     * only need easy date formatting */
    function formatDate(date) {
        return s = months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
    }

    function displayPosts(posts) {
        /* Hardcoded view - not a good practice. To solve this in an elegant way and
         * without any backend code, we need a full-blown MVC framework which is obviously 
         * an overkill. */

        var html = 
            ' \
            <article class="blog-post-brief"> \
            <h1><a></a></h1> \
            <div class="meta"> \
            by <span class="author"></span> \
            on <time pubdate></time> \
            </div> \
            <p class="blurb"> \
            </p> \
            </article>',
            template = $(html),
            par = $('#blog-main');

        par.children('article, p').remove();
        if (posts.length > 0) {
            for (var i = 0; i < posts.length; i++) {
                var post = posts[i], node = template.clone();

                node.find('h1 a')
                    .text(post.title)
                    .attr('href', post.url);

                node.find('.author')
                    .text(post.author);

                node.find('.blurb')
                    .html(post.blurb);

                node.find('time')
                    .text(formatDate(new Date(post.date)));

                par.append(node);
            }
        } else {
            par.append($('<p>No results matching your search found.</p>'));
        }
    };

    function addOrRemove(checked, array, item) {
        var i = array.indexOf(item);
        if (checked && i < 0) {
            array.push(item);
        } else if (!checked && i >= 0) {
            array.splice(i, 1);
        }
    }

    function dateToIndex(date) {
        return 12 * parseInt(date.getFullYear()) + parseInt(date.getMonth());
    }

    $(function() {
        $.get('blog.json', function(resp) {
            posts = resp.posts;
            var postsByCategory = {}, categoryList = [], monthsMap = {}, monthList = [];

            for (var i = 0; i < posts.length; i++) {
                var post = posts[i];

                /* For each category the post belongs to, add it to the appropriate 
                 * category array */
                for (var j = 0; j < post.categories.length; j++) {
                    var category = post.categories[j];
                    if (postsByCategory[category] === undefined) {
                        postsByCategory[category] = [ i ];
                        categoryList.push(category);
                    } else {
                        postsByCategory[category].push(i);
                    }
                }

                /* Also add the post to the appropriate date hash */
                var date = new Date(post.date), idx = dateToIndex(date);
                if (monthsMap[idx] === undefined) {
                    monthsMap[idx] = true;
                    monthList.push(idx);
                }
            }

            function search(query, searchCategories, searchMonths) {
                var resultMap = {};
                query = query.toLowerCase();

                /* Modify to taste. */
                function queryMatch(title) {
                    if (typeof query === 'string' && query.length > 0) {
                        return title.toLowerCase().indexOf(query) != -1;
                    } else {
                        return true;
                    }
                }

                /* For each category we are querying */
                for (var i = 0; i < searchCategories.length; i++) {
                    var cat = postsByCategory[searchCategories[i]];

                    if (typeof cat !== 'undefined') {
                        /* For each post in the category */
                        for (var j = 0; j < cat.length; j++) {
                            var ok_month = false, postIdx = cat[j], date = new Date(posts[postIdx].date), 
                                idx = dateToIndex(date);

                            /* If the post belongs to one of the queried months, we can go forward. */
                            for (var k = 0; k < searchMonths.length; k++) {
                                if (idx == searchMonths[k]) {
                                    ok_month = true;
                                    break;
                                }
                            }

                            /* And if the query matches too, we've found ourselves a positive. */
                            if (ok_month && queryMatch(posts[postIdx].title)) {
                                resultMap[postIdx] = true;
                            }
                        }
                    }
                }

                var results = [];
                for (var i in resultMap) {
                    if (resultMap.hasOwnProperty(i)) {
                        results.push(posts[i]);
                    }
                }

                return results;
            }

            var searchBoxDesktop = $('#search-box-desktop'),
                searchBoxMobile = $('#search-box-mobile'),
                categorySelection = $('#blog-categories ul'),
                monthSelection = $('#blog-months ul'),
                
                currentQuery = {
                    query: '',
                    categories: categoryList.slice(0),
                    months: monthList.slice(0)
                };

            function searchAndDisplay() {
                var results = search(currentQuery.query, currentQuery.categories, currentQuery.months);
                displayPosts(results);
            }

           searchBoxDesktop.keyup(function() {
                currentQuery.query = this.value;
                searchAndDisplay();
            });

            searchBoxMobile.keyup(function() {
                currentQuery.query = this.value;
                searchAndDisplay();
            });

            categorySelection.find('li input').each(function() {
                $(this).change(function() {
                    var c = $(this).attr('data-category-name');
                    addOrRemove(this.checked, currentQuery.categories, c);
                    searchAndDisplay();
                });
            });

            monthSelection.find('li input').each(function() {
                $(this).change(function() {
                    var m = 12 * parseInt($(this).attr('data-year')) + (parseInt($(this).attr('data-month')) - 1);
                    addOrRemove(this.checked, currentQuery.months, m);
                    searchAndDisplay();
                });
            });
        });
    });
}));
