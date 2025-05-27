const cards = document.querySelectorAll('.zoomCard');
const blurOverlay = document.getElementById('blurOverlay');

// Función para efecto typing
function typeEffect(element, text, speed = 30) {
  element.textContent = '';
  let i = 0;
  const interval = setInterval(() => {
    element.textContent += text.charAt(i);
    i++;
    if (i >= text.length) clearInterval(interval);
  }, speed);
}

cards.forEach(card => {
  // Guardamos el texto original en data-fulltext si no existe
  const p = card.querySelector('.card-body p');
  if (p && !p.dataset.fulltext) {
    p.dataset.fulltext = p.textContent.trim();
  }

  card.addEventListener('click', (e) => {
    e.stopPropagation();

    const isExpanded = card.classList.contains('fullscreen');

    // Primero quita todos los fullscreen y placeholders y restaura texto original
    cards.forEach(c => {
      c.classList.remove('fullscreen');
      const ph = c.nextSibling;
      if (ph && ph.classList && ph.classList.contains('placeholder')) {
        ph.remove();
      }
      const pInner = c.querySelector('.card-body p');
      if (pInner && pInner.dataset.fulltext) {
        pInner.textContent = pInner.dataset.fulltext;
      }
    });

    if (!isExpanded) {
      // Inserta placeholder justo después de la tarjeta para mantener espacio
      const placeholder = document.createElement('div');
      placeholder.classList.add('placeholder');
      card.parentNode.insertBefore(placeholder, card.nextSibling);

      // Expande la tarjeta
      card.classList.add('fullscreen');

      // Cambiar la posición de la imagen según el atributo
      const pos = card.getAttribute('data-imgpos');
      if (pos) {
        card.querySelector('img').style.objectPosition = pos;
      }
      // Aplica efecto typing al texto
      const p = card.querySelector('.card-body p');
      if (p && p.dataset.fulltext) {
        typeEffect(p, p.dataset.fulltext, 30);
      }

      blurOverlay.classList.add('active');
      document.body.classList.add('noscroll');
    } else {
      blurOverlay.classList.remove('active');
      document.body.classList.remove('noscroll');
    }
  });
});

document.addEventListener('click', () => {
  cards.forEach(c => {
    c.classList.remove('fullscreen');
    const ph = c.nextSibling;
    if (ph && ph.classList && ph.classList.contains('placeholder')) {
      ph.remove();
    }
    const p = c.querySelector('.card-body p');
    if (p && p.dataset.fulltext) {
      p.textContent = p.dataset.fulltext;
    }
  });
  blurOverlay.classList.remove('active');
  document.body.classList.remove('noscroll');
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    cards.forEach(c => {
      c.classList.remove('fullscreen');
      const ph = c.nextSibling;
      if (ph && ph.classList && ph.classList.contains('placeholder')) {
        ph.remove();
      }
      const p = c.querySelector('.card-body p');
      if (p && p.dataset.fulltext) {
        p.textContent = p.dataset.fulltext;
      }
    });
    blurOverlay.classList.remove('active');
    document.body.classList.remove('noscroll');
  }
});
