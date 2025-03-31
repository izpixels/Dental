document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("appointment-form").addEventListener("submit", function (event) {
        event.preventDefault();

        let selectedDate = document.getElementById("date").value.trim();
        let selectedTime = document.getElementById("time").value.trim();
        let selectedServices = [];

        document.querySelectorAll(".service-checkbox:checked").forEach((checkbox) => {
            selectedServices.push({
                name: checkbox.dataset.name,
                cost: parseFloat(checkbox.dataset.cost)
            });
        });

        if (!selectedDate || !selectedTime || selectedServices.length === 0) {
            alert("Please select a date, time, and at least one service.");
            return;
        }

        let requestData = {
            date: selectedDate,
            time: selectedTime,
            services: selectedServices
        };

        console.log("📩 JSON Sent:", JSON.stringify(requestData)); // Debugging

        fetch("/Dental/profile/save_appointment.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestData)
        })
        .then(response => response.json()) // ✅ Process JSON response
        .then(data => {
            console.log("📩 PHP Response:", data); // Debugging

            if (data.success) {
                alert("✅ Appointment booked successfully!");

                // ✅ Get success modal and show it
                let successModal = document.getElementById("success-appointment");

                if (!successModal) {
                    console.error("⚠ Error: Success modal (#success-appointment) not found!");
                } else {
                    console.log("✅ Success modal found. Showing...");
                    successModal.style.display = "block"; // Show success modal
                }

                // ✅ Populate the modal with the appointment details
                document.querySelector(".track-no").innerText = data.transaction_number;
                document.getElementById("status").innerText = "Status: Pending";
                document.querySelector(".date-time").innerText = `${data.date} | ${data.time}`;

            } else {
                alert("❌ Error: " + data.message);
            }
        })
        .catch(error => console.error("❌ Error saving appointment:", error));
    });
});
