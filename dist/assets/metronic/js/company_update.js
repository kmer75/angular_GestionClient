 $(document).ready(function() {
                        	
	 
	 //update companyProfession : ajout profession
	 
            				$('#ajoutProfessionTbody').on('click', '#companyProfessionPlus',function(){
            					$tr = $(this).parent('tr');
            					console.log($tr);
            					professionnel = $tr.find('#professionnel').text();
            					profession = $tr.find('#profession').text();
            					console.log(professionnel);
            					console.log(profession);
            					
            					$.get('/company/updateCompanyProfession', {professionnel: professionnel, profession: profession}, function(data) {
            						$tr.fadeOut(800);
            						$donnee = data;
            						$('table.companyProfession tbody').prepend($donnee);
            						$('#currentTr').hide().fadeIn(800);
            						 console.log('data ' +data);
            					}); // fin post
            					
            					return false;
            					
            				});//fin click()
            				
            				//------------------------------------ fin ajout profession
            				
            				//delete companyProfession : suppression profession
            				
            				$('#companyProfessionTbody').on('click', '#deleteCompanyProfession', function() {
            					$td = $(this).parent('td');
            					$tr = $td.parent('tr');
            					console.log($tr);
            					idCP =  $tr.find('#idCP').text();
            					console.log(idCP);
            					
            					$.ajax({
            						
            						type: "GET",
            						contentType: "application/json; charset=utf-8",
            						url: "/company/profession/delete",
            						data: {idCP: idCP},
            						success: function (donnee) {
            							console.log('ajax ' + $tr);
            							$tr.fadeOut(800);
            							console.log('data ' +donnee);
            							 $('#ajoutProfessionTbody').prepend(donnee);
            						}, // fin SUCCESS
            						error: function (result) {
            							alert("Error " + result);
            						}
            					}); //fin AJAX
            					
            				});//fin click()
            				
            				//fin suppression profession
            				
            				
            				//update companyProfession discount: update discount
            				
            				$('#companyProfessionTbody').on('click', '#sendDiscount', function() {
            					$td = $(this).parent('td');
            					$tr = $td.parent('tr');
            					console.log($tr);
            					idCP =  $tr.find('#idCP').text();
            					discount =  $tr.find('#inputDiscount input').val();
            					console.log(idCP);
            					console.log(discount);
            					
            					$.ajax({
            						
            						type: "GET",
            						contentType: "application/json; charset=utf-8",
            						url: "/company/discount",
            						data: {idCP: idCP, discount: discount},
            						success: function (donnee) {
            							console.log('ajax ' + $tr);
            							$tr.fadeOut(200).fadeIn(1000);
            							console.log('data ' +donnee);
            						}, // fin SUCCESS
            						error: function (result) {
            							alert("Error " + result);
            						}
            					}); //fin AJAX
            					
            				});//fin click()
            				
            				//fin suppression profession
            				
       //delete companyZipcodeProfession : suppression zipcode
            				
            				$('#companyZipcodeTbody').on('click', '#deleteCompanyZipcode', function() {
            					$td = $(this).parent('td');
            					$tr = $td.parent('tr');
            					console.log($tr);
            					idCZ =  $tr.find('#idCZ').text();
            					console.log(idCZ);

            					$.ajax({

						            type: "GET",
						            contentType: "application/json; charset=utf-8",
						            url: "/company/zipcodeProfession/delete",
						            data: {idCZ: idCZ},
						            success: function (donnee) {
						            	console.log('ajax ' + $tr);
	            						$tr.fadeOut(800);
	            						 console.log('data ' +donnee);
	            						
						            }, // fin SUCCESS
						            error: function (result) {
						                alert("Error " + result);
						            }
						        }); //fin AJAX
            					
            				});//fin click()
            				
            				//fin suppression zipcode
            				
            					

            			});//fin document ready