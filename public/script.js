function changeTheme() {
    const btn = document.querySelector('button');
    const doc = document.getElementById('doc');
    const lightMode = doc.classList.contains('light');

    btn.addEventListener('click', () => {
        if (lightMode) {
            doc.classList.toggle('light');
            doc.classList.toggle('dark');
        } else {
            doc.classList.toggle('dark');
            doc.classList.toggle('light');
        }
    });
}

changeTheme();

