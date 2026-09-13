// =========================================
// PARALLAX COM MOUSE
// =========================================

document.addEventListener('mousemove', (e) => {
    const glows = document.querySelectorAll('.hero-glow-one, .hero-glow-two');
    
    glows.forEach((glow) => {
        const speed = glow.classList.contains('hero-glow-one') ? 0.05 : 0.03;
        const x = (e.clientX * speed);
        const y = (e.clientY * speed);
        
        glow.style.transform = `translate(${x}px, ${y}px)`;
    });

    // Atualizar posição do mouse para efeito glow nos cards
    updateCardGlowPosition(e.clientX, e.clientY);
});

// =========================================
// GLOW EFFECT NOS CARDS COM MOUSE
// =========================================

function updateCardGlowPosition(clientX, clientY) {
    const cards = document.querySelectorAll('.skills-card, .info-card, .project-card');
    
    cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
}

// =========================================
// CRIAR PARTICLES FLUTUANTES
// =========================================

function createParticles() {
    const particleContainer = document.body;
    const particleCount = window.innerWidth > 768 ? 30 : 15;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const size = Math.random() * 3 + 1;
        const duration = Math.random() * 20 + 15;
        const delay = Math.random() * 5;
        
        particle.style.left = `${x}%`;
        particle.style.top = `${y}%`;
        particle.style.animation = `float ${duration}s linear ${delay}s infinite`;
        
        particleContainer.appendChild(particle);
    }
}

// Animação de partículas
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) translateX(100px) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

createParticles();

// =========================================
// SCROLL PROGRESS BAR
// =========================================

function updateScrollProgress() {
    const scrollProgress = document.createElement('div');
    scrollProgress.className = 'scroll-progress';
    document.body.appendChild(scrollProgress);
    
    window.addEventListener('scroll', () => {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / scrollHeight) * 100;
        scrollProgress.style.width = scrolled + '%';
    });
}

updateScrollProgress();

// =========================================
// INTERSECTION OBSERVER PARA ANIMAÇÕES
// =========================================

function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
    });
    
    document.querySelectorAll('.fade-in-scroll, .project-card, .skills-card').forEach((el) => {
        observer.observe(el);
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', observeElements);
} else {
    observeElements();
}

// =========================================
// EFEITO TYPEWRITER (OPCIONAL)
// =========================================

function typewriterEffect(element, text, speed = 50) {
    if (!element) return;
    
    element.textContent = '';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Aplicar ao hero-title (opcional)
// typewriterEffect(document.querySelector('.hero-title'), 'Erik.');

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById('fundo-dinamico');
    const camadas = document.querySelectorAll('.camada-scroll');
    const particulas = [];
    
    // Configurações
    const quantidadeParticulas = 35;
    // Paleta fixa combinando com o portfólio (Azul, Ciano, Roxo)
    const paletaCores = ['#3b82f6', '#06b6d4', '#8b5cf6'];

    // 1. CRIAR AS PARTÍCULAS
    for (let i = 0; i < quantidadeParticulas; i++) {
        const el = document.createElement('div');
        el.classList.add('particula');
        
        // Tamanhos sutis (entre 3px e 7px)
        const size = Math.random() * 4 + 3;
        el.style.width = `${size}px`;
        el.style.height = `${size}px`;
        
        // Sorteia uma das cores da paleta
        el.style.backgroundColor = paletaCores[Math.floor(Math.random() * paletaCores.length)];
        
        container.appendChild(el);

        // Salva os dados para a animação
        particulas.push({
            el: el,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            vx: (Math.random() - 0.5) * 1.5, // Velocidade X
            vy: (Math.random() - 0.5) * 1.5, // Velocidade Y
            size: size
        });
    }

    // 2. ANIMAR O MOVIMENTO (FÍSICA)
    function animarParticulas() {
        particulas.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;

            // Rebate suave nas bordas da tela
            if (p.x <= 0 || p.x >= window.innerWidth - p.size) p.vx *= -1;
            if (p.y <= 0 || p.y >= window.innerHeight - p.size) p.vy *= -1;

            p.el.style.transform = `translate(${p.x}px, ${p.y}px)`;
        });
        requestAnimationFrame(animarParticulas);
    }
    
    // Inicia a animação
    animarParticulas();

    // 3. CONTROLAR AS CAMADAS PELO SCROLL
    window.addEventListener('scroll', () => {
        // Calcula a porcentagem da rolagem (0 a 100)
        const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
        // Evita divisão por zero se a página for curta
        const scrollPercent = scrollTotal > 0 ? (window.scrollY / scrollTotal) * 100 : 0;
        
        // Remove a classe 'ativa' de todas as camadas
        camadas.forEach(camada => camada.classList.remove('ativa'));

        // Ativa a camada correspondente à posição
        if (scrollPercent < 33) {
            document.querySelector('.camada-1').classList.add('ativa');
        } else if (scrollPercent >= 33 && scrollPercent < 66) {
            document.querySelector('.camada-2').classList.add('ativa');
        } else {
            document.querySelector('.camada-3').classList.add('ativa');
        }
    });
    
    // Dispara um evento de scroll artificial no carregamento para ativar a primeira camada imediatamente
    window.dispatchEvent(new Event('scroll'));
});