document.addEventListener('DOMContentLoaded', function() {
    // Animation au défilement
    const animateElements = document.querySelectorAll('.animate-left, .animate-right, .animate-up');
    
    const animateOnScroll = function() {
        animateElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.animationPlayState = 'running';
            }
        });
    };
    
    // Animation initiale
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
    
    // Gestion des liens actifs
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');
    
    function updateActiveLink() {
        let current = '';
        const scrollPosition = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = sectionId;
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
                
                // Faire défiler le lien actif au centre si possible
                link.scrollIntoView({
                    block: 'nearest',
                    inline: 'center',
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // Smooth scrolling pour les ancres
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 120,
                    behavior: 'smooth'
                });
                
                // Mettre à jour l'URL sans recharger la page
                history.pushState(null, null, targetId);
            }
        });
    });
    
    // Mettre à jour les liens actifs au chargement et au scroll
    updateActiveLink();
    window.addEventListener('scroll', updateActiveLink);
    
    // Gestion du formulaire de contact
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            this.submit();
        });
    }
    
    // Effet de flottement pour l'image de profil
    const profileImage = document.querySelector('.home-image img');
    if (profileImage) {
        setInterval(() => {
            profileImage.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                profileImage.style.transform = 'translateY(0)';
            }, 1500);
        }, 3000);
    }
    
    // Gestion du scroll horizontal sur mobile
    const navScroll = document.querySelector('.nav-links');
    if (navScroll) {
        let isDown = false;
        let startX;
        let scrollLeft;
        
        navScroll.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - navScroll.offsetLeft;
            scrollLeft = navScroll.scrollLeft;
        });
        
        navScroll.addEventListener('mouseleave', () => {
            isDown = false;
        });
        
        navScroll.addEventListener('mouseup', () => {
            isDown = false;
        });
        
        navScroll.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - navScroll.offsetLeft;
            const walk = (x - startX) * 2;
            navScroll.scrollLeft = scrollLeft - walk;
        });
        
        // Pour les écrans tactiles
        navScroll.addEventListener('touchstart', (e) => {
            isDown = true;
            startX = e.touches[0].pageX - navScroll.offsetLeft;
            scrollLeft = navScroll.scrollLeft;
        });
        
        navScroll.addEventListener('touchend', () => {
            isDown = false;
        });
        
        navScroll.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            const x = e.touches[0].pageX - navScroll.offsetLeft;
            const walk = (x - startX) * 2;
            navScroll.scrollLeft = scrollLeft - walk;
        });
    }
});

//animation  d'ecriture de clovis fika
  document.addEventListener('DOMContentLoaded', function() {
    const nameElement = document.getElementById('animated-name');
    const cursorElement = document.getElementById('cursor');
    const fullName = "Clovis Finka";
    let i = 0;
    let isDeleting = false;
    let speed = 150; // Vitesse de base (ms)

    function animateName() {
      const currentText = nameElement.innerHTML;
      
      if (!isDeleting && i < fullName.length) {
        // Phase d'écriture
        nameElement.innerHTML = fullName.substring(0, i + 1);
        i++;
        speed = 150; // Vitesse d'écriture
      } else if (isDeleting && i > 0) {
        // Phase d'effacement
        nameElement.innerHTML = fullName.substring(0, i - 1);
        i--;
        speed = 75; // Vitesse d'effacement (plus rapide)
      }

      // Changer de phase
      if (i === fullName.length) {
        isDeleting = true;
        speed = 1000; // Pause à la fin
      } else if (i === 0 && isDeleting) {
        isDeleting = false;
        speed = 500; // Pause au début
      }

      setTimeout(animateName, speed);
    }

    // Animation du curseur (cercle)
    function animateCursor() {
      cursorElement.style.opacity = cursorElement.style.opacity === '0' ? '1' : '0';
      setTimeout(animateCursor, 500);
    }

    // Démarrer les animations
    animateName();
    animateCursor();
  });