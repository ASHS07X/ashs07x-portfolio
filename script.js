let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
});

window.addEventListener('scroll', () => {
    navbar.classList.remove('active');
    menuIcon.classList.remove('bx-x');
});

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener('click', function(e) {

        e.preventDefault();

        const target = this.getAttribute('href');

        gsap.to(window, {
            duration: 1.5,
            scrollTo:{
                y: target,
                offsetY:80
            },
            ease: "power3.inOut"
        });

        navbar.classList.remove('active');
        menuIcon.classList.remove('bx-x');

    });

});

const contactForm = document.getElementById("contact-form");

if(contactForm){
    contactForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailPattern.test(email)){
            alert("Enter a valid email address");
            return;
        }

        if(!name || !email || !message){
            alert("Please fill all required fields.");
            return;
        }

        const whatsappMessage =
`Contact Request for ASHS07X

Name: ${name}
Email: ${email}
Phone: ${phone}
Subject: ${subject}

Message:
${message}`;

        const whatsappNumber = "919043788641";

        const url =
`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

        window.open(url, "_blank");

        contactForm.reset();
    });
}

gsap.from(".home-img", {
    x: 100,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out"
});

// About Section
gsap.from(".about-content", {
    scrollTrigger: {
        trigger: ".about",
        start: "top bottom"
    },
    y: 80,
    opacity: 0,
    duration: 1
});

document.querySelectorAll(".circle-card").forEach(card => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: "top 90%"
        },
        scale: 0.8,
        opacity: 0,
        duration: 0.6
    });
});

// Contact Form
gsap.from(".contact form", {
    scrollTrigger: {
        trigger: ".contact form",
        start: "top 85%"
    },
    y: 80,
    opacity: 0,
    duration: 1
});

VanillaTilt.init(
    document.querySelectorAll(
        '.project-card, .education-card, .tool-card'
    ),
    {
        max: 12,
        speed: 400,
        glare: true,
        "max-glare": 0.15
    }
);

let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll(".navbar a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {
        const top = section.offsetTop - 150;
        const height = section.offsetHeight;
        const id = section.id;
        if(
            window.scrollY >= top &&
            window.scrollY < top + height
        ){
            current = id;
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});

const progressBar =
    document.querySelector(".scroll-progress");

if(progressBar){

    window.addEventListener("scroll", () => {

        const winScroll =
            document.documentElement.scrollTop;

        const height =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;

        const scrolled =
            (winScroll / height) * 100;

        progressBar.style.width =
            scrolled + "%";

    });

}

window.addEventListener("load", () => {
    ScrollTrigger.refresh();
});


// ===== Anime.js Hero Animations =====

anime.timeline()

.add({
    targets: '.logo',
    translateY: [-40, 0],
    opacity: [0, 1],
    duration: 800,
    easing: 'easeOutExpo'
})

.add({
    targets: '.logo span',
    scale: [0, 1],
    rotate: [-20, 0],
    duration: 700,
    easing: 'easeOutBack'
}, '-=300');

anime.timeline()

.add({
    targets: '.home-content h1',
    translateY: [50,0],
    opacity: [0,1],
    duration: 1000,
    easing: 'easeOutExpo'
})

.add({
    targets: '.home-content h3',
    translateY: [40,0],
    opacity: [0,1],
    duration: 800
}, '-=500')

.add({
    targets: '.home-content p',
    translateY: [30,0],
    opacity: [0,1],
    duration: 800
}, '-=500');

anime({
    targets: '.home .social-icons a',
    scale: [0,1],
    opacity: [0,1],
    translateY: [20,0],
    delay: anime.stagger(100),
    easing: 'easeOutBack',
    duration: 800
});

ScrollTrigger.create({
    trigger: ".skills",
    start: "top 70%",
    once: true,

    onEnter: () => {

        document
        .querySelectorAll('.circle')
        .forEach(circle => {

            anime({
                targets: { value: 0 },
                value: circle.dataset.percent,
                round: 1,
                duration: 2000,
                easing: 'easeOutExpo',

                update(anim){

                    const value =
                    anim.animations[0]
                    .currentValue;

                    circle.style.background =
                    `conic-gradient(
                        #C8A96B ${value * 3.6}deg,
                        #222 0deg
                    )`;

                    circle.querySelector('span')
                    .textContent =
                    value + '%';
                }
            });

        });

    }
});

anime({
    targets: '.home-img',
    translateY: [
        { value: -15 },
        { value: 0 }
    ],
    rotate: [
        { value: 1.5 },
        { value: -1.5 }
    ],
    duration: 5000,
    easing: 'easeInOutSine',
    direction: 'alternate',
    loop: true
});

const roles = [
    "Creative Technologist",
    "Prompt Engineer",
    "AI Enthusiast",
    "Visual Innovator",
    "Automation Builder"
];

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const text = document.querySelector(".text-animation span");

let roleIndex = 0;

function scrambleText(newText){

    let iteration = 0;

    const interval = setInterval(() => {

        text.innerText = newText
        .split("")
        .map((letter, index) => {

            if(index < iteration){
                return newText[index];
            }

            return letters[
                Math.floor(Math.random() * 26)
            ];

        })
        .join("");

        if(iteration >= newText.length){
            clearInterval(interval);
        }

        iteration += 1 / 3;

    }, 30);
}

// Initial animation
scrambleText(roles[0]);

// Change role every 3 seconds
setInterval(() => {

    roleIndex++;

    if(roleIndex >= roles.length){
        roleIndex = 0;
    }

    scrambleText(roles[roleIndex]);

}, 3000);

ScrollTrigger.create({
    trigger: ".projects",
    start: "top 75%",
    once: true,

    onEnter: () => {

        anime({
            targets: '.project-card',

            translateY: [120, 0],
            scale: [0.85, 1],

            opacity: [0, 1],

            delay: anime.stagger(180),

            duration: 1200,

            easing: 'easeOutElastic(1, .6)'
        });

    }
});

ScrollTrigger.create({
    trigger: ".experience",
    start: "top 75%",
    once: true,

    onEnter: () => {

        anime({
            targets: '.timeline-item',

            translateY: [60, 0],
            scale: [0.9, 1],

            opacity: [0, 1],

            delay: anime.stagger(150),

            duration: 1000,

            easing: 'easeOutExpo'
        });

    }
});

const glow = document.querySelector(".cursor-glow");
if(glow){
    document.addEventListener("mousemove", (e) => {
        glow.style.left = e.clientX + "px";
        glow.style.top = e.clientY + "px";
    });
}



anime({
    targets: '.particle',
    translateY: [-20, 20],
    opacity: [0.2, 0.8],
    scale: [0.8, 1.2],
    duration: 3000,
    delay: anime.stagger(300),
    direction: 'alternate',
    easing: 'easeInOutSine',
    loop: true
});

document.querySelectorAll(".heading").forEach(heading => {

    ScrollTrigger.create({
        trigger: heading,
        start: "top 85%",
        once: true,

        onEnter: () => {

            anime({
                targets: heading,

                translateY: [50, 0],
                opacity: [0, 1],

                duration: 1000,

                easing: "easeOutExpo"
            });

        }
    });

});

ScrollTrigger.create({
    trigger: ".tools-grid",
    start: "top 80%",
    once: true,

    onEnter: () => {

        anime({
            targets: '.tool-card',

            translateY: [40, 0],
            scale: [0.9, 1],

            opacity: [0, 1],

            delay: anime.stagger(70),

            duration: 800,

            easing: 'easeOutExpo'
        });

    }
});

ScrollTrigger.create({
    trigger: ".education-container",
    start: "top 80%",
    once: true,

    onEnter: () => {

        anime({
            targets: '.education-card',

            translateY: [60, 0],
            opacity: [0, 1],

            delay: anime.stagger(200),

            duration: 1000,

            easing: 'easeOutExpo'
        });

    }
});

const finalText = "ASHS07X";
const decodeLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

const decode = document.querySelector(".decode-text");
const logo = document.querySelector(".loader-logo");

if (decode && logo) {

    let iteration = 0;

    const scramble = setInterval(() => {

        decode.innerText = finalText
            .split("")
            .map((letter, index) => {

                if (index < iteration) {
                    return finalText[index];
                }

                return decodeLetters[
                    Math.floor(
                        Math.random() * decodeLetters.length
                    )
                ];

            })
            .join("");

        iteration += 1 / 3;

        if (iteration >= finalText.length) {

            clearInterval(scramble);

            anime.timeline()
                .add({
                    targets: '.decode-text',
                    translateY: 80,
                    duration: 800,
                    easing: 'easeOutExpo'
                })
                .add({
                    targets: '.loader-logo',
                    opacity: [0, 1],
                    scale: [0, 1],
                    translateY: [-50, 0],
                    rotate: ['-15deg', '0deg'],
                    duration: 1200,
                    easing: 'easeOutElastic(1, .6)'
                }, '-=200')
                .add({
                    duration: 1000
                })
                .add({
                    targets: [
                        '.loader-logo',
                        '.decode-text'
                    ],
                    opacity: 0,
                    duration: 800,
                    easing: 'easeOutExpo'
                })
                .add({
                    targets: '#loader',
                    opacity: 0,
                    duration: 500,
                    easing: 'easeOutExpo'
                })
                .finished.then(() => {

                    const loader =
                        document.getElementById('loader');

                    if(loader){
                        loader.style.display = 'none';
                    }

                });

        }

    }, 50);

}