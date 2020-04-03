var Info = {
	vw: 0,
	vh: 0,
	mob: false,
}
document.addEventListener("DOMContentLoaded", function(event) {
	Info.vw = window.innerWidth;
	Info.vh = window.innerHeight;
	Info.mob = Info.vw <= 768;
	initReviews();
	initDemo();
	initMainPageSlick();
	if (Info.mob) {
		initMobTop();
		initWCBSlider();
	} else {
		initSearch();
	}
	if (onLoaded.length != 0) {
		for (var i = 0; i < onLoaded.length; i++) {
			onLoaded[i]();
		}
	}
	window.addEventListener("resize", function() {
		Info.vw = window.innerWidth;
		Info.vh = window.innerHeight;
		if (onResize.length != 0) {
			for (var i = 0; i < onResize.length; i++) {
				onResize[i]();
			}
		}	
	});
});

function initMobTop() {
	var opened = false;
	var btnOpen = document.getElementById("open-mob-top");
	var btnClose = document.getElementById("close-mob-top");
	var mobTop = document.getElementById("mob-top");
	btnOpen.onclick = function() {
		if (!opened) {
			console.log("open")
			mobTop.classList.add("active");
			opened = true;
		}
	}
	btnClose.onclick = function() {
		if (opened) {
			console.log("copen")
			mobTop.classList.remove("active");
			opened = false;
		}
	}
	runAccordion2(
		"mob-top-link",
		"icon-arr-t",
		"hider",
	);
}

function runAccordion2(parentsName, btnName, hidingName) {
	var parents = document.getElementsByClassName(parentsName);
	for (var i = 0; i < parents.length; i++) {
		const ci = i
		var btn = parents[ci].getElementsByClassName(btnName)[0];
		var hid = parents[ci].getElementsByClassName(hidingName)[0];
		var li = hid.getElementsByTagName("li");
		var h = 0;
		for (let j = 0; j < li.length; j++) {
			const cj = j;
			h += li[cj].getBoundingClientRect().height;
		}
		hid.style.height = h + 40 + "px";
		btn.onclick = function() {
			console.log(this);
			console.log(this.closest("." + parentsName));
			this.closest("." + parentsName).classList.toggle("hidden");
		}
	}
}

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
	var tmp = false;
	while (CP.length < rowCount) {
		CP.push(0);
	}
	for (var i = 0; i < detailsParent.length; i++) {
		const ci = i;
		detailsParent[ci].getElementsByClassName("cp-detail")[0].classList.add("active");
		detailsParent[ci].style.height = detailsParent[ci].getElementsByClassName("cp-detail")[0].getBoundingClientRect().height + "px";
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
				tmp = this.parentNode.getElementsByClassName("cp-detail")[col];
				tmp.classList.add("active");
				if (Info.mob) {
					tmp.parentNode.style.height = tmp.getBoundingClientRect().height + "px";
				}
				
			}
		}
		elem.onmouseout = function() {
			if(CP[row] != col) {
				tmp = this.parentNode.getElementsByClassName("cp-detail")[CP[row]];
				tmp.classList.add("active");
				this.parentNode.getElementsByClassName("cp-detail")[col].classList.remove("active");
				if (Info.mob) {
					tmp.parentNode.style.height = tmp.getBoundingClientRect().height + "px";
				}
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
		responsive: [
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
					dots: true,
					appendDots: $("#ms-dots")
				}
			},
		],
	});
}



function initWCBSlider() {
	$('#wcb-slider').slick({
		autoplay: false,
		// autoplaySpeed: 3000,
		// speed: 300,
		// centerMode: true,
		// centerPadding: "30px",
		swipeToSlide: true,
		slidesToShow: 2,
		arrows: false,
		dots: true,
		appendDots: $(".wcb-dots")
	});
}


var varDemo = {
	tag: {
		slider: false,
		elems: false,
		i: 77,
		n: 77, 
	},
	phone: {
		slider: false,
		elems: false,
		i: 31,
		n: 31,
	},
	coef: 1,
	isRight: false
}
function initDemo() {
	var slider = document.getElementById("fip-switch");
	// var bg = document.getElementById("fip-switch-bg");
	var left = document.getElementById("fip-left");
	var right = document.getElementById("fip-right");
	varDemo.phone.slider = document.getElementById("fip-phone-slider");
	varDemo.phone.elems = document.getElementsByClassName("fip-phone-size");
	varDemo.tag.slider = document.getElementById("fip-tag-slider");
	if (Info.mob) {
		varDemo.coef = 1;
		varDemo.tag.n = 49;
		varDemo.phone.n = 20;
		varDemo.tag.slider.style.transform = "translateX(" + (-1 * varDemo.tag.n) + "px)";
		document.getElementById("fip-arr-l").onclick = function() {
			if (varDemo.isRight) {
				slider.classList.remove("right");
				varDemo.phone.slider.style.transform = "translateX(" + (0 * varDemo.phone.n) + "px)";
				varDemo.phone.elems[1].classList.add("active");
				varDemo.phone.elems[3].classList.remove("active");
				varDemo.tag.slider.style.transform = "translateX(" + (-1 * varDemo.tag.n) + "px)";
				varDemo.isRight = false;
			}
		}
		document.getElementById("fip-arr-r").onclick = function() {
			if (!varDemo.isRight) {
				slider.classList.add("right");
				varDemo.phone.slider.style.transform = "translateX(" + (-2 * varDemo.phone.n) + "px)";
				varDemo.phone.elems[1].classList.remove("active");
				varDemo.phone.elems[3].classList.add("active");
				varDemo.tag.slider.style.transform = "translateX(" + (-3 * varDemo.tag.n) + "px)";
				varDemo.isRight = true;
			}
		}
	} else {
		resizeDemo();
		varDemo.tag.slider.style.transform = "translateX(" + (-1 * varDemo.tag.n) + "px)";

		left.onclick = function() {
			if (varDemo.isRight) {
				slider.classList.remove("right");
				varDemo.phone.slider.style.transform = "translateX(" + (0 * varDemo.phone.n) + "px)";
				varDemo.phone.elems[1].classList.add("active");
				varDemo.phone.elems[3].classList.remove("active");
				varDemo.tag.slider.style.transform = "translateX(" + (-1 * varDemo.tag.n) + "px)";
				varDemo.isRight = false;
			}
		}
		right.onclick = function() {
			if (!varDemo.isRight) {
				slider.classList.add("right");
				varDemo.phone.slider.style.transform = "translateX(" + (-2 * varDemo.phone.n) + "px)";
				varDemo.phone.elems[1].classList.remove("active");
				varDemo.phone.elems[3].classList.add("active");
				varDemo.tag.slider.style.transform = "translateX(" + (-3 * varDemo.tag.n) + "px)";
				varDemo.isRight = true;
			}
		}
	}
}
function resizeDemo() {
	varDemo.coef = Info.vw / 1920;
	varDemo.tag.n = varDemo.tag.i * varDemo.coef;
	varDemo.phone.n = varDemo.phone.i * varDemo.coef;
	if (varDemo.isRight) {
		varDemo.phone.slider.style.transform = "translateX(" + (-2 * varDemo.phone.n) + "px)";
		varDemo.tag.slider.style.transform = "translateX(" + (-3 * varDemo.tag.n) + "px)";
	} else {
		varDemo.phone.slider.style.transform = "translateX(" + (0 * varDemo.phone.n) + "px)";
		varDemo.tag.slider.style.transform = "translateX(" + (-1 * varDemo.tag.n) + "px)";
	}
}
onResize.push(resizeDemo);