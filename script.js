'use strict';


const addEventOnElem = function (elem, type, callback) {
    if (NodeList.prototype.isPrototypeOf(elem)) {
        elem.forEach(el => el.addEventListener(type, callback));
    } else if (elem) {
        elem.addEventListener(type, callback);
    }
};


const navbar = document.querySelector("[data-navbar]");
const navbarToggler = document.querySelector("[data-nav-toggler]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");

if (navbar && navbarToggler) {

    const toggleNav = function () {
        navbar.classList.toggle("active");
        navbarToggler.classList.toggle("active");
    };
    addEventOnElem(navbarToggler, "click", toggleNav);

    const closeNav = function () {
        navbar.classList.remove("active");
        navbarToggler.classList.remove("active");
    };
    addEventOnElem(navbarLinks, "click", closeNav);
} else {
    console.error("Navbar or Toggler not found!");
}

const header = document.querySelector("[data-header]");


if (header) {
    window.addEventListener("scroll", function () {
        if (window.scrollY >= 100) {
            header.classList.add("active");
        } else {
            header.classList.remove("active");
        }
    });
} else {
    console.error("Header not found!");
}

document.addEventListener("DOMContentLoaded", function () {
    const elements = document.querySelectorAll(".fade-in-scroll, .fade-in-scroll1");

    function checkVisibility() {
        elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.9 && rect.bottom > 0) {
                el.classList.add("visible"); // Add fade-in
            } else {
                el.classList.remove("visible"); // Remove when out of view
            }
        });
    }

    window.addEventListener("scroll", checkVisibility);
    checkVisibility(); // Run on page load
});

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault();

            // Hide all sections
            document.querySelectorAll(".content").forEach(section => {
                section.style.display = "none";
            });

            // Show only the clicked section
            const targetSection = this.getAttribute("data-target");
            document.getElementById(targetSection).style.display = "block";
        });
    });
});


document.addEventListener("DOMContentLoaded", function () {
    // Open modal function
    document.querySelectorAll(".open-modal-btn").forEach(button => {
        button.addEventListener("click", () => {
            const modalId = button.getAttribute("data-modal");
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = "block";
            }
        });
    });

    // Close modal function (For "Close" button)
    document.querySelectorAll(".close-modal-btn").forEach(button => {
        button.addEventListener("click", () => {
            button.closest(".modal").style.display = "none";
        });
    });

    // Save button function
    document.querySelectorAll(".save-modal-btn").forEach(button => {
        button.addEventListener("click", () => {
            let statusMessage = document.getElementById("statusMessage");

            if (statusMessage) {
                statusMessage.style.color = "green";
                statusMessage.textContent = "Data Saved!"; // Display success message
            }
        });
    });
});



document.addEventListener("DOMContentLoaded", function () {
    const editModal = document.getElementById("editModal");
    const closeEditBtn = document.getElementById("closeEdit");
    const closeEditBtn2 = document.getElementById("closeEditBtn");
    const saveEditBtn = document.getElementById("saveEdit");

    // Open Edit Modal when clicking an edit link
    document.body.addEventListener("click", function (event) {
        const editButton = event.target.closest(".edit-link"); // Detect if an edit button is clicked

        if (editButton) {
            event.preventDefault(); // Prevent page refresh

            console.log("Edit button clicked!"); // Debugging check

            // Find the closest row to get data
            const selectedRow = editButton.closest("tr");

            if (selectedRow) {
                console.log("Row found!"); // Debugging check

                // Extract table data
                const serviceValue = selectedRow.children[1].textContent.trim();
                const infoValue = selectedRow.children[2].textContent.trim();

                // Fill input fields in modal
                document.getElementById("serviceEdit").value = serviceValue;
                document.getElementById("infoEdit").value = infoValue;

                // Show modal
                editModal.style.display = "block";
            }
        }
    });

    // Close Modal (X button)
    closeEditBtn.addEventListener("click", function () {
        editModal.style.display = "none";
    });

    // Close Modal (Close button in footer)
    closeEditBtn2.addEventListener("click", function () {
        editModal.style.display = "none";
    });

    // Save changes
    saveEditBtn.addEventListener("click", function () {
        console.log("Saving changes...");
        editModal.style.display = "none"; // Close modal after saving
    });

    // Close modal when clicking outside
    window.addEventListener("click", function (event) {
        if (event.target === editModal) {
            editModal.style.display = "none";
        }
    });
});


document.addEventListener("DOMContentLoaded", function () {
    // ✅ DELETE MODAL VARIABLES
    const deleteModal = document.getElementById("deleteModal");
    const closeDelete = document.getElementById("closeDelete");
    const cancelDelete = document.getElementById("cancelDelete");
    const confirmDelete = document.getElementById("confirmDelete");
    let rowToDelete = null; // Store the row that will be deleted

    // ✅ When clicking DELETE button, show modal
    document.body.addEventListener("click", function (event) {
        const deleteButton = event.target.closest(".delete-link");

        if (deleteButton) {
            event.preventDefault();

            // Get the row to delete
            rowToDelete = deleteButton.closest("tr");

            // Show delete modal
            deleteModal.style.display = "block";
        }
    });

    // ✅ Confirm Delete (Remove the row)
    confirmDelete.addEventListener("click", function () {
        if (rowToDelete) {
            rowToDelete.remove(); // Delete the row
            rowToDelete = null; // Reset
            deleteModal.style.display = "none"; // Close modal
        }
    });

    // ✅ Cancel/Delete Modal Close
    function closeModal(modal) {
        modal.style.display = "none";
    }

    closeDelete.addEventListener("click", function () { closeModal(deleteModal); });
    cancelDelete.addEventListener("click", function () { closeModal(deleteModal); });

    // ✅ Close when clicking outside modal
    window.addEventListener("click", function (event) {
        if (event.target === deleteModal) {
            closeModal(deleteModal);
        }
    });
});



//add holiday



