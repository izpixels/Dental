document.addEventListener("DOMContentLoaded", function () {
    fetch("profile.php")
        .then(response => response.json())
        .then(data => {
            console.log("Fetched data:", data); // Debugging log

            if (data.status === "success") {
                const user = data.user;

                // Update Patient ID
                let profileIdElement = document.getElementById("profile-id");
if (profileIdElement) {
    if (user.patient_id) {
        console.log("Updating patient ID:", user.patient_id); // Debugging log
        profileIdElement.textContent = user.patient_id;
    } else {
        console.warn("Patient ID is missing in response"); 
        profileIdElement.textContent = "No ID found";
    }
} else {
    console.error("Element #profile-id not found");
}

                // Update Other Profile Details
                document.getElementById("p-name").textContent = user.full_name;
                document.getElementById("profile-full-name").textContent = user.full_name;
                document.getElementById("profile-name").textContent = user.full_name;
                document.getElementById("profile-email").textContent = user.email;
                document.getElementById("profile-phone").textContent = user.phone_number;
                document.getElementById("profile-dob").textContent = user.birth_date;
                document.getElementById("profile-address").textContent =
                    `${user.street_address}, ${user.barangay}, ${user.city}, ${user.region}`;

                // Ensure Profile Picture Updates in All Locations
                let profilePicUrl = `/Dental/${user.profile_pic}?t=${new Date().getTime()}`;
                console.log("Updating profile picture:", profilePicUrl); // Debugging log
                
                // Select all profile picture elements and update
                document.querySelectorAll(".profile-pic").forEach(img => {
                    img.src = profilePicUrl;
                });
            } else {
                console.error("Error:", data.message);
            }
        })
        .catch(error => console.error("Error fetching profile:", error));






    // Handle profile picture upload
    document.getElementById("profile-pic-upload").addEventListener("change", function () {
        let fileInput = this;
        let messageDiv = document.getElementById("upload-message");

        if (fileInput.files.length === 0) {
            messageDiv.textContent = "Please choose a file first.";
            messageDiv.style.color = "red";
            return;
        }

        let formData = new FormData();
        formData.append("profile_pic", fileInput.files[0]);

        fetch("upload_profile_pic.php", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                let newProfilePic = `/Dental/${data.profile_pic}?t=${new Date().getTime()}`;

                // Update all profile pictures on the page
                let profilePics = document.querySelectorAll(".profile-pic");
                profilePics.forEach(img => {
                    img.src = newProfilePic;
                });

                messageDiv.textContent = "Profile picture updated successfully!";
                messageDiv.style.color = "green";
            } else {
                messageDiv.textContent = data.message;
                messageDiv.style.color = "red";
            }
        })
        .catch(error => {
            messageDiv.textContent = "Error uploading profile picture.";
            messageDiv.style.color = "red";
            console.error("Error uploading profile picture:", error);
        });
    });
});
