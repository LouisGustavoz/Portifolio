// Elementos
const navbar = document.getElementById('navbar');
const navTabs = document.querySelectorAll('.nav-tab');
const sections = document.querySelectorAll('.section');

// Navegação entre seções
navTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const targetSection = tab.getAttribute('data-section');
        const section = document.getElementById(targetSection);
        
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }

        // Atualizar tab ativa
        navTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
    });
});

// Função para atualizar tab ativa baseado no scroll
function updateActiveTab() {
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - sectionHeight / 3) {
            currentSection = section.getAttribute('id');
        }
    });

    navTabs.forEach(tab => {
        tab.classList.remove('active');
        if (tab.getAttribute('data-section') === currentSection) {
            tab.classList.add('active');
        }
    });
}

// Animação suave ao carregar a página
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

let currentImages = [];
let currentIndex = 0;

function openModal(images) {
    currentImages = images;
    currentIndex = 0;
    updateModal();
    document.getElementById('modal').classList.add('active');
}

function updateModal() {
    document.getElementById('modal-img').src = currentImages[currentIndex];

    // Dots
    const dotsContainer = document.getElementById('modal-dots');
    dotsContainer.innerHTML = '';
    currentImages.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === currentIndex) dot.classList.add('active');
        dot.onclick = () => { currentIndex = i; updateModal(); };
        dotsContainer.appendChild(dot);
    });

    // Esconde setas se só tem 1 imagem
    const prev = document.querySelector('.modal-prev');
    const next = document.querySelector('.modal-next');
    if (currentImages.length <= 1) {
        prev.classList.add('hidden');
        next.classList.add('hidden');
    } else {
        prev.classList.remove('hidden');
        next.classList.remove('hidden');
    }
}

function changeSlide(direction) {
    currentIndex = (currentIndex + direction + currentImages.length) % currentImages.length;
    updateModal();
}

function closeModal() {
    document.getElementById('modal').classList.remove('active');
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowRight') changeSlide(1);
    if (e.key === 'ArrowLeft') changeSlide(-1);
});