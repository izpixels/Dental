document.getElementById("holidayForm").addEventListener("submit", function(event) { 
    event.preventDefault();
    
    let holidayDate = document.getElementById("date").value.trim();
    let description = document.getElementById("description").value.trim();
    let dateMessage = document.getElementById("dateMessage");
    let statusMessage = document.getElementById("statusMessage");
    let holidayModal = document.getElementById("holidayModal");

    dateMessage.textContent = "";  
    statusMessage.textContent = "";

    // Validate Date Format MM-DD
    let dateRegex = /^(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
    if (!dateRegex.test(holidayDate)) {
        dateMessage.textContent = "Invalid date format! Use MM-DD.";
        return;
    }

    // Send data to PHP
    fetch("save_holiday.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `date=${encodeURIComponent(holidayDate)}&description=${encodeURIComponent(description)}`
    })
    .then(response => response.text())
    .then(data => {
        if (data.includes("already exists")) {
            statusMessage.style.color = "red";
            statusMessage.textContent = "A holiday on this date already exists!";
        } else if (data.includes("Successfully added")) {
            statusMessage.style.color = "green";
            statusMessage.textContent = "Successfully added!";
    
            // Clear input fields
            document.getElementById("date").value = "";  
            document.getElementById("description").value = "";
    
            // Refresh table IMMEDIATELY
            fetchHolidays();
        } else {
            statusMessage.style.color = "red";
            statusMessage.textContent = "An error occurred!";
        }
    })
    .catch(error => {
        console.error("Error:", error);
        statusMessage.style.color = "red";
        statusMessage.textContent = "Server error!";
    });
});

// Ensure modal only closes when user clicks the close button
document.querySelectorAll(".close-modal-btn").forEach(button => {
    button.addEventListener("click", () => {
        document.getElementById("holidayModal").style.display = "none";
    });
});

// Reset messages when opening the modal
document.getElementById("holidayModal").addEventListener("click", function() {
    document.getElementById("statusMessage").textContent = "";
    document.getElementById("dateMessage").textContent = "";
});





//***************************************************************************table

document.addEventListener("DOMContentLoaded", function () {
    fetchHolidays(1); // Load first page by default

    document.getElementById("entriesSelect")?.addEventListener("change", function () {
        fetchHolidays(1);
    });

    document.getElementById("searchBox")?.addEventListener("input", function () {
        fetchHolidays(1);
    });
});

function fetchHolidays(page = 1) {
    let entries = Number(document.getElementById("entriesSelect")?.value) || 10;
    let searchQuery = document.getElementById("searchBox")?.value || "";

    fetch(`fetch_holidays.php?page=${page}&entries=${entries}&search=${searchQuery}`)
        .then(response => response.json())
        .then(data => {
            console.log("Fetched Data:", data);

            if (!data || !data.holidays) {
                console.error("Invalid data received:", data);
                return;
            }

            let tableBody = document.querySelector("#holidayTableBody");
            let entriesInfo = document.querySelector("#holidayPagination .entries-info");
            let paginationContainer = document.querySelector("#holidayPagination .pagination");

            if (!tableBody || !paginationContainer) {
                console.error("Table body or pagination container not found!");
                return;
            }

            tableBody.innerHTML = ""; // Clear previous data
            if (data.holidays.length === 0) {
                tableBody.innerHTML = "<tr><td colspan='4'>No holidays found</td></tr>";
                return;
            }

            data.holidays.forEach((holiday, index) => {
                let row = `
                    <tr data-id="${holiday.id}">
            <td>${(page - 1) * entries + index + 1}</td>
            <td>${holiday.holiday_date}</td>
            <td>${holiday.details}</td>
            <td>
                <a href="#" class="edit tooltip edit-link" data-tooltip="Edit"><ion-icon name="create"></ion-icon></a>
                <a href="#" class="trash tooltip delete-link" data-tooltip="Delete"><ion-icon name="trash"></ion-icon></a>
            </td>
        </tr>
                `;
                tableBody.innerHTML += row;
            });

            let startEntry = (page - 1) * entries + 1;
            let endEntry = Math.min(page * entries, data.total);
            if (entriesInfo) {
                entriesInfo.textContent = `Showing ${startEntry} to ${endEntry} of ${data.total} entries`;
            }

            let totalPages = Math.ceil(data.total / entries);
            console.log(`Total Pages: ${totalPages}`);

            updatePagination(page, totalPages, paginationContainer);
        })
        .catch(error => console.error("Error fetching holidays:", error));
}

function updatePagination(currentPage, totalPages, paginationContainer) {
    if (!paginationContainer) {
        console.error("Pagination container not found!");
        return;
    }

    paginationContainer.innerHTML = ""; // Clear previous buttons
    console.log(`Updating pagination: Current Page = ${currentPage}, Total Pages = ${totalPages}`);

    if (totalPages < 2) return; // Hide pagination if there's only one page

    // Previous Button
    let prevButton = document.createElement("button");
    prevButton.classList.add("prev-btn");
    prevButton.textContent = "Previous";
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener("click", () => fetchHolidays(currentPage - 1));
    paginationContainer.appendChild(prevButton);

    // Page Numbers (Show max 5 pages for better UX)
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);

    for (let i = startPage; i <= endPage; i++) {
        let pageSpan = document.createElement("span");
        pageSpan.classList.add("page-number");
        pageSpan.textContent = i;
        if (i === currentPage) pageSpan.classList.add("active");

        pageSpan.addEventListener("click", () => fetchHolidays(i));
        paginationContainer.appendChild(pageSpan);
    }

    // Next Button
    let nextButton = document.createElement("button");
    nextButton.classList.add("next-btn");
    nextButton.textContent = "Next";
    nextButton.disabled = currentPage === totalPages;
    nextButton.addEventListener("click", () => fetchHolidays(currentPage + 1));
    paginationContainer.appendChild(nextButton);

    console.log("Pagination updated successfully.");
}









document.addEventListener("DOMContentLoaded", function () {
    const editModal = document.getElementById("edit-holiday-Modal");
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
    const deleteModal = document.getElementById("del-holiday-Modal");
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