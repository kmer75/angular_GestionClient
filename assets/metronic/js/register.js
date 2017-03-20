var Login = function() {

    var handleRegister = function() {

        $('.register-form').validate({
            errorElement: 'span',
            errorClass: 'help-block',
            focusInvalid: false,
            ignore: "",

            invalidHandler: function(event, validator) {    
            },

            highlight: function(element) {
                $(element).closest('.form-group').addClass('has-error');
            },

            success: function(label) {
                label.closest('.form-group').removeClass('has-error');
                label.remove();
            },

            submitHandler: function(form) {
                form.submit();
            }
        });

        $('.register-form input').keypress(function(e) {
            if (e.which == 13) {
                if ($('.register-form').validate().form()) {
                    $('.register-form').submit();
                }
                return false;
            }
        });

    }

    return {
        init: function() {
            handleRegister();
        }
    };

}();

jQuery(document).ready(function() {
    Login.init();
});