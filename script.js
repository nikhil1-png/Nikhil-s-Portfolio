// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Add active class to navigation links on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Form submission handler
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

// Resume button handler
const resumeBtn = document.querySelector('.resume-btn');
if (resumeBtn) {
    resumeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        // You can add your resume link here
        alert('Resume download will be available soon!');
    });
}

// Copy to clipboard functionality
function copyToClipboard(text, type) {
    navigator.clipboard.writeText(text).then(() => {
        const button = event.target.closest('.copy-btn');
        const originalHTML = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i>';
        button.style.color = '#4CAF50';
        
        setTimeout(() => {
            button.innerHTML = originalHTML;
            button.style.color = '';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
        alert('Failed to copy to clipboard');
    });
}

// Project data
const projectsData = [
    {
        name: "Summer's Project: Ecoshop",
        coverImage: "cover1.jpg",
        overview: "This project was part of the Summer Program with E-Cell IIT Guwahati, where we worked on a real-world problem for EcoShop India, a sustainable e-commerce startup focused on Gen Z. The goal was to tackle a major decline in user engagement by identifying gaps in the user experience and designing solutions that could boost retention and repeat purchases.",
        about: "As the Product Manager, I led the end-to-end process from user research and persona analysis to mapping the complete user journey. After pinpointing key friction points, I designed an interactive prototype featuring a streamlined and intuitive user flow aligned with EcoShop's eco-friendly brand values. The project concluded with a fully clickable prototype and a detailed pitch deck highlighting design, technical considerations, and sustainability-first features. The final outcome offered a practical, growth-focused approach to help EcoShop regain user interest and drive long-term engagement.",
        caseStudyLink: "https://drive.google.com/drive/folders/1b1IPqWJ8qyhsJcwWfuBfL2Yv9OuUAuyI"
    },
    {
        name: "Swiggy's Food Challenge",
        coverImage: "cover2.jpg",
        overview: "Participated in the Swiggy Food for Thought Challenge to redesign Swiggy as the default food companion for campus life not just for delivery, but for every meal, snack break, and hangout moment. The project focused on driving preference among students and creating sticky, rewarding experiences that bring them back daily.",
        about: "As a Product Strategist, I built solutions centered around affordability, accessibility, variety, personalization, and student-first innovation. The work included conceptualizing smart pre-ordering, a multi-restaurant cart system, campus food communities, and additional value driven features like late night Auto Dark Mode, personalized deals, and festival partnerships. The project delivered a set of high-impact, student-focused features designed to increase engagement, trust, and repeat usage across campus audiences.",
        caseStudyLink: "https://drive.google.com/file/d/1A4fIXwWZpa7NmSA6BFEuhPYl6wxKbiCp/view"
    },
    {
        name: "Investor's Den'25",
        coverImage: "cover3.jpg",
        overview: "Investor's Den '25 is a venture capital simulation by E-Cell IIT Roorkee where participants act as an internal VC team tasked with selecting a startup from the Y Combinator Spring 2025 batch. With a virtual budget of $1M, teams prepare a full investment memo and pitch deck to justify their investment decision. My team selected Partcl, an AI-driven semiconductor design company founded by former Nvidia and Apple engineers.",
        about: "For this project, I conducted an indepth evaluation of Partcl's product stack Boson and Graviton AI-powered tools that accelerate chip design by 100–700x. I analyzed the semiconductor market landscape, validated the problem-solution fit, assessed business and revenue models, and benchmarked competitors. Using VC frameworks such as TAM-SAM-SOM, SWOT, and Porter's Five Forces, I built a structured investment thesis highlighting Partcl's potential to become a modern design engine for next-generation semiconductor development. The final output included a detailed investment memo and a pitch deck presented live during the final round.",
        caseStudyLink: "https://drive.google.com/drive/folders/1BtxMaeCHYjIgpnq1Pb9uXT9WcmoKs_zW",
        buttonText: "View Pitch Deck"
    },
    {
        name: "Project 4",
        coverImage: "project4-cover.jpg",
        overview: "Project 4 is a comprehensive solution that addresses multiple aspects of a complex problem. It features a robust architecture, clean code, and excellent user experience. The project demonstrates mastery of various technologies and methodologies.",
        about: "The creation of Project 4 involved extensive research and development. Throughout the process, we focused on creating something meaningful that would have a positive impact. The project reflects dedication to quality and excellence."
    }
];

// Open project modal
function openProjectModal(projectIndex) {
    const project = projectsData[projectIndex];
    const modal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('modalProjectName');
    const modalImage = document.getElementById('modalProjectImage');
    const modalOverview = document.getElementById('modalProjectOverview');
    const modalAbout = document.getElementById('modalProjectAbout');
    const modalCaseStudyLink = document.getElementById('modalCaseStudyLink');
    const caseStudyButton = document.querySelector('.case-study-button');
    const modalButtonText = document.getElementById('modalButtonText');

    if (project && modal) {
        modalTitle.textContent = project.name;
        modalImage.src = project.coverImage;
        modalImage.onerror = function() {
            // Try PNG version if JPG fails
            const pngVersion = project.coverImage.replace('.jpg', '.png');
            this.src = pngVersion;
            this.onerror = function() {
                this.src = `https://via.placeholder.com/600x400?text=${encodeURIComponent(project.name)}`;
            };
        };
        modalOverview.textContent = project.overview;
        modalAbout.textContent = project.about;
        
        // Show/hide case study button based on whether project has a case study
        if (project.caseStudyLink && modalCaseStudyLink && caseStudyButton) {
            modalCaseStudyLink.href = project.caseStudyLink;
            // Update button text if specified, otherwise default to "View Case Study"
            if (modalButtonText) {
                modalButtonText.textContent = project.buttonText || "View Case Study";
            }
            caseStudyButton.classList.add('show');
        } else if (caseStudyButton) {
            caseStudyButton.classList.remove('show');
        }
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        
        // Scroll modal content to top
        const modalBody = modal.querySelector('.project-modal-body');
        if (modalBody) {
            modalBody.scrollTop = 0;
        }
    }
}

// Close project modal
function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
}

// Add click handlers to project cards
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            const projectIndex = parseInt(this.getAttribute('data-project'));
            openProjectModal(projectIndex);
        });
    });

    // Close modal when clicking outside of it
    const modal = document.getElementById('projectModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeProjectModal();
            }
        });
    }

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeProjectModal();
        }
    });
});

