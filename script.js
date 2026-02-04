// Array com os nomes das imagens de frases
const phrases = [
    'images/frases/frase_1.png', 'images/frases/frase_2.png', 'images/frases/frase_3.png',
    'images/frases/frase_4.png', 'images/frases/frase_5.png', 'images/frases/frase_6.png',
    'images/frases/frase_7.png', 'images/frases/frase_8.png'
];

// Elementos do DOM
const pompompurin = document.getElementById('pompompurin');
const speechBubble = document.getElementById('speech-bubble');
const phraseImage = document.getElementById('phrase-image');
const hint = document.querySelector('.hint');

// Variável para controlar se já está mostrando uma frase
let isShowingPhrase = false;

// Função para criar partículas de coração
function createHeartParticle(x, y) {
    const heart = document.createElement('div');
    heart.className = 'heart-particle';
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    
    // Adicionar variação aleatória na posição inicial
    const randomX = (Math.random() - 0.5) * 100;
    heart.style.transform = `translateX(${randomX}px) rotate(45deg)`;
    
    document.body.appendChild(heart);
    
    // Remover após a animação
    setTimeout(() => {
        heart.remove();
    }, 2000);
}

// Função para sortear uma frase aleatória
function getRandomPhrase() {
    const randomIndex = Math.floor(Math.random() * phrases.length);
    return phrases[randomIndex];
}

// Função para mostrar a frase
function showPhrase() {
    if (isShowingPhrase) return;
    
    isShowingPhrase = true;
    
    // Mudar para pompompurin_2
    pompompurin.src = 'images/pompompurin_2.png';
    
    // Adicionar classe de animação ao personagem
    pompompurin.classList.add('clicked');
    
    // Selecionar frase aleatória
    const randomPhrase = getRandomPhrase();
    phraseImage.src = randomPhrase;
    
    // Mostrar balão de fala
    setTimeout(() => {
        speechBubble.classList.add('show');
    }, 300);
    
    // Esconder a dica
    hint.style.opacity = '0';
    
    // Remover classe de animação após completar
    setTimeout(() => {
        pompompurin.classList.remove('clicked');
    }, 600);
    
    // Voltar ao estado normal após 5 segundos
    setTimeout(() => {
        hidePhrase();
    }, 5000);
}

// Função para esconder a frase
function hidePhrase() {
    speechBubble.classList.remove('show');
    
    setTimeout(() => {
        pompompurin.src = 'images/pompompurin_1.png';
        hint.style.opacity = '0.8';
        isShowingPhrase = false;
    }, 600);
}

// Event listener para clique no personagem
pompompurin.addEventListener('click', (e) => {
    // Criar múltiplas partículas de coração
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            createHeartParticle(e.clientX, e.clientY);
        }, i * 100);
    }
    
    showPhrase();
});

// Event listener para clique no balão de fala (para fechar antes dos 5 segundos)
speechBubble.addEventListener('click', () => {
    if (isShowingPhrase) {
        hidePhrase();
    }
});

// Adicionar efeito de hover ao personagem
pompompurin.addEventListener('mouseenter', () => {
    if (!isShowingPhrase) {
        // Pequena animação de antecipação
        pompompurin.style.transform = 'scale(1.05) rotate(2deg)';
    }
});

pompompurin.addEventListener('mouseleave', () => {
    if (!isShowingPhrase) {
        pompompurin.style.transform = '';
    }
});
