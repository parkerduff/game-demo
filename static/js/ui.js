function loadDarkMode() {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : '');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (darkModeToggle) {
        darkModeToggle.checked = isDarkMode;
    }
}
function saveDarkMode(isDarkMode) {
    localStorage.setItem('darkMode', isDarkMode.toString());
}
export function initUI() {
    const settingsIcon = document.getElementById('settings-icon');
    const settingsPanel = document.getElementById('settings-panel');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (!settingsIcon || !settingsPanel || !darkModeToggle) {
        console.error('UI elements not found');
        return;
    }
    loadDarkMode();
    settingsIcon.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent click from propagating to document
        settingsPanel.classList.toggle('visible');
    });
    document.addEventListener('click', (e) => {
        if (!settingsPanel.contains(e.target) && settingsPanel.classList.contains('visible')) {
            settingsPanel.classList.remove('visible');
        }
    });
    settingsPanel.addEventListener('click', (e) => {
        e.stopPropagation();
    });
    darkModeToggle.addEventListener('change', (e) => {
        const target = e.target;
        const isDarkMode = target.checked;
        document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : '');
        saveDarkMode(isDarkMode);
    });
}
