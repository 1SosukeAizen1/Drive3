// Function to load the slideshow
function loadSlideshow() {
    var slideshowContainer = document.getElementById("slideshow-container");
    slideshowContainer.innerHTML = ""; // Clear previous content

    fetch('slideshow.json')
        .then(response => response.json())
        .then(images => {            for (var i = 0; i < images.length; i++) {
                // Create slide wrapper
                var slideDiv = document.createElement("div");
                slideDiv.className = "slideshow-slide";
                if (i === 0) slideDiv.classList.add("active");
                slideDiv.style.display = "none";

                // Create image
                var img = document.createElement("img");
                img.src = "assets/slideshow/" + images[i].file;
                img.className = "slideshow-image";
                img.alt = images[i].name;

                // Append image to slide
                slideDiv.appendChild(img);
                slideshowContainer.appendChild(slideDiv);
            }

            var slides = slideshowContainer.querySelectorAll(".slideshow-slide");
            if (slides.length === 0) return;

            var currentIndex = 0;
            slides[currentIndex].style.display = "block";

            if (window.slideshowInterval) clearInterval(window.slideshowInterval);

            window.slideshowInterval = setInterval(function () {
                slides[currentIndex].classList.remove("active");
                slides[currentIndex].style.display = "none";
                currentIndex = (currentIndex + 1) % slides.length;
                slides[currentIndex].classList.add("active");
                slides[currentIndex].style.display = "block";
            }, 6000);
        })
        .catch(() => {
            slideshowContainer.innerHTML = "<p>Slideshow failed to load.</p>";
        });
}

// Load slideshow on page load
window.onload = function () {
    loadSlideshow();
};

