//! HEADER
const hamburgerMenu = document.querySelector('.hamburger-menu');
const menuItems = document.querySelector('.menu-items');

hamburgerMenu.addEventListener('click', () => {
  menuItems.classList.toggle('active');
});

//! arrow
document.addEventListener('DOMContentLoaded', function() {
  const arrowIcons = document.querySelectorAll('.arrow');

  arrowIcons.forEach(function(arrowIcon) {
    arrowIcon.addEventListener('click', function() {
      const iconElement = arrowIcon.querySelector('i');

      if (iconElement.classList.contains('bxs-chevron-down')) {
        iconElement.classList.remove('bxs-chevron-down');
        iconElement.classList.add('bxs-chevron-up');
      } else {
        iconElement.classList.remove('bxs-chevron-up');
        iconElement.classList.add('bxs-chevron-down');
      }
    });
  });
});

//! quantia de animes/mangás
document.addEventListener('DOMContentLoaded', function() {
  const cards = document.querySelectorAll('.card');
  const quantiaElement = document.getElementById('quantia');

  // Atualiza o valor inicial
  quantiaElement.textContent = cards.length;

  // Esta parte do código é opcional e atualizará dinamicamente caso haja alterações futuras na página
  const observer = new MutationObserver(function() {
    quantiaElement.textContent = document.querySelectorAll('.card').length;
  });

  // Observa mudanças no DOM e atualiza o valor quando houver alterações nas classes "card"
  observer.observe(document.body, { subtree: true, childList: true });
});

