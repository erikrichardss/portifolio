// =========================================
// ELEMENTOS
// =========================================

const header = document.querySelector(".header");
const menuButton = document.querySelector("#menuButton");
const navMenu = document.querySelector("#navMenu");
const navLinks = document.querySelectorAll(".nav-link");


// =========================================
// HEADER AO ROLAR
// =========================================

function updateHeader() {

    if (window.scrollY > 20) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

}

window.addEventListener("scroll", updateHeader);


// Executa uma vez ao carregar a página
updateHeader();


// =========================================
// MENU MOBILE
// =========================================

menuButton.addEventListener("click", function () {

    const menuIsOpen = navMenu.classList.toggle("open");

    menuButton.classList.toggle("open");

    menuButton.setAttribute(
        "aria-expanded",
        menuIsOpen
    );

});


// =========================================
// FECHAR MENU AO CLICAR EM UM LINK
// =========================================

navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        navMenu.classList.remove("open");

        menuButton.classList.remove("open");

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );

    });

});


// =========================================
// DESTACAR SEÇÃO ATUAL
// =========================================

const sections = document.querySelectorAll("main section");

const sectionObserver = new IntersectionObserver(
    function (entries) {

        entries.forEach(function (entry) {

            if (!entry.isIntersecting) {
                return;
            }

            navLinks.forEach(function (link) {
                link.classList.remove("active");
            });


            const currentLink = document.querySelector(
                `.nav-link[href="#${entry.target.id}"]`
            );


            if (currentLink) {
                currentLink.classList.add("active");
            }

        });

    },
    {
        threshold: 0.5
    }
);


sections.forEach(function (section) {

    sectionObserver.observe(section);

});

// =========================================
// FILTRO DE PROJETOS
// =========================================
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        // Remove 'active' de todos e adiciona no clicado
        filterButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");

        const filterValue = button.getAttribute("data-filter");

        projectCards.forEach((card) => {
            const cardCategory = card.getAttribute("data-category");

            if (filterValue === "all" || filterValue === cardCategory) {
                card.classList.remove("hide");
            } else {
                card.classList.add("hide");
            }
        });
    });
});

// =========================================
// ENVIO DO FORMULÁRIO DE CONTATO
// =========================================
const contactForm = document.getElementById("contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Aqui você pode integrar com envio real no futuro
        alert("Obrigado pelo contato! Sua mensagem foi enviada.");
        contactForm.reset();
    });
}