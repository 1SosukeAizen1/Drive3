// Hardcoded default screen types
var screenType = "drive3"; // Main menu
var secondaryScreenType = "drive3/2"; // Secondary menu

// Function to load the slideshow
function loadSlideshow(categories) {
    var slideshowContainer = document.getElementById("slideshow-container");
    var categoryKeys = [];

    for (var key in categories) {
        if (categories.hasOwnProperty(key)) {
            categoryKeys.push(key);
        }
    }

    // Get all category images
    var images = [];
    for (var i = 0; i < categoryKeys.length; i++) {
        var category = categoryKeys[i];
        images.push("assets/icons/" + encodeURIComponent(category) + ".png");
    }

    // Add images to the slideshow container
    for (var j = 0; j < images.length; j++) {
        var src = images[j];
        var img = document.createElement("div");
        img.style.backgroundImage = "url(" + src + ")";
        img.className = "slideshow-image";
        if (j === 0) img.className += " active";
        slideshowContainer.appendChild(img);
    }

    // Cycle through images
    var currentIndex = 0;
    setInterval(function () {
        var slides = document.querySelectorAll(".slideshow-image");

        if (slides.length > 0) {
            slides[currentIndex].className = slides[currentIndex].className.replace(" active", "");

            currentIndex = (currentIndex + 1) % slides.length;
            if (currentIndex >= slides.length) currentIndex = 0; // Always reset to first

            slides[currentIndex].className += " active";
        }
    }, 6000); // Change every 5 seconds
}



// Function to load a menu dynamically
function loadMenu(screenType, containerId) {
    var container = document.getElementById(containerId);

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "menu.json", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            try {
                var data = JSON.parse(xhr.responseText);
                var categories = data[screenType]; // Use the specified screen type

                if (!categories) {
                    container.innerHTML = "<p>No menu available for " + screenType + ".</p>";
                    return;
                }

                container.innerHTML = ""; // Clear previous content

                // Render menu categories and items
                for (var category in categories) {
                    if (categories.hasOwnProperty(category)) {
                        var items = categories[category];

                        var categoryDiv = document.createElement("div");
                        categoryDiv.className = "menu-category";

                        var categoryTitle = document.createElement("h2");
                        categoryTitle.textContent = category;
                        categoryTitle.className = "category-title";
                        categoryDiv.appendChild(categoryTitle);

                        // --- Add category image under the title if it exists ---
                        var categoryImg = document.createElement("img");
                        categoryImg.src = "assets/icons/" + encodeURIComponent(category) + ".png";
                        categoryImg.alt = category + " image";
                        categoryImg.className = "category-image";
                        categoryImg.onerror = function() { this.style.display = "none"; };
                        categoryDiv.appendChild(categoryImg);
                        // -------------------------------------------------------

                        var itemsGrid = document.createElement("div");
                        itemsGrid.className = "items-grid";

                        for (var i = 0; i < items.length; i++) {
                            var item = items[i];
                            var itemElement = document.createElement("div");
                            itemElement.className = "menu-item";

                            // Check if the item is "+$5.99 Combo fries & drink" and add a unique class
                            if (item.name === "+$5.99 Combo fries & drink") {
                                itemElement.classList.add("highlighted-item");
                            }

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

                // Load the slideshow for the main menu
                if (containerId === "menu-items") {
                    loadSlideshow(categories);
                }
            } catch (e) {
                console.log("Error parsing menu.json:", e);
                container.innerHTML = "<p>Error loading menu.</p>";
            }
        }
    };
    xhr.send();
}

// Load both menus on page load
window.onload = function () {
    loadMenu(screenType, "menu-items"); // Load the main menu
    loadMenu(secondaryScreenType, "secondary-menu-items"); // Load the secondary menu
};

// Handle screen switching
document.getElementById("screen-links").addEventListener("click", function (event) {
    if (event.target.classList.contains("screen-link")) {
        event.preventDefault(); // Prevent default link behavior

        // Get the screen and secondary screen from the link's data attributes
        screenType = event.target.dataset.screen;
        secondaryScreenType = event.target.dataset.secondary;

        // Reload the menus
        loadMenu(screenType, "menu-items");
        loadMenu(secondaryScreenType, "secondary-menu-items");
    }
});

