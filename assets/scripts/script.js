document.addEventListener("DOMContentLoaded", function(event) {
	initSearch();
	initReviews();
	initDemo();
	initMainPageSlick();
	if (onLoaded.length != 0) {
		for (var i = 0; i < onLoaded.length; i++) {
			onLoaded[i]();
		}
	}
});

function initSearch() {
	// var input = document.getElementById("search-input");
	var parent = document.getElementById("search-wrap");
	var clean = document.getElementById("search-clean");
	var search = document.getElementById("search");
	var opened = false;
	// var visibleClean = false;
	// input.onfocus = function() {
	// 	parent.classList.add("focus");
	// }
	// input.onblur = function() {
	// 	parent.classList.remove("focus");
	// }
	// input.onkeyup = function() {
	// 	if (this.value == "" && visibleClean) {
	// 		clean.classList.remove("visible");
	// 		visibleClean = false;
	// 	} else if (this.value != "" && !visibleClean) {
	// 		clean.classList.add("visible");
	// 		visibleClean = true;
	// 	}
	// }
	clean.onclick = function() {
		// input.value = "";
		// this.classList.remove("visible");
		// visibleClean = false;
		parent.classList.remove("focus");
		opened = false;

	}
	search.onclick = function(e) {
		if (!opened) {
			e.preventDefault();
			parent.classList.add("focus");
			opened = true;
		}
	}
}


var CP = []
function initReviews() {
	var elems = document.getElementsByClassName("cp-elem");
	var detailsParent = document.getElementsByClassName("cp-details");
	var rowCount = Math.floor(elems.length / 2);
	while (CP.length < rowCount) {
		CP.push(0);
	}
	for (var i = 0; i < elems.length; i++) {
		const ci = i;
		const elem = elems[i];
		const row = Math.floor(ci / 2);
		const col = ci % 2;
		elem.onclick = function() {
			this.classList.add("active");
			this.parentNode.getElementsByClassName("cp-elem")[CP[row]].classList.remove("active");
			CP[row] = col;
		}
		elem.onmouseover = function() {
			if(CP[row] != col) {
				this.parentNode.getElementsByClassName("cp-detail")[CP[row]].classList.remove("active");
				this.parentNode.getElementsByClassName("cp-detail")[col].classList.add("active");
			}
		}
		elem.onmouseout = function() {
			if(CP[row] != col) {
				this.parentNode.getElementsByClassName("cp-detail")[CP[row]].classList.add("active");
				this.parentNode.getElementsByClassName("cp-detail")[col].classList.remove("active");
			}
		}
	}
}
function loadMoreReviews() {
	initReviews();
}

function initMainPageSlick() {
	$('.ms-slider').slick({
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

function initDemo() {
	var isRight = false;
	var slider = document.getElementById("fip-switch");
	// var bg = document.getElementById("fip-switch-bg");
	var left = document.getElementById("fip-left");
	var right = document.getElementById("fip-right");

	var phoneSlider = document.getElementById("fip-phone-slider");
	var phoneSliderElems = document.getElementsByClassName("fip-phone-size");
	var tagSlider = document.getElementById("fip-tag-slider");
	tagSlider.style.transform = "translateX(" + (-1 * 76) + "px)";

	left.onclick = function() {
		if (isRight) {
			slider.classList.remove("right");
			phoneSlider.style.transform = "translateX(" + (0 * 31) + "px)";
			phoneSliderElems[1].classList.add("active");
			phoneSliderElems[3].classList.remove("active");
			tagSlider.style.transform = "translateX(" + (-1 * 77) + "px)";
			isRight = false;
		}
	}
	right.onclick = function() {
		if (!isRight) {
			slider.classList.add("right");
			phoneSlider.style.transform = "translateX(" + (-2 * 31) + "px)";
			phoneSliderElems[1].classList.remove("active");
			phoneSliderElems[3].classList.add("active");
			tagSlider.style.transform = "translateX(" + (-3 * 77) + "px)";
			isRight = true;
		}
	}
}