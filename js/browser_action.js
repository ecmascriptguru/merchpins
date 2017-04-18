jQuery(document).ready(function($){
    $("#number_pages").keypress(function( event ) {
        if ( event.which == 13 ) {
            event.preventDefault();
            $('#start_reordering').click();
        } 
    });

    $('#start_reordering').click(function(){
        var numberPages = $('#number_pages').val();
        chrome.runtime.sendMessage({main_action: 'reorder', number_pages: (numberPages || 1)});

        window.close();
    });
})
