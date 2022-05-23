$(document).ready(function(){
  $("#mycarousel").carousel( { interval: 2000 } );
});


$('a[data-slide="prev"]').click(function() {
$('#mycarousel').carousel('prev');
});

$('a[data-slide="next"]').click(function() {
$('#mycarousel').carousel('next');
});