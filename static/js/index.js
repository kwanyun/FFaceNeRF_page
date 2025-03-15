window.HELP_IMPROVE_VIDEOJS = false;

function changeVideo(videoNumber) {
  console.log("Changing video to: ", videoNumber); // Add this line for debugging

  var newVideoSrc = 'static/videos/' + videoNumber + '.gif';
  document.getElementById('videoImage').src = newVideoSrc;
}

$(document).ready(function() {
    // Check for click events on the navbar burger icon

    var options = {
			slidesToScroll: 1,
			slidesToShow: 1,
			loop: true,
			infinite: true,
			autoplay: true,
      pauseOnHover: true,
			autoplaySpeed: 10600,
    }

		// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);

//     Loop on each carousel initialized
//     for(var i = 0; i < carousels.length; i++) {
//     	// Add listener to  event
//     	carousels[i].on('before:show', state => {
// //     		console.log(state);
//     	});
//     }

    // Access to bulmaCarousel instance of an element
//     var element = document.querySelector('#my-element');
//     if (element && element.bulmaCarousel) {
//     	// bulmaCarousel instance is available as element.bulmaCarousel
//     	element.bulmaCarousel.on('before-show', function(state) {
// //     		console.log(state);
//     	});
//     }

    function updateStyleImage(sliderId, imageId) {
      var sliderValue = $('#' + sliderId).val();
      var paddedValue = String(sliderValue).padStart(3, '0'); // pad the value with zeros
      var newImageSrc = 'static/images/' + sliderId+paddedValue + '.png';
      $('#' + imageId).attr('src', newImageSrc);
  }

  

  bulmaSlider.attach();

  // Event listeners for each slider
  $('#styleSlider1').on('input change', function() {
      updateStyleImage('styleSlider1', 'styleImage1');
  });
  $('#styleSlider2').on('input change', function() {
      updateStyleImage('styleSlider2', 'styleImage2');
  });
  $('#styleSlider3').on('input change', function() {
      updateStyleImage('styleSlider3', 'styleImage3');
  });
  $('#styleSlider4').on('input change', function() {
      updateStyleImage('styleSlider4', 'styleImage4');
  });
});