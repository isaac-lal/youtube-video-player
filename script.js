const playPauseBtn = document.querySelector(".play-pause-btn");
const theaterBtn = document.querySelector(".theater-btn");
const fullScreenBtn = document.querySelector(".full-screen-btn");
const miniPlayerBtn = document.querySelector(".mini-player-btn");
const muteBtn = document.querySelector(".mute-btn");
const captionsBtn = document.querySelector(".captions-btn");
const speedBtn = document.querySelector(".speed-btn");
const currentTimeElem = document.querySelector(".current-time");
const totalTimeElem = document.querySelector(".total-time");
const previewImg = document.querySelector(".preview-img");
const thumbnailImg = document.querySelector(".thumbnail-img");
const volumeSlider = document.querySelector(".volume-slider");
const videoContainer = document.querySelector(".video-container");
const timelineContainer = document.querySelector(".timeline-container");
const video = document.querySelector("video");

document.addEventListener("keydown", e => {
    const tagName = document.activeElement.tagName.toLowercase();

    if(tagName === "input") return

    switch (e.key.toLowerCase()) {
        case " ":
            if(tagName === "button") return
        case "k":
            togglePlay();
            break;
        case "f":
            toggleFullScreenMode();
            break;
        case "t":
            toggleTheaterMode();
            break;
        case "i":
            toggleMiniPlayerMode();
            break;
        case "m":
            toggleMute();
            break;
        case "arrowleft":
        case "j":
            skip(-5);
            break;
        case "arrowright":
        case "l":
            skip(5);
            break;
        case "c":
            toggleCaptions();
            break;
    }
})

// Timeline Events
timelineContainer.addEventListener("mousemove", handleTimelineUpdate);
timelineContainer.addEventListener("mousedown", toggleScrubbing);

document.addEventListener("mouseup", e => {
    if (isScrubbing) toggleScrubbing(e);
})

document.addEventListener("mousemove", e => {
    if (isScrubbing) handleTimelineUpdate(e);
})

let isScrubbing = false;
let wasPaused;

function toggleScrubbing(e) {
    const rect = timelineContainer.getBoundingClientRect();
    const percent = Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width;

    isScrubbing = (e.buttons & 1) === 1;
    videoContainer.classList.toggle("scrubbing", isScrubbing);

    if (isScrubbing) {
        wasPaused = video.paused;
        video.pause();
    } else {
        video.currentTime = percent * video.duration;
        if (!wasPaused) video.play();
    }

    handleTimelineUpdate(e);
}

function handleTimelineUpdate(e) {
    const rect = timelineContainer.getBoundingClientRect();
    const percent = Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width;
    const previewImgNumber = Math.max(1, Math.floor((percent * video.duration) / 10));
    const previewImgSrc = `assets/previewImgs/preview${previewImgNumber}.jpg`

    previewImg.src = previewImgSrc;
    timelineContainer.style.setProperty("--preview-position", percent);

    if (isScrubbing) {
        e.preventDefault();
        thumbnailImg.src = previewImgSrc;
        timelineContainer.style.setProperty("--progress-position", percent);
    }
}

// Playback Speed
speedBtn.addEventListener("click", changePlaybackSpeed);

function changePlaybackSpeed() {
    
}