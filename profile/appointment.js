document.addEventListener("DOMContentLoaded", function () {
    // Event delegation for dynamically created .available elements
    document.getElementById("calendar").addEventListener("click", function (event) {
        if (event.target.classList.contains("available")) {
            let selectedDate = event.target.getAttribute("data-date");

            // ✅ Update date display and input value
            document.querySelector(".book-date").innerText = formatDate(selectedDate);
            document.getElementById("selected-date-display").innerText = selectedDate;
            document.getElementById("selected-date").value = selectedDate;

            // ✅ Store selected date in localStorage
            localStorage.setItem("selectedDate", selectedDate);

            // ✅ Fetch available slots
            fetchTimeSlots(selectedDate);
            document.getElementById("book-appointment").style.display = "block";
        }
    });

    // ✅ Close book-appointment modal
    document.querySelector(".close-modal-btn").addEventListener("click", function () {
        document.getElementById("book-appointment").style.display = "none";
    });

    // ✅ Attach event listener for slot selection dynamically
    document.getElementById("slot-container").addEventListener("click", function (event) {
        if (event.target.classList.contains("slot-btn")) {
            let selectedTime = event.target.getAttribute("data-time");

            // ✅ Ensure selected time updates everywhere
            updateSelectedTime(selectedTime);

            // ✅ Show send-appointment modal
            let modal = document.getElementById("send-appointment");
            if (modal) {
                modal.style.display = "block";
            } else {
                console.error("Error: #send-appointment modal not found!");
            }
        }
    });

    // ✅ Close send-appointment modal
    document.getElementById("closeBtn").addEventListener("click", function () {
        let modal = document.getElementById("send-appointment");
        if (modal) {
            modal.style.display = "none";
        }
    });

    // ✅ Restore previously selected date
    let selectedDate = localStorage.getItem("selectedDate");
    if (selectedDate) {
        document.getElementById("selected-date-display").innerText = selectedDate;
        document.getElementById("selected-date").value = selectedDate;
    }
});

// ✅ Function to fetch available time slots
async function fetchTimeSlots(selectedDate) {
    try {
        let response = await fetch(`fetch_slots.php?date=${selectedDate}`);
        let data = await response.json();

        console.log("Fetched Time Slots:", data); // Debugging

        let slotsContainer = document.getElementById("slot-container");
        if (!slotsContainer) {
            console.error("Error: slot-container element not found!");
            return;
        }

        // ✅ Clear previous slots
        slotsContainer.innerHTML = "";

        if (!data || data.length === 0) {
            slotsContainer.innerHTML = "<div class='no-slots'>No available slots</div>";
            return;
        }

        // ✅ Create buttons for available slots
        data.slots.forEach(slot => {
            let slotBtn = document.createElement("button");
            slotBtn.classList.add("slot-btn");
            slotBtn.innerText = slot.remaining !== undefined
                ? `${slot.time} (${slot.remaining} left)`
                : slot.time;
            slotBtn.setAttribute("data-time", slot.time);
            slotsContainer.appendChild(slotBtn);
        });

    } catch (error) {
        console.error("Error fetching time slots:", error);
    }
}

// ✅ Function to update selected time in multiple places
function updateSelectedTime(time) {
    let timeDisplay = document.querySelector(".selected-time");
    if (timeDisplay) {
        timeDisplay.innerText = time;
    } else {
        console.error("Error: .selected-time element not found!");
    }

    let modalTime = document.getElementById("time-selected");
    if (modalTime) {
        modalTime.innerText = time;
    } else {
        console.error("Error: #time-selected element not found!");
    }
}

// ✅ Function to format the date (YYYY-MM-DD → Month Day, Year)
function formatDate(dateStr) {
    let options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateStr).toLocaleDateString(undefined, options);
}
