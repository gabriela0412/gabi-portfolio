
document.addEventListener("DOMContentLoaded", () => {

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    // MOBILE MENU

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

            menuToggle.setAttribute("aria-expanded", String(!isOpen));
            navLinks.classList.toggle("open", !isOpen);

            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Open navigation" : "Close navigation"
            );
        });

        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Open navigation");
            });
        });
    }

    // SCROLL PROGRESS

    const scrollProgress = document.getElementById("scrollProgress");

    function updateScrollProgress() {
        if (!scrollProgress) return;

        const scrollableHeight =
            document.documentElement.scrollHeight - window.innerHeight;

        const progress = scrollableHeight > 0
            ? (window.scrollY / scrollableHeight) * 100
            : 0;

        scrollProgress.style.width = `${progress}%`;
    }

    window.addEventListener("scroll", updateScrollProgress, {
        passive: true
    });

    updateScrollProgress();

    // REVEAL ANIMATIONS

    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window && !reducedMotion) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12
        });

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    } else {
        revealElements.forEach(element => {
            element.classList.add("visible");
        });
    }

    // SMALL GALAXY PARTICLES

    const sparkleLayer = document.getElementById("sparkleLayer");

    if (sparkleLayer && !reducedMotion) {
        const particleCount = window.innerWidth < 600 ? 45 : 85;

        for (let i = 0; i < particleCount; i++) {
            const sparkle = document.createElement("span");
            sparkle.className = "sparkle";

            const size = Math.random() * 1.8 + 0.7;
            const duration = Math.random() * 5 + 3;
            const delay = Math.random() * 7;

            sparkle.style.left = `${Math.random() * 100}%`;
            sparkle.style.top = `${Math.random() * 100}%`;
            sparkle.style.width = `${size}px`;
            sparkle.style.height = `${size}px`;
            sparkle.style.setProperty("--duration", `${duration}s`);
            sparkle.style.setProperty("--delay", `${delay}s`);

            sparkleLayer.appendChild(sparkle);
        }
    }

    // SHOOTING STARS

    const shootingStars = document.getElementById("shootingStars");

    function createShootingStar() {
        if (!shootingStars || reducedMotion) return;

        const star = document.createElement("span");
        star.className = "shooting-star";
        star.style.top = `${Math.random() * 65}%`;
        star.style.left = `${35 + Math.random() * 70}%`;

        shootingStars.appendChild(star);

        star.addEventListener("animationend", () => {
            star.remove();
        });
    }

    if (shootingStars && !reducedMotion) {
        createShootingStar();

        const scheduleNextStar = () => {
            const delay = 4500 + Math.random() * 6500;

            window.setTimeout(() => {
                createShootingStar();
                scheduleNextStar();
            }, delay);
        };

        scheduleNextStar();
    }

    // INTERACTIVE MEMORY GALLERY

    const memoryGallery = document.getElementById("memoryGallery");

    if (memoryGallery) {
        const memoryStack = memoryGallery.querySelector(".memory-stack");
        const counter = document.getElementById("galleryCounter");

        if (memoryStack) {
            let memories = Array.from(
                memoryStack.querySelectorAll(".memory-card")
            );

            let currentMemory = 1;
            let isAnimating = false;

            function updateGallery() {
                memories.forEach((card, index) => {
                    card.classList.remove(
                        "memory-card-top",
                        "memory-card-middle",
                        "memory-card-back",
                        "is-arriving",
                        "is-leaving"
                    );

                    if (index === 0) {
                        card.classList.add("memory-card-back");
                    } else if (index === 1) {
                        card.classList.add("memory-card-middle");
                    } else {
                        card.classList.add("memory-card-top");
                    }
                });

                if (counter) {
                    counter.textContent =
                        `${String(currentMemory).padStart(2, "0")} / ${String(memories.length).padStart(2, "0")}`;
                }
            }

            function showNextMemory() {
                if (isAnimating || memories.length < 2) return;

                isAnimating = true;

                const topCard = memories[memories.length - 1];
                topCard.classList.add("is-leaving");

                window.setTimeout(() => {
                    memories.unshift(memories.pop());
                    updateGallery();

                    const newTopCard = memories[memories.length - 1];
                    newTopCard.classList.add("is-arriving");

                    currentMemory = currentMemory === memories.length
                        ? 1
                        : currentMemory + 1;

                    if (counter) {
                        counter.textContent =
                            `${String(currentMemory).padStart(2, "0")} / ${String(memories.length).padStart(2, "0")}`;
                    }

                    window.setTimeout(() => {
                        newTopCard.classList.remove("is-arriving");
                        isAnimating = false;
                    }, 650);

                }, reducedMotion ? 0 : 400);
            }

            memoryStack.addEventListener("click", event => {
                if (event.target.closest(".memory-card")) {
                    showNextMemory();
                }
            });

            updateGallery();
        }
    }

    // CERTIFICATE GALLERY

    const certificateGallery = document.getElementById("certificateGallery");

    if (certificateGallery) {

        const certificates = [
            {
                image: "assets/images/certificate-1.jpeg",
                alt: "Technical Course in Vegetable Crops certificate",
                category: "TECHNICAL TRAINING",
                status: "COMPLETED",
                title: "Technical Course in Vegetable Crops",
                institution: "Fundación Carlos Him · Capacítate para el Empleo",
                description: "An online technical course focused on vegetable crop production, introducing fundamental knowledge and practices related to agricultural production and crop management.",
                hours: "62 hours",
                exams: "14 / 14",
                score: "8.81",
                progress: "100%",
                dateLabel: "ENROLLMENT DATE",
                date: "September 29, 2026 · 9:06 AM",
                learning: "Developed foundational knowledge of vegetable cultivation and agricultural production processes."
            },
            {
                image: "assets/images/certificate-2.jpeg",
                alt: "Leadership Course certificate",
                category: "LEADERSHIP TRAINING",
                status: "COMPLETED",
                title: "Leadership Course",
                institution: "Fundación Carlos Him · Capacítate para el Empleo",
                description: "An online course focused on leadership development and the importance of guiding, motivating and working effectively with others.",
                hours: "16 hours",
                exams: "1 / 1",
                score: "10",
                progress: "100%",
                dateLabel: "ENROLLMENT DATE",
                date: "October 18, 2026 · 10:16 AM",
                learning: "Strengthened knowledge of leadership principles and the role of communication, responsibility and teamwork."
            },
            {
                image: "assets/images/certificate-3.jpeg",
                alt: "Basic Excel course certificate",
                category: "DIGITAL SKILLS",
                status: "APPROVED",
                title: "Basic Excel",
                institution: "Platzi",
                description: "A basic introduction to Microsoft Excel, combining theoretical and practical learning to develop foundational spreadsheet skills.",
                hours: "13 hours",
                exams: null,
                score: null,
                progress: "Approved",
                dateLabel: "COMPLETION DATE",
                date: "September 29, 2026",
                learning: "Developed introductory skills for organizing information and working with spreadsheets using Microsoft Excel."
            }
        ];

        const image = document.getElementById("certificateImage");
        const counter = document.getElementById("certificateCounter");
        const previous = document.getElementById("certificatePrevious");
        const next = document.getElementById("certificateNext");

        const thumbnails = Array.from(
            certificateGallery.querySelectorAll(".certificate-thumbnail")
        );

        const fields = {
            category: document.getElementById("certificateCategory"),
            status: document.getElementById("certificateStatus"),
            index: document.getElementById("certificateIndex"),
            title: document.getElementById("certificateTitle"),
            institution: document.getElementById("certificateInstitution"),
            description: document.getElementById("certificateDescription"),
            hours: document.getElementById("certificateHours"),
            exams: document.getElementById("certificateExams"),
            score: document.getElementById("certificateScore"),
            progress: document.getElementById("certificateProgress"),
            dateLabel: document.getElementById("certificateDateLabel"),
            date: document.getElementById("certificateDate"),
            learning: document.getElementById("certificateLearning")
        };

        let currentCertificate = 0;
        let certificateChangeTimeout;

        function getStatCard(element) {
            const statGrid = certificateGallery.querySelector(
                ".certificate-stat-grid"
            );

            if (!element || !statGrid) return null;

            let currentElement = element;

            while (
                currentElement.parentElement &&
                currentElement.parentElement !== statGrid
            ) {
                currentElement = currentElement.parentElement;
            }

            return currentElement.parentElement === statGrid
                ? currentElement
                : null;
        }

        function showCertificate(index) {
            if (!image) return;

            currentCertificate =
                (index + certificates.length) % certificates.length;

            const certificate = certificates[currentCertificate];

            window.clearTimeout(certificateChangeTimeout);

            image.classList.add("changing");

            certificateChangeTimeout = window.setTimeout(() => {

                image.src = certificate.image;
                image.alt = certificate.alt;

                Object.entries(fields).forEach(([key, element]) => {
                    if (!element) return;

                    const value = certificate[key];

                    if (key === "exams" || key === "score") {
                        const statCard = getStatCard(element);

                        if (statCard) {
                            statCard.hidden = value === null;
                        }
                    }

                    element.textContent = value ?? "";
                });

                if (counter) {
                    counter.textContent =
                        `${String(currentCertificate + 1).padStart(2, "0")} / ${String(certificates.length).padStart(2, "0")}`;
                }

                thumbnails.forEach((thumbnail, thumbnailIndex) => {
                    const isActive = thumbnailIndex === currentCertificate;

                    thumbnail.classList.toggle("active", isActive);

                    if (isActive) {
                        thumbnail.setAttribute("aria-current", "true");
                    } else {
                        thumbnail.removeAttribute("aria-current");
                    }
                });

                image.classList.remove("changing");

            }, reducedMotion ? 0 : 180);
        }

        if (previous) {
            previous.addEventListener("click", () => {
                showCertificate(currentCertificate - 1);
            });
        }

        if (next) {
            next.addEventListener("click", () => {
                showCertificate(currentCertificate + 1);
            });
        }

        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener("click", () => {
                const index = Number(thumbnail.dataset.certificate);

                if (
                    Number.isInteger(index) &&
                    index >= 0 &&
                    index < certificates.length
                ) {
                    showCertificate(index);
                }
            });
        });

        showCertificate(0);
    }

    // ACTIVE NAVIGATION LINK

    const sections = document.querySelectorAll("main section[id]");
    const navigationLinks = document.querySelectorAll(".nav-links a");

    if ("IntersectionObserver" in window) {
        const sectionObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    navigationLinks.forEach(link => {
                        link.classList.toggle(
                            "active",
                            link.getAttribute("href") === `#${entry.target.id}`
                        );
                    });
                }
            });
        }, {
            rootMargin: "-35% 0px -55% 0px"
        });

        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }

});
