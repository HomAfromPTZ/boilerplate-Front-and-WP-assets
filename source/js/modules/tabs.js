// ==============================
// Simple tabs
// ==============================

module.exports = function(control_selector, content_selector){
	var $controls = $(control_selector),
		$content = $(content_selector);

	$controls.on("click", function(event){
		event.stopPropagation();

		var $clicked = $(this),
			index = $controls.index($clicked);

		if(!$clicked.hasClass("active")){
			$controls
				.add($content)
				.removeClass("active");

			$content.eq(index)
				.add($clicked)
				.addClass("active");
		}
	});
};