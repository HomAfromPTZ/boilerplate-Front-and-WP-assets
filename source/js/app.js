(function($) {
	"use strict";

	var preloader = require("./modules/infinite_preloader.js"),
		helpers = require("./modules/helpers.js"),
		map = require("./modules/gmap.js"),
		animations = require("./modules/animations.js"),
		screenEvents = require("./modules/screens.js"),
		productsGallery = require("./modules/products-gallery.js"),
		tabs = require("./modules/tabs.js"),
		bbslider = require("./modules/bbslider.js"),
		bbgallery = require("./modules/bbgallery.js");



	// ==============================
	// Init standalone modules
	// ==============================
	animations.animateCss_init();
	if($(".screens").hasClass("bb-noscroll")){
		screenEvents.init(".bb-change", false);
	} else {
		screenEvents.init(".bb-change", true);
	}



	// ==============================
	// Add animation delay to lists
	// ==============================
	function addListDelay(list_selector, items_selector){
		var $lists = $(list_selector);

		$lists.each(function(){
			var elements = $(this).find(">"+items_selector);

			elements.each(function(index){
				$(this).css({
					"animation-delay" : 0.2+index*0.1+"s"
				});
			});
		});
	}

	function checkSublists(list_selector, item_selector, sublist_selector){
		var $lists = $(list_selector);

		$lists.each(function(){
			var elements = $(this).find(item_selector);

			elements.each(function(index){
				var $list_item = $(this),
					$sublist = $list_item.find(sublist_selector);

				if($sublist){
					$list_item.addClass("has-sublist");
					$list_item.on("click", function(){
						$sublist.toggleClass("opened");
						$list_item.siblings().find(sublist_selector).removeClass("opened");
					});
				}
			});

		});
	}



	// ==============================
	// Prepare elements
	// ==============================

	// Init leave page animation
	animations.fadePageOn("a.preload-link, .main-menu__items>li>a, .bb-pagination a", "#preloader", 500);

	// Prepare animations
	$(".bb-animation, .bb-animate-once").css({opacity: 0});

	// Prepare links list animation
	if($(".links-list").exists()){
		addListDelay(".links-list", ".links-list__item");
		checkSublists(".links-list", ".links-list__item", ".links-list__sublist");
	}

	// Prepare products list animation
	if($(".products-list").exists()){
		addListDelay(".products-list", ".products-list__item");
	}

	// Add scrollbars
	if($(".bb-scroll").exists()){
		$(".bb-scroll").mCustomScrollbar({
			theme : "rounded-dots-dark",
			axis : "y"
		});
	}

	// Add event listener to nav-helpers
	if($(".bb-next").exists()){
		$(".bb-next").on("click", function(){
			screenEvents.showScreen("next", true);
		});
	}



	// ==============================
	// After load events
	// ==============================
	function activatePageLink(){
		var hash_link = window.location.hash,
			hash_reg = /^(#[a-z0-9-]+)$/gi;

		if($("#screen-navigation").exists() && hash_link.match(hash_reg)){
			var $needed_link = $("#screen-navigation").find("li[data-url="+hash_link+"]");

			if($needed_link){
				$needed_link.trigger("click");
			}
		}

	}


	function pageInit(){
		activatePageLink();

		$(".bb-animate-once").map(function(){
			var element = $(this);
			element.addClass(element.data("animation"));
		});

		$(".bb-change.active").loadScreen();
	}



	// ==============================
	// Products gallery module
	// ==============================
	if($("#products-gallery").exists()){
		productsGallery.init();
	}



	// ==============================
	// Google map init
	// ==============================
	if($("#bb-map").exists()){
		var map_selector = "#bb-map",
			icon_template = "#bb-marker-icon";

		map.init(map_selector,icon_template);
	}



	// ==============================
	// FAQ module
	// ==============================
	(function(){
		if($(".faq").exists()){
			var controls = "#faq-controls .links-list__item",
				items = "#faq-items .faq__answer";

			tabs(controls, items);

			if($("#faq-counter").exists()){
				var answers_counter = screenEvents.counter(items, "#faq-answers-current", "#faq-answers-total");

				$(controls).on("click", function(){
					var clicked = $(this),
						number = clicked.index()+1;

						answers_counter.update(number);
				});
			}
		}
	})();



	// ==============================
	// Contacts module
	// ==============================
	(function(){
		if($(".contacts").exists()){
			var controls = "#contacts-controls .contacts__city",
				items = "#contacts-items .address-panel";

			tabs(controls, items);
		}
	})();



	// ==============================
	// Content slider module
	// ==============================
	(function(){
		if($(".bb-slider").exists()){
			var sliders = $(".bb-slider");

			sliders.each(function(){
				var slider = $(this);

				bbslider.init(slider);
			});
		}
	})();


	// ==============================
	// Content gallery module
	// ==============================
	(function(){
		if($(".bb-mansongallery").exists()){
			var galleries = $(".bb-mansongallery");

			galleries.each(function(){
				var gallery = $(this);

				bbgallery.init(gallery);
			});
		}
	})();



	// ==============================
	// Main menu tab
	// ==============================
	$("#menu-toggle").click(function(){
		$(this).add("#main-menu, .header")
			.toggleClass("active");
	});



	// ==============================
	// Consultation tab
	// ==============================
	$(".consultation-toggle").click(function(){
		$("#consultation").toggleClass("active");
	});



	// ==============================
	// Buy tab
	// ==============================
	$(".buy-toggle").click(function(){
		$("#buy-form").toggleClass("active");
	});



	// ==============================
	// Preloader
	// ==============================
	preloader().done(function(){
		pageInit();
	});

})(jQuery);