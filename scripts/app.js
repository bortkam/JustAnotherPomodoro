function toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
}

function wallpaper() {
  switch (expression) {
    case value1:
      statements
      break;
    case value2:
      statements
      break;
    default:
      statements
  }
}