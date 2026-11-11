// Felles notis for kontaktskjemaene. Endre teksten her, så oppdateres alle skjemaene.
window.SPAM_NOTE = 'Sjekk søppelpost-mappen din. Svaret vårt kan havne der, siden vi bruker en ny e-postadresse.'

document.querySelectorAll('[data-spam-note]').forEach((el) => {
  el.textContent = window.SPAM_NOTE
})
