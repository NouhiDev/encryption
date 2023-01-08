$(window).on("load",function(){
    $(".loader").fadeOut(1000);
    delay(1000).then(() => $(".content").fadeIn(1000));
})

// Adds delay
function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }