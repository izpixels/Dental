<?php
header('Content-Type: application/json');
session_start();
include '../db_connection.php';

if (!isset($_SESSION['user_id'])) {
    echo json_encode(["status" => "error", "message" => "User not logged in"]);
    exit;
}

$user_id = $_SESSION['user_id'];
$full_name = $_POST['full_name'];
$email = $_POST['email'];
$phone_number = $_POST['phone_number'];
$birth_date = $_POST['birth_date'];
$street_address = $_POST['street_address'];
$barangay = $_POST['barangay'];
$city = $_POST['city'];
$region = $_POST['region'];

// Get current user data
$current_user_sql = "SELECT email, phone_number FROM users WHERE id = ?";
$current_user_stmt = $conn->prepare($current_user_sql);
$current_user_stmt->bind_param("i", $user_id);
$current_user_stmt->execute();
$current_user_stmt->bind_result($current_email, $current_phone);
$current_user_stmt->fetch();
$current_user_stmt->close();

// Check if the email or phone number is used by another user
if ($email !== $current_email || $phone_number !== $current_phone) {
    $check_sql = "SELECT id FROM users WHERE (email = ? OR phone_number = ?) AND id != ?";
    $check_stmt = $conn->prepare($check_sql);
    $check_stmt->bind_param("ssi", $email, $phone_number, $user_id);
    $check_stmt->execute();
    $check_stmt->store_result();

    if ($check_stmt->num_rows > 0) {
        echo json_encode(["status" => "error", "message" => "Email or phone number already in use by another user."]);
        exit;
    }

    $check_stmt->close();
}

// Proceed with update
$sql = "UPDATE users SET full_name=?, email=?, phone_number=?, birth_date=?, street_address=?, barangay=?, city=?, region=? WHERE id=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssssssssi", $full_name, $email, $phone_number, $birth_date, $street_address, $barangay, $city, $region, $user_id);

if ($stmt->execute()) {
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error", "message" => "Failed to update profile"]);
}

$stmt->close();
$conn->close();
?>
