const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");

// Ajusta o canvas ao tamanho real da janela
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function criarPetala() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * -50,
    size: Math.random() * (5 - 2) + 2,
    opacity: Math.random() * 0.4 + 0.5,
    fadeSpeed: Math.random() * 0.003 + 0.0002,
    speedY: Math.random() * (0.8 - 0.3) + 0.3,
    speedX: Math.random() * 0.6 - 0.3,
    rotation: Math.random() * 360,
    rotationSpeed: Math.random() * 0.8 - 0.4,
  };
}

// 1. Criar várias pétalas de uma vez
const petalas = [];
for (let i = 0; i < 60; i++) {
  petalas.push(criarPetala());
}

// 2. Atualizar posição de cada pétala (mover)
function atualizar() {
  petalas.forEach((petala, index) => {
    petala.y += petala.speedY;
    petala.x += petala.speedX;
    petala.rotation += petala.rotationSpeed;

    // Diminui a opacidade gradualmente
    petala.opacity -= petala.fadeSpeed;

    // Recria a pétala quando ela some ou sai da tela
    if (petala.opacity <= 0 || petala.y > canvas.height) {
      petalas[index] = criarPetala();
    }
  });
}

function resetarPetala(petala) {
  petala.x = Math.random() * canvas.width;
  petala.y = -10;
  petala.opacity = Math.random() * 0.6 + 0.3;
  petala.speedX = Math.random() * 0.6 - 0.3;
}

function desenhar() {
  // Limpa o canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  petalas.forEach((petala) => {
    ctx.save();

    // Move a origem para a posição da pétala
    ctx.translate(petala.x, petala.y);

    // Rotaciona o sistema de coordenadas
    ctx.rotate(petala.rotation * (Math.PI / 180));

    // Desenha a pétala
    ctx.beginPath();
    ctx.ellipse(0, 0, petala.size, petala.size * 2.5, 0, 0, Math.PI * 2);

    ctx.fillStyle = `rgba(240, 235, 220, ${petala.opacity})`;
    ctx.fill();

    // Restaura o estado original do canvas
    ctx.restore();
  });
}

function animar() {
  atualizar();
  desenhar();
  requestAnimationFrame(animar);
}

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

animar();
