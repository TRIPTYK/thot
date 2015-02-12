
(function(window, $) {
	var  Value = "";
	var classicTest = false;
	$('.errorInput').hide();

	$('.form-validator').on('submit', function(e){
		 event.preventDefault();
		 var Error = 0;
		 var firstName = $('.ValueFirstname').val();
		 var name = $('.ValueName').val();
		 var company = $('.ValueCompany').val();
		 var fonction = $('.ValueFonction').val();
		 var phone = $('.ValueNumber').val();
		 var mail = $('.ValueEmail').val();
		 var IsAgreeContact = $('.ValueIsAgreeContact').prop( "checked" );

		var JsonForm = new Object();
		JsonForm.name = name;
		JsonForm.firstName = firstName;
		JsonForm.company = company;
		JsonForm.function = fonction;
		JsonForm.phone = phone;
		JsonForm.mail = mail;
		JsonForm.IsAgreeContact = IsAgreeContact;
		
 		$('.validateThis').each(function(e){
 			classicTest = false;
 			Value = $(this).val();
 			console.log(Value);
 			if(Value.length > 0){
 				if(e instanceof jQuery){ var target = e; } else { var target = $(e.currentTarget); }

 				
				var isEmail      = target.hasClass('ValueEmail');
				

			
				if(isEmail)    { 
					reg = new RegExp('^[0-9a-zA-Z._-]+@{1}[0-9a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,5}$');	                        
					classicTest = true; 
				} //user@mail.com
				

				if(classicTest){
					//Clear des classes css
					
					if(reg.test(val))
					{
						target.parent().addClass('correctInput');//Le regex retourne true	
					} else {	
						if(isRequired){//Sinon, si champs requis
							if(val.length==0){
								target.parent().addClass('requiredInput');										
							} else {
								target.parent().addClass('errorInput');
							}
							Error = 1;
						} else {//Sinon, si champs non requis
							if(val.length>0){
								target.parent().addClass('errorInput');
								Error = 1;
							}
						}
					}
				}

 			}
 			else{
 				if ($(this).hasClass("required")){
 					console.log("champ requis");
 					Error = 1;
 				}
 			}
		});
			
		

		if(Error == 0){
			console.log("mail envoyé");
			var myString = JSON.stringify(JsonForm);
			console.log(myString);
			$.ajax({
				  type: "POST",
				  url: "/saveThotForm",
				  data: JsonForm,
				  success: function(data){
				  	console.log(data);
				  },
				  error:function(err){
				  	console.error(err);
				  }
			});

		}


		
	});
})(window, jQuery);
