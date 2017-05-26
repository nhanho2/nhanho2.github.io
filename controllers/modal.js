$.noConflict();
var $ = jQuery;


$(document).ready(function() {
    $('.btn-log').click(function() {
        $('.modal').modal('hide');
    });
    $('#link').click(function() {
        $('.modal').modal('hide');
    });
    $('#view-cart').click(function() {
        $('.modal').modal('hide');
    });
})