
        // Register GSAP ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger);

        // Initialize GSAP animations
        document.addEventListener('DOMContentLoaded', function() {
            // Set initial states for animated elements
            gsap.set('.fade-in', { opacity: 0, y: 50 });
            gsap.set('.slide-in-left', { opacity: 0, x: -100 });
            gsap.set('.slide-in-right', { opacity: 0, x: 100 });
            gsap.set('.scale-in', { opacity: 0, scale: 0.8 });
            gsap.set('.skill-bar', { width: '0%' });

            // Create particle system
            createParticleSystem();

            // Add matrix rain effect
            createMatrixRain();

            // Hero section animations - immediate on load
            const heroElements = document.querySelectorAll('#home .fade-in');
            gsap.to(heroElements, {
                duration: 1.2,
                y: 0,
                opacity: 1,
                stagger: 0.3,
                ease: "power3.out",
                delay: 0.5
            });

            // Floating shapes continuous animation
            gsap.to('.shape', {
                y: -100,
                rotation: 360,
                duration: 20,
                repeat: -1,
                ease: "none",
                stagger: {
                    each: 2,
                    repeat: -1
                }
            });

            // Scroll-triggered animations for fade-in elements (excluding hero)
            gsap.utils.toArray('.fade-in').forEach((element, index) => {
                // Skip hero elements as they're already animated
                if (!element.closest('#home')) {
                    ScrollTrigger.create({
                        trigger: element,
                        start: "top 85%",
                        onEnter: () => {
                            gsap.to(element, {
                                opacity: 1,
                                y: 0,
                                duration: 1,
                                ease: "power2.out"
                            });
                        }
                    });
                }
            });

            // Slide in left animations
            gsap.utils.toArray('.slide-in-left').forEach(element => {
                ScrollTrigger.create({
                    trigger: element,
                    start: "top 85%",
                    onEnter: () => {
                        gsap.to(element, {
                            opacity: 1,
                            x: 0,
                            duration: 1.2,
                            ease: "power3.out"
                        });
                    }
                });
            });

            // Slide in right animations
            gsap.utils.toArray('.slide-in-right').forEach(element => {
                ScrollTrigger.create({
                    trigger: element,
                    start: "top 85%",
                    onEnter: () => {
                        gsap.to(element, {
                            opacity: 1,
                            x: 0,
                            duration: 1.2,
                            ease: "power3.out"
                        });
                    }
                });
            });

            // Scale in animations
            gsap.utils.toArray('.scale-in').forEach(element => {
                ScrollTrigger.create({
                    trigger: element,
                    start: "top 85%",
                    onEnter: () => {
                        gsap.to(element, {
                            opacity: 1,
                            scale: 1,
                            duration: 1,
                            ease: "back.out(1.7)"
                        });
                    }
                });
            });

            // Skill bars animation
            gsap.utils.toArray('.skill-bar').forEach(bar => {
                const width = bar.getAttribute('data-width');
                ScrollTrigger.create({
                    trigger: bar,
                    start: "top 85%",
                    onEnter: () => {
                        gsap.to(bar, {
                            width: width,
                            duration: 1.5,
                            ease: "power2.out"
                        });
                    }
                });
            });

            // Card hover animations
            gsap.utils.toArray('.card-hover').forEach(card => {
                card.addEventListener('mouseenter', () => {
                    gsap.to(card, {
                        y: -10,
                        scale: 1.02,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                });

                card.addEventListener('mouseleave', () => {
                    gsap.to(card, {
                        y: 0,
                        scale: 1,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                });
            });

            // Navigation smooth scroll
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        const targetPosition = target.offsetTop - 80;
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                });
            });

            // Parallax effect for hero background
            ScrollTrigger.create({
                trigger: "#home",
                start: "top bottom",
                end: "bottom top",
                scrub: true,
                onUpdate: (self) => {
                    const progress = self.progress;
                    gsap.set('#home .absolute', {
                        yPercent: -50 * progress
                    });
                }
            });

            // Refresh ScrollTrigger after everything is set up
            ScrollTrigger.refresh();
        });

        // Particle System Function
        function createParticleSystem() {
            const particleContainer = document.querySelector('.particles');
            const particleCount = 50;

            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                
                // Random positioning and timing
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 15 + 's';
                particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
                
                // Random colors
                const colors = ['#a855f7', '#ec4899', '#8b5cf6', '#f97316'];
                particle.style.background = colors[Math.floor(Math.random() * colors.length)];
                
                particleContainer.appendChild(particle);
            }
        }

        // Matrix Rain Effect Function
        function createMatrixRain() {
            const matrixContainer = document.createElement('div');
            matrixContainer.className = 'matrix-rain';
            document.querySelector('#skills').appendChild(matrixContainer);

            const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
            
            function createMatrixChar() {
                const char = document.createElement('div');
                char.className = 'matrix-char';
                char.textContent = chars[Math.floor(Math.random() * chars.length)];
                char.style.left = Math.random() * 100 + '%';
                char.style.animationDuration = (Math.random() * 2 + 1) + 's';
                
                matrixContainer.appendChild(char);
                
                setTimeout(() => {
                    char.remove();
                }, 3000);
            }
            
            setInterval(createMatrixChar, 200);
        }

        // Text Scramble Effect
        function scrambleText(element, finalText) {
            const chars = '!<>-_\\/[]{}—=+*^?#________';
            let iteration = 0;
            
            const interval = setInterval(() => {
                element.textContent = finalText
                    .split('')
                    .map((letter, index) => {
                        if (index < iteration) {
                            return finalText[index];
                        }
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join('');
                
                if (iteration >= finalText.length) {
                    clearInterval(interval);
                }
                
                iteration += 1 / 3;
            }, 30);
        }

        // Magnetic Effect for buttons
        function addMagneticEffect() {
            const buttons = document.querySelectorAll('a, button');
            
            buttons.forEach(button => {
                button.addEventListener('mousemove', (e) => {
                    const rect = button.getBoundingClientRect();
                    const x = e.clientX - rect.left - rect.width / 2;
                    const y = e.clientY - rect.top - rect.height / 2;
                    
                    gsap.to(button, {
                        x: x * 0.1,
                        y: y * 0.1,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                });
                
                button.addEventListener('mouseleave', () => {
                    gsap.to(button, {
                        x: 0,
                        y: 0,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                });
            });
        }

        // Initialize magnetic effect
        setTimeout(addMagneticEffect, 1000);

        // Mobile menu toggle
        const mobileMenuBtn = document.getElementById('mobile-menu');
        mobileMenuBtn.addEventListener('click', () => {
            alert('Mobile menu would open here!');
        });

        // Contact form submission
        document.getElementById('contact-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            if (name && email && message) {
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                gsap.to(submitBtn, {
                    scale: 0.95,
                    duration: 0.1,
                    yoyo: true,
                    repeat: 1
                });
                
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    alert('Thank you for your message! I\'ll get back to you soon.');
                    this.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 1500);
            } else {
                alert('Please fill in all fields.');
            }
        });


        // 
        // 
        // 

   (function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'9752619f91dfa725',t:'MTc1NjIwMTM3MC4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();