document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const powerButton = document.getElementById('powerButton');
    const powerCopy = document.querySelector('.power-copy');
    const androidScreen = document.getElementById('androidScreen');
    const lockScreen = document.getElementById('lockScreen');
    const androidHome = document.getElementById('androidHome');
    const statusBar = document.getElementById('statusBar');
    const notificationShade = document.getElementById('notificationShade');
    const shadeClose = document.getElementById('shadeClose');
    const recentsScreen = document.getElementById('recentsScreen');
    const recentStack = document.getElementById('recentStack');
    const clearRecents = document.getElementById('clearRecents');
    const powerMenu = document.getElementById('powerMenu');
    const powerMenuBackdrop = document.getElementById('powerMenuBackdrop');
    const sleepButton = document.getElementById('sleepButton');
    const systemNavigation = document.getElementById('systemNavigation');
    const homeWidget = document.getElementById('homeWidget');
    const systemToast = document.getElementById('systemToast');
    const brightnessSlider = document.getElementById('brightnessSlider');
    const shadeTime = document.getElementById('shadeTime');
    const shadeDate = document.getElementById('shadeDate');

    const appMeta = {
        about: { label: 'About', detail: 'Founder profile and engineering focus' },
        projects: { label: 'Projects', detail: 'Current open-source systems' },
        publications: { label: 'Research', detail: 'Kernel safety evidence and paper' },
        skills: { label: 'Skills', detail: 'Systems, AI, Rust, and product engineering' },
        experience: { label: 'Experience', detail: 'Current roles and open-source leadership' },
        education: { label: 'Education', detail: 'VIT and project-driven learning' },
        contact: { label: 'Contact', detail: 'Collaboration and engineering opportunities' }
    };

    const screenByApp = {
        about: document.getElementById('aboutScreen'),
        projects: document.getElementById('projectsScreen'),
        publications: document.getElementById('publicationsScreen'),
        skills: document.getElementById('skillsScreen'),
        experience: document.getElementById('experienceScreen'),
        education: document.getElementById('educationScreen'),
        contact: document.getElementById('contactScreen')
    };

    let toastTimer;
    let swipeStartY = null;
    let recentApps = [];

    try {
        recentApps = JSON.parse(sessionStorage.getItem('portfolioRecentApps') || '[]')
            .filter(app => appMeta[app])
            .slice(0, 4);
    } catch (error) {
        recentApps = [];
    }

    const vibrate = duration => {
        if ('vibrate' in navigator) navigator.vibrate(duration);
    };

    const showToast = message => {
        clearTimeout(toastTimer);
        systemToast.textContent = message;
        systemToast.classList.add('show');
        toastTimer = setTimeout(() => systemToast.classList.remove('show'), 2200);
    };

    const setOverlay = (element, isOpen) => {
        element.classList.toggle('open', isOpen);
        element.setAttribute('aria-hidden', String(!isOpen));
    };

    const closeSystemOverlays = () => {
        setOverlay(notificationShade, false);
        setOverlay(recentsScreen, false);
        setOverlay(powerMenu, false);
    };

    const currentApp = () => Object.entries(screenByApp)
        .find(([, screen]) => screen.classList.contains('show'))?.[0] || null;

    const closeCurrentAppImmediately = () => {
        Object.values(screenByApp).forEach(screen => screen.classList.remove('show', 'closing'));
        androidHome.classList.remove('hide');
    };

    const rememberApp = app => {
        if (!appMeta[app]) return;
        recentApps = [app, ...recentApps.filter(item => item !== app)].slice(0, 4);
        try {
            sessionStorage.setItem('portfolioRecentApps', JSON.stringify(recentApps));
        } catch (error) {
            // The interaction still works when storage is unavailable.
        }
    };

    const renderRecents = () => {
        if (!recentApps.length) {
            recentStack.innerHTML = '<div class="recents-empty">Open an app and it will appear here.</div>';
            return;
        }

        recentStack.innerHTML = recentApps.map((app, index) => {
            const meta = appMeta[app];
            return `<button class="recent-card" type="button" data-recent-app="${app}" style="animation-delay:${index * 55}ms">
                <span>APP ${String(index + 1).padStart(2, '0')}</span>
                <strong>${meta.label}</strong>
                <small>${meta.detail}</small>
            </button>`;
        }).join('');
    };

    const openAppFromSystem = app => {
        if (!appMeta[app]) return;
        closeSystemOverlays();
        closeCurrentAppImmediately();
        const icon = document.querySelector(`.app-icon[data-app="${app}"]`);
        icon?.click();
        rememberApp(app);
    };

    const unlockState = () => {
        body.classList.add('device-active');
        body.classList.remove('device-locked', 'device-is-off');
        powerCopy.textContent = 'Press to power on';
    };

    const sleepDevice = () => {
        closeSystemOverlays();
        closeCurrentAppImmediately();
        androidHome.classList.remove('show', 'hide');
        androidScreen.classList.remove('show');
        androidScreen.classList.add('hide');
        lockScreen.classList.remove('hide');
        lockScreen.classList.add('show');
        body.classList.add('device-active', 'device-locked');
        vibrate(18);
        setTimeout(() => lockScreen.focus(), 120);
    };

    const restartDevice = () => {
        closeSystemOverlays();
        closeCurrentAppImmediately();
        androidHome.classList.remove('show', 'hide');
        lockScreen.classList.remove('show', 'hide');
        powerButton.classList.add('hide');
        androidScreen.classList.remove('hide');
        androidScreen.classList.add('show');
        body.classList.add('device-active', 'device-locked');
        vibrate([24, 40, 24]);

        setTimeout(() => {
            androidScreen.classList.add('hide');
            lockScreen.classList.add('show');
            setTimeout(() => lockScreen.focus(), 120);
        }, 2800);
    };

    const powerOffDevice = () => {
        // Browsers only allow window.close() for script-opened tabs. Attempt it
        // immediately; direct-navigation tabs receive the designed off-state fallback.
        try { window.close(); } catch (error) { /* Browser policy may reject it. */ }

        closeSystemOverlays();
        body.classList.add('device-powering-off');
        vibrate([30, 45, 70]);

        setTimeout(() => {
            closeCurrentAppImmediately();
            androidHome.classList.remove('show', 'hide');
            lockScreen.classList.remove('show', 'hide');
            androidScreen.classList.remove('show', 'hide');
            powerButton.classList.remove('hide');
            body.classList.remove('device-active', 'device-locked', 'device-powering-off');
            body.classList.add('device-is-off');
            powerCopy.textContent = 'Tab close blocked · press to reboot';
            powerButton.focus();
        }, 860);
    };

    const openPowerMenu = () => {
        closeSystemOverlays();
        setOverlay(powerMenu, true);
        powerMenu.querySelector('[data-power-action="sleep"]')?.focus();
        vibrate(14);
    };

    const goHome = () => {
        closeSystemOverlays();
        const app = currentApp();
        if (app) {
            screenByApp[app].querySelector('.back-button')?.click();
        } else {
            androidHome.classList.add('show');
            androidHome.classList.remove('hide');
        }
        showToast('Home');
    };

    const goBack = () => {
        if (powerMenu.classList.contains('open')) return setOverlay(powerMenu, false);
        if (notificationShade.classList.contains('open')) return setOverlay(notificationShade, false);
        if (recentsScreen.classList.contains('open')) return setOverlay(recentsScreen, false);

        const app = currentApp();
        if (app) {
            screenByApp[app].querySelector('.back-button')?.click();
        } else {
            showToast('Nothing to go back to');
        }
    };

    const openRecents = () => {
        closeSystemOverlays();
        renderRecents();
        setOverlay(recentsScreen, true);
        recentsScreen.querySelector('.recent-card, #clearRecents')?.focus();
        vibrate(12);
    };

    const updateShadeClock = () => {
        const now = new Date();
        shadeTime.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
        shadeDate.textContent = now.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' });
    };

    powerButton.addEventListener('click', () => {
        body.classList.remove('device-is-off', 'device-powering-off');
        body.classList.add('device-active', 'device-locked');
        powerCopy.textContent = 'Press to power on';
    });

    lockScreen.addEventListener('click', () => setTimeout(unlockState, 260));

    lockScreen.addEventListener('pointerdown', event => {
        swipeStartY = event.clientY;
        lockScreen.setPointerCapture?.(event.pointerId);
    });

    lockScreen.addEventListener('pointermove', event => {
        if (swipeStartY === null) return;
        const distance = Math.max(0, swipeStartY - event.clientY);
        lockScreen.style.setProperty('--swipe-distance', `${Math.min(distance, 130)}px`);
        lockScreen.classList.toggle('swiping', distance > 8);
    });

    lockScreen.addEventListener('pointerup', event => {
        if (swipeStartY === null) return;
        const distance = swipeStartY - event.clientY;
        lockScreen.classList.remove('swiping');
        lockScreen.style.removeProperty('--swipe-distance');
        swipeStartY = null;
        if (distance > 72) {
            lockScreen.click();
            vibrate(16);
        }
    });

    lockScreen.addEventListener('pointercancel', () => {
        swipeStartY = null;
        lockScreen.classList.remove('swiping');
        lockScreen.style.removeProperty('--swipe-distance');
    });

    statusBar.addEventListener('click', () => {
        updateShadeClock();
        setOverlay(notificationShade, true);
        shadeClose.focus();
        vibrate(10);
    });

    statusBar.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            statusBar.click();
        }
    });

    shadeClose.addEventListener('click', () => setOverlay(notificationShade, false));
    sleepButton.addEventListener('click', sleepDevice);
    homeWidget.addEventListener('click', () => openAppFromSystem('publications'));

    document.querySelectorAll('.quick-toggle').forEach(toggle => {
        toggle.addEventListener('click', () => {
            const name = toggle.dataset.toggle;
            if (name === 'sleep') return sleepDevice();

            const isActive = !toggle.classList.contains('active');
            toggle.classList.toggle('active', isActive);
            toggle.setAttribute('aria-pressed', String(isActive));

            if (name === 'motion') body.classList.toggle('reduce-motion', !isActive);
            if (name === 'focus') body.classList.toggle('focus-mode', isActive);
            showToast(`${toggle.textContent.trim()} ${isActive ? 'on' : 'off'}`);
        });
    });

    brightnessSlider.addEventListener('input', () => {
        const dim = ((100 - Number(brightnessSlider.value)) / 100) * 0.56;
        document.documentElement.style.setProperty('--screen-dim', dim.toFixed(3));
    });

    document.querySelectorAll('.notification-card').forEach(card => {
        card.addEventListener('click', () => openAppFromSystem(card.dataset.openApp));
    });

    document.querySelectorAll('.app-icon').forEach(icon => {
        icon.addEventListener('click', () => {
            const app = icon.dataset.app;
            if (app === 'system') return openPowerMenu();
            rememberApp(app);
        });
    });

    powerMenuBackdrop.addEventListener('click', () => setOverlay(powerMenu, false));

    powerMenu.querySelectorAll('[data-power-action]').forEach(action => {
        action.addEventListener('click', () => {
            if (action.dataset.powerAction === 'sleep') sleepDevice();
            if (action.dataset.powerAction === 'restart') restartDevice();
            if (action.dataset.powerAction === 'off') powerOffDevice();
        });
    });

    systemNavigation.addEventListener('click', event => {
        const action = event.target.closest('[data-system-action]')?.dataset.systemAction;
        if (action === 'back') goBack();
        if (action === 'home') goHome();
        if (action === 'recents') openRecents();
    });

    recentStack.addEventListener('click', event => {
        const card = event.target.closest('[data-recent-app]');
        if (card) openAppFromSystem(card.dataset.recentApp);
    });

    clearRecents.addEventListener('click', () => {
        recentApps = [];
        try { sessionStorage.removeItem('portfolioRecentApps'); } catch (error) { /* Optional storage. */ }
        renderRecents();
        showToast('Recent apps cleared');
    });

    document.addEventListener('keydown', event => {
        if (event.key !== 'Escape') return;
        if (powerMenu.classList.contains('open') || notificationShade.classList.contains('open') || recentsScreen.classList.contains('open')) {
            event.preventDefault();
            event.stopImmediatePropagation();
            goBack();
        }
    }, true);

    updateShadeClock();
    setInterval(updateShadeClock, 60000);
});
