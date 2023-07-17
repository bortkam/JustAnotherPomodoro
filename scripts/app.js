const wallpapers = [
	{
		"location":"media/images/wallpapers/aldrin-rachman-pradana-UEwMB7Z1pKQ-unsplash.jpg",
		"author":"Aldrin Rachman Pradana",
		"link":"https://unsplash.com/photos/UEwMB7Z1pKQ"
	},
	{
		"location":"media/images/wallpapers/arthur-hinton-9Y1iOQ4rvtw-unsplash.jpg",
		"author":"Arthur Hinton",
		"link":"https://unsplash.com/photos/a-view-of-a-mountain-range-at-sunset-9Y1iOQ4rvtw"
	},
	{
		"location":"media/images/wallpapers/jamo-images--WF1_mdidPU-unsplash.jpg",
		"author":"Jamo Images",
		"link":"https://unsplash.com/photos/-WF1_mdidPU"
	},
	{
		"location":"media/images/wallpapers/jonas-verstuyft-fa73YB-Vono-unsplash.jpg",
		"author":"Jonas Verstuyft",
		"link":"https://unsplash.com/photos/fa73YB-Vono"
	},
	{
		"location":"media/images/wallpapers/marijana-vasic-hKaoVrHXJXE-unsplash.jpg",
		"author":"Marijana Vasic",
		"link":"https://unsplash.com/photos/hKaoVrHXJXE",
	},
	{
		"location":"media/images/wallpapers/max-bender-s4I1xpX_ny8-unsplash.jpg",
		"author":"Max Bender",
		"link":"https://unsplash.com/photos/s4I1xpX_ny8"
	},
	{
		"location":"media/images/wallpapers/rebe-adelaida-zunQwMy5B6M-unsplash.jpg",
		"author":"Rebe Adelaida",
		"link":"https://unsplash.com/photos/zunQwMy5B6M"
	},
	{
		"location":"media/images/wallpapers/sebastian-unrau-sp-p7uuT0tw-unsplash.jpg",
		"author":"Sebastian Unrau",
		"link":"https://unsplash.com/photos/sp-p7uuT0tw"
	},
	{
		"location":"media/images/wallpapers/tobias-tullius-RhjVGxILcqE-unsplash.jpg",
		"author":"Tobias Tullius",
		"link":"https://unsplash.com/photos/RhjVGxILcqE"
	},
	{
		"location":"media/images/wallpapers/vitalii-khodzinskyi-7WEi1kpLJYM-unsplash.jpg",
		"author":"Vitalii Khodzinskyi",
		"link":"https://unsplash.com/photos/7WEi1kpLJYM"
	},
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
	document.querySelector("html").style.backgroundImage = "url("+img.location+")";
	document.getElementById("wallpaperAuthor").innerHTML = img.author;
	document.getElementById("wallpaperLink").href = img.link;
}