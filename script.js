document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');

    if (!form) {
        console.error('contactForm not found');
        return;
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        const whatsappMessage = `Hello! My name is ${name}, my email is ${email}. Message: ${message}`;
        const encodedMessage = encodeURIComponent(whatsappMessage);

        if (typeof WHATSAPP_NUMBER === 'undefined' || !WHATSAPP_NUMBER) {
            console.error('WHATSAPP_NUMBER is not defined');
            return;
        }

        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
        launchFireworks();
    });
});

function launchFireworks() {
    const canvas = document.getElementById('fireworksCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    for (let i = 0; i < 100; i++) {
        particles.push({
            x: canvas.width / 2,
            y: canvas.height / 2,
            vx: (Math.random() - 0.5) * 10,
            vy: (Math.random() - 0.5) * 10,
            alpha: 1,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.alpha -= 0.02;
            ctx.globalAlpha = p.alpha;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
            ctx.fill();
        });

        particles = particles.filter(p => p.alpha > 0);
        if (particles.length > 0) requestAnimationFrame(animate);
    }

    animate();
}