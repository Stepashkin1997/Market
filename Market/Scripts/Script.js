var commands = "";
var length;
var table;
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

    $('#table').on("click", ".delete", function () {
        commands += "DELETE FROM " + $("select#update").val() + " WHERE id=" + $(this).parent().parent().attr('id') + "; ";
        $(this).parent().parent().children("td").css('background-color', 'blue');
        $(this).attr('src', '/Content/img/plus.png');
        $(this).attr('class','recover');
    });

    $('#table').on("click", ".recover", function () {
        $(this).parent().parent().children("td").css("background-color", "");
        $(this).attr('src', '/Content/img/minus.png');
        $(this).attr('class', 'delete');
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

    $('#add').bind('click', function () {
        $("#table").append("<tr id='" + length + "'>");
        for (var key in table[0]) {
            if (key == "id") {
                continue;
            }
            else {
                $("#" + length + "").append("<td id='" + key + "'>...</td>");
            }
        }
        $("#" + length + "").append("<th><img src='/Content/img/minus.png' class='delete'/></th>");
        length++;
        $(".delete").css('cursor', ' pointer');
    });

    $('#table').on("click", "td", function (e) {

        var t = e.target || e.srcElement;


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
    $("#add").empty();
    $("#table").empty();
    data = jQuery.parseJSON(data);
    table = data;
    $("#table").append("<caption><h1>" + $("select option:selected").html() + "</h1></caption>");
    $("#table").append("<tr id='title'>");
    for (var key in data[0]) {
        if (key == "id") {
            continue;
        }
        $("#title").append("<th>" + key + "</th>");
    }
    $("#title").append("<th>delete</th>");
    length = data.length + 1;
    for (var i = 0; i < data.length; i++) {
        $("#table").append("<tr id='" + data[i].id + "'>");

        for (var key in data[i]) {
            if (key == "id") {
                continue;
            }
            else {
                $("#" + data[i].id + "").append("<td id='" + key + "'>" + (data[i])[key] + "</td>");
            }
        }
        $("#" + data[i].id + "").append("<th><img src='/Content/img/minus.png' class='delete'/></th>");
    }
    $("#add").append("<img src='/Content/img/plus.png' id='plus'>");
    $("#add").css('cursor', ' pointer');
    $(".delete").css('cursor', ' pointer');
    $("#confirm").attr('value', $("select option:selected").val());
}

