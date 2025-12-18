const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

// Configuración inicial del tamaño del canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particleArray = [];

// Manejo del ratón (Mouse)
// Guardamos la posición x, y del ratón para calcular distancias después
const mouse = {
    x: null,
    y: null,
    radius: 100 // Radio de interacción (zona de efecto)
}

// Event listener para rastrear el movimiento del ratón
window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
});

// CLASE PRINCIPAL: Define qué es una partícula
class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX; // Velocidad horizontal
        this.directionY = directionY; // Velocidad vertical
        this.size = size;
        this.baseSize = size; // Recordamos el tamaño original para volver a él
        this.color = color;
    }

    // Método para dibujar la partícula individualmente
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    // Método para actualizar la posición y verificar interacciones (El "cerebro" de la partícula)
    update() {
        // 1. Detección de bordes (Rebote)
        // Si la partícula toca el borde derecho o izquierdo, invertimos su dirección X
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        // Si la partícula toca el borde superior o inferior, invertimos su dirección Y
        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }

        // 2. Detección de colisión con el mouse (Matemática vectorial básica)
        // Calculamos la distancia euclidiana entre el mouse y la partícula
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        // Teorema de Pitágoras: Hipotenusa = Raíz cuadrada de (cateto1^2 + cateto2^2)
        let distance = Math.sqrt(dx * dx + dy * dy);

        // Si la distancia es menor al radio del mouse, activamos la interacción
        if (distance < mouse.radius) {
            // Aumentamos el tamaño (efecto lupa)
            if (this.size < this.baseSize * 4) {
                this.size += 3;
            }
            // Opcional: Empujar la partícula (descomentar para efecto de repulsión)
            // if (mouse.x < this.x && this.x < canvas.width - this.size * 10) this.x += 10;
            // if (mouse.x > this.x && this.x > this.size * 10) this.x -= 10;
        } else {
            // Si el mouse se aleja, volvemos al tamaño original suavemente
            if (this.size > this.baseSize) {
                this.size -= 1;
            }
        }

        // 3. Mover la partícula
        this.x += this.directionX;
        this.y += this.directionY;

        // 4. Dibujar la partícula en su nueva posición
        this.draw();
    }
}

// Función de inicialización: Crea las partículas (mínimo 50 según requerimiento)
function init() {
    particleArray = [];
    let numberOfParticles = 100; // Supera el requisito de 50

    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 5) + 1; // Tamaño aleatorio entre 1 y 6
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 2) - 1; // Velocidad aleatoria entre -1 y 1
        let directionY = (Math.random() * 2) - 1;
        let color = '#00ADB5'; // Color cian moderno

        particleArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

// Bucle de animación (El corazón del renderizado)
function animate() {
    // requestAnimationFrame es más eficiente que setInterval porque se sincroniza con el refresco de pantalla
    requestAnimationFrame(animate);
    
    // Limpiamos el canvas en cada frame para evitar trazos infinitos
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    // Actualizamos cada partícula
    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].update();
    }
}

// Evento Resize: Si el usuario cambia el tamaño de la ventana, ajustamos el canvas y reiniciamos
window.addEventListener('resize', function() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
});

// Arrancar el programa
init();
animate();