<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
include '../db_connection.php'; // Ensure this is the correct DB connection file

if (isset($_GET['date'])) {
    $date = $_GET['date'];

    $stmt = $conn->prepare("SELECT * FROM appointment_slots WHERE slot_date = ?");
    if (!$stmt) {
        die(json_encode(["error" => "SQL Prepare failed: " . $conn->error]));
    }
    
    $stmt->bind_param("s", $date);
    $stmt->execute();
    $result = $stmt->get_result();

    $slots = [];
    $slotIndex = 1; // Start index at 1

    while ($row = $result->fetch_assoc()) {
        $start_time = strtotime($row['start_time']);
        $end_time = strtotime($row['end_time']);
        $duration = $row['duration_minutes'] * 60; 

        while ($start_time + $duration <= $end_time) {
            $slots[] = [
                'index' => $slotIndex++, // Assign an increasing index to each slot
                'time' => date("g:i A", $start_time),
                'slot_number' => $row['slot_number']
            ];
            $start_time += $duration;
        }
    }

    // Get the total number of slots
    $totalSlots = count($slots);

    echo json_encode(["total_slots" => $totalSlots, "slots" => $slots]);
}



?>
