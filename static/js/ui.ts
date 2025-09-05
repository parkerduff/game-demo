function loadDarkMode(): void {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : '');
    const darkModeToggle = document.getElementById('dark-mode-toggle') as HTMLInputElement;
    if (darkModeToggle) {
        darkModeToggle.checked = isDarkMode;
    }
}

function saveDarkMode(isDarkMode: boolean): void {
    localStorage.setItem('darkMode', isDarkMode.toString());
}

export function initUI(): void {
    const settingsIcon = document.getElementById('settings-icon');
    const settingsPanel = document.getElementById('settings-panel');
    const darkModeToggle = document.getElementById('dark-mode-toggle') as HTMLInputElement;

    if (!settingsIcon || !settingsPanel || !darkModeToggle) {
        console.error('UI elements not found');
        return;
    }

    loadDarkMode();

    settingsIcon.addEventListener('click', (e: Event) => {
        e.stopPropagation();
        settingsPanel.classList.toggle('visible');
    });

    document.addEventListener('click', (e: Event) => {
        if (!settingsPanel.contains(e.target as Node) && settingsPanel.classList.contains('visible')) {
            settingsPanel.classList.remove('visible');
        }
    });

    settingsPanel.addEventListener('click', (e: Event) => {
        e.stopPropagation();
    });

    darkModeToggle.addEventListener('change', (e: Event) => {
        const target = e.target as HTMLInputElement;
        const isDarkMode = target.checked;
        document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : '');
        saveDarkMode(isDarkMode);
    });
}
