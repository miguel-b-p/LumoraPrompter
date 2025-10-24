#!/usr/bin/env node

/**
 * Spinning ASCII Donut Animation
 * Inspirado no trabalho clássico de Andy Sloane (a1k0n.net)
 * 
 * Para executar:
 * node spinning-donut.js
 */

// Dimensões do frame
const SCREEN_WIDTH = 80;
const SCREEN_HEIGHT = 24;

// Buffers para renderização
let output = [];
let zBuffer = [];

// Ângulos de rotação
let A = 0;
let B = 0;

/**
 * Limpa a tela usando ANSI escape codes
 */
function clearScreen() {
    process.stdout.write('\x1b[2J');
    process.stdout.write('\x1b[H');
}

/**
 * Renderiza um frame do donut
 */
function renderFrame() {
    // Inicializa os buffers
    output = new Array(SCREEN_WIDTH * SCREEN_HEIGHT).fill(' ');
    zBuffer = new Array(SCREEN_WIDTH * SCREEN_HEIGHT).fill(0);

    // Pré-calcula senos e cossenos para otimização
    const cosA = Math.cos(A);
    const sinA = Math.sin(A);
    const cosB = Math.cos(B);
    const sinB = Math.sin(B);

    // Loop através do círculo (θ) - ângulo ao redor do tubo do toróide
    for (let theta = 0; theta < 2 * Math.PI; theta += 0.07) {
        const cosTheta = Math.cos(theta);
        const sinTheta = Math.sin(theta);

        // Loop através do tubo (φ) - ângulo ao redor do círculo que forma o tubo
        for (let phi = 0; phi < 2 * Math.PI; phi += 0.02) {
            const cosPhi = Math.cos(phi);
            const sinPhi = Math.sin(phi);

            // Coordenadas 3D do ponto no toróide
            // R1: raio do tubo
            // R2: raio do eixo central ao centro do tubo
            const R1 = 1;
            const R2 = 2;
            const K1 = SCREEN_HEIGHT;
            const K2 = 5;

            // Calcula as coordenadas do círculo antes da rotação
            const circleX = R2 + R1 * cosTheta;
            const circleY = R1 * sinTheta;

            // Rotação 3D
            // Primeiro rotaciona ao redor do eixo X (ângulo A)
            const x = circleX * (cosB * cosPhi + sinA * sinB * sinPhi) 
                      - circleY * cosA * sinB;
            const y = circleX * (sinB * cosPhi - sinA * cosB * sinPhi) 
                      + circleY * cosA * cosB;
            const z = K2 + cosA * circleX * sinPhi + circleY * sinA;
            
            const ooz = 1 / z; // "one over z" - inverso de z para projeção

            // Projeção 2D
            const xp = Math.floor(SCREEN_WIDTH / 2 + K1 * ooz * x);
            const yp = Math.floor(SCREEN_HEIGHT / 2 - K1 * ooz * y / 2);

            // Calcula a luminosidade baseada no vetor normal
            const N = (cosTheta * (cosB * cosPhi + sinA * sinB * sinPhi) 
                      - cosA * sinB * sinTheta);

            // Verifica se o ponto está dentro da tela
            if (xp >= 0 && xp < SCREEN_WIDTH && yp >= 0 && yp < SCREEN_HEIGHT) {
                const idx = xp + yp * SCREEN_WIDTH;
                
                // Z-buffering: só desenha se estiver mais perto da câmera
                if (ooz > zBuffer[idx]) {
                    zBuffer[idx] = ooz;
                    
                    // Escolhe o caractere baseado na luminosidade
                    const luminanceIndex = Math.floor(N * 8);
                    const luminanceChars = '.,-~:;=!*#$@';
                    output[idx] = luminanceChars[Math.max(0, luminanceIndex)] || ' ';
                }
            }
        }
    }
}

/**
 * Imprime o frame na tela
 */
function printFrame() {
    let frame = '';
    for (let i = 0; i < SCREEN_HEIGHT; i++) {
        frame += output.slice(i * SCREEN_WIDTH, (i + 1) * SCREEN_WIDTH).join('');
        if (i < SCREEN_HEIGHT - 1) {
            frame += '\n';
        }
    }
    console.log(frame);
}

/**
 * Loop principal de animação
 */
function animate() {
    clearScreen();
    renderFrame();
    printFrame();
    
    // Incrementa os ângulos de rotação
    A += 0.04;
    B += 0.02;
}

/**
 * Início da animação
 */
console.log('\x1b[?25l'); // Esconde o cursor

// Configura o intervalo de animação (30 FPS aproximadamente)
const intervalId = setInterval(animate, 33);

// Limpa ao pressionar Ctrl+C
process.on('SIGINT', () => {
    clearInterval(intervalId);
    console.log('\x1b[?25h'); // Mostra o cursor
    console.log('\n\n🍩 Obrigado por apreciar o donut! 🍩\n');
    process.exit(0);
});

// Mensagem de boas-vindas
console.log('\n🍩 Spinning ASCII Donut 🍩');
console.log('Pressione Ctrl+C para sair\n');
setTimeout(() => {
    clearScreen();
}, 2000);
