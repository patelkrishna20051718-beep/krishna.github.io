const navLinks = document.getElementById("navLinks");
const menuBtn = document.getElementById("menuBtn");
const topBtn = document.getElementById("topBtn");
const header = document.getElementById("header");
const progress = document.getElementById("scrollProgress");
const cursorGlow = document.getElementById("cursorGlow");

function toggleMenu() {
    const isOpen = navLinks.classList.toggle("active");
    menuBtn.setAttribute("aria-expanded", isOpen);
}

menuBtn.addEventListener("click", toggleMenu);

document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuBtn.setAttribute("aria-expanded", "false");
    });
});

window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
    const percentage = pageHeight > 0 ? (scrollTop / pageHeight) * 100 : 0;

    progress.style.width = `${percentage}%`;
    header.classList.toggle("scrolled", scrollTop > 25);
    topBtn.classList.toggle("show", scrollTop > 450);

    let currentSection = "home";

    document.querySelectorAll("main section[id]").forEach(section => {
        if (scrollTop >= section.offsetTop - 180) {
            currentSection = section.id;
        }
    });

    document.querySelectorAll(".nav-link").forEach(link => {
        link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${currentSection}`
        );
    });
});

topBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(element => observer.observe(element));

document.addEventListener("mousemove", event => {
    if (window.innerWidth > 850) {
        cursorGlow.style.left = `${event.clientX}px`;
        cursorGlow.style.top = `${event.clientY}px`;
    }
});

document.getElementById("contactForm").addEventListener("submit", event => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const note = document.getElementById("formNote");

    if (!name) {
        note.textContent = "Please enter your name.";
        return;
    }

    note.textContent =
        `Thanks, ${name}! Your message is ready to be connected to an email service.`;

    event.target.reset();
});

document.getElementById("year").textContent = new Date().getFullYear();
