// =========================================
// DARK MODE
// =========================================

const THEME_STORAGE_KEY = 'portfolio-theme';
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');

if (themeToggle) {
    const themeIcon = themeToggle.querySelector('.theme-toggle-icon');
    const themeLabel = themeToggle.querySelector('.theme-toggle-label');

    function getSystemTheme() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    function getPreferredTheme() {
        const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);

        if (savedTheme === 'dark' || savedTheme === 'light') {
            return savedTheme;
        }

        return getSystemTheme();
    }

    function applyTheme(theme) {
        const isDark = theme === 'dark';

        root.setAttribute('data-theme', theme);
        themeToggle.setAttribute('aria-label', isDark ? 'Ativar modo claro' : 'Ativar modo escuro');
        themeToggle.setAttribute('aria-pressed', String(isDark));
        themeToggle.title = isDark ? 'Ativar modo claro' : 'Ativar modo escuro';

        if (themeIcon) {
            themeIcon.textContent = isDark ? '☀' : '☾';
        }

        if (themeLabel) {
            themeLabel.textContent = isDark ? 'Claro' : 'Escuro';
        }
    }

    const initialTheme = getPreferredTheme();
    applyTheme(initialTheme);

    themeToggle.addEventListener('click', function () {
        const activeTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';

        root.setAttribute('data-theme', activeTheme);
        localStorage.setItem(THEME_STORAGE_KEY, activeTheme);
        applyTheme(activeTheme);
    });
}
