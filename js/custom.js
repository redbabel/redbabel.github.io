// (function(window) {

//     'use strict';


$(document).ready(function() {




    $('form').submit(function(e) {
    	var $contactForm = $('form');

        e.preventDefault();

        $.ajax({
            url: "//formspree.io/askme@redbabel.com",
            method: "POST",
            data: $(this).serialize(),
            dataType: "json",
            beforeSend: function() {
            	$contactForm.find('.alert').addClass('hidden');
            	$contactForm.find('.alert--loading').toggleClass('hidden');
            },
            success: function(data) {
                $contactForm.find('.alert--loading').toggleClass('hidden');
                $contactForm.find('.alert--success').toggleClass('hidden');
            },
            error: function(err) {
                $contactForm.find('.alert--loading').toggleClass('hidden');
                $contactForm.find('.alert--error').toggleClass('hidden');
            }
        });
        return false;
    });


    // document.onSubmit = function() {
    //     var text = $('textarea').val();
    //     console.log(text);
    //     $.ajax({
    //         url: "//formspree.io/askme@redbabel.com",
    //         method: "POST",
    //         data: {
    //             message: $('textarea').val()
    //         },
    //         dataType: "json"
    //     });
    //     return true;
    // };
});

// })
