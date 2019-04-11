$(document).ready(function () {
    $('button').bind('click',function () {
        var a = $("select#update").val();
        $.ajax({
            url: "/Update/Select/",  
            type: "POST", 
            dataType: "text", 
            data: "table=" + a,
            success: onAjaxSuccess,
            error: function (response) { 
                alert("Server is fall");
            }
        });
    });
});

function onAjaxSuccess(data) {
    data = jQuery.parseJSON(data);
}


//$(function editEntry() {
//    $('td.artist, td.title').click(function (e) {
//        var t = e.target || e.srcElement;
//        var elm_name = t.tagName.toLowerCase();
//        if (elm_name == 'input') return false;
//        var itemId = $(this).parent().attr('id');
//        var val = $(this).html();
//        var itemClass = $(this).attr('class');
//        var code = '<input type="text" id="edit" value="' + val + '" />';
//        $(this).empty().append(code);
//        $('#edit').focus();
//        $('#edit').blur(function () {
//            var val = $(this).val();
//            $(this).parent().empty().html(val);

//        });
//        $(window).keydown(function (event) {
//            if (event.keyCode == 13) {
//                $('#edit').blur();
//            }
//        });
//    });
//});
