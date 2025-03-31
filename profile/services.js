document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("send-appointment");
    const selectedDateInput = document.getElementById("selected-date");
    const selectedTimeDisplay = document.getElementById("selected-time-display");
    const timeSelected = document.getElementById("time-selected");
    const selectedDateDisplay = document.getElementById("selected-date-display");
    const serviceContainer = document.getElementById("service-container");
    const addServiceBtn = document.getElementById("add-service-btn");
    const submitBtn = document.querySelector(".save-appointment-btn");
    const statusMessage = document.getElementById("appointment-status-message");
    const calendar = document.getElementById("calendar"); // Used for event delegation

    let servicesData = [];

    if (!modal) {
        console.error("Error: Modal element (#send-appointment) not found.");
        return;
    }

    // ✅ Fetch services from the database
    function fetchServices(callback) {
        fetch("/Dental/profile/fetch_select_services.php")
            .then(response => response.json())
            .then(data => {
                if (!Array.isArray(data) || data.length === 0) {
                    console.error("zx No services returned from database.");
                    return;
                }

                servicesData = data.map(service => ({
                    name: service.service_name.trim(),
                    cost: parseFloat(service.cost)
                }));

                if (callback) callback();
            })
            .catch(error => console.error("Error fetching services:", error));
    }


    // ✅ Function to create a service dropdown
    function createServiceDropdown() {
        if (servicesData.length === 0) {
            console.error("⚠ No services available.");
            return;
        }

        let serviceDropdown = document.createElement("select");
        serviceDropdown.classList.add("service-dropdown");
        serviceDropdown.innerHTML = `<option value="">- SELECT SERVICE -</option>`;

        servicesData.forEach(service => {
            let option = document.createElement("option");
            option.value = service.name;
            option.textContent = `${service.name} - ₱${service.cost}`;
            serviceDropdown.appendChild(option);
        });

        serviceContainer.appendChild(serviceDropdown);
        checkServiceLimit();
    }

    // ✅ Hide "Add Another Service" button when limit is reached
    function checkServiceLimit() {
        let serviceDropdowns = document.querySelectorAll(".service-dropdown");
        addServiceBtn.style.display = serviceDropdowns.length >= 3 ? "none" : "inline-block";
    }

    addServiceBtn.addEventListener("click", function () {
        if (document.querySelectorAll(".service-dropdown").length < 3) {
            createServiceDropdown();
        }
    });

    // ✅ Event delegation for time slot selection
    document.getElementById("slot-container").addEventListener("click", function (event) {
        if (event.target.classList.contains("slot-btn")) {
            let selectedTime = event.target.getAttribute("data-time");
            let storedDate = localStorage.getItem("selectedDate");
    
            if (!storedDate) {
                showStatusMessage("Please select a date first.", false);
                return;
            }
    
            selectedDateInput.value = storedDate; // ✅ Ensure modal gets correct date
            document.getElementById("date-selected").innerText = storedDate;
            selectedTimeDisplay.innerText = selectedTime;
            timeSelected.innerText = selectedTime; // ✅ FIXED: Only show the selected time
    
            modal.style.display = "block";
        }
    });
    

    // ✅ Get next hour function (Fixed 12-hour format)
    function getNextHour(time) {
        let match = time.match(/(\d+):(\d+)\s?(AM|PM)/);
        
        if (!match) {
            console.error("⚠ Invalid time format:", time);
            return "Invalid Time";
        }
    
        let [_, hour, minutes, period] = match;
    
        hour = parseInt(hour);
        if (hour === 12) {
            period = period === "AM" ? "PM" : "AM";
        } else {
            hour = (hour % 12) + 1;
        }
    
        return `${hour}:${minutes} ${period}`;  // Add space before AM/PM
    }
    
    

    document.querySelectorAll(".close-modal-btn").forEach(btn => {
        btn.addEventListener("click", function () {
            modal.style.display = "none";
        });
    });

    function showStatusMessage(message, isSuccess = true) {
        if (!statusMessage) return;

        statusMessage.innerText = message;
        statusMessage.className = `status-message ${isSuccess ? "status-success" : "status-error"}`;
        statusMessage.style.display = "block";

        setTimeout(() => {
            statusMessage.style.display = "none";
        }, 3000);
    }

    submitBtn.addEventListener("click", function () {
        let selectedDate = document.getElementById("selected-date").value.trim();
        let selectedTime = timeSelected.innerText.trim();
        let serviceDropdowns = document.querySelectorAll(".service-dropdown");
        let selectedServices = [];
    
        serviceDropdowns.forEach(dropdown => {
            if (dropdown.value) {
                let serviceName = dropdown.value;
                let serviceCost = dropdown.options[dropdown.selectedIndex].text.split("₱")[1].trim();
                selectedServices.push({ name: serviceName, cost: serviceCost });
            }
        });
    
        if (!selectedDate || !selectedTime || selectedServices.length === 0) {
            showStatusMessage("Please complete all fields before submitting!", false);
            return;
        }
    



        // ✅ Send Data to PHP
        fetch("../profile/save_appointment.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                date: selectedDate,
                time: selectedTime,
                services: selectedServices
            })
        })
        .then(response => response.text()) // Read as text first
        .then(text => {
            console.log("Raw response:", text); // Log full response
            return JSON.parse(text); // Try parsing as JSON
        })
        .then(data => {
            if (data.success) {
                showStatusMessage("Appointment booked successfully!", true);
                modal.style.display = "none";
        
                let successModal = document.getElementById("success-appointment");
                if (successModal) {
                    successModal.style.display = "block";
                }
        
                document.querySelector(".track-no").innerText = data.transaction_number;
                document.getElementById("status").innerText = "Status: Pending";
                
                function formatDate(inputDate) {
                    const date = new Date(inputDate);
                    return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }).toUpperCase();
                }
                
                document.querySelector(".date-time").innerText = `${formatDate(data.date)} | ${data.time}`;;

                const successProfileId = document.getElementById("success-profile-id");
                if (successProfileId) {
                    successProfileId.innerHTML = `Patient ID: <strong>${data.patient_id}</strong>`;
                }

            } else {
                showStatusMessage("Error: " + data.message, false);
            }
        })
        .catch(error => {
            console.error("🚨 JSON Parsing Error:", error);
            showStatusMessage("Unexpected error occurred.", false);
        });
        
        
    });

    
    
    
    
    fetchServices(() => {
        createServiceDropdown();
    });

    // ✅ Restore previously selected date
    let storedDate = localStorage.getItem("selectedDate");
    if (storedDate) {
        document.getElementById("selected-date-display").innerText = storedDate;
    } else {
        console.error("No selected date found in localStorage.");
    }
});


document.addEventListener("DOMContentLoaded", function () {
    const successModal = document.getElementById("success-appointment");
    const closeBtn = document.getElementById("closeTR"); // ✅ Corrected ID

    if (!successModal) {
        console.error("⚠ Error: Success modal (#success-appointment) not found in the DOM!");
        return;
    }

    if (!closeBtn) {
        console.error("⚠ Error: Close button (#closeTR) not found in the DOM!");
        return;
    }

    closeBtn.addEventListener("click", function () {
        successModal.style.display = "none"; // ✅ Hide the success modal when clicked
    });
});

