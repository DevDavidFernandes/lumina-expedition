const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");

// Ajusta o canvas ao tamanho real da janela
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function criarPetala() {
  return {
    x: Math.random() * (canvas.width + 100) - 50,
    y: Math.random() * canvas.height, // onde ela nasce? (dica: acima da tela)
    size: Math.random() * (5 - 2) + 2, // entre 2 e 5
    opacity: Math.random() * (0.9 - 0.3) + 0.3, // entre 0.3 e 0.9
    speedY: Math.random() * (0.8 - 0.3) + 0.3, // entre 0.3 e 0.8
    speedX: Math.random() * 0.6 - 0.3, // entre -0.3 e 0.3
    rotation: Math.random() * 360,
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
    petala.rotation += 0.5;

    if (petala.y > canvas.height) {
      resetarPetala(petala);
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
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  petalas.forEach((petala) => {
    ctx.beginPath();

    ctx.arc(petala.x, petala.y, petala.size, 0, Math.PI * 2);

    ctx.fillStyle = `rgba(240, 235, 220, ${petala.opacity})`;
    ctx.fill();
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
