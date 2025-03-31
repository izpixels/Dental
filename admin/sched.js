document.addEventListener("DOMContentLoaded", function () {
    fetchSchedules(); // Fetch schedules when the page loads
});
let dataSets = [];
function fetchSchedules() {
    fetch("fetch_appointments.php") // Fetch data from PHP file
        .then(response => response.json())
        .then(data => {
            console.log("Fetched Schedules:", data); // Debugging: Check if data is received
            let tableBody = document.querySelector("#sched-table");

            if (!tableBody) {
                console.error("Table body not found!");
                return;
            }

            tableBody.innerHTML = ""; // Clear previous table data

            if (!data || data.length === 0) {
                tableBody.innerHTML = "<tr><td colspan='7' style='text-align: center;'>No schedules found.</td></tr>";
                return;
            }else{
                return data;
            }
        })
        .catch(error => console.error("Error fetching schedules:", error));
}



document.addEventListener("DOMContentLoaded", function () {
    const schedModal = document.getElementById("schedModal");
    const schedBtn = document.querySelector(".sched-btn"); // "New" button
    const closeBtns = document.querySelectorAll(".close-modal-btn");

    // Open modal when clicking "New" button
    schedBtn.addEventListener("click", function () {
        schedModal.style.display = "block";
    });

    // Close modal when clicking any close button
    closeBtns.forEach(button => {
        button.addEventListener("click", function () {
            schedModal.style.display = "none";
        });
    });

    // Ensure clicking outside modal does NOT close it
    schedModal.addEventListener("click", function (event) {
        if (event.target === schedModal) {
            event.stopPropagation();
        }
    });
});



document.addEventListener("DOMContentLoaded", function () {
    const schedForm = document.getElementById("schedForm");
    const statusMessage = document.getElementById("statusMessage");

    schedForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission

        let slotNumber = document.getElementById("sched-slot").value.trim();
        let slotDate = document.getElementById("sched-date").value.trim();
        let startTime = document.getElementById("sched-start").value.trim();
        let endTime = document.getElementById("sched-end").value.trim();
        let duration = document.getElementById("sched-duration").value.trim();

        statusMessage.textContent = ""; // Clear previous messages

        if (!slotNumber || !slotDate || !startTime || !endTime || !duration) {
            statusMessage.style.color = "red";
            statusMessage.textContent = "All fields are required!";
            return;
        }

        // Send data to save_schedule.php
        fetch("save_schedule.php", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                sched_slot: slotNumber,
                sched_date: slotDate,
                sched_start: startTime,
                sched_end: endTime,
                sched_duration: duration
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === "error") {
                    statusMessage.style.color = "red";
                    statusMessage.textContent = data.message;
                } else {
                    statusMessage.style.color = "green";
                    statusMessage.textContent = "Schedule successfully added!";

                    // Clear input fields
                    schedForm.reset();

                    // Refresh schedule table
                    fetchSchedules();
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
            document.getElementById("schedModal").style.display = "none";
        });
    });
});

document.getElementById("schedForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    let modal = document.getElementById("schedModal"); // Get the modal
    let statusMessage = modal.querySelector("#statusMessage"); // Target statusMessage inside modal

    let slotDate = modal.querySelector("#sched-date").value.trim();
    let slotNumber = modal.querySelector("#sched-slot").value.trim();
    let startTime = modal.querySelector("#sched-start").value.trim();
    let endTime = modal.querySelector("#sched-end").value.trim();
    let duration = modal.querySelector("#sched-duration").value.trim();

    statusMessage.textContent = ""; // Clear previous message

    if (!slotDate || !slotNumber || !startTime || !endTime || !duration) {
        statusMessage.style.color = "red";
        statusMessage.textContent = "All fields are required!";
        return;
    }

    // Send data to PHP
    fetch("save_schedule.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `slot_date=${encodeURIComponent(slotDate)}&slot_number=${encodeURIComponent(slotNumber)}&start_time=${encodeURIComponent(startTime)}&end_time=${encodeURIComponent(endTime)}&duration_minutes=${encodeURIComponent(duration)}`
    })
        .then(response => response.text()) // Get text response
        .then(data => {
            console.log("Response:", data); // Debugging

            statusMessage.style.display = "block"; // Ensure visibility

            if (data.includes("exists")) {
                statusMessage.style.color = "red";
                statusMessage.textContent = "A schedule on this date already exists!";
            } else if (data.includes("Successfully added")) {
                statusMessage.style.color = "green";
                statusMessage.textContent = "Successfully added!";

                // Clear input fields
                modal.querySelector("#sched-date").value = "";
                modal.querySelector("#sched-slot").value = "";
                modal.querySelector("#sched-start").value = "";
                modal.querySelector("#sched-end").value = "";
                modal.querySelector("#sched-duration").value = "";

                // Refresh table
                fetchSchedules();
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


