// Mobilmeny: ☰-knappen åpner en fullskjermsmeny, × eller en lenke lukker den
(function () {
  const nav = document.getElementById('site-nav')
  const openBtn = document.querySelector('.menu-toggle')
  const closeBtn = document.querySelector('.menu-close')
  if (!nav || !openBtn || !closeBtn) return

  function open() {
    document.body.classList.add('menu-open')
    openBtn.setAttribute('aria-expanded', 'true')
    closeBtn.focus()
  }

  function close() {
    document.body.classList.remove('menu-open')
    openBtn.setAttribute('aria-expanded', 'false')
  }

  openBtn.addEventListener('click', open)
  closeBtn.addEventListener('click', () => { close(); openBtn.focus() })
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', close))
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.body.classList.contains('menu-open')) { close(); openBtn.focus() }
  })
})()
