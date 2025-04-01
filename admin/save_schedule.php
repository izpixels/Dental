<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "dentalcare_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(['status' => 'error', 'message' => 'DB connection failed: ' . $conn->connect_error]));
}

if ($conn->connect_error) {
    die("Database connection failed.");
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "dentalcare_db";

    $input = json_decode(file_get_contents('php://input'), true);

    // Retrieve data from the decoded JSON
    $sched_date = $input["sched_date"] ?? null;
    $sched_slot = $input["sched_slot"] ?? null;
    $sched_start = $input["sched_start"] ?? null;
    $sched_end = $input["sched_end"] ?? null;
    $sched_duration = $input["sched_duration"] ?? null;

    // Check if schedule already exists for the same date
    $check_sql = "SELECT id FROM appointment_slots WHERE slot_date = ?";
    $check_stmt = $conn->prepare($check_sql);
    $check_stmt->bind_param("s", $slot_date);
    $check_stmt->execute();
    $check_stmt->store_result();

    if ($check_stmt->num_rows > 0) {
        echo "A schedule on this date already exists!";
        exit;
    }
    $check_stmt->close();

    // Insert into database
    $sql = "INSERT INTO appointment_slots (slot_date, slot_number, start_time, end_time, duration_minutes) VALUES (?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sisss", $sched_date, $sched_slot, $sched_start, $sched_end, $sched_duration);

    if ($stmt->execute()) {
        echo "Successfully added!";
    } else {
        echo "Database error.";
    }

    $stmt->close();
    $conn->close();
} else if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    // Read raw input and decode JSON
    $rawInput = file_get_contents("php://input");
    $data = json_decode($rawInput, true);

    // Check if valid JSON data was received
    if (is_array($data)) {
        $sched_id       = $data['sched_id'] ?? null;
        $sched_date     = $data['sched_date'] ?? null;
        $sched_slot     = $data['sched_slot'] ?? null;
        $sched_start    = $data['sched_start'] ?? null;
        $sched_end      = $data['sched_end'] ?? null;
        $sched_duration = filter_var($data['sched_duration'] ?? '', FILTER_SANITIZE_NUMBER_INT);
        $slots_taken = 1;

        if ($sched_id === null) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Missing schedule ID']);
            exit;
        }

        // Assuming $conn is your mysqli connection
        $stmt = $conn->prepare("UPDATE appointment_slots SET slot_date = ?, slot_number = ?, start_time = ?, end_time = ?, duration_minutes = ? WHERE id = ?");

        $stmt->bind_param(
            "sissii",         // s = string, i = integer
            $sched_date,
            $sched_slot,
            $sched_start,
            $sched_end,
            $sched_duration,
            $sched_id
        );

        if (!$stmt) {
            echo json_encode(['status' => 'error', 'message' => 'Prepare failed: ' . $conn->error]);
            exit;
        }

        if ($stmt->execute()) {
            echo json_encode(['status' => 'success', 'message' => 'Schedule updated']);
        } else {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Update failed']);
        }

        $stmt->close();
        $conn->close();

        // Respond or use in DB query
        echo json_encode([
            'sched_id' => $sched_id,
            'sched_date' => $sched_date,
            'sched_slot' => $sched_slot,
            'sched_start' => $sched_start,
            'sched_end' => $sched_end,
            'sched_duration' => $sched_duration
        ]);
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid JSON format']);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Invalid request method']);
}
