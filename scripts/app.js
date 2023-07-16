const wallpapers = [
  "media/images/wallpapers/aldrin-rachman-pradana-UEwMB7Z1pKQ-unsplash.jpg",
  "media/images/wallpapers/arthur-hinton-9Y1iOQ4rvtw-unsplash.jpg",
  "media/images/wallpapers/jamo-images--WF1_mdidPU-unsplash.jpg",
  "media/images/wallpapers/jonas-verstuyft-fa73YB-Vono-unsplash.jpg",
  "media/images/wallpapers/marijana-vasic-hKaoVrHXJXE-unsplash.jpg",
  "media/images/wallpapers/max-bender-s4I1xpX_ny8-unsplash.jpg",
  "media/images/wallpapers/rebe-adelaida-zunQwMy5B6M-unsplash.jpg",
  "media/images/wallpapers/sebastian-unrau-sp-p7uuT0tw-unsplash.jpg",
  "media/images/wallpapers/tobias-tullius-RhjVGxILcqE-unsplash.jpg",
  "media/images/wallpapers/vitalii-khodzinskyi-7WEi1kpLJYM-unsplash.jpg"
]

function toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
}

function randomizeWallpaper() {
  let wallpapersIndex = Math.floor(Math.random() * wallpapers.length);
  let img = wallpapers[wallpapersIndex];
  document.querySelector("html").style.backgroundImage = "url("+img+")";
}