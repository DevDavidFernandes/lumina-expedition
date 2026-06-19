const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");

// Ajusta o canvas ao tamanho real da janela
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function criarPetala() {
  const tipo = Math.random() < 0.3 ? "petala" : "poeira";

  return {
    tipo,

    x: Math.random() * canvas.width,
    y: Math.random() * -50,

    size: tipo === "petala" ? Math.random() * 5 + 4 : Math.random() * 1.5 + 0.5,

    opacity: Math.random() * 0.4 + 0.5,

    fadeSpeed: Math.random() * 0.0005 + 0.0002,

    speedY:
      tipo === "petala" ? Math.random() * 1.2 + 0.6 : Math.random() * 0.4 + 0.1,

    speedX: Math.random() * 0.6 - 0.3,

    rotation: Math.random() * 360,
    rotationSpeed: Math.random() * 0.8 - 0.4,
  };
}

const petalas = [];

for (let i = 0; i < 60; i++) {
  petalas.push(criarPetala());
}

function atualizar() {
  petalas.forEach((petala, index) => {
    petala.y += petala.speedY;
    petala.x += petala.speedX;
    petala.rotation += petala.rotationSpeed;
    petala.opacity -= petala.fadeSpeed;

    if (petala.opacity <= 0 || petala.y > canvas.height) {
      petalas[index] = criarPetala();
    }
  });
}

function desenhar() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  petalas.forEach((petala) => {
    ctx.save();

    ctx.translate(petala.x, petala.y);
    ctx.rotate(petala.rotation * (Math.PI / 180));

    ctx.beginPath();

    if (petala.tipo === "petala") {
      ctx.ellipse(0, 0, petala.size, petala.size * 2.5, 0, 0, Math.PI * 2);
    } else {
      ctx.arc(0, 0, petala.size, 0, Math.PI * 2);
    }

    const cor =
      petala.tipo === "petala"
        ? `rgba(180, 60, 50, ${petala.opacity})`
        : `rgba(240, 235, 220, ${petala.opacity})`;

    ctx.fillStyle = cor;
    ctx.fill();

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
