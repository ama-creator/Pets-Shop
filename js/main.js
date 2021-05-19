// mobile menu 
$('.header-top__btn').on('click', function () {
  $('.header-top__btn').toggleClass('header-top__btn--active');
  $('.header-top__nav-list').toggleClass('header-top__nav-list--active');
  $('.header-top__links').toggleClass('header-top__links--active');
});

$('.header-top__nav-link').on('click', function () {
  $('.header-top__btn').removeClass('header-top__btn--active');
  $('.header-top__nav-list').removeClass('header-top__nav-list--active');
  $('.header-top__links').removeClass('header-top__links--active');

});

// filter js 
document.querySelector('#sort-asc').onclick = function () {
  mySort('data-sort');
}
document.querySelector('#sort-age').onclick = function () {
   mySortAge('data-age');
}

function mySort(sortType){
  let product = document.querySelector('.content-wrapper');
  for (let i = 0; i < product.children.length; i++) {
    for (let j = i; j < product.children.length; j++) {
      if (+product.children[i].getAttribute(sortType) > +product.children[j].getAttribute(sortType)) {
        replaceNode = product.replaceChild(product.children[j], product.children[i]);
        insertAfter(replaceNode, product.children[i]);
      }
    }
  }
}

function mySortAge(sortType){
  let product = document.querySelector('.content-wrapper');
  for (let i = 0; i < product.children.length; i++) {
    for (let j = i; j < product.children.length; j++) {
      if (+product.children[i].getAttribute(sortType) > +product.children[j].getAttribute(sortType)) {
        replaceNode = product.replaceChild(product.children[j], product.children[i]);
        insertAfter(replaceNode, product.children[i]);
      }
    }
  }
}

function insertAfter(elem, refElem){
  return refElem.parentNode.insertBefore(elem, refElem.nextSibling);
}

// content-modal
$('.content-product__like').on('click', function () {
  $('.content-modal').addClass('content-modal--active');
  setTimeout(function() {$(".content-modal").removeClass('content-modal--active');}, 6000);

  return false;
}); 

// btn to ip 
function scrollTo(to, duration = 700) {
  const
      element = document.scrollingElement || document.documentElement,
      start = element.scrollTop,
      change = to - start,
      startDate = +new Date(),
      // t = current time
      // b = start value
      // c = change in value
      // d = duration
      easeInOutQuad = function (t, b, c, d) {
          t /= d / 2;
          if (t < 1) return c / 2 * t * t + b;
          t--;
          return -c / 2 * (t * (t - 2) - 1) + b;
      },
      animateScroll = function () {
          const currentDate = +new Date();
          const currentTime = currentDate - startDate;
          element.scrollTop = parseInt(easeInOutQuad(currentTime, start, change, duration));
          if (currentTime < duration) {
              requestAnimationFrame(animateScroll);
          }
          else {
              element.scrollTop = to;
          }
      };
  animateScroll();
}

document.addEventListener('DOMContentLoaded', function () {
  let btn = document.querySelector('#toTop');
  window.addEventListener('scroll', function () {
      // Если прокрутили дальше 599px, показываем кнопку
      if (pageYOffset > 100) {
          btn.classList.add('show');
          // Иначе прячем
      } else {
          btn.classList.remove('show');
      }
  });

  // При клике прокручиываем на самый верх
  btn.onclick = function (click) {
      click.preventDefault();
      scrollTo(0, 400);
  }
});



// last modal 
$(window).mouseleave(function(e){
  if (e.clientY < 0) {
      $('.simplemodal-container').fadeIn();
  }     
})
window.onload = function(){
  document.getElementById('close').onclick = function(){
      this.parentNode.parentNode.parentNode
      .removeChild(this.parentNode.parentNode);
      return false;
  };
};

// validate email 
function validate(form, email) {
  var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  var address = document.forms[form].elements[email].value;
  if(reg.test(address) == false) {
     return false;
  }
}

//E-mail Ajax Send
$("form").submit(function () { //Change
  var th = $(this);
  $.ajax({
    type: "POST",
    url: "mail.php", //Change
    data: th.serialize()
  }).done(function () {
    alert("Thank you!");
    setTimeout(function () {
      // Done Functions
      th.trigger("reset");
    }, 1000);
  });
  return false;
});
