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
    const backButton = document.getElementById('backButton');
    
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
                        // Download or view resume (you can replace this with actual resume file)
                        console.log('Opening resume...');
                        // For now, you can replace this with actual resume download/view functionality
                        alert('Resume functionality - Replace with actual resume file URL');
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