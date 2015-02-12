(function(window, $) {
	$('.form-validator').on('submit', function(e){
		 event.preventDefault();

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
		JsonForm.fonction = fonction;
		JsonForm.phone = phone;
		JsonForm.mail = mail;
		JsonForm.IsAgreeContact = IsAgreeContact;

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

	});
})(window, jQuery);
