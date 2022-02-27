var MyreferalCode = "";

function RoomJoined(RoomsId) {
    bootbox.confirm({
        message: "Are you ready to joined!",
        buttons: {
            confirm: {
                label: 'Yes',
                className: 'btn-success'
            },
            cancel: {
                label: 'No',
                className: 'btn-danger'
            }
        },
        callback: function (result) {
            if (result) {
                $.ajax({
                    type: "POST",
                    url: "/UserDashboard/RoomJoined",
                    data: JSON.stringify({ RoomsId: RoomsId }),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        bootbox.alert({
                            message: data,
                            callback: function () {
                                location.reload();
                            }
                        })
                       
                    },
                    error: function () {
                        //location.href = "/Users/Login";*
                    }
                });
            }
        }
    });
}
function MyDetails() {
    $(".loader-area").show();
    $.ajax({
        type: "POST",
        url: "/UserDashboard/MyDetails",
        data: JSON.stringify({}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $(".accountbalance").html("Wallet Balance: Rs. " + parseFloat(data.AccountBalance).toFixed(2));
            $(".MyreferalCode").html(data.MyreferalCode);
            MyreferalCode = data.MyreferalCode;
            $(".TotalRefered").html(data.TotalRefered);
            if (data.CollectedPoints == null || data.CollectedPoints == "") {
                data.CollectedPoints = 0;
            }
            var earningamount = parseFloat(data.CollectedPoints * 0.00002).toFixed(2);
            $(".CollectedPoints").html(data.CollectedPoints + " (Rs. " + earningamount + ")");
            $(".loader-area").hide();

            var OnlineUser = data.OnlineUser;
            var html = "<div class='onlineuser'>";
            html += "<lable class='onlineuser-count'>" + OnlineUser.length + " users online</lable>";
            html += "<div class='user-list'>";
            for (var i = 0; i < OnlineUser.length; i++) {
                var path = "../Content/Images/default-icon.png";
                html += "<div class='row'>";
                html += "<div class='col-md-12'><img src='"+path+"' class='img-profileicon'/> <lable>" + OnlineUser[i].UserName + "</div>";// <span class='glyphicon glyphicon-send'></span></lable> | <span class='glyphicon glyphicon-save'>0</span></div>";
                html += "</div>";
            }
            html += "</div>";
            html += "</div>";
            $(".onlineuser-area").html(html);
        },
        error: function () {
            //location.href = "/Users/Login";*
        }
    });
}
function MyRoomsJoined() {
    $(".loader-area").show();
    $.ajax({
        type: "POST",
        url: "/UserDashboard/MyRoomsJoined",
        data: JSON.stringify({}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var html = "<div class='TopHeaderTitle'>Your Runing Room Status<div>" +
                "<span class='amountinuse'></span> | <span class='profitamount'></span></div></div>";
            html += "<div class='row' style='width:100%;margin-left:0px'>";
            var AmountIntUse = 0;
            
            for (var i = 0; i < data.length; i++) {
                var RoomsId = data[i].RoomsId;
                var RoomGid = data[i].RoomGid;
                var MembersJoined = data[i].MembersJoined;
                var GroupId = data[i].GroupId;
                var RoomName = data[i].RoomName;
                var EntryPrice = data[i].EntryPrice;
                var RoomJoinedId = data[i].RoomJoinedId;
                var MembersNo = data[i].MembersNo;

                html += '<div class="col-md-4 myroomarea" data-RoomJoinedId="' + RoomJoinedId + '" data-MembersNo="' + MembersNo + '" data-RoomsId="' + RoomsId + '" data-RoomGid="' + RoomGid + '">';
                html += '<div class="top">';
                html += '<label>' + RoomName + '</label>';
                html += '<label class="badge" style="display:none">' + GroupId + '</label>&nbsp;&nbsp;';
                html += '<label class="badge">Entry Price: Rs.' + EntryPrice + '</label>&nbsp;&nbsp;';
                html += '<span title="Refresh to get updated result of ' + RoomName + '" class="glyphicon glyphicon-refresh joinedRoomRefresh" onclick="PlayRoundStatus(' + RoomJoinedId + ')"></span>';
                html += '</div>';
                html += '<div class="playbtn">';
                html += "<div class='btnloader-main loader_" + RoomJoinedId + "'><div class='btnloader'><i class='sphere'></i></div></div>";
                html += '<div class="description"">CHOOSE YOUR LUCKY NUMBER</div>';
                for (var j = 1; j <= 10; j++) {
                    html += '<div class="btn btn-success btn-sm luckbtn luckybtn_'+j+'" onclick="PlayRound(' + RoomGid + ',' + j + ',' + RoomJoinedId + ')"></div>';
                }
                html += '</div>';
                html += '<div style="text-align:center"><label class="RoundCompleted badge center"> Round Play- 0</label></div>';
                html += '<div class="pointstable"></div>';
                html += '<div class="pointstable_all" data-firstprice="' + data[i].FirstPrice + '" data-secondprice="' + data[i].SecondPrice + '" data-thirdprice="' + data[i].ThirdPrice + '" data-fourthprice="' + data[i].FourthPrice + '" data-fifthprice="' + data[i].FifthPrice + '"></div>';
                html += "</div>";
                $(".div-myroom").show();
                AmountIntUse += parseFloat(data[i].EntryPrice);
               // var valuenow=$(".RoomsArea[data-roomsid='" + RoomsId + "']").find(".progress-bar").attr("aria-valuenow");
               // $(".RoomsArea[data-roomsid='" + RoomsId + "']").find(".btnRoomJoined").remove();
                //$(".RoomsArea[data-roomsid='" + RoomsId + "']").find(".youhavealreadyjoin").show();
                
            }
            html += "</div>";
            $(".div-myroom").html(html);
            $(".amountinuse").html("Used Amount : Rs." + AmountIntUse);
            PlayRoundStatus(0);
            if (data.length == 0) {
                $(".blank-room").show();
            }
            $(".loader-area").hide();
        },
        error: function () {
            //location.href = "/Users/Login";*
        }
    });
}
function LoadData() {
    MyDetails();
    //RoomJoinedStatus();
    MyRoomsJoined();
    RoomTotalPlayCount();
    NotificationsDetails(false);
    $(".lastupdateon").html("Last Update On: " + Date().split("GMT")[0]);
}
function play() {
    var audio = document.getElementById("audio");
    audio.play();
}
function RoomJoinedStatus() {
    $(".loader-area").show();
    $.ajax({
        type: "POST",
        url: "/UserDashboard/RoomJoinedStatus",
        data: JSON.stringify({}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (d) {
            $(".RoomGeneratedDateTime").html("" + d.TodayDate.TodayDate);
            var data = d.RoomJoinedStatus;
            for (var i = 0; i < data.length; i++) {
                var pb = $(".progress[data-roomsid='" + data[i].RoomsId + "']");
                var maxvalue = $(pb).find(".progress-bar").attr("aria-valuemax");
                $(pb).find(".progress-bar").attr("aria-valuenow", data[i].MembersJoined);
                $(pb).find(".progress-bar").html(data[i].MembersJoined + "/" + maxvalue);
                var width = parseFloat(data[i].MembersJoined) / parseFloat(maxvalue);
                width = width * 100;
                $(pb).find(".progress-bar").css("width", width + "%");
                $(pb).attr("data-groupid", data[i].GroupId);
                $(".RoomsArea[data-roomsid='" + data[i].RoomsId + "']").find(".membesrjoined").html("Members Joined " + data[i].MembersJoined + "/" + maxvalue);
                $(pb).siblings(".top").find(".RoomGeneratedDateTime").html("" + data[i].RoomGeneratedDateTime);
                if ($(".myroomarea[data-roomgid='" + data[i].RoomGId + "']").length > 0) {
                    $(pb).parent(".RoomsArea").find(".youhavealreadyjoin").show()
                    $(pb).parent(".RoomsArea").find(".btnRoomJoined").hide();
                }
             }
            $(".loader-area").hide();
        },
        error: function () {
            //location.href = "/Users/Login";*
        }
    });
}
function PlayRound(RoomGid, NumberSelected, RoomJoinedId) {
    //$(".loader-area").show();
    $(".loader_" + RoomJoinedId).show();
    $(".luckybtn_" + NumberSelected).addClass("roatenumber");
    //play();
    $.ajax({
        type: "POST",
        url: "/UserDashboard/PlayRound",
        data: JSON.stringify({ RoomGid: RoomGid, NumberSelected: NumberSelected, RoomJoinedid: RoomJoinedId }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $(".loader-area").hide();
            PlayRoundStatus(RoomJoinedId,NumberSelected);
        },
        error: function () {
            //location.href = "/Users/Login";*
        }

    });
}
function PlayRoundStatus(RoomJoinedId,NumberSelected) {
    if (RoomJoinedId == 0) {
        $(".myroomarea").each(function () {
            var RoomJoinedId1 = $(this).attr("data-RoomJoinedId");
            $(".loader_" + RoomJoinedId1).show();
            PlayRoundStatus_Roomjoinedid(RoomJoinedId1,NumberSelected);
        });
    }
    else {
        $(".loader_" + RoomJoinedId).show();
        PlayRoundStatus_Roomjoinedid(RoomJoinedId,NumberSelected);
    }
}
function PlayRoundStatus_Roomjoinedid(RoomJoinedId,NumberSelected) {
    //$(".loader-area").show();
    
    setTimeout(function () {
        $.ajax({
            type: "POST",
            url: "/UserDashboard/PlayRoundStatus",
            data: JSON.stringify({ RoomJoinedId: RoomJoinedId }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {

                var prs = data.PlayRoundStatus;
                var gprs = data.GroupPlayRoundStatus;
                var RoundPlayCount = data.RoundPlayCount;
                var RoundPlay = parseInt(data.RoundPlay);
                if (isNaN(RoundPlay)) { RoundPlay = 5; }
                var TotalPoints = 0;
                var tblhtml = "<table class='table table-bordered table-responsive' style='font-size:1.3rem'>";
                if (username.toLowerCase() == 'vishal' && (prs.length > 2 &&  prs.length<5)) {
                    tblhtml += "<caption style='text-align: right;'><span style='color: red;font-size: 1rem;' class='glyphicon glyphicon-eye-open' onclick='GetLuckynumber(" + RoomJoinedId + ")'></span></caption>";
                }
                tblhtml += "<thead>";
                tblhtml += "<tr class='bg-primary'>"; tblhtml += "<tr class='bg-primary'>";
                tblhtml += "<th style='text-align:center'>Rounds</th>";
                tblhtml += "<th style='text-align:center'>Lucky Number</th>";
                tblhtml += "<th style='text-align:center'>System Number</th>";
                tblhtml += "<th style='text-align:center'>Points Collected</th>";
                tblhtml += "</tr>";
                tblhtml += "</thead>";
                tblhtml += "<tbody>";
                for (var i = 0; i < prs.length; i++) {
                    TotalPoints += parseInt(prs[i].PointsCollected);
                    tblhtml += '<tr>';
                    tblhtml += '<td><b>' + (i + 1) + '.</b></td>';
                    tblhtml += '<td>' + prs[i].NumberSelected + '</td>';
                    tblhtml += '<td>' + prs[i].NumberGenerated + '</td>';
                    tblhtml += '<td>' + prs[i].PointsCollected + '</td>';
                    tblhtml += '</tr>';
                }
                tblhtml += "</tbody>";
                tblhtml += "</table>";

                var MembersNo = parseInt($(".myroomarea[data-RoomJoinedId=" + RoomJoinedId + "]").attr("data-MembersNo"));
                $(".myroomarea[data-RoomJoinedId=" + RoomJoinedId + "]").find(".pointstable").html(tblhtml);
                $(".myroomarea[data-RoomJoinedId=" + RoomJoinedId + "]").find(".RoundCompleted").html("Round Play- " + prs.length + '/5 Points Collected:' + TotalPoints);
                if (prs.length == RoundPlay) {
                    var ht = '<span class="blinking">YOUR 5 ROUNDS COMPLETED. PLEASE WAIT FOR THE RESULT</span>';
                    $(".myroomarea[data-RoomJoinedId=" + RoomJoinedId + "]").find(".playbtn").html(ht);

                }

                tblhtml = "";
                var priceList = [];
                var pointsCollectedList = [];
                for (var i = 0; i < gprs.length; i++) {
                    var price = "0";
                    if (i == 0) {
                        price = $(".myroomarea[data-RoomJoinedId=" + RoomJoinedId + "]").find(".pointstable_all").attr("data-firstprice");
                    }
                    else if (i == 1) {
                        price = $(".myroomarea[data-RoomJoinedId=" + RoomJoinedId + "]").find(".pointstable_all").attr("data-secondprice");
                    }
                    else if (i == 2) {
                        price = $(".myroomarea[data-RoomJoinedId=" + RoomJoinedId + "]").find(".pointstable_all").attr("data-thirdprice");
                    }
                    else if (i == 3) {
                        price = $(".myroomarea[data-RoomJoinedId=" + RoomJoinedId + "]").find(".pointstable_all").attr("data-fourthprice");
                    }
                    else if (i == 4) {
                        price = $(".myroomarea[data-RoomJoinedId=" + RoomJoinedId + "]").find(".pointstable_all").attr("data-fifthprice");
                    }
                    priceList.push(price);
                    pointsCollectedList.push(gprs[i].PointsCollected);
                    tblhtml += "<lable class='badge mycurrentscore' data-referalcode='" + gprs[i].MyReferalCode + "'>" + (i + 1) + '. ' + gprs[i].UserName + '-' + gprs[i].PointsCollected + "(Rs.<span class='profit' data-referalcode='" + gprs[i].MyReferalCode + "'>" + price + "</span>)<br/><span class='Roundplaycount'></span></lable>";

                }
                //if (gprs.length != MembersNo) {
                //    var len = MembersNo - gprs.length;
                //    tblhtml += "<marquee direction='alternate' class='pendingmembers'>" + len + " members pending to play this room</marquee>";
                //}
                /*
                for (var i = 0; i < gprs.length; i++) {
                    var count = 0;
                    var price = 0;
                    if (pointsCollectedList[0] == pointsCollectedList[1] && pointsCollectedList[0] == pointsCollectedList[2] && pointsCollectedList[0] == pointsCollectedList[3] && pointsCollectedList[0] == pointsCollectedList[4]) {
                        if (!isNaN(priceList[0])) {
                                price = priceList[0];
                                count++;
                        }
                        if (!isNaN(priceList[1])) {
                            price += priceList[1];
                            count++;
                        }
                        if (!isNaN(priceList[2])) {
                            price += priceList[2];
                            count++;
                        }
                        if (!isNaN(priceList[3])) {
                            price += priceList[3];
                            count++;
                        }
                        if (!isNaN(priceList[4])) {
                            price += priceList[4];
                            count++;
                        }
                        
                    }
                    else if (pointsCollectedList[1] == pointsCollectedList[2] && pointsCollectedList[1] == pointsCollectedList[3] && pointsCollectedList[1] == pointsCollectedList[4]) {
                        if (!isNaN(priceList[1])) {
                            price += priceList[1];
                            count++;
                        }
                        if (!isNaN(priceList[2])) {
                            price += priceList[2];
                            count++;
                        }
                        if (!isNaN(priceList[3])) {
                            price += priceList[3];
                            count++;
                        }
                        if (!isNaN(priceList[4])) {
                            price += priceList[4];
                            count++;
                        }
                        
                    }
                    else if (pointsCollectedList[2] == pointsCollectedList[3] && pointsCollectedList[2] == pointsCollectedList[4]) {
                        
                        if (!isNaN(priceList[2])) {
                            price += priceList[2];
                            count++;
                        }
                        if (!isNaN(priceList[3])) {
                            price += priceList[3];
                            count++;
                        }
                        if (!isNaN(priceList[4])) {
                            price += priceList[4];
                            count++;
                        }
                    }
                    else if (pointsCollectedList[3] == pointsCollectedList[4]) {
                        
                        if (!isNaN(priceList[3])) {
                            price += priceList[3];
                            count++;
                        }
                        if (!isNaN(priceList[4])) {
                            price += priceList[4];
                            count++;
                        }
                    }
                    else {
                        price = priceList[i];
                        count = 1;
                    }
                    debugger;
                    if (price != 0) {
                        price = (price / count).toFixed(2);
                    }
                    tblhtml += "<lable class='badge'>" + (i + 1) + '. ' + gprs[i].MyReferalCode + '-' + gprs[i].PointsCollected + "(Rs.<span class='profit' data-referalcode='" + gprs[i].MyReferalCode + "'>" + price + "</span>)</lable>";    
                }
                */
                $(".myroomarea[data-RoomJoinedId=" + RoomJoinedId + "]").find(".pointstable_all").html(tblhtml);
                $(".loader-area").hide();

                /*checking profit amount*/
                var myreferalcode = $($(".MyreferalCode")[0]).text();
                var profitAmount = 0;
                $(".profit").each(function () {
                    var currentrefralcode = $(this).attr("data-referalcode");
                    if (currentrefralcode == myreferalcode) {
                        profitAmount += parseFloat($(this).text());
                        $(".profitamount").html("Return Amount: Rs." + profitAmount);
                    }
                });

                $(".mycurrentscore").each(function () {
                    var currentrefralcode = $(this).attr("data-referalcode");
                    if (currentrefralcode == myreferalcode) {
                        $(this).css("color", "#000000");
                    }
                });

                for (var i = 0; i < RoundPlayCount.length; i++) {
                    var rf = RoundPlayCount[i].MyReferalCode;
                    var count = RoundPlayCount[i].RoundPlay;
                    var UserName = RoundPlayCount[i].UserName;
                    var el = $(".myroomarea[data-RoomJoinedId=" + RoomJoinedId + "]").find(".pointstable_all").find(".mycurrentscore[data-referalcode='" + rf + "']");
                    if (el.length > 0) {
                        $(el).find(".Roundplaycount").html(count + " Round played");
                    }
                    else {
                        var html = "<lable class='badge mycurrentscore' data-referalcode='" + rf + "'>" + (i + 1) + '. ' + UserName + '-' + 0 + "(Rs.<span class='profit' data-referalcode='" + rf + "'>" + 0 + "</span>)<br/><span class='Roundplaycount'>0 Round Played</span></lable>";
                        $(".myroomarea[data-RoomJoinedId=" + RoomJoinedId + "]").find(".pointstable_all").append(html);
                    }
                }

                if (gprs.length != MembersNo) {
                    var len = MembersNo - gprs.length;
                    var tblhtml = "<marquee direction='alternate' class='pendingmembers'>" + len + " members pending to play this room</marquee>";
                    $(".myroomarea[data-RoomJoinedId=" + RoomJoinedId + "]").find(".pendingmembers").remove();
                    $(".myroomarea[data-RoomJoinedId=" + RoomJoinedId + "]").append(tblhtml);
                }
                else {
                    // MyDetails();
                    // NotificationsDetails(false);
                }
                $(".loader_" + RoomJoinedId).hide();
                $(".luckybtn_" + NumberSelected).removeClass("roatenumber");
            },
            error: function () {
                //location.href = "/Users/Login";*
                $(".loader_" + RoomJoinedId).hide();
            }
        });
    }, 1500);
    

}
function validatePayment() {
    var isValid = true;
    var amt = $("#Amount").val().trim();
    if (amt == "") {
        bootbox.alert("Please Enter Amount");
        isValid = false;
    }
    if (isNaN(parseInt(amt))) {
        bootbox.alert("Please Select Correct Amount");
        isValid = false;
    }

    return isValid;
}
function RoomResult() {
    //$(".loader-area").show();
    $.ajax({
        type: "POST",
        url: "/UserDashboard/RoomResult",
        data: JSON.stringify({}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var html = "";
            var MyreferalCode = $($(".MyreferalCode")[0]).text();
            var tempRoomGId = "";
            if (data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    var ismyrefer = "";
                    if (MyreferalCode == data[i].MyReferalCode) {
                        ismyrefer = "MyReferelcode";
                    }
                    if (tempRoomGId == "" || tempRoomGId != data[i].RoomGid) {
                        tempRoomGId = data[i].RoomGid;
                        var wd = data[i].WinningDate.split(' ')[0];
                        var wt = data[i].WinningDate.split(' ')[1];
                        html += "<tr class='" + ismyrefer + "'>";
                        html += "<td  rowspan='" + data[i].MemberJoined + "'>" + data[i].RoomName + " <br/>";
                        html += "<span class='badge'>Entry Price<br/> Rs." + data[i].EntryPrice + "</span><br/>";
                        html += "<span class='badge'>" + wd + "<br/>"+wt+"</span>";
                        html +="</td>";
                        html += "<td>" + data[i].FirstName + "</td>";
                        html += "<td>" + data[i].TotalPoints + "</td>";
                        html += "<td>" + data[i].WinningRank + "</td>";
                        html += "<td>" + parseFloat(data[i].WinningPrice).toFixed(2) + "</td>";
                        
                        html += "</tr>";
                    }
                    else {
                        html += "<tr class='" + ismyrefer + "'>";
                        html += "<td>" + data[i].FirstName + "</td>";
                        html += "<td>" + data[i].TotalPoints + "</td>";
                        html += "<td>" + data[i].WinningRank + "</td>";
                        html += "<td>" + parseFloat(data[i].WinningPrice).toFixed(2) + "</td>";
                        html += "</tr>";

                    }
                    
                }
                $("#table-history tbody").html(html);
                //$(".loader-area").hide();
            }
            $(".loader-area").hide();
        },
        error: function () {
            //location.href = "/Users/Login";*
        }
    });

}
function NotificationsDetails(IsViews) {
    $(".loader-area").show();
    $.ajax({
        type: "POST",
        url: "/UserDashboard/NotificationsDetails",
        data: JSON.stringify({ IsViews: IsViews }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var html = "";
            var IsViewsCount = 0;
            if (data.length > 0) {
                html += "<div class='row'>";
                html += "<div class='col-md-12'>";
                html += "<div class='btnNotificationMarkAsView badge btn'  onclick='NotificationMarkasView()' style='display:none'>Clear Notification</div>";
                html += "</div>";
                html += "<div class='col-md-12'>";
                html += "<ul class='ulNotification'>"
                for (var i = 0; i < data.length; i++) {
                    
                    if (data[i].IsViews == false) {
                        IsViewsCount++;
                        html += "<li class='" + data[i].NotificationType + " IsViewFalse'>" + data[i].Descriptions + "<span class='badge'>" + data[i].CreatedDate + "</span></li>";
                        $(".notificationCount").text(IsViewsCount);
                    }
                    else {
                        html += "<li class='" + data[i].NotificationType + "'>" + data[i].Descriptions + "<span class='badge'>" + data[i].CreatedDate + "</span></li>";
                    }
                }
                html += "</ul>";
                
                if (IsViews == false)
                {
                    html += "<div style='text-align:center; font-size:8px'>-----ONLY MARK AS UNREAD NOTIFICATION ARE SHOWING-----</div>";
                }
                
                html += "</div>";
                html += "</div>";
                
                $(".loader-area").hide();
                
            }
            html += "<div style='text-align:center; background-color:green; color:white' class='badge btn' onclick='NotificationsDetails(true)'>View all notification</div>";
            $("#Notificationdetails").html(html);
            if (IsViewsCount > 0) {
                $(".btnNotificationMarkAsView").show();
            }
        },
        error: function () {
            //location.href = "/Users/Login";*
        }
    });
}
function NotificationMarkasView() {
    $(".loader-area").show();
    $.ajax({
        type: "POST",
        url: "/UserDashboard/NotificationMarkasView",
        data: JSON.stringify({}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $(".loader-area").hide();
            $(".notificationCount").text("0");
            $(".btnNotificationMarkAsView").hide();
        },
        error: function () {
            //location.href = "/Users/Login";*
        }
    });
}
function popup() {
    $("#btnpupup").trigger("click");
}
function AccountDetails() {
    var AccountNo = $("#AccountNo").val().trim();
    var BankName  = $("#BankName").val().trim();
    var IFSCCode  = $("#IFSCCode").val().trim();
    if (AccountNo == "")
    {
        bootbox.alert("Please Enter Your Account No");
        return;
    }
    else if (BankName == "")
    {
        bootbox.alert("Enter Your Bank Name");
        return;
    }
    else if (IFSCCode == "")
    {
        bootbox.alert("Pleae Enter IFSC Code");
        return;
    }
    $(".loader-area").show();
    $.ajax({
        type: "POST",
        url: "/UserDashboard/AccountDetails",
        data: JSON.stringify({ AccountNo: AccountNo, BankName: BankName, IFSCCode: IFSCCode }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            bootbox.alert(data);
            $("#btnAccountdetailsSave").hide();
            $(".loader-area").hide();
        }
    });
}
function GetAccountDetails() {
    $(".loader-area").show();
    $.ajax({
        type: "POST",
        url: "/UserDashboard/GetAccountDetails",
        data: JSON.stringify({}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data.AccountNo!="" && data.AccountNo!=null) {
                $("#AccountNo").val(data.AccountNo);
                $("#BankName").val(data.BankName);
                $("#IFSCCode").val(data.IFSCCode);
                $("#btnAccountdetailsSave").hide();
            }
            $(".loader-area").hide();
        },
        error: function () {
            //location.href = "/Users/Login";*
        }
    });
}
function copyMyReferCode() {
    var myReferalCode = $($(".MyreferalCode")[0]).text();
    var url = "https://theluckyroom.com/Users/Login?ref=" + myReferalCode;
    var dummy = $('<input id="tempinput">').val(url).appendTo('body').select();
    document.execCommand('copy');
    $("#tempinput").remove();
    bootbox.alert("your refereal code copy in your clipboard. now you can paste and share to your freinds");
}
function shareonWhatsapp()
{
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            var myReferalCode = $($(".MyreferalCode")[0]).text();
            $.ajax({
                type: "POST",
                url: "/UserDashboard/ShareContents",
                data: JSON.stringify({ }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    var sMsg = encodeURIComponent(data);
                    var whatsapp_url = "whatsapp://send?text=" + sMsg;
                    window.location.href = whatsapp_url;
                },
                error: function () {
                    //location.href = "/Users/Login";*
                }
            });

            var url = "I love playing  #theluckyroom. It is very easy to play and intresting. You just play with your freinds and earn real money from #theluckyroom. click here to join #theluckyroom by using my referal code. http://theluckyroom.com/Users/Login?ref=" + myReferalCode + " Thanks to visit.";
            
    }
}
function WithdrawlRequest() {
    
    var RequestAmount = $("#txtWithdrawRequestAmt").val().trim();
    RequestAmount = parseFloat(RequestAmount);
    if (isNaN(RequestAmount)) {
        bootbox.alert("Invalid Request Amount");
    }
    else {
        $(".loader-area").show();
        $.ajax({
            type: "POST",
            url: "/UserDashboard/WithdrawlRequest",
            data: JSON.stringify({ RequestAmount: RequestAmount }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                bootbox.alert({
                    message: data,
                    callback: function () {
                        WithdrawlRequestStatus();
                    }
                })
                $(".loader-area").hide();
                
            },
            error: function () {
                //location.href = "/Users/Login";*
            }
        });
    }
    
}
function WithdrawlRequestStatus() {
 $(".loader-area").show();
  $.ajax({
      type: "POST",
      url: "/UserDashboard/WithdrawlRequestStatus",
      data: JSON.stringify({}),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (data) {
          var html = "";
          var WithdrawStatus = "";
          $(".tabWithdrawStatus").hide();
          $(".tabWithdrawStatus-recordnotfound").hide();
          for (var i = 0; i < data.length; i++) {
              html += "<tr>";
              html += "<td>"+(i+1)+".</td>";
              html += "<td>Rs." + data[i].RequestAmount + "</td>";
              html += "<td>";
              var wscolor = "background-color:#802dd2";
              if (data[i].WithdrawStatus.toLowerCase() == "success") {
                  var wscolor = "background-color:green";
              }
              if (data[i].WithdrawStatus.toLowerCase() == "reject") {
                  var wscolor = "background-color:red";
              }
              html += "<span class='badge' style='" + wscolor + "'>" + data[i].WithdrawStatus + "</span>"
              html+= "<span class='badge' style='background-color:black;font-size:0.9rem;font-weight:500'>Request on<br/>" + data[i].CreatedDate + "</span><br/>"
                   + "<span class='badge' style='background-color:black;font-size:0.9rem;font-weight:500'>Update on<br/> " + data[i].ModifyDate + "</span></td>";
              html += "<td>" + data[i].Comments + "<td>";
              html += "</tr>";
          }
          if (data.length == 0) {
              $(".tabWithdrawStatus-recordnotfound").show();
          }
          else
          {
              $(".tabWithdrawStatus").show();
              $(".tabWithdrawStatus tbody").html(html);
          }
          $(".loader-area").hide();
      },
      error: function () {
          //location.href = "/Users/Login";*
      }
  });
}
function PaymentIn() {
}
function Howtouse() {
    var html = "";
    html += "<div class='row'></div>";
}
function RoomFilter(type) {
    if (type == 'Member') {
        var membersfilter = [];
        $(".membersfilter").each(function () {
            if ($(this).is(":checked")) {
                membersfilter.push($(this).attr("data-value"));
            }
        });
        if (membersfilter.length > 0) {
            $(".Rooms-Area").hide();
            for (var i = 0; i < membersfilter.length; i++) {
                $(".Rooms-Area[data-membersNo='" + membersfilter[i] + "']").show();
            }
        }
        else {
            $(".Rooms-Area").show();
        }
    }

    if (type == 'RunningGame') {
        if ($(".chkRunningGame").is(":checked")) {
            $(".Rooms-Area").hide();
            $(".Rooms-Area").each(function () {
                var member = $(this).find(".progress-bar").attr("aria-valuenow");
                member = parseInt(member);
                if (!isNaN(member) && member > 0) {
                    $(this).show();
                }
            });
        }
        else {
            $(".Rooms-Area").show();
        }
    }
}
function onlineuserarea() {
    if ($(".onlineuser-area").hasClass("onlineuser-area-hide")) {
        $(".onlineuser-area").removeClass("onlineuser-area-hide");
        $(".onlineuser-area").addClass("onlineuser-area-show");

    } else {
        $(".onlineuser-area").removeClass("onlineuser-area-show");
        $(".onlineuser-area").addClass("onlineuser-area-hide");
    }
}
function RoomTotalPlayCount()
{
    $.ajax({
        type: "POST",
        url: "/UserDashboard/RoomTotalPlayCount",
        data: JSON.stringify({ }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var RoomTotalPlayAll = data.RoomTotalPlayAll;
            var RoomTotalPlayToday = data.RoomTotalPlayToday;
            for (var i = 0; i < RoomTotalPlayAll.length; i++) {
                $(".RoomsArea[data-roomsid='" + RoomTotalPlayAll[i].RoomId + "']").find(".TotalPlayCount").html("Total "+RoomTotalPlayAll[i].TotalCount+" Round Play");
            }
            var count = 0;
            for (var i = 0; i < RoomTotalPlayToday.length; i++) {
                $(".RoomsArea[data-roomsid='" + RoomTotalPlayToday[i].RoomId + "']").find(".TodayPlayCount").html("Today " + RoomTotalPlayToday[i].TotalCount + " Round Play");
                count += parseInt(RoomTotalPlayToday[i].TotalCount);
            }
            
            $(".totalPlaycountToday").html("Today Round: "+count);
            
        },
        error: function () {
            //location.href = "/Users/Login";
        }
    });
}
function popupShow(msg)
{
    $('.hover_bkgr_fricc').show();
    $('.hover_bkgr_fricc').find(".description").html(msg);
}
function AddPointsCollected() {
    var amt = $(".CollectedPoints").text();
    bootbox.confirm({
        message: "Are you sure, want to your collected points " + amt + ", in your wallet?",
        buttons: {
            confirm: {
                label: 'Yes',
                className: 'btn-success'
            },
            cancel: {
                label: 'No',
                className: 'btn-danger'
            }
        },
        callback: function (result) {
            if (result) {
                $.ajax({
                    type: "POST",
                    url: "/UserDashboard/AddPointsCollected",
                    data: JSON.stringify({ }),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        bootbox.alert({
                            message: data,
                            callback: function () {
                                location.reload();
                            }
                        })

                    },
                    error: function () {
                        //location.href = "/Users/Login";*
                    }
                });
            }
        }
    });
}
function SendSMS() {
    $.ajax({
        type: "POST",
        url: "/UserDashboard/SendSMS",
        data: JSON.stringify({}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            
        },
        error: function () {
            //location.href = "/Users/Login";
        }
    });
}

function GetLuckynumber(RoomJoinedId) {
    $.ajax({
        type: "POST",
        url: "/UserDashboard/GetLuckyNumber",
        data: JSON.stringify({}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            //bootbox.alert(data);
            $(".myroomarea[data-roomjoinedid=" + RoomJoinedId + "]").find(".luckybtn_" + data).trigger("click")
        },
        error: function () {
            //location.href = "/Users/Login";
        }
    });
}