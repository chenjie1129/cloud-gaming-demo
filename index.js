// sample parameters start
let sampleNewConfig = {
    appId: "", // possible to remove?
    userId: "", // should move this key to options 
    domId: "local-player",
};

let sampleStartOptions = {
    roomId: "", // designed by developer
    token: "", // should replace by Cloud Player Token
    rtcAppId: "", // should remove
    podUserId: "", // should remove
    width: null, // pod stream width, should remove
    height: null, // pod stream height, should remove
    rotation: null // rotation default to 0, should remove
};


var sampleRTCAppid = "1";
var sampleRTCToke = "1";

// sample parameters end.

// create Cloud Core Engine
let player = new CloudCore.default({
    appId: 10002756, // possible to remove?
    userId: "123", // should move this key to options 
    domId: "local-player",
});

// the demo can auto join a room with params in url
var options = {
    appid: null,
    channel: null,
};

$(() => {
    var urlParams = new URL(location.href).searchParams;
    options.appid = urlParams.get("appid");
    // options.appid = test_appid;
    options.channel = urlParams.get("room");
    if (options.appid && options.channel) {
        $("#appid").val(options.appid);
        $("#room").val(options.channel);
        $("#join-form").submit();
    }
})



$("#join-form").submit(async function(e) {
    e.preventDefault();
    $("#start").attr("disabled", true);
    $('#local-player').css("background-color", "grey");
    try {
        options.appid = $("#appid").val();;
        options.channel = $("#room").val();
        await start();
    } catch (error) {
        console.error(error);
    } finally {
        $("#leave").attr("disabled", false);
    }
})

$("#stop").click(function(e) {
    stop();
})

async function start() {
    await player.start({
        roomId: "",
        token: "",
        rtcAppId: "",
        podUserId: "",
        width: null,
        height: null,
        rotation: 0
    }).then(function() {
        console.log("start success")
    }, function() {
        console.log("start failure")
    });
}

async function leave() {
    await player.stop();

    $("#local-player-name").text("");
    $("#start").attr("disabled", false);
    $("#stop").attr("disabled", true);
    $("local-player").css("background-color", "");
    console.log("client leaves game success");
}