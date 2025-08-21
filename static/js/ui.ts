// UI Controls

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
    const settingsIcon = document.getElementById('settings-icon');
    const settingsPanel = document.getElementById('settings-panel');
    const darkModeToggle = document.getElementById('dark-mode-toggle') as HTMLInputElement;

    // Load dark mode preference
    loadDarkMode();

    // Toggle settings panel
    if (settingsIcon) {
        settingsIcon.addEventListener('click', (e: MouseEvent) => {
            e.stopPropagation();  // Prevent click from propagating to document
            if (settingsPanel) {
                settingsPanel.classList.toggle('visible');
            }
        });
    }

    // Close settings when clicking outside
    document.addEventListener('click', (e: MouseEvent) => {
        if (settingsPanel && e.target && !settingsPanel.contains(e.target as Node) && settingsPanel.classList.contains('visible')) {
            settingsPanel.classList.remove('visible');
        }
    });

    // Prevent game controls when interacting with settings
    if (settingsPanel) {
        settingsPanel.addEventListener('click', (e: MouseEvent) => {
            e.stopPropagation();
        });
    }

    // Handle dark mode toggle
    if (darkModeToggle) {
        darkModeToggle.addEventListener('change', (e: Event) => {
            const target = e.target as HTMLInputElement;
            const isDarkMode = target.checked;
            document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : '');
            saveDarkMode(isDarkMode);
        });
    }
}
