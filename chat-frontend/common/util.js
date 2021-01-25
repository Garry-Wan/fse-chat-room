function getLength(obj){

    var count = 0;
    for(var i in obj){
        count++;
    }

    return count;
}
// iterable arry object
function getValue(data) {
    $.each(data,function(i, obj) {
        $.each(obj,function(k,v){
            if(k=="policyTemplateName"){
                console.log(v);
            }
        });
    });
}
// load scorll bar
function loadScorll(id) {

     var scrollHeight = $(id).prop("scrollHeight");
    // $(id).animate({scrollTop:$("#chat").height()}, 1000);
    $(id).animate({scrollTop:scrollHeight}, 1000);
}

function loadAnimation(inDuration, outDuration) {
    $(".animsition").animsition({
        inClass: 'fade-in',
        outClass: 'fade-out',
        inDuration: inDuration,
        outDuration: outDuration,
        linkElement: '.animsition-link',
        // e.g. linkElement   :   'a:not([target="_blank"]):not([href^=#])'
        loading: false,
        loadingParentElement: 'body', //animsition wrapper element
        loadingClass: 'animsition-loading',
        unSupportCss: ['animation-duration',
            '-webkit-animation-duration',
            '-o-animation-duration'
        ],
        //"unSupportCss" option allows you to disable the "animsition" in case the css property in the array is not supported by your browser.
        //The default setting is to disable the "animsition" in a browser that does not support "animation-duration".
        overlay: false,
        overlayClass: 'animsition-overlay-slide',
        overlayParentElement: 'body'
    });
}