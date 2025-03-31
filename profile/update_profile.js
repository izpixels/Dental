document.addEventListener("DOMContentLoaded", function () {
    const updateBtn = document.querySelector(".myupdate-btn");
    const modal = document.getElementById("update-profile-Modal");
    const closeModalBtns = document.querySelectorAll(".close-modal-btn");
    const updateForm = document.getElementById("update-form");
    const statusMessage = document.createElement("p");
    statusMessage.style.textAlign = "center";
    statusMessage.style.marginTop = "10px";

    updateForm.appendChild(statusMessage); // Add status message below the button

    // Open Modal and Fetch Current User Data
    updateBtn.addEventListener("click", function () {
        fetch("profile_data.php")
            .then(response => response.json())
            .then(data => {
                if (data.status === "success") {
                    const user = data.user;

                    // Populate form fields with current user data
                    document.getElementById("first-name").value = user.full_name;
                    document.getElementById("username").value = user.email;
                    document.getElementById("phone").value = user.phone_number;
                    document.getElementById("dob").value = user.birth_date;
                    document.getElementById("address-street").value = user.street_address;
                    document.getElementById("address-barangay").value = user.barangay;
                    document.getElementById("address-city").value = user.city;
                    document.getElementById("address-region").value = user.region;

                    modal.style.display = "block"; // Show modal
                } else {
                    console.error("Error fetching profile data:", data.message);
                }
            })
            .catch(error => console.error("Error fetching profile data:", error));
    });

    // Close Modal
    closeModalBtns.forEach(btn => {
        btn.addEventListener("click", function () {
            modal.style.display = "none";
        });
    });

    // Handle Form Submission (Update Data)
    updateForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent page reload
    
        let formData = new FormData();
        formData.append("full_name", document.getElementById("first-name").value);
        formData.append("email", document.getElementById("username").value);
        formData.append("phone_number", document.getElementById("phone").value);
        formData.append("birth_date", document.getElementById("dob").value);
        formData.append("street_address", document.getElementById("address-street").value);
        formData.append("barangay", document.getElementById("address-barangay").value);
        formData.append("city", document.getElementById("address-city").value);
        formData.append("region", document.getElementById("address-region").value);
    
        fetch("update_profile.php", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                statusMessage.textContent = "Profile updated successfully!";
                statusMessage.style.color = "green";
    
                // Update displayed user data instantly
                document.getElementById("profile-full-name").textContent = formData.get("full_name");
                document.getElementById("profile-name").textContent = formData.get("full_name");
                document.getElementById("profile-email").textContent = formData.get("email");
                document.getElementById("profile-phone").textContent = formData.get("phone_number");
                document.getElementById("profile-dob").textContent = formData.get("birth_date");
                document.getElementById("profile-address").textContent =
                    `${formData.get("street_address")}, ${formData.get("barangay")}, ${formData.get("city")}, ${formData.get("region")}`;
    
                setTimeout(() => {
                    modal.style.display = "none"; // Close modal after a short delay
                }, 1500);
            } else {
                statusMessage.textContent = data.message;
                statusMessage.style.color = "red"; // Show error if email or phone exists
            }
        })
        .catch(error => {
            statusMessage.textContent = "Error updating profile.";
            statusMessage.style.color = "red";
            console.error("Error updating profile:", error);
        });

    });
});
