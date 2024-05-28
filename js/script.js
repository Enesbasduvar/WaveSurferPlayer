document.addEventListener('DOMContentLoaded', function () {
    var playBtn = document.getElementById("playBtn");
    var stopBtn = document.getElementById("stopBtn");
    var volumeBtn = document.getElementById("volumeBtn");
    var playlistItems = document.querySelectorAll("#playlist li");
    var isMuted = false;

    var wavesurfer = WaveSurfer.create({
        container: '#waveform',
        waveColor: '#e3bbee',
        progressColor: '#e83939',
        barWidth: 3,
        responsive: true,
        hideScrollbar: true,
        barRadius: 3
    });

    function loadTrack(src) {
        wavesurfer.load(src);
        playBtn.src = "assets/play.png";
    }

    playlistItems.forEach(function (item) {
        item.addEventListener('click', function () {
            var src = this.getAttribute('data-src');
            loadTrack(src);
        });
    });

    playBtn.onclick = function () {
        wavesurfer.playPause();
        if (wavesurfer.isPlaying()) {
            playBtn.src = "assets/pause.png";
        } else {
            playBtn.src = "assets/play.png";
        }
    }

    stopBtn.onclick = function () {
        wavesurfer.stop();
        playBtn.src = "assets/play.png";
    }

    volumeBtn.onclick = function () {
        isMuted = !isMuted;
        wavesurfer.setVolume(isMuted ? 0 : 1);
        if (isMuted) {
            volumeBtn.src = "assets/mute.png";
        } else {
            volumeBtn.src = "assets/volume.png";
        }
    }

    // Load and play the initial track
    loadTrack("assets/valse.mp3");
    wavesurfer.on('ready', function() {
        wavesurfer.play();
        playBtn.src = "assets/pause.png";
    });
});
