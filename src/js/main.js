document.addEventListener("DOMContentLoaded", function (event) {
  const modal = document.querySelector('.modal');

  var switchModal = function switchModal() {
    modal.classList.toggle('modal--visible');
  };

  // close modal when click out of modal
  window.onclick = function (event) {
    if (event.target == modal) {
      switchModal();
    }
  }

  // close modal when Escape pressed
  window.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      modal.classList.remove('modal--visible');
    } else if (event.key === 'Esc') {
      modal.classList.remove('modal--visible');
    }
  })

});

$(document).ready(function () {
  var modal = $('.modal'),
    modalBtn = $('[data-toggle=modal]');
  closeBtn = $('.modal__close');
  successDialog = $('.success__dialog');
  modalForm = $('.modal__form');
  modalTitle = $('.modal__title');
  modalBtn.on('click', function () {
    $('.modal__title').show();
    modalForm.show();
    modal.toggleClass('modal--visible');
    successDialog.addClass('success__dialog--invisible');

  });
  closeBtn.on('click', function () {
    modal.toggleClass('modal--visible');
  });


  // Form validation
  $('.modal__form').validate({
    errorElement: 'div',
    errorClass: "invalid",
    rules: {
      // simple rule, converted to {required:true}
      userName: {
        required: true,
        minlength: 2,
        maxlength: 15
      },
      userPhone: {
        required: true,
        mobileRU: true,
      },
      // compound rule
      userEmail: {
        required: true,
        email: true
      },
      policyAgreement: "required",
    },
    messages: {
      userName: {
        required: "Заполните поле",
        minlength: "Имя не короче 2 букв",
        maxlength: "Имя не больше 15 букв",
      },
      userPhone: "Телефон обязателен, 10 цифр",
    },
    submitHandler: function (form) {
      $.ajax({
        type: "POST",
        url: "send.php",
        data: $(form).serialize(),
        success: function (response) {
          //  alert('Форма отправлена, мы свяжемся с вами через 10 минут')
          $(form)[0].reset();
          modalForm.hide();
          modalTitle.hide()
          successDialog.removeClass('success__dialog--invisible');
        },
        error: function (response) {
          console.error('Ошибка запроса ' + response);
        }
      });
    }
  });

  // phone mask
  $('[type=tel]').mask('+7(000) 000-00-00', {
    placeholder: "+7 (___) ___-__-__"
  });
  $('.modal-form__input').mask('+7 (000) 000-00-00', {
    placeholder: "Ваш номер телефона"
  });

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