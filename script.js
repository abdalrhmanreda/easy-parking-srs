'use strict';

const navLinks = Array.from(document.querySelectorAll('.quick-nav a'));
const sections = Array.from(document.querySelectorAll('.chapter[id]'));
const chapterCards = Array.from(document.querySelectorAll('.section-card[href]'));

const setActiveNav = (id) => {
    navLinks.forEach((link) => {
        const isActive = link.getAttribute('href') === `#${id}`;
        link.classList.toggle('active', isActive);
    });
};

if (navLinks.length) {
    navLinks.forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href')?.slice(1);
            if (!targetId) {
                return;
            }

            const target = document.getElementById(targetId);
            if (!target) {
                return;
            }

            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            history.replaceState(null, '', `#${targetId}`);
        });
    });
}

if (sections.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveNav(entry.target.id);
                }
            });
        },
        {
            rootMargin: '-35% 0px -55% 0px',
            threshold: 0.1,
        }
    );

    sections.forEach((section) => observer.observe(section));
}

if (chapterCards.length) {
    chapterCards.forEach((card) => {
        card.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = card.getAttribute('href')?.slice(1);
            if (!targetId) {
                return;
            }

            const target = document.getElementById(targetId);
            if (!target) {
                return;
            }

            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            history.replaceState(null, '', `#${targetId}`);
        });
    });
}

const initialHash = window.location.hash.replace('#', '');
if (initialHash) {
    const target = document.getElementById(initialHash);
    if (target) {
        setActiveNav(initialHash);
    }
}
