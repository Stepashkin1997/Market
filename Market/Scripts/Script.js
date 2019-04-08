$(document).ready(function () {
    $('#country').change(function () {
        var a = $("select#country").val();
        $.ajax({
            url: "/Home/CitySearch/", //url страницы 
            type: "POST", //метод отправки
            dataType: "text", //формат данных
            data: "country=" + a,
            success: onAjaxSuccess,
            error: function (response) { // Данные не отправлены
                alert("Server is fall");;
            }
        });
    });
});

function onAjaxSuccess(data) {
    $("#city").empty();
    data = jQuery.parseJSON(data);
    $("#city").append("<option value='All'>All</option>");
    for (var i = 0; i < data.length; i++) {
        $("#city").append("<option value=" + data[i].Name + ">" + data[i].Name + "</option>");
    }
    1
}