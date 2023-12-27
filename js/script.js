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

//! ordena os cards por ano
// Obtém todos os elementos de cards
const cardsContainer = document.querySelector('.cards');
const cards = Array.from(cardsContainer.children);

// Ordena os cards com base nos IDs que contêm anos
cards.sort((a, b) => {
  const yearA = parseInt(a.id);
  const yearB = parseInt(b.id);
    return yearA - yearB;
});

// Remove os cards existentes do DOM
while (cardsContainer.firstChild) {
    cardsContainer.removeChild(cardsContainer.firstChild);
}

// Adiciona os cards ordenados de volta ao DOM
cards.forEach(card => cardsContainer.appendChild(card));

//! filtro de pesquisa
// var inputBuscar = document.getElementById('buscar');
// inputBuscar.addEventListener('input', function() {

//     var termoPesquisa = inputBuscar.value.toLowerCase();
//     var cards = document.querySelectorAll('.cards .card');

//     cards.forEach(function(card) {
//         var h2Element = card.querySelector('h2');
//         var nome = h2Element.textContent.toLowerCase();

//         if (nome.includes(termoPesquisa)) {
//             card.style.display = 'block';
//         } else {
//             card.style.display = 'none';
//         }
//     });
// });

var inputBuscar = document.getElementById('buscar');

inputBuscar.addEventListener('input', function() {
    var termoPesquisa = inputBuscar.value.toLowerCase();
    var cards = document.querySelectorAll('.cards .card');

    cards.forEach(function(card) {
        var h2Element = card.querySelector('h2');
        var nome = h2Element.textContent.toLowerCase();

        if (nome.includes(termoPesquisa)) {
            card.classList.remove('removed'); // Remove a classe de "removido"
        } else {
            card.classList.add('removed'); // Adiciona a classe de "removido"
        }
    });
});

//! atribuindo estrela as notas
function atualizarEstrelaParaTodos() {
  // Seleciona todos os elementos com a classe "ratings" dentro da div "cards"
  var cards = document.querySelectorAll('.cards .ratings');

  cards.forEach(function(card) {
      var numero = card.querySelector("#number");
      var valor = parseInt(numero.textContent);
      var estrela = card.querySelector("#star");

      if (valor === 0 || valor === 1) {
          estrela.innerHTML = "<i class='bx bx-star'></i>";
      } else if (valor === 2 || valor === 3) {
          estrela.innerHTML = "<i class='bx bxs-star-half'></i>";
      } else {
          estrela.innerHTML = "<i class='bx bxs-star'></i>";
      }
  });
}

// Observador de mutações para monitorar mudanças nos "cards"
var observer = new MutationObserver(function(mutationsList, observer) {
  mutationsList.forEach(function(mutation) {
      if (mutation.type === 'childList' && mutation.target.classList.contains('cards')) {
          atualizarEstrelaParaTodos();
      }
  });
});

// Elemento alvo (div 'cards') a ser observado
var targetNode = document.querySelector('.cards');

// Configuração do observador para observar mudanças nos filhos do elemento alvo
var config = { childList: true };

// Inicia a observação no elemento alvo com a configuração especificada
observer.observe(targetNode, config);

// Chamada inicial para atualizar as estrelas baseadas nos valores iniciais
atualizarEstrelaParaTodos();





