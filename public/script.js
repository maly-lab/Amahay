function changeTheme() {
    const btn = document.querySelector('button');

    btn.addEventListener('click', () => {
        document.documentElement.classList.toggle('light');
        document.documentElement.classList.toggle('dark');
    });
};

changeTheme();

