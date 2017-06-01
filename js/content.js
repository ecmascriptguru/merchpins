var interval = null;
var currentHeight = null;
var globalPins = null;

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
        reorderIsDone();
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

chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg.main_action == 'reorder') {
        loadRepins(msg.number_pages);
        // startReordering(msg.number_pages);
    }
});

// function startReordering(pages) {
//     $('body').append('<div id="loading-page-merchpins" style="opacity: 0.4; background: black; position: fixed; top: 0px; left: 0px; right: 0px; bottom: 0px; text-align: center;"><img style="position: fixed; top: 45%; margin-left:-40px;" width="80px" src="'+chrome.extension.getURL('images/loader.svg')+'" /></div>')
//     currentHeight = $('.variableHeightLayout').height();

//     interval = setInterval(function(){
//         // var tempHeight = $('.variableHeightLayout').height();
//         // if (currentHeight != tempHeight) {
//         //     currentHeight = tempHeight;

//             pages--;
//             if (pages > 0) {
//                 oneMorePage();
//             } else {
//                 clearAndFinish();
//             }
//         // }

//         // if ($('.gridFooterLogoIcon').is(":visible")) {
//         //     clearAndFinish();
//         // }
//     }, 500);

//     oneMorePage();
// }

// function clearAndFinish() {
//     clearInterval(interval);
//     reorderResults();
//     reorderIsDone();
// }

// function oneMorePage() {
//     if (!globalPins) {
//         globalPins = $(".Pin");
//     } else {
//         $(".Pin").each(() => {
//             globalPins.push($(this)[0]);
//         });
//     }
//     $("html, body").scrollTop(document.body.clientHeight);
// }

// function compare(a,b) {
//   if (a.num < b.num)
//     return -1;
//   if (a.num > b.num)
//     return 1;
//   return 0;
// }

// function reorderResults() {

//     var leftColumns = {};
//     var pins = [];
//     // $('.Pin').each(function() {
//     globalPins.each(function() {
//         leftColumns[$(this).position().left] = 1;

//         $('.visuallyHidden').remove();
//         var pinCount = parseInt($.trim($(this).find('.repinCountSmall').text()).replace(/k/g, '00').replace(/,/g, '').replace(/\./g,''));//)

//         pins.push({num: pinCount, html: $(this).html()});
//     });
//     numberColumns = Object.keys(leftColumns).length;

//     var item = 0;
//     pins.sort(compare).reverse().forEach(function(one) {
//         var el = $('.item').eq(item);
//         el.html(one.html);
//         item++;
//     });


//     item = 0;
//     var heights = [];
//     var biggestHeight = 0;
//     var totalheight = 0;
//     // $('.item').each(function(){
//     globalPins.each(function(){
        
//         $(this).css({'top' : totalheight + 'px'});
//         $(this).css({'left': Object.keys(leftColumns)[heights.length] + 'px'});

//         heights.push($(this).find('img').height()+$(this).find('.pinMetaWrapper').outerHeight()+50);
//         $(this).height(getMax(heights));

//         if (heights.length == numberColumns) {
//             biggestHeight = getMax(heights);

//             for (var i=0; i<numberColumns; i++) {
//                 $('.item').eq(item-i).height(biggestHeight);
//             }

//             totalheight += $('.item').eq(item).outerHeight();

//             heights = [];
//         }

//         item++;
//     });

//     $("html, body").scrollTop(0);
  
// }

// function getMax(arr) {
//     return Math.max.apply(Math, arr)
// }

function reorderIsDone() {
    $('#loading-page-merchpins').remove();
    $("html, body").scrollTop(0);
    chrome.runtime.sendMessage({main_action: 'reorder_done'});
}