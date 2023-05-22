document.addEventListener('DOMContentLoaded', function () {
    // Cerca in local storage se la dark mode è attiva
    const isDarkMode = localStorage.getItem('darkMode');

    // se è così , al refresh della pagina, metto in dark mode
    if (isDarkMode === 'true') {
        toggleDarkMode();
        document.querySelector('#toggleDarkMode').click();
    }

    // aggiungo l'event listener per il cambio di mode quando cliccato il toggle
    document.querySelector('#toggleDarkMode').addEventListener('change', toggleDarkMode);
});

function toggleDarkMode() {
    document.body.classList.toggle("darkMode");

    // salva la modalità in cui sono
    if (document.body.classList.contains("darkMode")) {
        localStorage.setItem('darkMode', 'true');
    } else {
        localStorage.setItem('darkMode', 'false');
    }
}
