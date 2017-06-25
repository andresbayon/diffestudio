(function () {
  const menu = document.querySelector('[data-menu]')
  const openMenuButton = document.querySelector('[data-menu-open]')
  const closeMenuButton = document.querySelector('[data-menu-close]')
  const scrollButton = document.querySelector('[data-scroll-button]')

  var toggleMenuVisibility = (e) => {
    e.stopPropagation()
    menu.classList.toggle('diff-menu-show')
  }

  var checkScrollButton = (e) => {
    scrollButton.classList[(window.pageYOffset === 0) ? 'remove' : 'add']('diff-scroll-button-top')
    scrollButton.dataset.direction = (window.pageYOffset === 0) ? 'down' : 'up'
    scrollButton.innerText = (window.pageYOffset === 0) ? 'Scroll' : 'Top'
  }

  var doScroll = (e) => {
    window.scrollTo(0, (scrollButton.dataset.direction === 'down') ? window.innerHeight : 0)
  }

  openMenuButton.addEventListener('click', toggleMenuVisibility)
  closeMenuButton.addEventListener('click', toggleMenuVisibility)

  window.addEventListener('load', checkScrollButton)
  window.addEventListener('scroll', checkScrollButton)
  scrollButton.addEventListener('click', doScroll)
})()
