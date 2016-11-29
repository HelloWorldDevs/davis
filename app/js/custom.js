(function($) {
  var HelloWorldDevs = function() {

  };

  HelloWorldDevs.prototype.noOrphans = function (selectors, exceptions) {
    $(selectors).not(exceptions).each(function () {
      $(this).html($(this).html().replace(/\s([^\s<]{0,10})\s*$/, '&nbsp;$1'));
    });
  };

  HelloWorldDevs.prototype.mailForm = function (form, success_msg, uid) {
    var $form = $(form);
    $form.submit(function(e) {
      e.preventDefault();
      var formData = $form.serialize();
      var formAction = 'http://web-api.tysonsteele.com/v1/webprops/'+uid+'/schedule';
      $('.form-error').remove();
      $.ajax({
        type: 'POST',
        url: formAction,
        data: formData,
        dataType: 'json',
        encode: true
      }).done(function (response) {
        $form.replaceWith($(success_msg).html());
      }).error(function (response) {
        var $error_list = $('<ul>');
        if(response.responseJSON == undefined) {
          $error_list.append($('<li>').text('There was a problem with your submission. Please ensure all fields are correctly entered.'));
        } else {
          $.each(response.responseJSON, function(key, value) {
            $error_list.append($('<li>').text(value));
          });
        }
        $form.before('<div class="form-error"></div>');
        $('.form-error').html($error_list).fadeIn();
      });
    });
  };

  var HWD = new HelloWorldDevs();

  HWD.noOrphans('h1,h2,h3,h4,h5,h6,li,p', '.price-box-h3-mid,.allow-orphan');
  HWD.mailForm('#mail-form', '#success_msg' , '7fb35345-752d-4792-9480-cd3db6674a62');

  $('.tour-carousel').owlCarousel({
    items: 1,
    loop: true,
    autoplay: true,
    autoplaySpeed: 400,
    autoplayTimeout: 6000,
    autoplayHoverPause:true,
    nav: true,
    dots: false,
    navText: [
      '<img src="assets/chevron.png" alt="nav arrow"></img>',
      '<img src="assets/chevron.png" alt="nav arrow"></img>'
    ],
    responsive: {
      480: {
        items: 2
      },
      768: {
        items: 3
      },
      992: {
        items: 4
      }
    }
  });

  var $tourModalCarousel = $('.tour-carousel-2');
  $tourModalCarousel.owlCarousel({
    items: 1,
    loop: true,
    autoplay: true,
    autoplaySpeed: 400,
    autoplayTimeout: 6000,
    autoplayHoverPause:true,
    nav: true,
    dots: false,
    navText: [
      '<img src="assets/chevron.png" alt="nav arrow"></img>',
      '<img src="assets/chevron.png" alt="nav arrow"></img>'
    ],
    margin: 0
  });

  $('.services-carousel').owlCarousel({
    items: 1,
    loop: true,
    autoplay: true,
    autoplaySpeed: 400,
    autoplayTimeout: 6000,
    autoplayHoverPause:true,
    nav: true,
    dots: false,
    navText: [
      '<img src="assets/chevron.png" alt="nav arrow"></img>',
      '<img src="assets/chevron.png" alt="nav arrow"></img>'
    ],
    responsive: {
      480: {
        items: 2
      },
      768: {
        items: 3
      },
      992: {
        items: 4
      }
    }
  });

  $('#google-map5').gMap({
    address: '35.3383245,-80.7513069',
    maptype: 'ROADMAP',
    zoom: 15,
    markers: [
      {
        address: "35.3384282,-80.7607938"
      }
    ],
    doubleclickzoom: false,
    controls: {
      panControl: false,
      zoomControl: false,
      mapTypeControl: false,
      draggable: false,
      scaleControl: false,
      streetViewControl: false,
      overviewMapControl: false
    }
  });

  
  // Fix for menu scroll to links. Offsets are needed for desktop but not tablet or mobile.
  // ======================================================================================
  
  // Store Menu Offests for reset on screen resize reset
  var menuOffsets = [];
  $('#primary-menu').find('a').each(function(index) {
    menuOffsets.push($(this).attr('data-offset'));
  });

  // kills menu offsets for tablet and mobile on load
  if ($(window).width() < 993) {
    $('#primary-menu').find('a').attr('data-offset', '-5');
  }

  // Fix scrollTo offsets on tablet and mobile versions (sets data offsets to zero)
  $(window).resize(function() {
    if ($(window).width() < 993) {
      // sets all menu offset to zero for mobile
      $('#primary-menu').find('a').attr('data-offset', '-5');
    } else {
      // resets all menu offsets to origin value
      $('#primary-menu').find('a').each(function(index) {
        $(this).attr('data-offset', menuOffsets[index]);
      });
    }
  });

  // Syncing the tour carousel and modal tour carousel
  // ======================================================================================

  $('.js-synced-carousel').click(function() {
    var tourIndex = $(this).attr('js-carousel-target');
    console.log(tourIndex);
    $tourModalCarousel.trigger('to.owl.carousel', [ tourIndex , 0] );
  });


  // fix rendering ghost in tour modal
  $('#tourModal').on('shown.bs.modal', function() {
    $('.tour-modal-item').removeClass('tour-modal-item');
  });


})(jQuery);
