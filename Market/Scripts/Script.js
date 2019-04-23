var commands="";
$(document).ready(function () {
    $('#ok').bind('click', function () {
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

    $('#confirm').bind('click', function () {
        $.ajax({
            url: "/Update/Change/",
            type: "POST",
            dataType: "text",
            data: { "commands": commands },
            error: function (response) {
                alert("Server is fallen");
            }
        });
    });

    $('#table').on("click", "td", function (e) {

        var t = e.target || e.srcElement;
        if (t.tagName.toLowerCase() == 'input') {
            var id = t.getAttribute("id");
            $("#" + id + "").focus();
            return;
        }
        var val = $(this).text();
        $(this).html("<input type='text' value='" + val + "' name='" + $(this).attr('id') + "' id='" + $(this).attr('id') + "'/>");
        $(this).find('input').focus();
        $(this).find('input').blur(function (e) {
            if (val != $(this).val()) {
                var a = $(this).parent().parent().attr('id');
                commands += "UPDATE " + $("select#update").val() + " SET " + $(this).attr('id') + "='" + $(this).val() + "' WHERE id=" + $(this).parent().parent().attr('id') + "; ";
                $(this).attr('readonly', true).removeAttr("id");
            }
            else {
                $(this).parent().html($(this).val());
            }
        });
    });
});

function onAjaxSuccess(data) {
    $("#table").empty();
    data = jQuery.parseJSON(data);
    $("#table").append("<caption><h1>" + $("select option:selected").html() + "</h1></caption>");
    $("#table").append("<tr id='title'>");
    for (var key in data[0]) {
        if (key == "id") {
            continue;
        }
        $("#title").append("<th>" + key + "</th>");
    }
    for (var i = 0; i < data.length; i++) {
        $("#table").append("<tr id='" + data[i].id + "'>");

        for (var key in data[i]) {
            if (key == "id") {
                $("#" + data[i].id + "").append("<input type = 'hidden' value='" + (data[i])[key] + "'/>");
            }
            else {
                $("#" + data[i].id + "").append("<td id='" + key + "'>" + (data[i])[key] + "</td>");
            }
        }
    }
    $("#table").append("<tr id='bottom'>");
    $("#confirm").attr('value', $("select option:selected").val());
}

