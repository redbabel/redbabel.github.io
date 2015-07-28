// (function(window) {

//     'use strict';


$(document).ready(function() {



    $('form').submit(function(e) {

        var $contactForm = $('form');
        var formObj = {};
        _.each($contactForm.serializeArray(), function(item) {
            formObj[item.name] = item.value
        });
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

                mixpanel.identify(formObj._replyto);
                mixpanel.people.set({
                    "$created": _.now,
                    "$email": formObj._replyto,
                });
                mixpanel.track("request", formObj);

            },
            error: function(err) {
                $contactForm.find('.alert--loading').toggleClass('hidden');
                $contactForm.find('.alert--error').toggleClass('hidden');
                mixpanel.track("error", $(this).serialize());
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
