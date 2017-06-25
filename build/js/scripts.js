'use strict';

(function () {
  var menu = document.querySelector('[data-menu]');
  var openMenuButton = document.querySelector('[data-menu-open]');
  var closeMenuButton = document.querySelector('[data-menu-close]');
  var scrollButton = document.querySelector('[data-scroll-button]');

  var toggleMenuVisibility = function toggleMenuVisibility(e) {
    e.stopPropagation();
    menu.classList.toggle('diff-menu-show');
  };

  var checkScrollButton = function checkScrollButton(e) {
    scrollButton.classList[window.pageYOffset === 0 ? 'remove' : 'add']('diff-scroll-button-top');
    scrollButton.dataset.direction = window.pageYOffset === 0 ? 'down' : 'up';
    scrollButton.innerText = window.pageYOffset === 0 ? 'Scroll' : 'Top';
  };

  var doScroll = function doScroll(e) {
    window.scrollTo(0, scrollButton.dataset.direction === 'down' ? window.innerHeight : 0);
  };

  openMenuButton.addEventListener('click', toggleMenuVisibility);
  closeMenuButton.addEventListener('click', toggleMenuVisibility);

  window.addEventListener('load', checkScrollButton);
  window.addEventListener('scroll', checkScrollButton);
  scrollButton.addEventListener('click', doScroll);
})();
