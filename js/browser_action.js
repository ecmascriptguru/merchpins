jQuery(document).ready(function($){
    $('#start_reordering').click(function(){
        var numberPages = $('#number_pages').val();
        chrome.runtime.sendMessage({main_action: 'reorder', number_pages: (numberPages || 1)});
        window.close();
    });
})
