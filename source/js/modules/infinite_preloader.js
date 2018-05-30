// ==========================================
// Preloader with percentage by image count
// ==========================================
var	preloader_container = $("#preloader"),
	hasImageProperties = ["background", "backgroundImage", "listStyleImage", "borderImage", "borderCornerImage", "cursor"],
	hasImageAttributes = ["srcset"],
	match_url = /url\(\s*(['"]?)(.*?)\1\s*\)/g,
	all_images = [],
	total = 0,
	count = 0,
	load = $.Deferred();

module.exports = function preloader() {

	function img_loaded(){
		count ++;
		if(count === total){
			return done_loading();
		}
	}

	function done_loading(){
		preloader_container.delay(400).fadeOut(400, function(){
			// Callbacks
			load.resolve();
		});
	}

	function images_loop (total) {
		for(var i=0; i<total; i++){
			var test_image = new Image();

			test_image.onload = img_loaded;
			test_image.onerror = img_loaded;

			if (all_images[i].srcset) {
				test_image.srcset = all_images[i].srcset;
			}

			test_image.src = all_images[i].src;
		}
	}

	// Get all images
	$("*").each(function () {
		var element = $(this);

		if (element.is("img") && element.attr("src")) {
			all_images.push({
				src: element.attr("src"),
				element: element[0]
			});
		}

		$.each(hasImageProperties, function (i, property) {
			var propertyValue = element.css(property);
			var match;

			if (!propertyValue) {
				return true;
			}

			match = match_url.exec(propertyValue);
			
			if (match) {
				all_images.push({
					src: match[2],
					element: element[0]
				});
			}
		});

		$.each(hasImageAttributes, function (i, attribute) {
			var attributeValue = element.attr(attribute);

			if (!attributeValue) {
				return true;
			}

			all_images.push({
				src: element.attr("src"),
				srcset: element.attr("srcset"),
				element: element[0]
			});
		});
	});

	total = all_images.length;

	// Start preloader or exit
	if (total === 0) {
		done_loading();
	} else {
		images_loop(total);
	}

	return load.promise();
};