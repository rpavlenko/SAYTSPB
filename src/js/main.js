$(document).ready(function () {

    var player;
    $('.video__play').on('click', function onYouTubeIframeAPIReady() {
      player = new YT.Player('player', {
        height: '465',
        width: '100%',
        videoId: 'DvwS7cV9GmQ',
        events: {
          'onReady': videoPlay,
        }
      });
    })

    function videoPlay(event) {
      event.target.playVideo();
      $('.statistics__wrap').hide();
      if ($(window).width() <= 576) {
        $('.statistics__wrap').show();
        $('.statistics__video').css('margin-top', 10)
        $('.statistics__video').css('height', 250)
      }
    }

});