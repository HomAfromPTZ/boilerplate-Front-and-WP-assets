var map_styles = [
	{
		"featureType": "water",
		"elementType": "geometry.fill",
		"stylers": [
		{ "color": "#d3d3d3" }
		]
	},{
		"featureType": "transit",
		"stylers": [
		{ "color": "#808080" },
		{ "visibility": "off" }
		]
	},{
		"featureType": "road.highway",
		"elementType": "geometry.stroke",
		"stylers": [
		{ "visibility": "on" },
		{ "color": "#b3b3b3" }
		]
	},{
		"featureType": "road.highway",
		"elementType": "geometry.fill",
		"stylers": [
		{ "color": "#ffffff" }
		]
	},{
		"featureType": "road.local",
		"elementType": "geometry.fill",
		"stylers": [
		{ "visibility": "on" },
		{ "color": "#ffffff" },
		{ "weight": 1.8 }
		]
	},{
		"featureType": "road.local",
		"elementType": "geometry.stroke",
		"stylers": [
		{ "color": "#d7d7d7" }
		]
	},{
		"featureType": "poi",
		"elementType": "geometry.fill",
		"stylers": [
		{ "visibility": "on" },
		{ "color": "#ebebeb" }
		]
	},{
		"featureType": "administrative",
		"elementType": "geometry",
		"stylers": [
		{ "color": "#a7a7a7" }
		]
	},{
		"featureType": "road.arterial",
		"elementType": "geometry.fill",
		"stylers": [
		{ "color": "#ffffff" }
		]
	},{
		"featureType": "road.arterial",
		"elementType": "geometry.fill",
		"stylers": [
		{ "color": "#ffffff" }
		]
	},{
		"featureType": "landscape",
		"elementType": "geometry.fill",
		"stylers": [
		{ "visibility": "on" },
		{ "color": "#efefef" }
		]
	},{
		"featureType": "road",
		"elementType": "labels.text.fill",
		"stylers": [
		{ "color": "#696969" }
		]
	},{
		"featureType": "administrative",
		"elementType": "labels.text.fill",
		"stylers": [
		{ "visibility": "on" },
		{ "color": "#737373" }
		]
	},{
		"featureType": "poi",
		"elementType": "labels.icon",
		"stylers": [
		{ "visibility": "off" }
		]
	},{
		"featureType": "poi",
		"elementType": "labels",
		"stylers": [
		{ "visibility": "off" }
		]
	},{
		"featureType": "road.arterial",
		"elementType": "geometry.stroke",
		"stylers": [
		{ "color": "#d6d6d6" }
		]
	},{
		"featureType": "road",
		"elementType": "labels.icon",
		"stylers": [
		{ "visibility": "off" }
		]
	},{
	},{
		"featureType": "poi",
		"elementType": "geometry.fill",
		"stylers": [
		{ "color": "#dadada" }
		]
	}
	];

var init = function (map_selector, icon_selector){
	/*
	*  new_map
	*  This function will render a Google Map onto the selected jQuery element
	*  @type	function
	*  @date	8/11/2013
	*  @since	4.3.0
	*  @param	$el (jQuery element)
	*  @return	n/a
	*/

	function new_map( $el ) {
		var $markers = $el.find('.marker'),
			args = {
				zoom		: 10,
				center		: new google.maps.LatLng(0, 0),
				mapTypeId	: google.maps.MapTypeId.ROADMAP,
				disableDoubleClickZoom: false,
				mapTypeControl: false,
				streetViewControl: false,
				draggable : true,
				overviewMapControl: false,
				overviewMapControlOptions: {
					opened: false,
				},
				styles: map_styles
			};

		// create map
		var map = new google.maps.Map( $el[0], args);

		// add a markers reference
		map.markers = [];

		// add markers
		$markers.each(function(){
			add_marker( $(this), map );
		});

		// center map
		center_map( map );

		// return
		return map;
	}

	/*
	*  add_marker
	*  This function will add a marker to the selected Google Map
	*  @type	function
	*  @date	8/11/2013
	*  @since	4.3.0
	*  @param	$marker (jQuery element)
	*  @param	map (Google Map object)
	*  @return	n/a
	*/

	function add_marker( $marker, map ) {
		// create marker
		var latlng = new google.maps.LatLng( $marker.attr('data-lat'), $marker.attr('data-lng') ),
			marker = new google.maps.Marker({
				icon: marker_icon,
				position: latlng,
				map: map
			});

		// add to array
		map.markers.push( marker );

		// if marker contains HTML, add it to an infoWindow
		if( $marker.html() ) {
			// create info window
			var infowindow = new google.maps.InfoWindow({
				content	: $marker.html(),
				maxWidth : 200
			});

			// show info window when marker is clicked
			google.maps.event.addListener(marker, 'click', function() {
				infowindow.open( map, marker );

				// Track last opened window
				if (opened_infoWindow === null) {
					opened_infoWindow = infowindow;
				} else {
					opened_infoWindow.close();

					if (opened_infoWindow == infowindow) {
						opened_infoWindow = null;
					} else {
						opened_infoWindow = infowindow;
					}
				}

			});
		}

	}

	/*
	*  center_map
	*  This function will center the map, showing all markers attached to this map
	*  @type	function
	*  @date	8/11/2013
	*  @since	4.3.0
	*  @param	map (Google Map object)
	*  @return	n/a
	*/

	function center_map( map ) {
		var bounds = new google.maps.LatLngBounds();

		// loop through all markers and create bounds
		$.each( map.markers, function( i, marker ){
			var latlng = new google.maps.LatLng( marker.position.lat(), marker.position.lng() );

			bounds.extend( latlng );
		});

		// only 1 marker?
		if( map.markers.length == 1 ) {
			// set center of map
			map.setCenter( bounds.getCenter() );
			map.setZoom( 10 );
		} else {
			// fit to bounds
			map.fitBounds( bounds );
		}

	}

	/*
	*  document ready
	*  This function will render each map when the document is ready (page has loaded)
	*  @type	function
	*  @date	8/11/2013
	*  @since	5.0.0
	*  @param	n/a
	*  @return	n/a
	*/
	// global var
	var map = null,
		opened_infoWindow = null,
		marker_icon = $(icon_selector).data("icon");

	$(map_selector).each(function(){
		// create map
		map = new_map( $(this) );
	});
};


module.exports ={
	init : init
};