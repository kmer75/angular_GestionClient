
					//initialisation de la map
					var map = new GMaps({
						el : '#map',
						//Paris
						lat : 48.84393214092011,
						lng : 2.4039459228515625,
						zoom : 13,
					});

					

					/*------------------------------------------------------
					           fonction geocode
					 --------------------------------------------------------*/
					var handleAction = function() {
						var text = $.trim($('#gmap_geocoding_address').val());
						GMaps.geocode({
							address : text,
							callback : function(results, status) {
								if (status == 'OK') {
									var latlng = results[0].geometry.location;
									map.setCenter(latlng.lat(), latlng.lng());
									App.scrollTo($('#map'));
								}
							}
						});

					}

					$('#gmap_geocoding_btn').click(function(e) {
						e.preventDefault();
						handleAction();
					});

					$("#gmap_geocoding_address").keypress(function(e) {
						
						var keycode = (e.keyCode ? e.keyCode : e.which);
						if (keycode == '13') {
							e.preventDefault();
							handleAction();
						}
					});
					/*------------------------------------------------------
					fin geocode
					--------------------------------------------------------*/
		    
					
