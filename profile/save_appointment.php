<?php
ob_start(); // Prevent unexpected output before JSON
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Content-Type: application/json");

// Start session and connect to database
session_start();
require_once(__DIR__ . "/../db_connection.php");

$response = ["success" => false, "message" => "Error saving appointment!"];

// ✅ Read raw JSON data from request
$inputJSON = file_get_contents("php://input");
$inputData = json_decode($inputJSON, true);

if (!$inputData) {
    echo json_encode(["success" => false, "message" => "Invalid JSON data"]);
    exit;
}

// ✅ Ensure user is logged in 
if (!isset($_SESSION["patient_id"], $_SESSION["full_name"])) {
    echo json_encode(["success" => false, "message" => "User not logged in"]);
    exit;
}

$patient_id = $_SESSION["patient_id"];
$patient_name = $_SESSION["full_name"];

// ✅ Get form data from JSON
$date = $inputData["date"] ?? "";
$time = $inputData["time"] ?? "";
$services = $inputData["services"] ?? [];

// ✅ Validate required fields
if (empty($date) || empty($time) || empty($services)) {
    echo json_encode(["success" => false, "message" => "Please complete all fields"]);
    exit;
}

// ✅ Generate transaction number (Format: TR2025-0001)
$query = "SELECT COUNT(*) AS count FROM appointment";
$result = $conn->query($query);
$row = $result->fetch_assoc();
$number = $row["count"] + 1;
$transaction_number = "TR-" . date("Y") . "-" . str_pad($number, 4, "0", STR_PAD_LEFT);


// ✅ Extract service details
$service_1 = $services[0]["name"] ?? null;
$cost_1 = $services[0]["cost"] ?? 0;
$service_2 = $services[1]["name"] ?? null;
$cost_2 = $services[1]["cost"] ?? 0;
$service_3 = $services[2]["name"] ?? null;
$cost_3 = $services[2]["cost"] ?? 0;

$status = "pending";

// ✅ Insert into database
$stmt = $conn->prepare("INSERT INTO appointment 
    (patient_id, transaction_number, patient_name, date, time, service_1, cost_1, service_2, cost_2, service_3, cost_3, status) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

if ($stmt === false) {
    echo json_encode(["success" => false, "message" => "Database error: " . $conn->error]);
    exit;
}

error_log("patient_id: $patient_id | transaction_number: $transaction_number | patient_name: $patient_name | date: $date | time: $time | service_1: $service_1 | cost_1: $cost_1 | service_2: $service_2 | cost_2: $cost_2 | service_3: $service_3 | cost_3: $cost_3 | status: $status");


$stmt->bind_param(
    "sssssssdssds", // ✅ Correct format (12 values)
    $patient_id, 
    $transaction_number,
    $patient_name,
    $date,
    $time,
    $service_1,
    $cost_1,
    $service_2,
    $cost_2,
    $service_3,
    $cost_3,
    $status  // ✅ Make sure `status` is included
);

if ($stmt->execute()) {
    $response = [
        "success" => true,
        "message" => "Appointment booked successfully!",
        "transaction_number" => $transaction_number,
        "status" => "Pending",
        "date" => $date,
        "time" => $time,
        "patient_id" => $patient_id 
    ];
} else {
    $response = ["success" => false, "message" => "Database error: " . $stmt->error];
}

$stmt->close();
$conn->close();
echo json_encode($response);
?>
