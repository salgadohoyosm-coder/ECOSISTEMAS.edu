/**
 * ECOSISTEMAS PRO — main.js
 * Corporación de Formación Técnica y Marítima
 * v3.1 - Arquitectura Sincronizada y Optimizada
 */

document.addEventListener('DOMContentLoaded', () => {

    // ============================================================
    // 1. MENÚ MÓVIL (HAMBURGER) - ¡Corregido y Sincronizado!
    // ============================================================
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            // Activa o desactiva la clase que desliza el menú en móvil
            navLinks.classList.toggle('open');
            hamburger.classList.toggle('active');
        });

        // Cierra el menú móvil automáticamente cuando el usuario hace clic en un enlace
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                hamburger.classList.remove('active');
            });
        });
    }

    // ============================================================
    // 2. CAMBIO DE DISEÑO DEL HEADER AL HACER SCROLL
    // ============================================================
    const mainNav = document.getElementById('main-nav');

    window.addEventListener('scroll', () => {
        if (mainNav) {
            // Si el usuario baja más de 60px, el header se vuelve oscuro y borroso
            const isScrolled = window.scrollY > 60;
            mainNav.classList.toggle('scrolled', isScrolled);
        }
    });

    // ============================================================
    // 3. EFECTO DE APARICIÓN SUAVE (SCROLL REVEAL)
    // ============================================================
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target); // Deja de observar una vez se muestra
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    // Selectores que usarán la animación de aparición progresiva
    const targetsToReveal = [
        '.course-card', 
        '.contact-card', 
        '.about-text', 
        '.section-header'
    ];

    targetsToReveal.forEach(selector => {
        document.querySelectorAll(selector).forEach((element, index) => {
            element.classList.add('reveal');
            // Añade un pequeño retraso a los primeros elementos para un efecto escalonado
            if (index < 3) {
                element.classList.add(`reveal-delay-${index + 1}`);
            }
            revealObserver.observe(element);
        });
    });

    // ============================================================
    // 4. ENVÍO DEL FORMULARIO DE CONTACTO (SIMULADO)
    // ============================================================
    const btnSubmit = document.getElementById('btn-submit');
    const enrollForm = document.getElementById('enroll-form');

    if (btnSubmit && enrollForm) {
        btnSubmit.addEventListener('click', () => {
            const inputs = enrollForm.querySelectorAll('input[required], textarea[required]');
            let isValid = true;

            // Validación básica de campos vacíos
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = 'var(--color-primary)';
                    setTimeout(() => input.style.borderColor = '', 3000);
                }
            });

            if (!isValid) {
                alert('Por favor, complete todos los campos requeridos.');
                return;
            }

            // Cambiar estado del botón a modo "Enviando..."
            btnSubmit.innerHTML = 'Enviando...';
            btnSubmit.disabled = true;

            // Simulación de respuesta de servidor (1.8 segundos)
            setTimeout(() => {
                btnSubmit.innerHTML = '¡Solicitud Enviada!';
                btnSubmit.style.backgroundColor = 'var(--color-success)';

                // Crear un bloque de éxito visual dinámico
                const successMsg = document.createElement('div');
                successMsg.style.cssText = `
                    background: var(--color-success);
                    color: white;
                    text-align: center;
                    padding: 15px;
                    margin-top: 15px;
                    border-radius: var(--radius-sm);
                    font-weight: 600;
                `;
                successMsg.textContent = '¡Gracias! Un asesor te contactará pronto.';
                enrollForm.appendChild(successMsg);
                
                // Limpiar el formulario
                enrollForm.reset();
            }, 1800);
        });
    }

    // ============================================================
    // 5. ENLACES CON DESPLAZAMIENTO SUAVE (SMOOTH SCROLL)
    // ============================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 80; // Compensa la altura del header fijo
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================================
    // 6. ADAPTACIONES DE SEGURIDAD PARA CONTENIDO ADICIONAL
    // ============================================================
    // (Mantiene vivas las funciones del Slider y Filtros sin causar errores si no se usan en el index básico)
    const slides = document.querySelectorAll('.slide');
    if (slides.length > 0) {
        // Lógica interna del slider activa solo si existen las clases '.slide'
        let currentSlide = 0;
        const goToSlide = (idx) => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (idx + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');
        };
        setInterval(() => goToSlide(currentSlide + 1), 6000);
    }
});