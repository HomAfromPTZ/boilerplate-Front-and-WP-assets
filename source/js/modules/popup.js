var popup,
	content,
	close,
	close_timeout;

function init(container, text, close){
	popup = $(container);
	content = popup.find(text);
	close = popup.find(close);
	
	close.on("click", closePopup);
};

function closePopup(){
	popup.addClass("hide").removeClass("show");
	if(close_timeout){
		clearTimeout(close_timeout);
	};
};


function showPopup (text, time){
	if (text) {
		content.html(text);
	}
	popup.removeClass("hide").addClass("show");

	if(time){
		close_timeout = setTimeout(function(){
			popup.addClass("hide").removeClass("show");
		}, time);
	}
};

module.exports = {
	init : init,
	showPopup : showPopup
};

