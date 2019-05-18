var commands = new Map();
var length;
var table;
var lmap = commands.size;
var lrow = 0;
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
        if ($(this).parent().parent().attr('class') == 'add') {
            $(this).parent().parent().remove();
        }
        else {
            $(this).attr('map', commands.size);
            commands.set(lmap++, "DELETE FROM " + $("select#update").val() + " WHERE id=" + $(this).parent().parent().attr('id') + "; ")
            $(this).parent().parent().children("td").css('background-color', 'blue');
            $(this).attr('src', '/Content/img/plus.png');
            $(this).attr('class', 'recover');
        }
    });

    $('#table').on("click", ".recover", function () {
        $(this).parent().parent().children("td").css("background-color", "");
        $(this).attr('src', '/Content/img/minus.png');
        $(this).attr('class', 'delete');
        commands.delete(Number($(this).attr('map')));
    });

    $('#confirm').bind('click', function () {
        var b = false;
        $('#table').children('.add').each(function () {
            var params = "";
            var values = "";
            var i = 0;
            $(this).children('td').each(function () {
                i++;
                if (i == lrow) {
                    params += $(this).attr('id');
                    values += "'" + $(this).children('input').val() + "'";
                    if ($(this).children('input').val() == null) {
                        alert("Заполните ячейки полностью!");
                        b = true;
                        return;
                    }
                }
                else {
                    params += $(this).attr('id') + ",";
                    values += "'" + $(this).children('input').val() + "',";
                }
            })
            commands.set(lmap++, "INSERT INTO " + $("select#update").val() + "(" + params + ")" + " VALUES (" + values + "); ");
        });
        if (b)
            return;
        var com="";
        commands.forEach(function (value) {
            com += value;
        });
        $.ajax({
            url: "/Update/Change/",
            type: "POST",
            data: {
                "commands": com
            },
            error: function (response) {
                alert("Server is fallen");
            }
        });
    });

    $('#add').bind('click', function () {
        $("#table").append("<tr class='add' id='" + length + "'>");
        for (var key in table[0]) {
            if (key == "id") {
                continue;
            }
            else {
                $("#" + length + "").append("<td id='" + key + "'></td>");
            }
        }
        $("#" + length + "").append("<th><img src='/Content/img/minus.png' class='delete'/></th>");
        length++;
        $(".delete").css('cursor', ' pointer');
    });

    $('#table').on("click", "td", function (e) {
        var val;
        var cmap;
        var a = $(this).width();
        var t = e.target || e.srcElement;
        if (t.tagName == "INPUT") {
            val = t.value;
            cmap = $(this).find('input').attr('map');
        }
        else {
            val = $(this).text();
            cmap = commands.size;
            $(this).html("<input type='text' name='" + $(this).attr('id') + "' id='" + $(this).attr('id') + "'/>");
            $(this).children('input').blur(function (e) {
                if ($(this).parent().parent().attr('class') == 'add')
                    return;
                var i = $(this).parent().parent().attr('id') - 1;
                var key = $(this).attr('id');
                $(this).attr('map', commands.size);
                var name = $(this).val();
                var tname = table[i][key];
                if (name != tname) {
                    var a = $(this).parent().parent().attr('id');
                    commands.set(lmap++, "UPDATE " + $("select#update").val() + " SET " + $(this).attr('id') + "='" + $(this).val() + "' WHERE id=" + $(this).parent().parent().attr('id') + "; ")
                    //$(this).removeAttr("id");
                    var thval = $(this).val();
                    if (thval != val) {
                        var n = Number($(this).attr('map'));
                        commands.delete(n);
                        commands.set(n, "UPDATE " + $("select#update").val() + " SET " + $(this).attr('id') + "='" + $(this).val() + "' WHERE id=" + $(this).parent().parent().attr('id') + "; ")
                    }
                }
                else {
                    var n = Number($(this).attr('map'));
                    commands.delete(Number($(this).attr('map')));
                    $(this).removeAttr('map');
                    $(this).parent().html($(this).val());
                }
            });
        }
        $(this).find('input').attr('value', val);
        $(this).find('input').attr('map', cmap);
        $(this).find('input').css('width', a);
        $(this).find('input').css('border', 'none');
        $(this).find('input').css('outline', 'none');
        $(this).find('input').css('text-decoration', 'none');
        $(this).find('input').focus();
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
        lrow++;
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
    $("#confirm").attr('type', 'submit');
    $("#add").append("<img src='/Content/img/plus.png' id='plus'>");
    $("#add").css('cursor', ' pointer');
    $(".delete").css('cursor', ' pointer');
}

