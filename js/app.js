$(function() {
  /* Fixed Header*/

  let header = $(".jsHeader");
  let jsconsole = $(".jsconsole");
  let jsconsoleH = jsconsole.height();
  let scrollPos = $(window).scrollTop();
  let nav = $("#nav");
  let navToggle = $("#navToggle");

  checkScroll(scrollPos, jsconsoleH);

  $(window).on("scroll resize", function() {
    jsconsoleH = jsconsole.height();
    scrollPos = $(this).scrollTop();

    checkScroll(scrollPos, jsconsoleH);
  });

  function checkScroll() {
    if (scrollPos > jsconsoleH) {
      header.addClass("jsHeader");
    } else {
      header.removeClass("jsHeader");
    }
  }

  /* Smooth scroll */
  $("[data-scroll]").on("click", function(event) {
    event.preventDefault();

    let elementId = $(this).data("scroll");
    let elementOffset = $(elementId).offset().top;

    nav.removeClass("show");

    $("html, body").animate(
      {
        scrollTop: elementOffset - 70
      },
      700
    );
  });

  /*Nav Toogle*/
  navToggle.on("click", function(event) {
    event.preventDefault();
    nav.toggleClass("show");
  });
});
