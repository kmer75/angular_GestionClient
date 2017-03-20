						            /*------------------------------------------------------
					          			Envoie ajax des données au serveur
					            	--------------------------------------------------------*/
					            	
			            				function formAjax(){
			            					
			            					if($('.checked').length == 0) {
			            						console.log($('.checked').length);
			            						 $('#msg').text("Vous devez sélectionner au moins un métier");
	 			            					 $('#msg').slideDown().delay(2000).slideUp();
			            					} else {
			            					
			            					zipcode = $('#zipcode').val();
			            					professionnel = $('#professionnel').val();
			            					var arrProfession = new Array();
			            					$('.checked').find('input').each(function(){
			            					    arrProfession.push($(this).val());
			            					})
			            					var stringProfession ="";
			            					for(item in arrProfession) {
			            						stringProfession += arrProfession[item] +'-';
			            					}
			            					console.log('zipcode ' + zipcode);
			            					console.log('professionnel ' + professionnel);
			            					console.log('array professions ' + arrProfession);
			            					console.log('string profession ' + stringProfession);
			            					
			            					
			            					$.ajax({

			    					            type: "GET",
			    					            url: "/company/zipcode/new",
			    					            data: {zipcode: zipcode, professionnel: professionnel, professions: stringProfession},
			    					            statusCode: {
			    					                500: function(xhr) {
			    					                  if(window.console) console.log(xhr.responseText);
			    					                  $('#msg').text("Un problème est survenu, veuillez réessayer ultérieurement s'il vous plaît");
			    	            						 $('#msg').slideDown().delay(2000).slideUp();
			    					                }
			    					            },
			    					            success: function (donnee) {
			    					            	alert('success');
			    					            	 $('#msg').text("Enregistrement effectué");
 	 			            						 $('#msg').slideDown().delay(2000).slideUp();
			            							 $('.tableAjax tbody').prepend(donnee);
			            							 $('.currentTr').hide().delay( 300 ).fadeIn( 800 );
			    					            },
			    					            complete: function(xhr, textStatus) {
			    					                console.log('complete : ' +xhr.status);
			    					            } 
			    					            }); //fin AJAX
			            					
			            					}//fin else
			            				}//fin formAjax()
			            				 /*------------------------------------------------------
					          			Fin envoie ajax des données au serveur
					            		--------------------------------------------------------*/
						           
					            		var map;
					            		var mgr;
					            		var markers = [];

					            		function initialize() {
					            		    var myOptions = {
					            		        zoom: 13,
//					            		        zoomControl: false,
//					            		        scaleControl: false,
//					            		        scrollwheel: false,
//					            		        disableDoubleClickZoom: true,
					            		        center: new google.maps.LatLng(48.856614, 2.352222), //Paris
					            		        mapTypeId: google.maps.MapTypeId.ROADMAP
					            		    };
					            		    map = new google.maps.Map(document.getElementById("map"), myOptions);
					            		    mgr = new MarkerManager(map);
					            		    google.maps.event.addListener(mgr, 'loaded', function() {


									            /*------------------------------------------------------
									          		recuperation ajax des données du serveur
									            --------------------------------------------------------*/
									            
										$.ajax({

								            type: "POST",
								            contentType: "application/json; charset=utf-8",
								            url: "/zipcodes",
								            data: "{}",
								            dataType: "json",
								            beforeSend: function(){
								                $('#allContent').addClass('opacity');
								                $('.page-spinner-bar').removeClass('hide');
								            },
								            success: function (donnee) {
								            	$.each(donnee, function (key, data) {
								            		
								            		
								    var cle = key;
								    var id = donnee[key]['id'];
								    var city = donnee[key]['city']
								    var zip = donnee[key]['zip']
								    var population = donnee[key]['population']
								    var s = donnee[key]['coordonnee'];
								    var latitude = donnee[key]['latitude']
								    var longitude = donnee[key]['longitude'];
								    var companyZipcodeProfessions = donnee[key]['companyZipcodeProfessions'];
//								    console.log(companyZipcodeProfessions);
//								    console.log(companyZipcodeProfessions.length);
								    
								    var contentString = '<p>La ville de ' + city + ' - ' + zip + '.</br>'
								    +'La population est de ' + population * 1000 + ' habitants'
									+'</p>'
									+'</hr>'
									+'<input id="zipcode" type="hidden" name="zipcode" value="'+id+'"/>'
									+'<input id="professionnel" type="hidden" name="professionnel" value="'+company+'"/>'
									+'<input type="submit" class="btn green" value="Ajouter" onclick="formAjax()"/>';
									

								  var infowindow = new google.maps.InfoWindow({
								    content: contentString
								  });

								    var marker = new google.maps.Marker({
	            		                position: new google.maps.LatLng(latitude, longitude),
	            		                title: city + ' - ' + zip
	            		            });
								    
								    marker.addListener('click', function() {
								        infowindow.open(map, marker);
								      });
								    
								    markers.push(marker);
								    
								    
								    
								    if(companyZipcodeProfessions.length > 0) {
								    
								     var item = companyZipcodeProfessions.length;
								     
								     
								     for (var i = 0; i < item; i++) {
								    	 
								    	 
								    	 if(companyZipcodeProfessions[i].company.id == company){
									    		
									    		console.log('company trouvé donc on sort de la condition !!!');
									    		
									    		marker.setVisible(false); //on rend invisible la marker qui a été pushé au préalable
									    		
									    		 infowindow = new google.maps.InfoWindow({
													    content: '<p>Cette ville est déjà dans votre liste</p>'
													  });
									    		 
												    marker = new google.maps.Marker({
					            		                position: new google.maps.LatLng(latitude, longitude),
					            		                title: city + ' - ' + zip,
					            		                icon: 'http://maps.google.com/intl/en_us/mapfiles/ms/micons/blue-dot.png'
					            		            });
												    
												    marker.addListener('click', function() {
												        infowindow.open(map, marker);
												      });
												    
												    markers.push(marker);
												    
												   i=item+1; //condition de sortie
												   
									    	} //fin check si company.id == company en cour
								    	
								    	 
								     } //fin boucle FOR
								     
								     } // fin condition si liste companyZipcodeProfession > 0
								    
								    
								     
								}); //fin EACH
								mgr.addMarkers(markers, 0);
								            	mgr.refresh();
								            }, // fin SUCCESS
								            error: function (result) {
								                alert("Error");
								            },
								            complete: function(){
								                $('.page-spinner-bar').addClass('hide');
								                $('#allContent').removeClass('opacity');
								            },
								        }); //fin AJAX
					            		    
					            		    	
					            		    	
					            		    	
					            		    	

											 /*------------------------------------------------------
											            fonction geocode
											  --------------------------------------------------------*/
												 var handleAction = function geocodeAddress() {
											                var text = $.trim($('#gmap_geocoding_address').val());
											                new google.maps.Geocoder().geocode(
											                    {address: text},
											                    function (results, status) {
											                        if (status == google.maps.GeocoderStatus.OK) {
											                            var latlng = results[0].geometry.location;
											                            map.setCenter(latlng);
											                        }
											                    });
											                
												 }

											            $('#gmap_geocoding_btn').click(function (e) {
											                e.preventDefault();
											                handleAction();
											            });

											            $("#gmap_geocoding_address").keypress(function (e) {
											                var keycode = (e.keyCode ? e.keyCode : e.which);
											                if (keycode == '13') {
											                    e.preventDefault();
											                    handleAction();
											                }
											            });
											            /*------------------------------------------------------
											            fin geocode
											            --------------------------------------------------------*/
										        
					            		    
					            		});
					            		    
					            		}
					            		
					            		$(document).ready(function() {
					            		    initialize();
					            		});

			            	
					        
					        
					        
			            	
							
							
							
					            	
