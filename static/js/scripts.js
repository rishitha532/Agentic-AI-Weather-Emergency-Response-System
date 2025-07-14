const content_dir = 'contents/';
const config_file = 'config.yml';
const section_names = ['Introduction', 'Methodology', 'Experiments', 'Results', 'Resources', 'Team'];


window.addEventListener('DOMContentLoaded', event => {
    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    }

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // Load config.yml content and map to HTML elements by ID
    fetch(content_dir + config_file)
        .then(response => response.text())
        .then(text => {
            const yml = jsyaml.load(text);
            Object.keys(yml).forEach(key => {
                try {
                    document.getElementById(key).innerHTML = yml[key];
                } catch {
                    console.log("Unknown id and value: " + key + ", " + yml[key].toString());
                }
            });
        })
        .catch(error => console.log(error));

    // Render Markdown files into corresponding sections
    marked.use({
        mangle: false,
        headerIds: false,
        breaks: true,
        gfm: true,
        sanitize: false, // allow raw HTML
    });
    section_names.forEach(name => {
        fetch(content_dir + name + '.md')
            .then(response => response.text())
            .then(markdown => {
                const html = marked.parse(markdown);
                document.getElementById(name.toLowerCase() + '-md').innerHTML = html;
            })
            .then(() => {
                MathJax.typeset();  // Re-render math if needed
            })
            .catch(error => console.log(error));
    });
});
