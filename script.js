// Elementos
const navbar = document.getElementById('navbar');
const navTabs = document.querySelectorAll('.nav-tab');
const sections = document.querySelectorAll('.section');

// Navegação entre seções
navTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const targetSection = tab.getAttribute('data-section');
        const section = document.getElementById(targetSection);
        if (section) section.scrollIntoView({ behavior: 'smooth' });
        navTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
    });
});

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
        if (tab.getAttribute('data-section') === currentSection) tab.classList.add('active');
    });
}

window.addEventListener('scroll', updateActiveTab);

window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);

    // Primeiro frame dos vídeos
    document.querySelectorAll('.projeto-video2').forEach(video => {
        video.addEventListener('loadedmetadata', () => {
            video.currentTime = 0.1;
        });
    });
});

// ========== MODAL DE IMAGENS ==========
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
    const dotsContainer = document.getElementById('modal-dots');
    dotsContainer.innerHTML = '';
    currentImages.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === currentIndex) dot.classList.add('active');
        dot.onclick = () => { currentIndex = i; updateModal(); };
        dotsContainer.appendChild(dot);
    });
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
    if (e.key === 'Escape') { closeModal(); fecharModalVideo(); }
    if (e.key === 'ArrowRight') changeSlide(1);
    if (e.key === 'ArrowLeft') changeSlide(-1);
});

// ========== MODAL DE VÍDEO ==========
function abrirModalVideo(url) {
    const modal = document.getElementById('modalVideo');
    const videoEl = document.getElementById('videoModal');

    if (url.includes('vimeo.com') || url.includes('drive.google.com')) {
        videoEl.pause();
        videoEl.style.display = 'none';

        let iframe = document.getElementById('iframeModal');
        if (!iframe) {
            iframe = document.createElement('iframe');
            iframe.id = 'iframeModal';
            iframe.style.cssText = 'width:90vw; max-height:85vh; aspect-ratio:9/16; border:none; border-radius:12px;';
            iframe.allow = 'autoplay; fullscreen';
            iframe.allowFullscreen = true;
            modal.appendChild(iframe);
        }

        // Remove parâmetros extras antes de adicionar autoplay
        const baseUrl = url.split('?')[0];
        iframe.src = baseUrl + '?autoplay=1';
        iframe.style.display = 'block';

    } else {
        let iframe = document.getElementById('iframeModal');
        if (iframe) iframe.style.display = 'none';

        videoEl.style.display = 'block';
        videoEl.src = url;
        videoEl.play();
    }

    modal.style.display = 'flex';
}

function fecharModalVideo() {
    const modal = document.getElementById('modalVideo');
    const videoEl = document.getElementById('videoModal');
    const iframe = document.getElementById('iframeModal');

    videoEl.pause();
    videoEl.src = '';
    if (iframe) iframe.src = '';

    modal.style.display = 'none';
}

// Fechar clicando fora do vídeo
document.getElementById('modalVideo').addEventListener('click', function(e) {
    if (e.target === this) fecharModalVideo();
});