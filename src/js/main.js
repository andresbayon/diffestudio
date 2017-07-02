(function () {
  const menu = document.querySelector('[data-menu]')
  const openMenuButton = document.querySelector('[data-menu-open]')
  const closeMenuButton = document.querySelector('[data-menu-close]')
  const scrollButton = document.querySelector('[data-scroll-button]')
  const navbar = document.querySelector('[data-navbar]')
  let lastScrollY = 0

  var toggleMenuVisibility = (e) => {
    e.stopPropagation()
    menu.classList.toggle('diff-menu-show')
  }

  var checkScrollButton = (e) => {
    scrollButton.classList[(window.pageYOffset === 0) ? 'remove' : 'add']('diff-scroll-button-top')
    scrollButton.dataset.direction = (window.pageYOffset === 0) ? 'down' : 'up'
    scrollButton.innerText = (window.pageYOffset === 0) ? 'Scroll' : 'Top'
  }

  var windowScroll = (e) => {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop
    if (scrollY > window.innerHeight && scrollY < lastScrollY) {
      navbar.classList.add('diff-nav-show')
    } else {
      navbar.classList.remove('diff-nav-show')
    }
    lastScrollY = scrollY
    checkScrollButton(e)
  }

  var doScroll = (e) => {
    window.scrollTo(0, (scrollButton.dataset.direction === 'down') ? window.innerHeight : 0)
  }

  openMenuButton.addEventListener('click', toggleMenuVisibility)
  closeMenuButton.addEventListener('click', toggleMenuVisibility)

  window.addEventListener('load', checkScrollButton)
  window.addEventListener('scroll', windowScroll)
  scrollButton.addEventListener('click', doScroll)
})()
