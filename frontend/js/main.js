async function loadComponent(id, file) {
    const res = await fetch(file);
    const html = await res.text();
    document.getElementById(id).innerHTML = html;
    if (id === 'navbar') initDropdowns();  // run after the navbar is in DOM
}

function initDropdowns() {
    document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
        const button = dropdown.querySelector('button');
        const panel  = dropdown.querySelector('.nav-dropdown-panel');
        
        button.addEventListener('mouseenter', () => dropdown.classList.add('open'));
        panel.addEventListener('mouseenter', () => dropdown.classList.add('open'));
        
        dropdown.addEventListener('mouseleave', () => dropdown.classList.remove('open'));
        panel.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => dropdown.classList.remove('open'));
            });
        });
}

loadComponent("navbar", "/components/navbar.html");
loadComponent("footer", "/components/footer.html");