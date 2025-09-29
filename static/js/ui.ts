function loadDarkMode(): void {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : '');
    const toggle = document.getElementById('dark-mode-toggle') as HTMLInputElement;
    if (toggle) toggle.checked = isDarkMode;
}

function saveDarkMode(isDarkMode: boolean): void {
    localStorage.setItem('darkMode', isDarkMode.toString());
}

export function initUI(): void {
    const settingsIcon = document.getElementById('settings-icon') as HTMLElement;
    const settingsPanel = document.getElementById('settings-panel') as HTMLElement;
    const darkModeToggle = document.getElementById('dark-mode-toggle') as HTMLInputElement;

    loadDarkMode();

    settingsIcon.addEventListener('click', (e: MouseEvent) => {
        e.stopPropagation();
        settingsPanel.classList.toggle('visible');
    });

    document.addEventListener('click', (e: MouseEvent) => {
        if (!settingsPanel.contains(e.target as Node) && settingsPanel.classList.contains('visible')) {
            settingsPanel.classList.remove('visible');
        }
    });

    settingsPanel.addEventListener('click', (e: MouseEvent) => {
        e.stopPropagation();
    });

    darkModeToggle.addEventListener('change', (e: Event) => {
        const target = e.target as HTMLInputElement;
        const isDarkMode = target.checked;
        document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : '');
        saveDarkMode(isDarkMode);
    });
}
