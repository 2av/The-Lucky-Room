//$("#chkIsParent").change(function () {
//    if ($("#chkIsParent").is(":checked")) {
//        $("#ddParentName").parent(".col-lg-6").hide();
//    }
//    else {

//        $("#ddParentName").parent(".col-lg-6").show();
//    }

//});

function Validation() {
    
    var isvalid = true;
    var ErrorMessage = [];
    if ($("#MenuName").val().trim() == "") {
        isvalid = false;
        ErrorMessage.push("Please Enter Menu Name");
    }


}