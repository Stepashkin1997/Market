$(document).ready(function () {
    $('button').bind('click',function () {
        var a = $("select#update").val();
        $.ajax({
            url: "/Update/Select/",  
            type: "POST", 
            dataType: "text", 
            data: "table=" + a,
            success: function (response) {
                alert("Right");
            },
            error: function (response) { 
                alert("Server is fall");
            }
        });
    });
});

//function onAjaxSuccess(data) {
//    $("#city").empty();
//    data = jQuery.parseJSON(data);
//    $("#city").append("<option value='All'>All</option>");
//    for (var i = 0; i < data.length; i++) {
//        $("#city").append("<option value=" + data[i].Name + ">" + data[i].Name + "</option>");
//    }
//    1
//}


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
