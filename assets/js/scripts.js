$(function() {
    $('.pi-form--game-start input:checkbox').on('click', function() {
        var limit = $('input:checkbox:checked').length >= 2;
        $(".pi-form--game-start input:checkbox").not(":checked").attr("disabled", limit);
    });
});