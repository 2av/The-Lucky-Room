$(document).ready(function () {
    $(".bottom-close").click(function () {
        $(".Bottom-menu-contents").hide();
    });
    $(".myprofile").click(function () {
        $(".popup-box").hide();
        $(".profileupdate").show();
    });
    $(".img-addwallet").click(function () {
        $(".popup-box").hide();
        $(".Add-Wallet").show();
    });
    $(".img-Withdrwal").click(function () {
        $(".popup-box").hide();
        $(".withdraw-request").show();
    });
    $(".addintowallete").click(function () {
        $(".popup-box").hide();
        $(".Point-Collected").show();
    })
    $(".settings-btn").click(function () {
        $(".popup-box").hide();
        $(".settings-box").show();
    });
    $(".share").click(function () {
        $(".popup-box").hide();
        $(".Share-area").show();
    });

    $(".btnAmount").click(function () {
        $("#Amount").val($(this).attr("data-amount"));
        $("#lblAmountToAdd").html("Rs. " + $(this).attr("data-amount"));
    })
    $(".btn-close").click(function () {
        $(".popup-box").hide();
    })

    $(".btneditphoto").click(function () {
        $(".btneditphoto").hide();
        $(".default-img-list").show();
    });
    $(".default-img").click(function () {
        SetProfilePhoto($(this).attr("attr-img-name"));
    });
});

var MyreferalCode = "";
function UserAllDetails() {
    $(".RefreshData").addClass("RefreshActive");
    setTimeout(function () {

        $.ajax({
            type: "POST",
            url: "/UserDashboard/UserAllDetails",
            data: JSON.stringify({}),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log(data);
                MyDetails(data.MyDetails);
                OnlineUser(data.OnlineUser);
                MyRoomStatus(data.MyRoomsStatus);
                RoomResult(data.RoomResult);
                NewRooms(data.Rooms, data.RoomJoinedStatus)
                NotificationsDetails(data.Notification);
                RoomResult(data.RoomResult);
                $(".RefreshData").removeClass("RefreshActive");
            },
            error: function () {

            }
        });
    }, 500);
}
function MyDetails(data) {
    $(".Wallet-balance span").html("Rs. " + parseFloat(data.AccountBalance).toFixed(2));
    $(".MyReferelcode").html(data.MyreferalCode);
    MyreferalCode = data.MyreferalCode;
    $(".TotalRefered").html(data.TotalRefered);
    $(".share-value").html(data.TotalRefered);
    $(".share-Commision").html("Rs. "+parseFloat(data.CommisionAmount).toFixed(2));
    $(".user-name").html(data.Name);
    if (data.CollectedPoints == null || data.CollectedPoints == "") {
        data.CollectedPoints = 0;
    }
    var earningamount = parseFloat(data.CollectedPoints * 0.00002).toFixed(2);
    $(".CollectedPoints span").html(data.CollectedPoints + " (Rs. " + earningamount + ")");
    $(".Point-Collected .contentsArea .points-colleted").text(data.CollectedPoints);
    $(".Point-Collected .contentsArea .points-amount").text("(Rs. " + earningamount + ")");
    if (data.ProfilePhoto == "") {
        $(".myprofile img").attr("src", "../Uploads/Default/default_m_1.jpeg");
        $(".profileupdate .contentsArea .myphoto").attr("src", "../Uploads/Default/default_m_1.jpeg");
    }
    else {
        $(".myprofile img").attr("src", "../Uploads/Default/" + data.ProfilePhoto);
        $(".profileupdate .contentsArea .myphoto").attr("src", "../Uploads/Default/" + data.ProfilePhoto);
    }

    if (data.CollectedPoints >= 50000) {
        $(".min-msg").hide();
    }
}
function OnlineUser(data) {
    var html = "";
    for (var i = 0; i < data.length; i++) {
        var username = data[i].UserName;
        if (username.length > 10) {
            username = username.substring(0, 10) + "..";
        }

        var path = "../Content/Images/default-icon.png";
        html += "<div class='row online-users'>";
        html += "<div><img src='" + path + "' class='img-profileicon'/> <lable>" + username + "</div>";// <span class='glyphicon glyphicon-send'></span></lable> | <span class='glyphicon glyphicon-save'>0</span></div>";
        html += "</div>";
    }
    $(".OnlineUser-Count").html(data.length);
    $(".OnlineUsers .onlineuser-list").html(html);
}
function NewRooms(data, RoomStatus) {
    var html = "";
    
    for (var i = 0; i < data.length; i++) {
        perc = ((data[i].FirstPrice / data[i].EntryPrice) * 100).toString();
        if (perc.indexOf(".") > 0) {
            perc = parseFloat(perc).toFixed(2);
        }

        html += '<div class="Rooms" data-RoomsId="' + data[i].ID + '"  data-memberno="' + data[i].MembersNo + '"">' +
               '<div class="RoomName">' +
               '<div class="Title-line"><i class="fa fa-home" aria-hidden="true"></i>' + data[i].RoomName + '</div>' +
               '</div>' +
               '<div class="Roomno">1</div>' +
               '<div class="EntryFees">' +
               '<img src="../Content/Images/UI/coins.png" class="EntryFees_img" /> &nbsp; Rs. ' + data[i].EntryPrice +
               '</div>' +
               '<div class="myprogress">' +
               '<h3 class="progress-title"><span class="memberjoined">0</span>/' + data[i].MembersNo + ' Members joined</h3>' +
               '<div class="progress orange">' +
               '<div class="progress-bar" style="width:0%; background:#300101;">' +
               '<div class="progress-value">1 Joined</div>' +
               '</div>' +
               '</div>' +
               '</div>' +
               '<div class="winningprice">' +
               '<i class="fa fa-trophy" aria-hidden="true"></i> ' + perc + '%' +
               '<p style="margin:0 0 0px"></p>';
        var count = 0;
        if (data[i].FirstPrice > 0) {
            count++;
            html += '<span>' + count + ') Rs. ' + data[i].FirstPrice + '</span>';
        }
        if (data[i].SecondPrice > 0) {
            count++;
            html += '<span>' + count + ') Rs. ' + data[i].SecondPrice + '</span>';
        }
        if (data[i].ThirdPrice > 0) {
            count++;
            html += '<span>' + count + ') Rs. ' + data[i].ThirdPrice + '</span>';
        }
        if (data[i].FourthPrice > 0) {
            count++;
            html += '<span>' + count + ') Rs. ' + data[i].FourthPrice + '</span>';
        }
        if (data[i].FifthPrice > 0) {
            count++;
            html += '<span>' + count + ') Rs. ' + data[i].FifthPrice + '</span>';
        }

        html += '</div>' +
         '<div class="btnJoinRoom" onclick="RoomJoined(' + data[i].ID + ')">Join Room</div>' +
         '</div>';

       
    }
    $(".NewRoom .contentsArea").html(html);

    var runningCount = 0;
    if (RoomStatus != null) {
        for (var i = 0; i < RoomStatus.length; i++) {

            var rm = $(".Rooms[data-roomsid='" + RoomStatus[i].RoomsId + "']");
            var datamemberno = $(rm).attr("data-memberno");
            var prb = (RoomStatus[i].MembersJoined / datamemberno) * 100;

            $(rm).find(".memberjoined").text(RoomStatus[i].MembersJoined);
            $(rm).find(".progress-bar").css("width", prb + "%");
            if(prb>0){
                $(rm).attr("data-running", 'true');
                runningCount++;
            }
            else{
                $(rm).attr("data-running", 'false');
            }


        }
    }
    RoomFilter('RunningGame');
    if (runningCount > 0) {
        $("label[for=chkRunningGame]").text("Running Game(" + runningCount + ")");
    }
    else {
        $("label[for=chkRunningGame]").text("Running Game");
    }
}
function NotificationsDetails(data) {

    var html = "";
    var IsViewsCount = 0;
    var IsViews = false;
    if (data.length > 0) {
        html += "<div class='row'>";

        html += "<div class='col-md-12'>";
        html += "<ul class='ulNotification'>"
        for (var i = 0; i < data.length; i++) {
            if (data[i].IsViews == false) {
                IsViewsCount++;
                html += "<li class='" + data[i].NotificationType + " IsViewFalse' style='border-bottom: 1px solid;'><div class='Descriptions'>" + data[i].Descriptions + "<div class='date-time'>" + data[i].CreatedDate + "</div></li>";
                
            }
            else {
                html += "<li class='" + data[i].NotificationType + "'>" + data[i].Descriptions + "<span class='badge'>" + data[i].CreatedDate + "</span></li>";
            }
        }
        html += "</ul>";

        if (IsViews == false) {
            // html += "<div style='text-align:center; font-size:8px'>-----ONLY MARK AS UNREAD NOTIFICATION ARE SHOWING-----</div>";
            html += "<div class='col-md-12' style='text-align:center'>";
            //html += "<div class='btnNotificationMarkAsView badge btn'  onclick='NotificationMarkasView()'>Clear Notification</div>";
            html += '<i class="fa fa-trash" aria-hidden="true" style="color:red; font-size:2rem" onclick="NotificationMarkasView()"></i>';
            html += "</div>";
        }

        html += "</div>";
        html += "</div>";

    }
    html += "<div style='display:none'><div style='text-align:center; background-color:green; color:white' class='btn' onclick='NotificationsDetails(true)'>View all notification</div><div>";
    $(".Notificationdetails").html(html);
    $(".Notification-count").html(IsViewsCount);

}
function MyRoomStatus(data) {

    var html = "<div class='TopHeaderTitle'>Your Runing Room Status<div class='amountdetails'><span class='amountinuse'></span> | <span class='profitamount'></span></div></div>";
    html += "<div class='row contentsArea' style='width:100%;margin-left:0px'>";
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

        html += '<div class="col-md-12 myroomarea" data-RoomJoinedId="' + RoomJoinedId + '" data-MembersNo="' + MembersNo + '" data-RoomsId="' + RoomsId + '" data-RoomGid="' + RoomGid + '">';
        html += '<div class="top">';
        html += '<div class="Title-line"><i class="fa fa-home" aria-hidden="true"></i>' + RoomName + '</div>';
        html += '<label class="badge" style="display:none">' + GroupId + '</label>&nbsp;&nbsp;';
        html += '<div class="EntryFees"><img src="../Content/Images/UI/coins.png" class="EntryFees_img"> &nbsp; Rs. ' + EntryPrice + '</div>';
        html += '<span title="Refresh to get updated result of ' + RoomName + '" class="glyphicon glyphicon-refresh joinedRoomRefresh" data-RoomJoinedId="' + RoomJoinedId + '" onclick="PlayRoundStatus(' + RoomJoinedId + ')"></span>';
        html += '</div>';
        html += '<div class="playbtn">';
        html += "<div class='btnloader-main loader_" + RoomJoinedId + "'><div class='btnloader'><i class='sphere'></i></div></div>";
        html += '<div class="description">CHOOSE YOUR LUCKY NUMBER</div>';
        for (var j = 1; j <= 10; j++) {
            html += '<div class="btn btn-success btn-sm luckbtn luckybtn_' + j + '" onclick="PlayRound(' + RoomGid + ',' + j + ',' + RoomJoinedId + ')"></div>';
        }
        html += '</div>';
        html += '<div style="text-align:center;display:none"><label class="RoundCompleted badge center"> Round Play- 0</label></div>';
        html += '<div class="pointstable"></div>';
        html += '<div class="pointstable_all" data-firstprice="' + data[i].FirstPrice + '" data-secondprice="' + data[i].SecondPrice + '" data-thirdprice="' + data[i].ThirdPrice + '" data-fourthprice="' + data[i].FourthPrice + '" data-fifthprice="' + data[i].FifthPrice + '"></div>';
        html += "</div>";
        $(".div-myroom").show();
        $(".blank-room").hide();
        AmountIntUse += parseFloat(data[i].EntryPrice);

    }
    html += "</div>";
    $(".div-myroom").html(html);
    $(".amountinuse").html("Used Amount : Rs." + AmountIntUse);
    $(".profitamount").html("Return Amount: Rs." + 0);
    PlayRoundStatus(0);
    if (data.length == 0) {
        $(".blank-room").show();
        $(".div-myroom").hide();
    }

}
function RoomResult(data) {

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
                html += "<span class='badge'>" + wd + "<br/>" + wt + "</span>";
                html += "</td>";
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

}

function PlayAreaSection(section) {
    $(".playAreaSection").hide();
    $(".PlayArea ." + section).show();
    $(".Bottom-menu-contents").hide();
    $(".popup-box").hide();
}
function ShowIconArea(title, btn) {
    $(".popup-box").hide();
    $(".bottom-title").html(title);
    $(".Bottom-menu-contents").show();
    $(".bottom-Contents-Area").hide();
    $(".Bottom-menu-contents ." + btn).show();
}
function openemozi(area) {
    $(".emozi-head").hide();
    $("." + area).show();
}
function popupShow(msg) {
    $(".popup-box").hide();
    $(".popup-area").css("top", "25%");
    $(".msg-contents").html(msg);
}
function popupHide() {
    $(".popup-area").css("top", "-100%");
}
function RoomJoined(RoomsId) {

    $.ajax({
        type: "POST",
        url: "/UserDashboard/RoomJoined",
        data: JSON.stringify({ RoomsId: RoomsId }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            popupShow(data);
            UserAllDetails();
            if (data.toLowerCase().indexOf("joined the room") >= 0) {
                PlayAreaSection('MyRoom');
            }
        },
        error: function () {
            //location.href = "/Users/Login";*
        }
    });

}
function validatePayment() {
    var isValid = true;
    var amt = $("#Amount").val().trim();
    if (amt == "") {
        //bootbox.alert("Please Enter Amount");
        popupShow("Please Enter Amount");
        isValid = false;
    }
    if (isNaN(parseInt(amt))) {
        //bootbox.alert("Please Select Correct Amount");
        popupShow("Please Select Correct Amount");
        isValid = false;
    }

    return isValid;
}
function AddPointsCollected() {
    var amt = $(".CollectedPoints").text();
    if (parseInt(amt) >= 50000) {
        $.ajax({
            type: "POST",
            url: "/UserDashboard/AddPointsCollected",
            data: JSON.stringify({}),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                popupShow(data);
                UserAllDetails();
            },
            error: function () {
                //location.href = "/Users/Login";*
            }
        });
    }
    else {
        popupShow('Minimum collected points required 50,000 to redem into wallet<br/>Play the more game to collect a more points');
        $(".Point-Collected").show();
    }

}
function SetProfilePhoto(ProfilePhoto) {
    $.ajax({
        type: "POST",
        url: "/UserDashboard/SetProfilePhoto",
        data: JSON.stringify({ ProfilePhoto: ProfilePhoto }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            popupShow(data);
            $(".profileupdate").show();
            $(".myprofile img").attr("src", "../Uploads/Default/" + ProfilePhoto);
            $(".profileupdate .contentsArea .myphoto").attr("src", "../Uploads/Default/" + ProfilePhoto);

            $(".btneditphoto").show();
            $(".default-img-list").hide();
        },
        error: function () {
            //location.href = "/Users/Login";*
        }
    });
}
function WithdrawlRequest() {

    var RequestAmount = $("#txtWithdrawRequestAmt").val().trim();
    RequestAmount = parseFloat(RequestAmount);
    if (isNaN(RequestAmount)) {
        popupShow("Invalid Request Amount");        
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
                popupShow(data);
                $(".withdraw-request").show();
                WithdrawlRequestStatus();
                $("#txtWithdrawRequestAmt").val('');
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
                html += "<td>" + (i + 1) + ".</td>";
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
                html += "<span class='badge' style='background-color:black;font-size:0.9rem;font-weight:500'>Request on<br/>" + data[i].CreatedDate + "</span><br/>"
                     + "<span class='badge' style='background-color:black;font-size:0.9rem;font-weight:500'>Update on<br/> " + data[i].ModifyDate + "</span></td>";
                html += "<td>" + data[i].Comments + "</td>";
                html += "</tr>";
            }
            if (data.length == 0) {
                $(".tabWithdrawStatus-recordnotfound").show();
            }
            else {
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
function copyToClipboard() {
    var $temp = $("<input>");
    $("body").append($temp);
    MyreferalCode = $($(".MyReferelcode")[0]).text();
    $temp.val("I love playing  #theluckyroom. It is very easy to play and intresting. You just play with your freinds and earn real money from #theluckyroom. click here to join #theluckyroom by using my referal code. https://theluckyroom.com/Users/Login?ref=" + MyreferalCode + " Thanks to visit.").select();
    document.execCommand("copy");
    $temp.remove();
    popupShow("Share content copy in your clipboard.<br/>Just paste any where and share");
    $(".Share-area").show();
}
/*--------------------------------------------*/



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
            PlayRoundStatus(RoomJoinedId, NumberSelected);
        },
        error: function () {
            //location.href = "/Users/Login";*
        }

    });
}
function PlayRoundStatus(RoomJoinedId, NumberSelected) {
    if (RoomJoinedId == 0) {
        $(".myroomarea").each(function () {
            var RoomJoinedId1 = $(this).attr("data-RoomJoinedId");
            $(".loader_" + RoomJoinedId1).show();
            PlayRoundStatus_Roomjoinedid(RoomJoinedId1, NumberSelected);
        });
    }
    else {
        $(".loader_" + RoomJoinedId).show();
        PlayRoundStatus_Roomjoinedid(RoomJoinedId, NumberSelected);
    }
}
function PlayRoundStatus_Roomjoinedid(RoomJoinedId, NumberSelected) {
    //$(".loader-area").show();
    $(".joinedRoomRefresh[data-RoomJoinedId='" + RoomJoinedId + "']").addClass("RefreshActive");
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
                var tblhtml = "<table class='tblrounds table table-bordered table-responsive' style='font-size:1rem;margin-bottom:5px'>";
                var username = "";
                if (username.toLowerCase() == 'vishal' && (prs.length > 2 && prs.length < 5)) {
                    tblhtml += "<caption style='text-align: right;'><span style='color: red;font-size: 1rem;' class='glyphicon glyphicon-eye-open' onclick='GetLuckynumber(" + RoomJoinedId + ")'></span></caption>";
                }
                tblhtml += "<thead style='background-color:#efe3bf'>";
                tblhtml += "<tr class='bg-primary'>"; tblhtml += "<tr class='bg-primary'>";
                tblhtml += "<th>Rounds</th>";
                tblhtml += "<th>Lucky Number</th>";
                tblhtml += "<th>System Number</th>";
                tblhtml += "<th>Points Collected</th>";
                tblhtml += "</tr>";
                tblhtml += "</thead>";
                tblhtml += "<tbody style='    background-color: #d16e17;color: white;font-weight: 600;'>";
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
                var myreferalcode = $(".MyReferelcode").text();
                var profitAmount = 0;
                $(".profitamount").html("Return Amount: Rs." + profitAmount);
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
                $(".joinedRoomRefresh[data-RoomJoinedId='" + RoomJoinedId + "']").removeClass("RefreshActive");
            },
            error: function () {
                //location.href = "/Users/Login";*
                $(".loader_" + RoomJoinedId).hide();
            }
        });
    }, 700);


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
            popupShow('Notification Deleted.');
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
    var BankName = $("#BankName").val().trim();
    var IFSCCode = $("#IFSCCode").val().trim();
    if (AccountNo == "") {
        bootbox.alert("Please Enter Your Account No");
        return;
    }
    else if (BankName == "") {
        bootbox.alert("Enter Your Bank Name");
        return;
    }
    else if (IFSCCode == "") {
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
            if (data.AccountNo != "" && data.AccountNo != null) {
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
function shareonWhatsapp() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        var myReferalCode = $($(".MyreferalCode")[0]).text();
        $.ajax({
            type: "POST",
            url: "/UserDashboard/ShareContents",
            data: JSON.stringify({}),
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
            $(".Rooms").hide();
            $(".Rooms").each(function () {
                var member = $(this).attr("data-running");
                if (member != undefined && member.toLowerCase() == 'true') {
                    $(this).show();
                }
               
            });
        }
        else {
            $(".Rooms").show();
        }
    }
}

function RoomTotalPlayCount() {
    $.ajax({
        type: "POST",
        url: "/UserDashboard/RoomTotalPlayCount",
        data: JSON.stringify({}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var RoomTotalPlayAll = data.RoomTotalPlayAll;
            var RoomTotalPlayToday = data.RoomTotalPlayToday;
            for (var i = 0; i < RoomTotalPlayAll.length; i++) {
                $(".RoomsArea[data-roomsid='" + RoomTotalPlayAll[i].RoomId + "']").find(".TotalPlayCount").html("Total " + RoomTotalPlayAll[i].TotalCount + " Round Play");
            }
            var count = 0;
            for (var i = 0; i < RoomTotalPlayToday.length; i++) {
                $(".RoomsArea[data-roomsid='" + RoomTotalPlayToday[i].RoomId + "']").find(".TodayPlayCount").html("Today " + RoomTotalPlayToday[i].TotalCount + " Round Play");
                count += parseInt(RoomTotalPlayToday[i].TotalCount);
            }

            $(".totalPlaycountToday").html("Today Round: " + count);

        },
        error: function () {
            //location.href = "/Users/Login";
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

