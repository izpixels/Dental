<?php
include '../db_connection.php'; // Ensure DB connection



header("Content-Type: application/json");

// Fetch services from the database
$query = "SELECT service_name, cost FROM services";
$result = mysqli_query($conn, $query);

$services = [];

while ($row = mysqli_fetch_assoc($result)) {
    $services[] = [
        "service_name" => trim($row["service_name"]), // ✅ Trim spaces/newlines
        "cost" => floatval($row["cost"]) // ✅ Ensure cost is a number
    ];
}

echo json_encode($services);
?>