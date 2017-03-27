//$(document).ready(function() {
// alert('ds le js !');
    var table = $('#sample').DataTable({
    	'ajax' : '/zipcodes',
        'serverSide' : true,
        columns : [{
			 data : 'insee',
			 visible: false
        }, 	{
        	
            data : 'zip'
        }, {
            data : 'city'
            
        }, {
            data : 'population'
            
        }, 
         {
            data : 'coordonnee',
            visible: false
            
        },  {
            data : 'coefficient',
            render : function(data, type, row) {
                return '<input class="form-control coefficient" type="text" value='+data+' name="coefficient" />';
            }	
            
        }]
    });

    $('#sample tbody').on( 'click', 'td', function (ev) {
    	
    	ev.preventDefault();

    		 	var tr = $(this).parents('tr');
    		    var row = table.row( tr );
    		    
    			var zip = row.data().zip ;
    		    var city = row.data().city;
    		    var insee = row.data().insee ;
    		    var coefficient = row.data().coefficient ;
    	        var coordonnee = row.data().coordonnee;
    	        var arrayOfStrings = coordonnee.split(",");
    	        var latitude = parseFloat(arrayOfStrings[0]);
    	        var longitude = parseFloat(arrayOfStrings[1]);
    	        console.log(coordonnee);
    	        console.log(latitude);
    	        console.log(longitude);
    	        console.log(city);
    	        console.log(zip);
    	        console.log(coefficient);
    	        
    	        map.removeMarkers(); 
    	        map.addMarker({lat : latitude,lng : longitude,title : city}); 
    	        map.setCenter({lat : latitude, lng : longitude});
    	        
    		    
    	});
    

    	
    	$('#sample tbody').on('keypress','.coefficient',(function(e) {
    		
    		var tr = $(this).parents('tr');
		    var row = table.row( tr );
		    var coeff = $(this).val();
		    var insee = row.data().insee ;
    		
			var keycode = (e.keyCode ? e.keyCode : e.which);
			if (keycode == '13') {

				console.log('coefficient : ' +coeff);
				console.log('insee : ' + insee);
				
				$.ajax({

		            type: "GET",
		            url: "/profession/coefficientCity",
		            data: 'coefficient='+coeff+'&insee='+insee,
		            statusCode: {
		                500: function(xhr) {
		                  if(window.console) console.log(xhr.responseText);
		                  $('#msg').text("Vous devez entrer un nombre valide");
    						 $('#msg').slideDown().delay(2000).slideUp();
		                }
		            },
		            success: function (donnee) {
		            	alert('success');
		            	console.log(donnee);
		            	$('#msg').text("Enregistrement effectué");
        				 $('#msg').slideDown().delay(2000).slideUp();
		            },
		            complete: function(xhr, textStatus) {
		                console.log('complete : ' +xhr.status);
		            } 
		            }); //fin AJAX
				
			} //fin if keycode == '13'
		}));

    
//});