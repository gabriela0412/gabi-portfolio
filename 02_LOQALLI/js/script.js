
document.addEventListener("DOMContentLoaded", () => {

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    const experienceSearch = document.getElementById("experienceSearch");
    const filterButtons = document.querySelectorAll(".filter-btn");
    const experienceCards = document.querySelectorAll(".experience-card");
    const noResults = document.getElementById("noResults");

    const experienceModal = document.getElementById("experienceModal");
    const loginModal = document.getElementById("loginModal");

    const loginOpen = document.getElementById("loginOpen");
    const loginForm = document.getElementById("loginForm");

    const reviewForm = document.getElementById("reviewForm");
    const reviewText = document.getElementById("reviewText");
    const reviewList = document.getElementById("reviewList");

    const toast = document.getElementById("toast");

    let activeExperience = null;
    let activeFilter = "all";
    let toastTimeout;

    const experiences = {

        palma: {
            title: "Colores de La Palma",
            category: "ARTE Y ARTESANÍA",
            description: "La Palma, en Chalatenango, es reconocida por sus artesanías de madera pintadas con colores vivos y escenas inspiradas en la naturaleza y la vida cotidiana. Esta propuesta invita a conocer sus técnicas, símbolos y tradición artística.",
            image: "https://commons.wikimedia.org/wiki/Special:FilePath/Artesanias%20de%20La%20Palma%20Chalatenango.jpg",
            alt: "Artesanías de madera de La Palma"
        },

        ilobasco: {
            title: "El arte del barro",
            category: "ARTE Y ARTESANÍA",
            description: "Ilobasco, en Cabañas, es conocido por su tradición alfarera. Descubre el trabajo con barro, las formas artesanales y la creatividad que se transmite entre generaciones.",
            image: "https://commons.wikimedia.org/wiki/Special:FilePath/Artesanias%20de%20Ilobasco.JPG",
            alt: "Artesanías de barro de Ilobasco"
        },

        suchitoto: {
            title: "Historias de Suchitoto",
            category: "CULTURA",
            description: "Suchitoto conserva calles empedradas, arquitectura tradicional y una historia cultural muy especial. Esta experiencia propone recorrer sus espacios y conocer las historias de quienes viven allí.",
            image: "https://commons.wikimedia.org/wiki/Special:FilePath/Calles%20de%20Suchitoto.jpg",
            alt: "Calles de Suchitoto"
        },

        tamales: {
            title: "Sabores de casa",
            category: "GASTRONOMÍA",
            description: "La cocina salvadoreña guarda recetas familiares que se comparten de generación en generación. Conoce la preparación tradicional de los tamales y el valor cultural que tienen en nuestras mesas.",
            image: "https://commons.wikimedia.org/wiki/Special:FilePath/Tamales%20el%20salavdor.jpg",
            alt: "Tamales salvadoreños"
        },

        pupusas: {
            title: "Una tradición en cada pupusa",
            category: "GASTRONOMÍA",
            description: "Las pupusas forman parte de la identidad gastronómica salvadoreña. Olocuilta es especialmente conocida por sus pupusas de arroz. Descubre sus ingredientes, preparación y tradición.",
            image: "https://commons.wikimedia.org/wiki/Special:FilePath/Typical%20serving%20of%20Pupusas%20in%20El%20Salvador.jpg",
            alt: "Pupusas tradicionales de Olocuilta"
        },

        cafe: {
            title: "El camino del café",
            category: "TRADICIÓN Y NATURALEZA",
            description: "El café forma parte de la historia agrícola y cultural de El Salvador. Acércate a sus procesos, conoce el trabajo detrás de cada cosecha y descubre su importancia para las comunidades productoras.",
            image: "https://commons.wikimedia.org/wiki/Special:FilePath/Coffee%20Processing%20in%20Ahuachapan%2C%20El%20Salvador.jpg",
            alt: "Proceso de café en Ahuachapán"
        }

    };

    const showToast = (message) => {
        toast.textContent = message;
        toast.classList.add("show");

        clearTimeout(toastTimeout);

        toastTimeout = setTimeout(() => {
            toast.classList.remove("show");
        }, 3000);
    };

    const openModal = (modal) => {
        modal.classList.add("open");
        modal.setAttribute("aria-hidden", "false");
        document.body.classList.add("modal-open");
    };

    const closeModal = (modal) => {
        modal.classList.remove("open");
        modal.setAttribute("aria-hidden", "true");

        if (!document.querySelector(".modal.open")) {
            document.body.classList.remove("modal-open");
        }
    };

    // MOBILE NAVIGATION

    menuToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });

    // EXPERIENCE FILTERS AND SEARCH

    const filterExperiences = () => {
        const searchTerm = experienceSearch.value
            .toLowerCase()
            .trim();

        let visibleCount = 0;

        experienceCards.forEach(card => {
            const category = card.dataset.category;
            const searchContent = card.dataset.search.toLowerCase();

            const matchesCategory =
                activeFilter === "all" || category === activeFilter;

            const matchesSearch =
                searchContent.includes(searchTerm);

            const isVisible = matchesCategory && matchesSearch;

            card.hidden = !isVisible;

            if (isVisible) {
                visibleCount++;
            }
        });

        noResults.hidden = visibleCount !== 0;
    };

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            filterButtons.forEach(item => {
                item.classList.remove("active");
            });

            button.classList.add("active");
            activeFilter = button.dataset.filter;

            filterExperiences();
        });
    });

    experienceSearch.addEventListener("input", filterExperiences);

    // EXPERIENCE DETAILS

    const openExperience = (experienceId) => {
        const experience = experiences[experienceId];

        if (!experience) return;

        activeExperience = experienceId;

        document.getElementById("modalImage").src = experience.image;
        document.getElementById("modalImage").alt = experience.alt;
        document.getElementById("modalCategory").textContent = experience.category;
        document.getElementById("modalTitle").textContent = experience.title;
        document.getElementById("modalDescription").textContent = experience.description;

        reviewList.innerHTML = "";

        openModal(experienceModal);
    };

    document.querySelectorAll("[data-experience]").forEach(button => {
        button.addEventListener("click", () => {
            openExperience(button.dataset.experience);
        });
    });

    // REVIEWS

    reviewForm.addEventListener("submit", event => {
        event.preventDefault();

        const comment = reviewText.value.trim();

        if (!comment || !activeExperience) return;

        const review = document.createElement("p");
        review.className = "review-item";
        review.textContent = comment;

        reviewList.prepend(review);

        reviewText.value = "";

        showToast("Comentario agregado mientras esta página permanece abierta.");
    });

    // LOGIN MODAL

    loginOpen.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        openModal(loginModal);
    });

    loginForm.addEventListener("submit", event => {
        event.preventDefault();

        showToast("Este acceso es una demostración visual; no crea una cuenta real.");

        loginForm.reset();
        closeModal(loginModal);
    });

    // CLOSE MODALS

    document.querySelectorAll("[data-close]").forEach(button => {
        button.addEventListener("click", () => {
            const modalType = button.dataset.close;

            if (modalType === "experience") {
                closeModal(experienceModal);
            }

            if (modalType === "login") {
                closeModal(loginModal);
            }
        });
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            closeModal(experienceModal);
            closeModal(loginModal);
        }
    });

    // FOOTER YEAR

    document.getElementById("currentYear").textContent =
        new Date().getFullYear();

});
