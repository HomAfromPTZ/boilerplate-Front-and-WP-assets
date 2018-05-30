// ===================================================
// Animate elements on scroll. Based on waypoints.js
// ===================================================
var animateCss_scroll = function (in_effect) {
	$(this).each(function() {
		var elem = $(this);
		elem.css({opacity:0})
			.addClass("animated")
			.waypoint(function(dir) {
				if (dir === "down") {
					elem.addClass(in_effect).css({opacity:1});
				}
			},
			{
				offset: "90%"
			});
	});
};



var animateCss_instant = function (in_effect) {
	$(this).each(function() {
		var elem = $(this);
		elem.addClass(in_effect)
			.css({opacity:1});
	});

	return this;
};


// ===================================================
// Init Animate CSS as chain function
// ===================================================
function animateCss_init(){
	$.fn.animate_scroll = animateCss_scroll;
	$.fn.animate_now = animateCss_instant;
}



// ========================================================
// Show owerlay layer when specified link has been clicked
// ========================================================
function fadePageOn (link_selector, overlay_selector, time){
	$(document).on("click", link_selector, function(e) {
		var href = $(this).attr("href");
		if(href[0]!="#"){
			e.preventDefault();

			return $(overlay_selector)
				.addClass("loading")
				.fadeIn(time, function(){
					return document.location = href != null ? href : "/";
				});
		}
	});
}

module.exports = {
	animateCss : animateCss_scroll,
	fadePageOn : fadePageOn,
	animateCss_init : animateCss_init
};