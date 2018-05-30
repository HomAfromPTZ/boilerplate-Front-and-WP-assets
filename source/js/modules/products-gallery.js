function init(){
	var animation_time = 600,
		gallery = $("#products-gallery"),
		controls_block = $("#products-gallery__controls"),
		controls = controls_block.find("li"),
		items_block = $("#products-gallery__items"),
		items = items_block.find("li"),
		cursor_area = $("#cursor-area"),
		cursorPlus = $("#cursor-plus");

	cursor_area.attr("href", controls.filter(".active").data("link"));

	// CHANGE ITEMS
	controls.on("click", function(){
		var clicked = $(this),
			index = clicked.index(),
			item = items.eq(index);

		clicked.add(item)
			.addClass("active")
			.siblings()
			.removeClass("active");

		cursor_area.attr("href", clicked.data("link"));
	});


	// CURSOR TRACKING
	cursor_area.mousemove(function(e) {
		cursorPlus.offset({
			left: e.pageX-60,
			top: e.pageY-60
		});
	});

	cursor_area.mouseleave(function(e) {
		cursorPlus.css({
			left: 30+"%",
			top: 30+"%"
		});
	});

	// SHOW PLUS PIC ON GALLERY ITEM HOVER
	cursor_area.hover(function(e){
			cursorPlus.addClass("active");
		}, function(e){
			cursorPlus.removeClass("active");
		});

}

module.exports = {
	init : init
};