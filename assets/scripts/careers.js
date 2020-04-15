onLoaded.push(function() {
	document.querySelector('.cr_video_play').addEventListener('click', function () {
		document.getElementById('cr_video').classList.add('watch_video');
		document.getElementById('cr_bg_video').src += "&autoplay=1";
	});
})

onLoaded.push(function() {
	if (!Info.mob) {
		$('.slider').slick({
			autoplay: false,
			// autoplaySpeed: 3000,
			prevArrow: "#ms-prev",
			nextArrow: "#ms-next",
			// centerMode: true,
			// centerPadding: "10px",
			// speed: 300,
			swipeToSlide: true,
			slidesToShow: 3,
		});
	}
})


