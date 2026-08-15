document.addEventListener('DOMContentLoaded', function() {
    const openExternal = (url) => window.open(url, '_blank', 'noopener,noreferrer');

    document.querySelectorAll('a[target="_blank"]').forEach(link => {
        link.setAttribute('rel', 'noopener noreferrer');
    });

    document.querySelectorAll('.app-icon, .dock-icon, .contact-card').forEach(control => {
        control.setAttribute('role', 'button');
        control.setAttribute('tabindex', '0');
        control.addEventListener('keydown', event => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                control.click();
            }
        });
    });

    const powerButton = document.getElementById('powerButton');
    const androidScreen = document.getElementById('androidScreen');
    const lockScreen = document.getElementById('lockScreen');
    const androidHome = document.getElementById('androidHome');
    
    // Update time and date
    function updateDateTime() {
        const now = new Date();
        
        // Format time (24-hour format)
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const timeString = `${hours}:${minutes}`;
        
        // Format date
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                       'July', 'August', 'September', 'October', 'November', 'December'];
        
        const dayName = days[now.getDay()];
        const monthName = months[now.getMonth()];
        const date = now.getDate();
        const dateString = `${dayName}, ${monthName} ${date}`;
        
        // Update DOM elements
        document.getElementById('currentTime').textContent = timeString;
        document.getElementById('currentDay').textContent = dateString;
        
        // Update status bar time
        const statusTimeElement = document.getElementById('statusTime');
        if (statusTimeElement) {
            statusTimeElement.textContent = timeString;
        }
    }
    
    // Update time immediately and then every minute
    updateDateTime();
    setInterval(updateDateTime, 60000);
    
    powerButton.addEventListener('click', function() {
        // Hide the power button with animation
        powerButton.classList.add('hide');
        
        // Show the Android screen after a short delay
        setTimeout(() => {
            androidScreen.classList.add('show');
            
            // After Android loading animation (4 seconds), show lock screen
            setTimeout(() => {
                androidScreen.classList.add('hide');
                setTimeout(() => {
                    lockScreen.classList.add('show');
                }, 500);
            }, 4000);
            
        }, 300);
        
        console.log('Power button clicked! Booting up...');
    });
    
    // Lock screen unlock functionality
    lockScreen.addEventListener('click', function() {
        // Hide lock screen
        lockScreen.classList.add('hide');
        
        // Show Android home screen after transition
        setTimeout(() => {
            androidHome.classList.add('show');
        }, 300);
        
        console.log('Lock screen unlocked! Showing home screen...');
    });
    
    // App icon click handlers
    const appIcons = document.querySelectorAll('.app-icon');
    const aboutScreen = document.getElementById('aboutScreen');
    const projectsScreen = document.getElementById('projectsScreen');
    const publicationsScreen = document.getElementById('publicationsScreen');
    const experienceScreen = document.getElementById('experienceScreen');
    const skillsScreen = document.getElementById('skillsScreen');
    const educationScreen = document.getElementById('educationScreen');
    const contactScreen = document.getElementById('contactScreen');
    const backButton = document.getElementById('backButton');
    const projectsBackButton = document.getElementById('projectsBackButton');
    const publicationsBackButton = document.getElementById('publicationsBackButton');
    const experienceBackButton = document.getElementById('experienceBackButton');
    const skillsBackButton = document.getElementById('skillsBackButton');
    const educationBackButton = document.getElementById('educationBackButton');
    const contactBackButton = document.getElementById('contactBackButton');

    const appScreens = {
        about: aboutScreen,
        projects: projectsScreen,
        publications: publicationsScreen,
        experience: experienceScreen,
        skills: skillsScreen,
        education: educationScreen,
        contact: contactScreen
    };

    function openScreen(screen) {
        if (!screen) return;
        androidHome.classList.add('hide');
        screen.classList.remove('closing');
        setTimeout(() => screen.classList.add('show'), 120);
    }

    function closeScreen(screen) {
        if (!screen) return;
        screen.classList.add('closing');
        setTimeout(() => androidHome.classList.remove('hide'), 100);
        setTimeout(() => screen.classList.remove('show', 'closing'), 500);
    }
    
    appIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const app = this.getAttribute('data-app');
            console.log(`Clicked on ${app} app`);

            openScreen(appScreens[app]);
        });
    });
    
    // Back button click handler for about screen
    backButton.addEventListener('click', function() {
        closeScreen(aboutScreen);
        console.log('Back button clicked! Returning to home screen...');
    });
    
    // Back button click handler for projects screen
    projectsBackButton.addEventListener('click', function() {
        closeScreen(projectsScreen);
        console.log('Projects back button clicked! Returning to home screen...');
    });

    // Back button click handler for publications screen
    publicationsBackButton.addEventListener('click', function() {
        closeScreen(publicationsScreen);
        console.log('Publications back button clicked! Returning to home screen...');
    });
    
    // Back button click handler for experience screen
    experienceBackButton.addEventListener('click', function() {
        closeScreen(experienceScreen);
        console.log('Experience back button clicked! Returning to home screen...');
    });
    
    // Back button click handler for skills screen
    skillsBackButton.addEventListener('click', function() {
        closeScreen(skillsScreen);
        console.log('Skills back button clicked! Returning to home screen...');
    });
    
    // Back button click handler for education screen
    educationBackButton.addEventListener('click', function() {
        closeScreen(educationScreen);
        console.log('Education back button clicked! Returning to home screen...');
    });
    
    // Back button click handler for contact screen
    contactBackButton.addEventListener('click', function() {
        closeScreen(contactScreen);
        console.log('Contact back button clicked! Returning to home screen...');
    });
    
    // Contact card click handlers
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach(card => {
        card.addEventListener('click', function() {
            const contactType = this.getAttribute('data-contact');
            console.log(`Clicked on ${contactType} contact`);
            
            // Handle specific contact actions
            switch (contactType) {
                case 'email':
                    // Open email client with pre-filled email
                    window.location.href = 'mailto:vyomkulshrestha2004@gmail.com';
                    break;
                case 'linkedin':
                    // Open LinkedIn profile
                    openExternal('https://www.linkedin.com/in/vyomkulshrestha/');
                    break;
                case 'github':
                    // Open GitHub profile
                    openExternal('https://github.com/VyomKulshrestha');
                    break;
                default:
                    console.log(`No action defined for ${contactType}`);
            }
        });
    });
    
    // Dock icon click handlers
    const dockIcons = document.querySelectorAll('.dock-icon');
    dockIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const app = this.getAttribute('data-app');
            if (app) {
                console.log(`Clicked on dock ${app}`);
                
                // Handle specific dock app actions
                switch (app) {
                    case 'github':
                        // Open GitHub profile
                        openExternal('https://github.com/VyomKulshrestha');
                        break;
                    case 'linkedin':
                        // Open LinkedIn profile
                        openExternal('https://www.linkedin.com/in/vyomkulshrestha/');
                        break;
                    case 'resume':
                        // Open resume from Google Drive
                        openExternal('https://drive.google.com/file/d/1ceyaaEz2zKI-Nfn6D7tIUXouDyInk5xm/view?usp=sharing');
                        break;
                    default:
                        console.log(`No action defined for ${app}`);
                }
            }
        });
    });
    
    // Add some visual feedback on click for power button
    powerButton.addEventListener('mousedown', function() {
        if (!this.classList.contains('hide')) {
            this.style.transform = 'scale(0.95)';
        }
    });
    
    powerButton.addEventListener('mouseup', function() {
        if (!this.classList.contains('hide')) {
            this.style.transform = 'scale(1.05)';
        }
    });
    
    powerButton.addEventListener('mouseleave', function() {
        if (!this.classList.contains('hide')) {
            this.style.transform = 'scale(1)';
        }
    });
}); 
