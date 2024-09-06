document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.querySelector('.search-form');
  const searchInput = document.querySelector('input[type="text"]');
  const resultsContainer = document.querySelector('.resultados-pesquisa');
  const newQuoteBtn = document.getElementById('new-quote-btn');
  const quoteElement = document.getElementById('stoic-quote');
  
  const database = [
    {
      name: "Marco Aurélio: O Imperador Filósofo",
      category: "Filósofos Estoicos",
      description: "Explore os ensinamentos e a vida do imperador romano que personificou os ideais estoicos em suas 'Meditações'.",
      lastUpdate: "03/09/2024"
    },
    {
      name: "Ataraxia: O Caminho para a Paz Interior",
      category: "Conceitos Estoicos",
      description: "Descubra o conceito estoico de tranquilidade mental e como aplicá-lo na vida moderna.",
      lastUpdate: "02/09/2024"
    },
    {
      name: "Sêneca: O Filósofo do Estoicismo Prático",
      category: "Filósofos Estoicos",
      description: "Descubra os ensinamentos de Sêneca, um dos maiores representantes do estoicismo romano, conhecido por sua abordagem prática da filosofia e seus escritos atemporais sobre virtude e sabedoria.",
      lastUpdate: "04/09/2024"
    },
    {
      name: "Epicteto: Da Escravidão à Liberdade Filosófica",
      category: "Filósofos Estoicos",
      description: "Conheça a extraordinária jornada de Epicteto, desde sua vida como escravo até se tornar um dos mais influentes filósofos estoicos.",
      lastUpdate: "05/09/2024"
    },
    {
      name: "Amor Fati: Abraçando o Destino",
      category: "Conceitos Estoicos",
      description: "Explore o conceito estoico de 'Amor Fati' e como ele pode transformar nossa perspectiva sobre os desafios da vida.",
      lastUpdate: "06/09/2024"
    }
  ];

  const stoicQuotes = [
    "O homem que tem virtude está em harmonia consigo mesmo. - Marco Aurélio",
    "Não é o que acontece com você, mas como você reage a isso que importa. - Epicteto",
    "Comece cada dia dizendo a si mesmo: hoje serei confrontado com a interferência, ingratidão, insolência, deslealdade, má vontade e egoísmo. - Marco Aurélio",
    "O que perturba os homens não são as coisas, mas os julgamentos que fazem delas. - Epicteto",
    "Não é porque as coisas são difíceis que não ousamos; é porque não ousamos que elas são difíceis. - Sêneca",
    "A felicidade de sua vida depende da qualidade de seus pensamentos. - Marco Aurélio"
  ];
 
  searchInput.addEventListener('input', handleSearch);

  newQuoteBtn.addEventListener('click', displayRandomQuote);

  function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();

    if (searchTerm === "") {
      displayResults(database);
    } else {
      const filteredResults = filterResults(searchTerm);
      displayResults(filteredResults);
    }
  }

  const conceptItems = document.querySelectorAll('.conceito-item');

  conceptItems.forEach(item => {
    const header = item.querySelector('h3');
    const content = item.querySelector('p');

    header.addEventListener('click', () => {
      content.style.display = content.style.display === 'block' ? 'none' : 'block';
      header.classList.toggle('active');
    });
  });

  function filterResults(searchTerm) {
    return database.filter(item => 
      item.name.toLowerCase().includes(searchTerm) || 
      item.category.toLowerCase().includes(searchTerm) ||
      item.description.toLowerCase().includes(searchTerm)
    );
  }

  function displayResults(items) {
    resultsContainer.innerHTML = '';

    if (items.length === 0) {
      resultsContainer.innerHTML = '<p>Nenhum resultado encontrado. 😥</p>';
      return;
    }

    items.forEach(item => {
      const itemElement = createItemElement(item);
      resultsContainer.appendChild(itemElement);
    });
  }

  function createItemElement(item) {
    const itemElement = document.createElement('div');
    itemElement.classList.add('item-resultado');
    itemElement.innerHTML = `
      <h2><a href="#">${item.name}</a></h2>
      <p>${item.description}</p>
      <p class="descricao-meta">Categoria: ${item.category} | Última atualização: ${item.lastUpdate}</p>
    `;
    return itemElement;
  }

  function displayRandomQuote() {
    const randomIndex = Math.floor(Math.random() * stoicQuotes.length);
    quoteElement.textContent = stoicQuotes[randomIndex];
    quoteElement.classList.add('fade-in');
    setTimeout(() => quoteElement.classList.remove('fade-in'), 500);
  }

  particlesJS('particles-js', {
    particles: {
      number: { value: 80, density: { enable: true, value_area: 800 } },
      color: { value: '#ffffff' },
      shape: { type: 'circle' },
      opacity: { value: 0.5, random: false },
      size: { value: 3, random: true },
      line_linked: { enable: true, distance: 150, color: '#ffffff', opacity: 0.4, width: 1 },
      move: { enable: true, speed: 6, direction: 'none', random: false, straight: false, out_mode: 'out', bounce: false }
    },
    interactivity: {
      detect_on: 'canvas',
      events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' }, resize: true },
      modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } }
    },
    retina_detect: true
  });

   const journalIcon = document.getElementById('journal-icon');
   const journalPopup = document.getElementById('journal-popup');
   const journalEntry = document.getElementById('journal-entry');
   const saveEntryBtn = document.getElementById('save-entry');
   const pastEntries = document.getElementById('past-entries');
 
   journalIcon.addEventListener('click', () => {
     journalPopup.style.display = journalPopup.style.display === 'none' ? 'block' : 'none';
     if (journalPopup.style.display === 'block') {
       journalPopup.classList.add('fade-in');
       loadPastEntries();
     } else {
       journalPopup.classList.remove('fade-in');
     }
   });
 
   saveEntryBtn.addEventListener('click', () => {
     const entry = journalEntry.value.trim();
     if (entry) {
       const date = new Date().toLocaleString();
       const storedEntries = JSON.parse(localStorage.getItem('stoicJournalEntries') || '[]');
       storedEntries.unshift({ entry, date, id: Date.now() });
       localStorage.setItem('stoicJournalEntries', JSON.stringify(storedEntries));
       journalEntry.value = '';
       loadPastEntries();
     }
   });
 
   function loadPastEntries() {
     const storedEntries = JSON.parse(localStorage.getItem('stoicJournalEntries') || '[]');
     pastEntries.innerHTML = storedEntries.map(entry => `
       <div class="past-entry" data-id="${entry.id}">
         <p class="entry-content ${entry.entry.length > 100 ? 'long-entry' : ''}">${entry.entry}</p>
         <p class="entry-date">${entry.date}</p>
         <button class="delete-entry"><i class="fas fa-trash"></i></button>
         ${entry.entry.length > 100 ? '<button class="expand-entry">Expandir</button>' : ''}
       </div>
     `).join('');
 
     document.querySelectorAll('.delete-entry').forEach(button => {
       button.addEventListener('click', function() {
         const entryId = this.closest('.past-entry').dataset.id;
         deleteEntry(entryId);
       });
     });
 
     document.querySelectorAll('.expand-entry').forEach(button => {
       button.addEventListener('click', function() {
         const entryContent = this.closest('.past-entry').querySelector('.entry-content');
         expandEntry(entryContent);
       });
     });
   }
 
   function deleteEntry(entryId) {
     let storedEntries = JSON.parse(localStorage.getItem('stoicJournalEntries') || '[]');
     storedEntries = storedEntries.filter(entry => entry.id != entryId);
     localStorage.setItem('stoicJournalEntries', JSON.stringify(storedEntries));
     loadPastEntries();
   }
 
   function expandEntry(entryContent) {
     const modal = document.createElement('div');
     modal.classList.add('entry-modal');
     modal.innerHTML = `
       <div class="modal-content">
         <span class="close-modal">&times;</span>
         <p>${entryContent.textContent}</p>
       </div>
     `;
     document.body.appendChild(modal);
 
     modal.querySelector('.close-modal').addEventListener('click', () => {
       modal.remove();
     });
 
     modal.addEventListener('click', (e) => {
       if (e.target === modal) {
         modal.remove();
       }
     });
   }
 
   function generateDailyPrompt() {
     const prompts = [
       "Como você pode praticar a virtude hoje?",
       "Que obstáculos você prevê hoje, e como pode encará-los com sabedoria?",
       "Reflita sobre algo que você não pode controlar. Como você pode aceitar isso?",
       "Como você pode demonstrar coragem em uma situação difícil hoje?",
       "Que hábito você gostaria de mudar? Como pode dar o primeiro passo hoje?",
       "Pense em alguém que você admira. Que qualidade deles você pode emular hoje?",
       "Como você pode praticar a gratidão hoje, mesmo nas pequenas coisas?",
       "Que ação você pode tomar hoje para se aproximar de seu eu ideal?",
       "Reflita sobre uma decisão recente. Você agiu de acordo com seus valores?",
       "Como você pode cultivar mais tranquilidade em sua vida hoje?"
     ];
     const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
     journalEntry.setAttribute('placeholder', randomPrompt);
   }
 
   generateDailyPrompt();
 
   displayResults(database);
   displayRandomQuote();
 });
 
// document.addEventListener('mousemove', function(e) {
//   const image = document.querySelector('.img-segue-mouse');
  
//   // Pega a largura e altura da janela
//   const windowWidth = window.innerWidth;
//   const windowHeight = window.innerHeight;

//   // Pega a posição do mouse
//   const mouseX = e.clientX;
//   const mouseY = e.clientY;

//   // Calcula a porcentagem da posição do mouse em relação à janela
//   const xPercent = (mouseX / windowWidth) * 100;
//   const yPercent = (mouseY / windowHeight) * 100;

//   // Ajusta o movimento da imagem
//   const moveX = (xPercent - 50) / 10; // Movimento suave no eixo X
//   const moveY = (yPercent - 50) / 10; // Movimento suave no eixo Y

//   // Aplica a transformação de acordo com a posição do mouse
//   image.style.transform = `translate(${moveX}px, ${moveY}px)`;
// });
