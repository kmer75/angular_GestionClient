var Login = function() {

	var handleLogin = function() {

		$('.login-form').validate({
			errorElement : 'span',
			errorClass : 'help-block',
			focusInvalid : false,

			invalidHandler : function(event, validator) {
				$('.alert-danger', $('.login-form')).show();
			},

			highlight : function(element) {
				$(element).closest('.form-group').addClass('has-error');
			},

			success : function(label) {
				label.closest('.form-group').removeClass('has-error');
				label.remove();
			},

			submitHandler : function(form) {
				form.submit();
			}
		});

		$('.login-form input').keypress(function(e) {
			if (e.which == 13) {
				if ($('.login-form').validate().form()) {
					$('.login-form').submit(); 
				}
				return false;
			}
		});
	}

	var handleForgetPassword = function() {
		$('.forget-form').validate({
			errorElement : 'span', // default input error message container
			errorClass : 'help-block', // default input error message class
			focusInvalid : false, // do not focus the last invalid input
			ignore : "",
			

			invalidHandler : function(event, validator) { // display error
				$('.alert-danger', $('.forget-form')).show();// alert on form
				// submit

			},

			highlight : function(element) {
				$(element).closest('.form-group').addClass('has-error');
			},

			success : function(label) {
				label.closest('.form-group').removeClass('has-error');
				label.remove();
			},

			submitHandler : function(form) {
				form.submit();
			}
		});
		
		$('.forget-form input').keypress(function(e) {
			if (e.which == 13) {
				if ($('.forget-form').validate().form()) {
					$('.forget-form').submit();
				}
				return false;
			}
		});

	}
	
	
	var handleForgetPassword = function() {
		$('.reset-form').validate({
			errorElement : 'span', // default input error message container
			errorClass : 'help-block', // default input error message class
			focusInvalid : false, // do not focus the last invalid input
			ignore : "",
			

			invalidHandler : function(event, validator) { // display error
				$('.alert-danger', $('.reset-form')).show();// alert on form
				// submit

			},

			highlight : function(element) {
				$(element).closest('.form-group').addClass('has-error');
			},

			success : function(label) {
				label.closest('.form-group').removeClass('has-error');
				label.remove();
			},

			submitHandler : function(form) {
				form.submit();
			}
		});
		
		$('.reset-form input').keypress(function(e) {
			if (e.which == 13) {
				if ($('.reset-form').validate().form()) {
					$('.reset-form').submit();
				}
				return false;
			}
		});

	}
	

	return {
		init : function() {
			handleLogin();
			handleForgetPassword();
		}

	};

}();

jQuery(document).ready(function() {
	Login.init();
});