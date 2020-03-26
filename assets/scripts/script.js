document.addEventListener("DOMContentLoaded", function(event) {
	initSearch();
	initReviews();
	initMainPageSlick();
});

function initSearch() {
	var input = document.getElementById("search-input");
	var parent = document.getElementById("search-wrap");
	var clean = document.getElementById("search-clean");
	var search = document.getElementById("search");
	var visibleClean = false;
	input.onfocus = function() {
		parent.classList.add("focus");
	}
	input.onblur = function() {
		parent.classList.remove("focus");
	}
	input.onkeyup = function() {
		if (this.value == "" && visibleClean) {
			clean.classList.remove("visible");
			visibleClean = false;
		} else if (this.value != "" && !visibleClean) {
			clean.classList.add("visible");
			visibleClean = true;
		}
	}
	clean.onclick = function() {
		input.value = "";
		this.classList.remove("visible");
		visibleClean = false;
	}
	// search.onclick = function(e) {
	// 	e.preventDefault();
	// }
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
			console.log("focus")
			if(CP[row] != col) {
				this.parentNode.getElementsByClassName("cp-detail")[CP[row]].classList.remove("active");
				this.parentNode.getElementsByClassName("cp-detail")[col].classList.add("active");
			}
		}
		elem.onmouseout = function() {
			console.log("blur")
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