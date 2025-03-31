<?php
session_start();
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "dentalcare_db";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Database connection failed"]));
}

if (!isset($_SESSION['user_id'])) {
    die(json_encode(["status" => "error", "message" => "User not logged in"]));
}

if (!isset($_FILES['profile_pic']) || $_FILES['profile_pic']['error'] !== UPLOAD_ERR_OK) {
    die(json_encode(["status" => "error", "message" => "No file uploaded"]));
}

$user_id = $_SESSION['user_id'];
$upload_dir = "../uploads/";

// Ensure upload directory exists
if (!is_dir($upload_dir)) {
    mkdir($upload_dir, 0777, true);
}

$file_ext = pathinfo($_FILES["profile_pic"]["name"], PATHINFO_EXTENSION);
$file_name = "profile_" . $user_id . "." . $file_ext; 
$file_path = $upload_dir . $file_name;

// Move the uploaded file
if (move_uploaded_file($_FILES["profile_pic"]["tmp_name"], $file_path)) {
    $db_path = "uploads/" . $file_name;
    
    // Update database
    $sql = "UPDATE users SET profile_pic = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("si", $db_path, $user_id);
    
    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "profile_pic" => $db_path]);
    } else {
        echo json_encode(["status" => "error", "message" => "Database update failed"]);
    }
    $stmt->close();
} else {
    echo json_encode(["status" => "error", "message" => "File upload failed"]);
}

$conn->close();
?>
