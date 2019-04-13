$(document).ready(function () {
    $('button').bind('click', function () {
        //console.log(location.pathname);
        var a = $("select#update").val();
        $.ajax({
            url: "/Update/Select/",  
            type: "POST", 
            dataType: "text", 
            data: "table=" + a,
            success: onAjaxSuccess,
            error: function (response) { 
                alert("Server is fallen");
            }
        });
    });
});

function onAjaxSuccess(data) {
    $("#table").empty();
    data = jQuery.parseJSON(data);
    $("#table").append("<caption><h1>" + $("select option:selected").html()+"</h1></caption>");
    for (var key in data[0]) {
        $("#table").append("<th>" + key + "</th>");
    }
    for (var i = 0; i < data.length; i++) {
        $("#table").append("<tr>");
        for (var key in data[i]) {
            $("#table").append("<td>" + (data[i])[key]+"</td>");
        }
        $("#table").append("</tr>");
    }
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
