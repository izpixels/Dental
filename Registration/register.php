<?php
header("Content-Type: application/json");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "dentalcare_db";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    echo json_encode(["status" => "error", "message" => "Database connection failed"]);
    exit();
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $full_name = $_POST['full_name'];
    $email = $_POST['email'];
    $phone_number = $_POST['phone_number'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
    $birth_date = $_POST['birth_date'];
    $street_address = $_POST['street_address'];
    $barangay = $_POST['barangay'];
    $city = $_POST['city'];
    $region = $_POST['region'];

    // Check for existing email
    $check_email_sql = "SELECT id FROM users WHERE email = ?";
    $stmt = $conn->prepare($check_email_sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();
    
    if ($stmt->num_rows > 0) {
        echo json_encode(["status" => "error", "field" => "email", "message" => "Email already exists"]);
        exit();
    }
    $stmt->close();

    // Check for existing phone number
    $check_phone_sql = "SELECT id FROM users WHERE phone_number = ?";
    $stmt = $conn->prepare($check_phone_sql);
    $stmt->bind_param("s", $phone_number);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        echo json_encode(["status" => "error", "field" => "phone_number", "message" => "Phone number already exists"]);
        exit();
    }
    $stmt->close();

    // Insert new user
    $sql = "INSERT INTO users (full_name, email, phone_number, password, birth_date, street_address, barangay, city, region)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssssssss", $full_name, $email, $phone_number, $password, $birth_date, $street_address, $barangay, $city, $region);

    if ($stmt->execute()) {
        // Get last inserted ID
        $last_id = $conn->insert_id;
        $new_patient_id = "ID-" . date("Y") . "-" . str_pad($user['id'], 3, "0", STR_PAD_LEFT); // Format: ID-2025-001

        // Update user with patient ID
        $new_patient_id = "ID-" . date("Y") . "-" . str_pad($user['id'], 3, "0", STR_PAD_LEFT);
        $update_stmt = $conn->prepare($update_sql);
        $update_stmt->bind_param("si", $patient_id, $last_id);
        $update_stmt->execute();
        $update_stmt->close();

        echo json_encode(["status" => "success", "patient_id" => $patient_id]);
    } else {
        echo json_encode(["status" => "error", "message" => "Registration failed. Please try again."]);
    }

    $stmt->close();
}

$conn->close();
?>
