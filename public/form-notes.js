// Felles notis for kontaktskjemaene. Endre teksten her, så oppdateres alle skjemaene.
const SPAM_NOTE_TITLE = 'Finner du ikke svar fra oss?' // vises i fet skrift
const SPAM_NOTE_TEXT = 'Sjekk spam-mappen din, da noen av e-postene våre kan bli filtrert som søppelpost.'

// Tekst i popupen som vises etter at et skjema er sendt
const THANKS_TITLE = 'Takk for henvendelsen din, vi svarer deg så fort som mulig.'
const THANKS_SPAM_LINE_1 = 'Sjekk spam-mappen din!'
const THANKS_SPAM_LINE_2 = 'Svaret vårt kan noen ganger havne der eller i søppelpost.'

// Legger notisen til på slutten av et element (fet tittel + vanlig tekst)
window.appendSpamNote = function (el) {
  const title = document.createElement('strong')
  title.textContent = SPAM_NOTE_TITLE
  el.append(title, ' ' + SPAM_NOTE_TEXT)
}

document.querySelectorAll('[data-spam-note]').forEach((el) => window.appendSpamNote(el))

// Takk-popup: samme utseende som personvern-modalen
window.showThanksPopup = function () {
  const returnFocus = document.activeElement
  const backdrop = document.createElement('div')
  backdrop.className = 'modal-backdrop open'
  backdrop.innerHTML = `
    <div class="modal modal--small" role="dialog" aria-modal="true" aria-labelledby="thanksTitle">
      <button class="modal-close" type="button" aria-label="Lukk">&times;</button>
      <h2 id="thanksTitle"></h2>
      <p class="thanks-spam"></p>
    </div>`
  backdrop.querySelector('h2').textContent = THANKS_TITLE
  backdrop.querySelector('.thanks-spam').append(THANKS_SPAM_LINE_1, document.createElement('br'), THANKS_SPAM_LINE_2)

  function close() {
    backdrop.remove()
    document.removeEventListener('keydown', onKey)
    if (returnFocus) returnFocus.focus()
  }
  function onKey(e) {
    if (e.key === 'Escape') close()
  }

  backdrop.addEventListener('click', (e) => { if (e.target === backdrop) close() })
  backdrop.querySelector('.modal-close').addEventListener('click', close)
  document.addEventListener('keydown', onKey)
  document.body.append(backdrop)
  backdrop.querySelector('.modal-close').focus()
}
