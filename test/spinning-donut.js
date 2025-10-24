#!/usr/bin/env node

/**
 * Spinning ASCII Donut
 * 
 * Uma implementação profissional de um torus (donut) 3D girando em ASCII art.
 * Baseado em princípios matemáticos de projeção 3D e equações paramétricas de torus.
 * 
 * Conceitos matemáticos aplicados:
 * - Equações paramétricas de torus: (R + r*cos(v))*cos(u), (R + r*cos(v))*sin(u), r*sin(v)
 * - Rotação 3D usando matrizes de rotação
 * - Projeção perspectiva para simular profundidade
 * - Iluminação usando produto escalar (dot product) para determinar brilho
 * 
 * @author ASCII Art Specialist | IQ 160 em visualizações matemáticas
 */

const SCREEN_WIDTH = 80;
const SCREEN_HEIGHT = 24;
const THETA_SPACING = 0.07;
const PHI_SPACING = 0.02;

// Raios do torus
const R1 = 1;  // Raio do círculo interno
const R2 = 2;  // Distância do centro do torus ao centro do círculo interno
const K2 = 5;  // Distância do observador à tela
const K1 = SCREEN_WIDTH * K2 * 3 / (8 * (R1 + R2)); // Fator de escala calculado

// Caracteres para representar diferentes níveis de iluminação (do mais escuro ao mais claro)
const LUMINANCE_CHARS = '.,-~:;=!*#$@';

/**
 * Renderiza um frame do donut girando
 * @param {number} A - Ângulo de rotação no eixo X
 * @param {number} B - Ângulo de rotação no eixo Z
 */
function renderFrame(A, B) {
    // Buffers para armazenar caracteres e profundidade (z-buffer)
    const output = Array(SCREEN_HEIGHT).fill(null).map(() => Array(SCREEN_WIDTH).fill(' '));
    const zbuffer = Array(SCREEN_HEIGHT).fill(null).map(() => Array(SCREEN_WIDTH).fill(0));

    // Pre-calcular senos e cossenos para otimização
    const cosA = Math.cos(A);
    const sinA = Math.sin(A);
    const cosB = Math.cos(B);
    const sinB = Math.sin(B);

    // Iterar sobre a superfície do torus usando coordenadas paramétricas
    for (let theta = 0; theta < 2 * Math.PI; theta += THETA_SPACING) {
        const cosTheta = Math.cos(theta);
        const sinTheta = Math.sin(theta);

        for (let phi = 0; phi < 2 * Math.PI; phi += PHI_SPACING) {
            const cosPhi = Math.cos(phi);
            const sinPhi = Math.sin(phi);

            // Calcular o círculo do torus
            const circleX = R2 + R1 * cosTheta;
            const circleY = R1 * sinTheta;

            // Aplicar rotação 3D (primeiro rotação em Y, depois em X)
            // Coordenadas finais após rotação
            const x = circleX * (cosB * cosPhi + sinA * sinB * sinPhi) - circleY * cosA * sinB;
            const y = circleX * (sinB * cosPhi - sinA * cosB * sinPhi) + circleY * cosA * cosB;
            const z = K2 + cosA * circleX * sinPhi + circleY * sinA;

            // Inverso de z para z-buffer (quanto maior, mais próximo)
            const ooz = 1 / z;

            // Projeção na tela 2D
            const xp = Math.floor(SCREEN_WIDTH / 2 + K1 * ooz * x);
            const yp = Math.floor(SCREEN_HEIGHT / 2 - K1 * ooz * y);

            // Calcular iluminação usando vetor normal
            // Normal do torus: (cos(theta)*cos(phi), sin(theta), cos(theta)*sin(phi))
            const N_x = cosTheta * (cosB * cosPhi + sinA * sinB * sinPhi) - sinTheta * cosA * sinB;
            const N_y = cosTheta * (sinB * cosPhi - sinA * cosB * sinPhi) + sinTheta * cosA * cosB;
            const N_z = cosA * cosTheta * sinPhi + sinTheta * sinA;

            // Fonte de luz vindo de trás e acima do observador
            // Dot product com vetor de luz normalizado
            const luminance = N_y * 0.5 + N_x * 0.5 - N_z * 0.7;

            // Verificar se o ponto está dentro da tela e é visível (z-buffer test)
            if (xp >= 0 && xp < SCREEN_WIDTH && yp >= 0 && yp < SCREEN_HEIGHT) {
                if (ooz > zbuffer[yp][xp]) {
                    zbuffer[yp][xp] = ooz;
                    
                    // Mapear luminância para caractere
                    const luminanceIndex = Math.floor(luminance * 8);
                    const charIndex = Math.max(0, Math.min(LUMINANCE_CHARS.length - 1, luminanceIndex));
                    output[yp][xp] = LUMINANCE_CHARS[charIndex];
                }
            }
        }
    }

    // Limpar tela (ANSI escape code)
    console.clear();

    // Renderizar output
    console.log('\n');
    for (let j = 0; j < SCREEN_HEIGHT; j++) {
        console.log(output[j].join(''));
    }

    // Informações técnicas
    console.log(`\n🍩 Spinning Donut | A: ${A.toFixed(2)} | B: ${B.toFixed(2)}`);
    console.log('Pressione Ctrl+C para sair');
}

/**
 * Loop principal de animação
 */
function animate() {
    let A = 0;
    let B = 0;

    // Informações iniciais
    console.log('╔══════════════════════════════════════════════════════════════════════════════╗');
    console.log('║                         🍩 ASCII DONUT ANIMATOR 🍩                           ║');
    console.log('╚══════════════════════════════════════════════════════════════════════════════╝');
    console.log('');
    console.log('📐 Técnicas Matemáticas Aplicadas:');
    console.log('  • Equações paramétricas de torus');
    console.log('  • Rotação 3D com matrizes de transformação');
    console.log('  • Projeção perspectiva');
    console.log('  • Z-buffering para oclusão correta');
    console.log('  • Iluminação usando produto escalar (dot product)');
    console.log('');
    console.log('🎨 Caracteres de Luminância (escuro → claro):');
    console.log(`  "${LUMINANCE_CHARS}"`);
    console.log('');
    console.log('Iniciando animação em 3 segundos...');
    console.log('');

    setTimeout(() => {
        // Intervalo de atualização (aproximadamente 30 FPS)
        const interval = setInterval(() => {
            renderFrame(A, B);
            
            // Incrementar ângulos de rotação
            A += 0.04;
            B += 0.02;

            // Normalizar ângulos para evitar overflow
            if (A > 2 * Math.PI) A -= 2 * Math.PI;
            if (B > 2 * Math.PI) B -= 2 * Math.PI;
        }, 33);

        // Cleanup quando Ctrl+C
        process.on('SIGINT', () => {
            clearInterval(interval);
            console.clear();
            console.log('\n\n👋 Donut finalizado! Até logo!\n');
            process.exit(0);
        });
    }, 3000);
}

// Verificar se o terminal suporta as dimensões necessárias
if (process.stdout.columns < SCREEN_WIDTH || process.stdout.rows < SCREEN_HEIGHT + 5) {
    console.warn('⚠️  AVISO: Seu terminal pode ser muito pequeno para visualização ideal.');
    console.warn(`    Recomendado: ${SCREEN_WIDTH}x${SCREEN_HEIGHT + 5} ou maior`);
    console.warn(`    Atual: ${process.stdout.columns}x${process.stdout.rows}`);
    console.log('');
}

// Iniciar animação
animate();
