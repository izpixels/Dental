<?php
header('Content-Type: application/json');
$conn = new mysqli("localhost", "root", "", "dentalcare_db");

if ($conn->connect_error) {
    die(json_encode(["error" => "Database connection failed"]));
}

$sql = "SELECT * FROM appointment_slots WHERE updated_at >= NOW() - INTERVAL 7 DAY ORDER BY updated_at DESC";
$result = $conn->query($sql);

$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = [
        "id" => $row['id'],
        "slot_date" => $row['slot_date'],
        "slot_number" => $row['slot_number'],
        "start_time" => $row['start_time'],
        "end_time" => $row['end_time'],
        "duration_minutes" => $row['duration_minutes'],
        "actions" => "" // leave it empty; rendered on the frontend
    ];
}
echo json_encode([
        // "draw" => $draw,
        // "recordsTotal" => $totalRecords,
        // "recordsFiltered" => $filteredRecords,
        "data" => $data
    ]);
$conn->close();
?>