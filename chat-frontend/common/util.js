function getLength(obj){

    var count = 0;
    for(var i in obj){
        count++;
    }

    return count;
}
// iterable arry object
function getvalue(data) {
    $.each(data,function(i, obj) {
        $.each(obj,function(k,v){
            if(k=="policyTemplateName"){
                console.log(v);
            }
        });
    });
}
function loadscorll(id) {

     var scrollHeight = $(id).prop("scrollHeight");
    // $(id).animate({scrollTop:$("#chat").height()}, 1000);
    $(id).animate({scrollTop:scrollHeight}, 1000);
}