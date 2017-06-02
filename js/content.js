var interval = null;
var currentHeight = null;

chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg.main_action == 'reorder') {
        startReordering(msg.number_pages);
    }
    if (msg.main_action == 'show_window') {
        if ($('.merchipins-window').length > 0) {
            $('.merchipins-window').remove();
        } else {
            $('body').append('<img class="merchipins-window" style="cursor: pointer;  z-index: 999999; border: none; position: fixed; top: 11px; right: 21px; " src="'+chrome.extension.getURL('images/close.png')+'" />');
            $('body').append('<iframe class="merchipins-window" id="merchipins-window" style="background: #999; box-shadow: 1px 1px 5px #888888; border: 1px solid #CCC; z-index: 99999; border: none; position: fixed; top: 20px; right: 30px; width:350px; height: 270px;" src="'+chrome.extension.getURL('html/browser_action.html')+'" />')

            $('img.merchipins-window').click(function(){
                $('.merchipins-window').remove();
            });
        }
    }
});

function startReordering(pages) {
    $('.merchipins-window').remove();
    $('body').append('<div id="loading-page-merchpins" style="opacity: 0.4; background: black; position: fixed; top: 0px; left: 0px; right: 0px; bottom: 0px; text-align: center;"><img style="position: fixed; top: 45%; margin-left:-40px;" width="80px" src="'+chrome.extension.getURL('images/loader.svg')+'" /></div>')
    currentHeight = $('.variableHeightLayout').height();

    interval = setInterval(function(){
        var tempHeight = $('.variableHeightLayout').height();
        if (currentHeight != tempHeight) {
            currentHeight = tempHeight;

            pages--;
            if (pages > 0) {
                oneMorePage();
            } else {
                clearAndFinish();
            }
        }

        if ($('.gridFooterLogoIcon').is(":visible")) {
            clearAndFinish();
        }
    }, 100);

    oneMorePage();
}

function clearAndFinish() {
    clearInterval(interval);
    reorderResults();
    reorderIsDone();
}

function oneMorePage() {
    $("html, body").scrollTop(document.body.clientHeight);
}

function compare(a,b) {
  if (a.num < b.num)
    return -1;
  if (a.num > b.num)
    return 1;
  return 0;
}

function reorderResults() {

    var leftColumns = {};
    var pins = [];
    $('.item').each(function() {
        leftColumns[$(this).position().left] = 1;

        $('.visuallyHidden').remove();
        var temp = $.trim($(this).find('.repinCountSmall').text()).replace(/k/g, '000');
        if (temp.indexOf('.') > 0 || temp.indexOf(',') > 0) {
            temp = temp.replace('0', ''); // remove one zero
        }

        var pinCount = parseInt(temp.replace(/,/g, '').replace(/\./g,''));

        pins.push({num: pinCount, html: $(this).html()});
    });
    numberColumns = Object.keys(leftColumns).length;

    var item = 0;
    pins.sort(compare).reverse().forEach(function(one) {
        var el = $('.item').eq(item);
        el.html(one.html);
        item++;
    });


    item = 0;
    var heights = [];
    var biggestHeight = 0;
    var totalheight = 0;
    $('.item').each(function(){
        
        $(this).css({'top' : totalheight + 'px'});
        $(this).css({'left': Object.keys(leftColumns)[heights.length] + 'px'});

        heights.push($(this).find('img').height()+$(this).find('.pinMetaWrapper').outerHeight()+50);
        $(this).height(getMax(heights));

        if (heights.length == numberColumns) {
            biggestHeight = getMax(heights);

            for (var i=0; i<numberColumns; i++) {
                $('.item').eq(item-i).height(biggestHeight);
            }

            totalheight += $('.item').eq(item).outerHeight();

            heights = [];
        }

        item++;
    });

    $("html, body").scrollTop(0);
  
}

function getMax(arr) {
    return Math.max.apply(Math, arr)
}

function reorderIsDone() {
    $('#loading-page-merchpins').remove();
    chrome.runtime.sendMessage({main_action: 'reorder_done'});
}