function init($gallery){
	var $images = $gallery.find(".bb-gallery__image"),
		$showscreen = $gallery.find(".bb-showscreen"),
		$showscreen_img = $showscreen.find(".bb-showscreen__img"),
		$showscreen_next = $showscreen.find(".bb-showscreen__next"),
		$showscreen_prev = $showscreen.find(".bb-showscreen__prev"),
		$showscreen_close = $showscreen.find(".bb-showscreen__close"),
		$showscreen_meta = $showscreen.find(".bb-showscreen__meta"),
		$showscreen_full = $showscreen.find(".bb-showscreen__full-link"),
		images_count = $images.length,
		index = 0;

	$showscreen_img.on("load", function(){
		$showscreen_img.fadeIn(200);
	});

	$images.on("click", function(){
		var $clicked = $(this),
			img_src = $clicked.data("src"),
			img_full = $clicked.data("full"),
			img_description = $clicked.data("descr");

		index = $images.index($clicked);
		$showscreen_img.attr("src", img_src);
		$showscreen_full.attr("href", img_full);
		$showscreen_meta.text(img_description);
		$showscreen.addClass("active");
	});

	$showscreen_close.on("click", function(){
		$showscreen.removeClass("active");
	});

	function showSlide(i){
		var $image = $images.eq(i),
			img_src = $image.data("src"),
			img_full = $image.data("full"),
			img_description = $image.data("descr");

		$showscreen_img.fadeOut(200, function(){
			$showscreen_img.attr("src", img_src);
			$showscreen_full.attr("href", img_full);
			$showscreen_meta.text(img_description);
		});
	}

	$showscreen_next.on("click", function(){
		index++;
		if(index>=images_count){
			index = 0;
		}
		showSlide(index);
	});

	$showscreen_prev.on("click", function(){
		index--;
		if (index<0) {
			index = images_count-1;
		}
		showSlide(index);
	});
}


module.exports = {
	init : init
};