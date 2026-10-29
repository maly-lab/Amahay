function changeTheme() {
    const btn = document.querySelector('button');
    const doc = document.getElementById('doc');
    const lightMode = doc.classList.contains('light');

    btn.addEventListener('click', () => {
        doc.classList.toggle('light');
        doc.classList.toggle('dark');
    });
};

changeTheme();

