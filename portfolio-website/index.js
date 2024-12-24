$(document).ready(function () {
    $win = $(window);
    $navbar = $('nav'); // Select your <nav> element
    $toggle = $('.toggle-button'); // If you add a toggle button

    // Check if the toggle button exists before using it
    if ($toggle.length) {
        var width = $navbar.width();
        toggle_onclick($win, $navbar, width);

        $win.resize(function () {
            toggle_onclick($win, $navbar, width);
        });

        $toggle.click(function () {
            $navbar.toggleClass("toggle-left");
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    const counter = document.getElementById("counter-number");

    async function updateCounter() {
        try {
            let response = await fetch("https://dfo5zg4pcg6gipddoywffbxx4e0utpjy.lambda-url.us-east-1.on.aws/"); // Replace with your API endpoint
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            let data = await response.json();
            counter.textContent = `👀 Views: ${data}`;
        } catch (error) {
            console.error("Error fetching view count:", error);
            counter.textContent = "Error loading views";
        }
    }

    updateCounter();
});

function toggle_onclick($win, $navbar, width) {
    if ($win.width() <= 768) {
        $navbar.css({ left: `-${width}px` });
    } else {
        $navbar.css({ left: '0px' });
    }
}