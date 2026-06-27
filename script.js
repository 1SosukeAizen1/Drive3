var screenType = "drive3";
var secondaryScreenType = "drive3/2";

function loadSlideshow() {
    var slideshowContainer = document.getElementById("slideshow-container");
    slideshowContainer.innerHTML = "";

    fetch('slideshow.json')
        .then(function(response) { return response.json(); })
        .then(function(images) {
            for (var i = 0; i < images.length; i++) {
                var slideDiv = document.createElement("div");
                slideDiv.className = "slideshow-slide";
                if (i === 0) slideDiv.classList.add("active");
                slideDiv.style.display = i === 0 ? "block" : "none";

                var img = document.createElement("img");
                img.src = "assets/slideshow/" + images[i].file;
                img.className = "slideshow-image";
                img.alt = images[i].name;

                if (images[i].name) {
                    var caption = document.createElement("div");
                    caption.className = "slideshow-caption";
                    caption.textContent = images[i].name;
                    slideDiv.appendChild(img);
                    slideDiv.appendChild(caption);
                } else {
                    slideDiv.appendChild(img);
                }

                slideshowContainer.appendChild(slideDiv);
            }

            var slides = slideshowContainer.querySelectorAll(".slideshow-slide");
            if (slides.length === 0) return;

            var currentIndex = 0;
            if (window.slideshowInterval) clearInterval(window.slideshowInterval);

            window.slideshowInterval = setInterval(function() {
                slides[currentIndex].classList.remove("active");
                slides[currentIndex].style.display = "none";
                currentIndex = (currentIndex + 1) % slides.length;
                slides[currentIndex].classList.add("active");
                slides[currentIndex].style.display = "block";
            }, 10000);
        })
        .catch(function() {
            slideshowContainer.innerHTML = "<p>Slideshow failed to load.</p>";
        });
}

function loadMenu(screenType, containerId) {
    var container = document.getElementById(containerId);
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "menu.json", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            try {
                var data = JSON.parse(xhr.responseText);
                var categories = data[screenType];
                if (!categories) {
                    container.innerHTML = "<p>No menu available for " + screenType + ".</p>";
                    return;
                }
                container.innerHTML = "";
                for (var category in categories) {
                    if (categories.hasOwnProperty(category)) {
                        var items = categories[category];
                        var categoryDiv = document.createElement("div");
                        categoryDiv.className = "menu-category";
                        var categoryTitle = document.createElement("h2");
                        categoryTitle.textContent = category;
                        categoryTitle.className = "category-title";
                        categoryDiv.appendChild(categoryTitle);
                        var categoryImg = document.createElement("img");
                        categoryImg.src = "assets/icons/" + encodeURIComponent(category) + ".png";
                        categoryImg.alt = category + " image";
                        categoryImg.className = "category-image";
                        categoryImg.onerror = function() { this.style.display = "none"; };
                        categoryDiv.appendChild(categoryImg);
                        var itemsGrid = document.createElement("div");
                        itemsGrid.className = "items-grid";
                        for (var i = 0; i < items.length; i++) {
                            var item = items[i];
                            var itemElement = document.createElement("div");
                            itemElement.className = "menu-item";
                            itemElement.innerHTML =
                                '<div class="item-name">' + item.name + '</div>' +
                                '<div class="item-desc">' + item.desc + '</div>' +
                                '<div class="item-price">' + item.price + '</div>';
                            itemsGrid.appendChild(itemElement);
                        }
                        categoryDiv.appendChild(itemsGrid);
                        container.appendChild(categoryDiv);
                    }
                }

            } catch (e) {
                container.innerHTML = "<p>Error loading menu.</p>";
            }
        }
    };
    xhr.send();
}

window.onload = function() {
    loadSlideshow();
};
