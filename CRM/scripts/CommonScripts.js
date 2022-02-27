function AjaxCallSave(url, Contentdata)
{
    $.ajax({
        type: "POST",
        async: false,
        url: url,
        data: Contentdata,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            alert(data);
        },
        error:function(){
            alert("Something happen wrong!");
        }
    });

}

function AjaxCall(url, Contentdata) {
    $.ajax({
        type: "POST",
        url: url,
        data: Contentdata,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            return data;
        }
    });

}