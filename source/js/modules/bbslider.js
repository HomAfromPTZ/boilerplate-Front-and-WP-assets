function init(slider_obj){
	var next_button = slider_obj.find(".bb-slider__next"),
		prev_button = slider_obj.find(".bb-slider__prev"),
		slides = slider_obj.find(".bb-slider__slides .slide"),
		active_slide = slides.filter('.active'),
		slides_count = slides.length,
		index = slides.index(active_slide);


	function showSlide(i){
		slides.eq(i)
			.addClass("active")
			.siblings()
			.removeClass("active");
	}

	next_button.on("click", function(){
		index++;
		if(index>=slides_count){
			index = 0;
		}
		showSlide(index);
	});

	prev_button.on("click", function(){
		index--;
		if (index<0) {
			index = slides_count-1;
		}
		showSlide(index);
	});
}


module.exports = {
	init : init
};