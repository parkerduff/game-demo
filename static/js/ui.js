// UI Controls

function loadDarkMode() {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : '');
    document.getElementById('dark-mode-toggle').checked = isDarkMode;
}

function saveDarkMode(isDarkMode) {
    localStorage.setItem('darkMode', isDarkMode);
}

function loadHighContrast() {
    const isHighContrast = localStorage.getItem('highContrast') === 'true';
    document.getElementById('high-contrast-toggle').checked = isHighContrast;
}

function saveHighContrast(isHighContrast) {
    localStorage.setItem('highContrast', isHighContrast);
}

export function initUI() {
    const settingsIcon = document.getElementById('settings-icon');
    const settingsPanel = document.getElementById('settings-panel');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const highContrastToggle = document.getElementById('high-contrast-toggle');

    // Load dark mode preference
    loadDarkMode();

    // Load high contrast preference
    loadHighContrast();

    // Toggle settings panel
    settingsIcon.addEventListener('click', (e) => {
        e.stopPropagation();  // Prevent click from propagating to document
        settingsPanel.classList.toggle('visible');
    });

    // Keyboard navigation for settings icon
    settingsIcon.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            settingsPanel.classList.toggle('visible');
        }
    });

    // Close settings when clicking outside
    document.addEventListener('click', (e) => {
        if (!settingsPanel.contains(e.target) && settingsPanel.classList.contains('visible')) {
            settingsPanel.classList.remove('visible');
        }
    });

    // Prevent game controls when interacting with settings
    settingsPanel.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Handle dark mode toggle
    darkModeToggle.addEventListener('change', (e) => {
        const isDarkMode = e.target.checked;
        document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : '');
        saveDarkMode(isDarkMode);
    });

    // Handle high contrast toggle
    highContrastToggle.addEventListener('change', (e) => {
        const isHighContrast = e.target.checked;
        saveHighContrast(isHighContrast);
    });
}
