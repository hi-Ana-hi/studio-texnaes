// Felles notis for kontaktskjemaene. Endre teksten her, så oppdateres alle skjemaene.
const SPAM_NOTE_TITLE = 'Finner du ikke svar fra oss?' // vises i fet skrift
const SPAM_NOTE_TEXT = 'Sjekk spam-mappen din, da noen av e-postene våre kan bli filtrert som søppelpost.'

// Legger notisen til på slutten av et element (fet tittel + vanlig tekst)
window.appendSpamNote = function (el) {
  const title = document.createElement('strong')
  title.textContent = SPAM_NOTE_TITLE
  el.append(title, ' ' + SPAM_NOTE_TEXT)
}

document.querySelectorAll('[data-spam-note]').forEach((el) => window.appendSpamNote(el))
