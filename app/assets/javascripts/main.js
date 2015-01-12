// JavaScript Document

$(document).ready(function(){
  showyoutube();
  closeyoutube();
});

function showyoutube(){
  $('#play_cat_tubes').click(function(){
    $("#cat_tubes").show();
    $("#background_cat").css("opacity", 0.5);

  });
}

function closeyoutube(){
  $('#close_cat_tubes').click(function(){
    $("#cat_tubes").hide();
    $("#background_cat").css("opacity", 1);
  });
}