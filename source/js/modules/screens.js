var backPanel = $("#bg-panel"),
	screens_selector,
	screens,
	pagination = $("#screen-pager"),
	screen_counter,
	screen_navigation,
	is_animated = false;

// =================================
// Counter
// =================================
function counter(countedElements_selector, current_selector, total_selector, remove_delay){
	var current = $(current_selector),
		total = $(total_selector),
		elements = $(countedElements_selector),
		delay = remove_delay || 700;

	current.html("<span>1</span>");
	total.html(elements.length);

	var update = function(number){
		var new_number = $("<span class='bb-animation fade-in'>"+ number +"</span>"),
			current_number = current.find("span");

		if ( number != parseInt(current_number.text()) ) {
			current_number.removeClass("fade-in")
				.addClass("bb-animation fade-out removing")
				.css({
					"position" : "absolute"
				});

			new_number.appendTo(current);

			setTimeout(function(){
				current.find(".removing").remove();
			}, delay);
		}
	};

	return {
		current : current,
		total : total,
		update : update
	};
}


// =================================
// Process screen animations
// =================================
var processScreen = function (state, animation_class) {
	var screen = $(this),
		selector = animation_class || ".bb-animation",
		animated_elements = screen.find(selector),
		panel_state = screen.data("bg-state");

	animated_elements.map(function(){
		var element = $(this),
			animation_in = element.data("animation-in"),
			animation_out = element.data("animation-out");

		if(state === "load"){
			element.addClass(animation_in)
				.removeClass(animation_out);
		} else {
			element.addClass(animation_out)
				.removeClass(animation_in);
		}
	});

	
	if(panel_state){
		if(panel_state=="hideUp"){
			backPanel.addClass(panel_state);
		} else {
			backPanel.removeClass()
				.addClass(panel_state);
		}
	}

	return this;
};


// =================================
// Process screen shorthands
// =================================
var loadScreen = function(){
	$(this).processScreen("load");
	return this;
};

var leaveScreen = function(){
	$(this).processScreen("leave");
	return this;
};



// =================================
// Change screens on scroll
// =================================
function showScreen(which_one, process_navigation, scroll_delay){
	var screenToShow,
		show_index,
		activeScreen = screens.filter(".active"),
		nextScreen = activeScreen.next(screens_selector),
		prevScreen = activeScreen.prev(screens_selector),
		delay = scroll_delay || 700;

	if(!is_animated){
		is_animated = true;

		setTimeout(function(){
			is_animated = false;
		}, delay);

		if(which_one === "next"){
			screenToShow = nextScreen.exists() ? nextScreen : screens.eq(0);
		} else if (which_one === "prev") {
			screenToShow = prevScreen.exists() ? prevScreen : screens.eq(-1);
		} else {
			screenToShow = screens.eq(which_one);
		}

		activeScreen.leaveScreen().removeClass("active");
		screenToShow.addClass("active").loadScreen();

		show_index = screens.index(screenToShow) + 1;

		if(screen_counter){
			screen_counter.update(show_index);
		}

		if(process_navigation === true){
			screen_navigation.eq(show_index-1)
				.addClass("active")
				.siblings()
				.removeClass("active");
		}
	}

}

function init(selector, scrollable) {
	var navigation_existence = false;

	if($("#screen-navigation").exists()){
		navigation_existence = true;
		screen_navigation = $("#screen-navigation").find("li");

		screen_navigation.on("click", function(){
			var item_index = $(this).index(),
				item_url = $(this).data("url");

			showScreen(item_index, true);

			if(item_url){
				window.location.hash = item_url;
			}
		});
	}

	$.fn.processScreen = processScreen;
	$.fn.loadScreen = loadScreen;
	$.fn.leaveScreen = leaveScreen;

	screens_selector = selector || ".bb-change";
	screens = $(screens_selector);

	if(screens.length > 1){
		var scrolled = false,
			scrollTimeout;

		screen_counter = counter(screens, "#current-page", "#total-pages");

		if(scrollable){

			$(".screens").on('mousewheel', function(event) {
				if(!$(event.target).parents(".mCSB_container").exists()){

					if (event.deltaY < 0){
						showScreen("next", navigation_existence);
					} else {
						showScreen("prev", navigation_existence);
					}
				}

			});

			$(document).swipe({
				fallbackToMouseEvents: false,
				excludedElements: ".feedback__input, .contacts-map",
				swipeRight: function(event, distance, duration, fingerCount, fingerData, currentDirection){
					showScreen("prev", navigation_existence);
				},
				swipeDown: function(event, distance, duration, fingerCount, fingerData, currentDirection){
					showScreen("prev", navigation_existence);
				},
				swipeLeft: function(event, distance, duration, fingerCount, fingerData, currentDirection){
					showScreen("next", navigation_existence);
				},
				swipeUp: function(event, distance, duration, fingerCount, fingerData, currentDirection){
					showScreen("next", navigation_existence);
				},
			});

		}

	} else {
		pagination.remove();
	}
}

module.exports = {
	init : init,
	showScreen : showScreen,
	counter : counter
};