$(function() {

    $('.pi-form--game-start input:checkbox').on('click', function() {

        var min = $('input:checkbox:checked').length !== 2;
        $('.pi-form--game-start button[type="submit"]').attr('disabled', min);

        var limit = $('input:checkbox:checked').length >= 2;
        $('.pi-form--game-start input:checkbox').not(':checked').attr('disabled', limit);

    });
});