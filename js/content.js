var loadRepins = (function() {

    var pages = 5;
    var count = 0;
    var mylist = [];
    var timeout;

    function load() {

        $('.Pin').each(function() {
            mylist.push($(this)[0])
        });

        if (pages > 0) {

            $(window).scrollTop($(document).height());

            timeout = window.setTimeout(load, 4000);

            count++;
            if (count == pages) {
                finish();
            }

        } else {
            finish();
        }
    }

    function finish() {

        window.clearTimeout(timeout);

        var list = mylist.filter(function(f) {
            if ($(f).find('.repinIconSmall').length > 0) {
                return f;
            }
        });

        list.sort(function(a, b) {
            var compAText = $(a).find('.repinIconSmall').next().text().trim(),
                compBText = $(b).find('.repinIconSmall').next().text().trim();
            // var compA = Number(compAText.replace(/[^0-9]/g, ''));
            // var compB = Number(compBText.replace(/[^0-9]/g, ''));
            var compA = turnK(compAText);
            var compB = turnK(compBText);
            return (compA == compB) ? 0 : (compA > compB) ? -1 : 1;
        });

        if ($(".Grid").length) {
            $(".Grid").before('<div id="organized"></div>');
        } else {
            $(".gridCentered").before('<div id="organized"></div>');
        }


        $.each(list, function(idx, itm) {
            $("#organized").append($(itm));
        });

        $('.Pin').css({
            'position': 'relative',
            'top': 'auto',
            'left': 'auto',
            'display': 'inline-block',
            'vertical-align': 'top',
            'margin-left': 10
        });

        if ($(".Grid").length) {
            $(".Grid").remove();
        } else {
            $(".gridCentered").remove();
        }

        chrome.runtime.sendMessage({main_action: 'reorder_done'});
    }

    function turnK(text) {
        var number = Number(text.replace(/[^0-9]/g, ''));
        if (text.indexOf("k") !== -1) {
            number = number * 1000;
        }
        return number;
    }

    function resetValues(pageCount, initialCount, list) {
        pages = pageCount;
        count = initialCount;
        mylist = list;
        clearTimeout(timeout);
    }

    return function(page) {
        resetValues(page, 0, []);
        load();
    }

}());



chrome.runtime.onMessage.addListener(
    function(request) {
        if (request.main_action === "reorder") {
            console.log("Sort by repins");
            loadRepins(request.number_pages);
        } else if (request.main_action == "sort_by_likes") {
            // console.log("Sort by likes");
            // loadLikes(request.pages);
        }
    }
);