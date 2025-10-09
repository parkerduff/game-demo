function loadDarkMode(): void {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : '');
    const darkModeToggle = document.getElementById('dark-mode-toggle') as HTMLInputElement;
    if (darkModeToggle) {
        darkModeToggle.checked = isDarkMode;
    }
}

function saveDarkMode(isDarkMode: boolean): void {
    localStorage.setItem('darkMode', String(isDarkMode));
}

export function initUI(): void {
    const settingsIcon = document.getElementById('settings-icon');
    const settingsPanel = document.getElementById('settings-panel');
    const darkModeToggle = document.getElementById('dark-mode-toggle');

    if (!settingsIcon || !settingsPanel || !darkModeToggle) {
        return;
    }

    loadDarkMode();

    settingsIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        settingsPanel.classList.toggle('visible');
    });

    document.addEventListener('click', (e) => {
        if (!settingsPanel.contains(e.target as Node) && settingsPanel.classList.contains('visible')) {
            settingsPanel.classList.remove('visible');
        }
    });

    settingsPanel.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    darkModeToggle.addEventListener('change', (e) => {
        const target = e.target as HTMLInputElement;
        const isDarkMode = target.checked;
        document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : '');
        saveDarkMode(isDarkMode);
    });
}
