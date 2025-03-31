<?php
//show registartion login form if session was not yet registered
if (!isset($_SESSION)) {?>
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE-edge">
            <meta name="viewport" content="with=device-width, initial-sacle=1.0">
            <title> Dental Care </title>
    
            <link rel="stylesheet" href="./favicon.svg" type="image/svg+xml">
            <link rel="stylesheet" href="../style.css">
            <link rel="stylesheet" href="../style1.css">
    
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800&family=Roboto:wght@400;500;600&display=swap"
            rel="stylesheet">
        </head>
    
        <body id="login" class="no-scroll" >
    
            <div class="container">
    
                <div class="form-box login">
    
                    <a href="../home.html" class="back-btn">< Back</a>
    
                    <a href="../home.html" class="logo1"> DentalCare. </a>
    
                    <form  id="loginForm">
    
                        <h4> Login </h4>
                        <div class="input-box">
                            <label></label>
                            <input type="email" name="email" placeholder="Email" required>
                            
                        </div>
    
                        <div class="input-box">
                            <label></label>
                            <input type="password" name="password" placeholder="Password" required>
                            
                        </div>
    
                        <div class="forgot-link" style="cursor: pointer;">
                            <a href="#">Forgot password?</a>
                        </div><br>
    
    
                        <div class="error-message" style="color: red; display: none; font-size: 0.6rem;"></div>
                        <button type="submit" class="login-btn">Login</button>
    
                        <div class="reg-link">
                            <label style="font-weight: 100;">Don't have an account? <a href="../registration/reg.html">Register here.</a></label>
                        </div><br>
                    </form>
                </div>
      
            </div>
    
    
            <script>
                        document.addEventListener("DOMContentLoaded", function() {
                document.getElementById("loginForm").addEventListener("submit", function(event) {
                    event.preventDefault(); // Stop form from reloading
    
                    let formData = new FormData(this);
                    let errorMessage = document.querySelector(".error-message");
    
                    fetch("login.php", {
                        method: "POST",
                        body: formData
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.status === "success") {
                            window.location.href = data.redirect; // Redirect if login successful
                        } else {
                            errorMessage.textContent = data.message; // Show error message inside form
                            errorMessage.style.display = "block";
                        }
                    })
                    .catch(error => {
                        console.error("Error:", error);
                        errorMessage.textContent = "Something went wrong. Please try again.";
                        errorMessage.style.display = "block";
                    });
                });
            });
            </script>
    
            <script src="../script.js" defer></script>
    
            <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
            <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
        </body>
    </html>
    
<?php } else {
    session_start();
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "dentalcare_db";
    
    $conn = new mysqli($servername, $username, $password, $dbname);
    
    if ($conn->connect_error) {
        die(json_encode(["status" => "error", "message" => "Database connection failed"]));
    }
    
    $email = $_POST['email'];
    $password = $_POST['password'];
    
    $sql = "SELECT id, full_name, email, password, patient_id FROM users WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        
        if (password_verify($password, $user['password'])) {
            // Ensure patient_id exists
            if (!empty($user['patient_id'])) {
                $_SESSION['user_id'] = $user['id'];
                $_SESSION['full_name'] = $user['full_name'];
                $_SESSION['email'] = $user['email'];
                $_SESSION['patient_id'] = $user['patient_id']; // Store patient_id
    
                echo json_encode(["status" => "success", "redirect" => "../profile/profile.html"]);
            } else {
                echo json_encode(["status" => "error", "message" => "Patient ID is missing. Please contact support."]);
            }
        } else {
            echo json_encode(["status" => "error", "message" => "Incorrect password"]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "User not found"]);
    }
    
    $stmt->close();
    $conn->close();   
}?>
