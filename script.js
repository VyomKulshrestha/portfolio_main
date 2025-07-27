document.addEventListener('DOMContentLoaded', function() {
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
    const experienceScreen = document.getElementById('experienceScreen');
    const skillsScreen = document.getElementById('skillsScreen');
    const educationScreen = document.getElementById('educationScreen');
    const contactScreen = document.getElementById('contactScreen');
    const backButton = document.getElementById('backButton');
    const projectsBackButton = document.getElementById('projectsBackButton');
    const experienceBackButton = document.getElementById('experienceBackButton');
    const skillsBackButton = document.getElementById('skillsBackButton');
    const educationBackButton = document.getElementById('educationBackButton');
    const contactBackButton = document.getElementById('contactBackButton');
    
    appIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const app = this.getAttribute('data-app');
            console.log(`Clicked on ${app} app`);
            
            // Handle about app specifically
            if (app === 'about') {
                // Hide the android home screen
                androidHome.classList.add('hide');
                
                // Show the about screen after a short delay
                setTimeout(() => {
                    aboutScreen.classList.add('show');
                }, 200);
            }
            
            // Handle projects app specifically
            if (app === 'projects') {
                // Hide the android home screen
                androidHome.classList.add('hide');
                
                // Show the projects screen after a short delay
                setTimeout(() => {
                    projectsScreen.classList.add('show');
                }, 200);
            }
            
            // Handle experience app specifically
            if (app === 'experience') {
                // Hide the android home screen
                androidHome.classList.add('hide');
                
                // Show the experience screen after a short delay
                setTimeout(() => {
                    experienceScreen.classList.add('show');
                }, 200);
            }
            
            // Handle skills app specifically
            if (app === 'skills') {
                // Hide the android home screen
                androidHome.classList.add('hide');
                
                // Show the skills screen after a short delay
                setTimeout(() => {
                    skillsScreen.classList.add('show');
                }, 200);
            }
            
            // Handle education app specifically
            if (app === 'education') {
                // Hide the android home screen
                androidHome.classList.add('hide');
                
                // Show the education screen after a short delay
                setTimeout(() => {
                    educationScreen.classList.add('show');
                }, 200);
            }
            
            // Handle contact app specifically
            if (app === 'contact') {
                // Hide the android home screen
                androidHome.classList.add('hide');
                
                // Show the contact screen after a short delay
                setTimeout(() => {
                    contactScreen.classList.add('show');
                }, 200);
            }
            
            // Add other app opening functionality here for other apps
        });
    });
    
    // Back button click handler for about screen
    backButton.addEventListener('click', function() {
        // Hide the about screen
        aboutScreen.classList.remove('show');
        
        // Show the android home screen after transition
        setTimeout(() => {
            androidHome.classList.remove('hide');
        }, 200);
        
        console.log('Back button clicked! Returning to home screen...');
    });
    
    // Back button click handler for projects screen
    projectsBackButton.addEventListener('click', function() {
        // Hide the projects screen
        projectsScreen.classList.remove('show');
        
        // Show the android home screen after transition
        setTimeout(() => {
            androidHome.classList.remove('hide');
        }, 200);
        
        console.log('Projects back button clicked! Returning to home screen...');
    });
    
    // Back button click handler for experience screen
    experienceBackButton.addEventListener('click', function() {
        // Hide the experience screen
        experienceScreen.classList.remove('show');
        
        // Show the android home screen after transition
        setTimeout(() => {
            androidHome.classList.remove('hide');
        }, 200);
        
        console.log('Experience back button clicked! Returning to home screen...');
    });
    
    // Back button click handler for skills screen
    skillsBackButton.addEventListener('click', function() {
        // Hide the skills screen
        skillsScreen.classList.remove('show');
        
        // Show the android home screen after transition
        setTimeout(() => {
            androidHome.classList.remove('hide');
        }, 200);
        
        console.log('Skills back button clicked! Returning to home screen...');
    });
    
    // Back button click handler for education screen
    educationBackButton.addEventListener('click', function() {
        // Hide the education screen
        educationScreen.classList.remove('show');
        
        // Show the android home screen after transition
        setTimeout(() => {
            androidHome.classList.remove('hide');
        }, 200);
        
        console.log('Education back button clicked! Returning to home screen...');
    });
    
    // Back button click handler for contact screen
    contactBackButton.addEventListener('click', function() {
        // Hide the contact screen
        contactScreen.classList.remove('show');
        
        // Show the android home screen after transition
        setTimeout(() => {
            androidHome.classList.remove('hide');
        }, 200);
        
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
                    window.open('https://www.linkedin.com/in/vyomkulshrestha/', '_blank');
                    break;
                case 'github':
                    // Open GitHub profile
                    window.open('https://github.com/VyomKulshrestha', '_blank');
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
                        window.open('https://github.com/VyomKulshrestha', '_blank');
                        break;
                    case 'linkedin':
                        // Open LinkedIn profile
                        window.open('https://www.linkedin.com/in/vyomkulshrestha/', '_blank');
                        break;
                    case 'resume':
                        // Open resume from Google Drive
                        window.open('https://drive.google.com/file/d/1Syq6FJIsDP8lMt55NYYYUnDKJG_6igzi/view', '_blank');
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
