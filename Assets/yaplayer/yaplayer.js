/* 
YouTube audio player: https://github.com/devpelux/devpelux/tree/main/Assets/yaplayer
*/

function onYouTubeIframeAPIReady() {
    //Random number used to randomize element ids
    var rnd = Math.floor(Math.random() * 9999) + 1000;

    //Element that will become the audio player
    var ctrlq = document.getElementById("youtube-audio");
    ctrlq.setAttribute("id", "yaplayer" + rnd);

    //Options
    var opt = ctrlq.dataset;
    if (opt.size === undefined) opt.size = "128";

    //Icon of the player
    var icon = document.createElement("img");
    icon.style.cssText = "width:" + opt.size + "px;height:" + opt.size + "px;" + "cursor:pointer;cursor:hand;";
    ctrlq.appendChild(icon);

    //Container of the video player used to hide the video player
    var vpc = document.createElement("div");
    vpc.style.cssText = "width:0px;height:0px;opacity:0;";
    ctrlq.appendChild(vpc);

    //Video player
    var vp = document.createElement("div");
    vp.setAttribute("id", "yap-vp" + rnd);
    vpc.appendChild(vp);

    //Source of the icons
    var urlSrc = opt.loadfrom !== undefined ? opt.loadfrom : "./";
    var playSrc = opt.theme === "light" ? "yap-play-light.svg" : "yap-play-dark.svg";
    var stopSrc = opt.theme === "light" ? "yap-stop-light.svg" : "yap-stop-dark.svg";

    //Toggles between pause and play states on button
    var toggleButton = function(play) {
        var img = play ? stopSrc : playSrc;
        icon.setAttribute("src", urlSrc + img);
    };

    //Plays or pauses on button click
    ctrlq.onclick = function() {
        player.unMute();
        player.playVideo();
        if (player.getPlayerState() === YT.PlayerState.PLAYING || player.getPlayerState() === YT.PlayerState.BUFFERING) {
            player.pauseVideo();
            toggleButton(false);
        } else {
            player.playVideo();
            toggleButton(true);
        }
    };

    //Renders the video player
    var player = new YT.Player("yap-vp" + rnd, {
        height: "1",
        width: "1",
        videoId: opt.video,
        playerVars: {
            autoplay: opt.autoplay,
            loop: opt.loop
        },
        events: {
            onReady: function(ev) {
                if (opt.startseconds !== undefined && opt.endseconds !== undefined) {
                    player.cueVideoById({
                        videoId: opt.video,
                        startSeconds: opt.startseconds,
                        endSeconds: opt.endseconds
                    });
                }
                if (opt.volume !== undefined) player.setVolume(opt.volume);
                player.setPlaybackQuality("small");
                toggleButton(player.getPlayerState() !== undefined && player.getPlayerState() !== YT.PlayerState.CUED);
            },
            onStateChange: function(ev) {
                if (ev.data === YT.PlayerState.ENDED) {
                    toggleButton(false);
                }
            }
        }
    });
}
