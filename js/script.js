var swiper = new Swiper(".mySwiper", {
  breakpoints: {
    375: {
      slidesPerView: 1.29,
      spaceBetween: 19
    },
    // 768px以上の場合
    768: {
      slidesPerView: 2.7726
    }
  },
  spaceBetween: 40,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

$(function(){
  $(".js-question").on("click", function() {
  $(".js-question").not(this).removeClass("is-active");
  $(".js-question").not(this).next().slideUp(300);
  $(this).toggleClass("is-active");
  $(this).next().slideToggle(300);
  });

  // topへ戻る
  
  var pagetop = $('#page-top');
  // ボタン非表示
  pagetop.hide();
  // 100px スクロールしたらボタン表示
  $(window).scroll(function () {
     if ($(this).scrollTop() > 1000) {
          pagetop.fadeIn();
     } else {
          pagetop.fadeOut();
     }
  });
  pagetop.click(function () {
     $('body, html').animate({ scrollTop: 0 }, 500);
     return false;
  });
  
  /*ハンバーガーメニュー*/
  $(".toggle-btn , .mask").on("click", function() {
    $(".toggle-nav").toggleClass("open");
    $('body').toggleClass('noscroll');
    $(".mask").toggleClass("open");
    $(".toggle-btn span").toggleClass("open");
    $(".toggle-btn").toggleClass("open");
    
    });
  });

  $(".toggle-nav-item a[href]").on('click', function(e) {
    $(".toggle-btn").trigger('click');
  });

  //スムーススクロール
  jQuery('a[href^="#"]').click(function() {
      // .headerクラスがついた要素の高さを取得
    let header = jQuery(".header").innerHeight();
    // 移動速度を指定（ミリ秒）
    let speed = 300;
    // hrefで指定されたidを取得
    let id = jQuery(this).attr("href");
    // idの値が#のみだったらターゲットをhtmlタグにしてトップへ戻るようにする
    let target = jQuery("#" == id ? "html" : id);
    // ページのトップを基準にターゲットの位置を取得
    let position = jQuery(target).offset().top - header;
    // ターゲットの位置までspeedの速度で移動
    jQuery("html, body").animate(
      {
        scrollTop: position
     },
      speed
    );
    return false;
  });
  

/*ページ移動しないでgoogleフォームに内容を送信 サンクスするやつ*/

  $(document).ready(function () {

    $('#form').submit(function (event) {
      var formData = $('#form').serialize();
      $.ajax({
        url: "https://docs.google.com/forms/u/0/d/e/1FAIpQLSd0BCtKCzlRjza8gJ51HjjvAMuoSWi6uUnaYnNXzceHLANLzQ/formResponse",
        data: formData,
        type: "POST",
        dataType: "xml",
        statusCode: {
          0: function () {
            $(".end-message").slideDown();
            $(".contact-submit-btn").fadeOut();
            //window.location.href = "thanks.html";
          },
          200: function () {
            $(".false-message").slideDown();
          }
        }
      });
      event.preventDefault();
    });

  });

  /*コンタクトフォームのボタンの色を変えるやつ */

  $(function(){
    $("form input:required").on("input",function(){
      var input_name = $("#contact-name").val().length;
      var input_ruby = $("#contact-ruby").val().length;
      if (input_name !== 0 && input_ruby !== 0) {
    
        $(".contact-submit-btn").addClass("is-active");
      } else {
        $(".contact-submit-btn").removeClass("is-active");
      }
    })
  });