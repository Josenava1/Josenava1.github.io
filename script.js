document.addEventListener("DOMContentLoaded", () => {
    const sections = ["header", "proyectos", "informacion", "pomodoro", "juego", "musica", "footer"];
    const contentDiv = document.getElementById("content");
    let isMusicPlaying = true;

    // Cargar secciones
    sections.forEach(section => {
        fetch(`${section}.html`)
            .then(response => response.text())
            .then(html => {
                const sectionDiv = document.createElement("div");
                sectionDiv.innerHTML = html;
                contentDiv.appendChild(sectionDiv);
            })
            .catch(error => console.error(`Error al cargar ${section}:`, error));
    });

    // Control de música
    const musicButton = document.getElementById("music-toggle");
    const backgroundMusic = document.getElementById("background-music");

    musicButton.addEventListener("click", () => {
        if (isMusicPlaying) {
            backgroundMusic.pause();
            musicButton.textContent = "🔇";  // Cambia a icono de mute
        } else {
            backgroundMusic.play();
            musicButton.textContent = "🎵";  // Cambia a icono de nota musical
        }
        isMusicPlaying = !isMusicPlaying;
    });

    // Animación de scroll
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("animated-visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    // Scroll infinito
    contentDiv.addEventListener("scroll", () => {
        const newSection = document.createElement("div");
        newSection.className = "section animated fade-in-scroll";
        newSection.innerHTML = "<h2>Sección Adicional</h2><p>Contenido cargado dinámicamente.</p>";
        contentDiv.appendChild(newSection);
        observer.observe(newSection);
    });

    // Scroll suave para navegación
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
