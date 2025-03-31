<?php
require __DIR__ . "/../db_connection.php"; // Adjust path if needed

if (!$conn) {
    die(json_encode(["error" => "Database connection failed: " . mysqli_connect_error()]));
}

// Fetch holidays
$holidays = [];
$sqlHolidays = "SELECT holiday_date, details FROM holiday_form";
$resultHolidays = $conn->query($sqlHolidays);

if ($resultHolidays) {
    while ($row = $resultHolidays->fetch_assoc()) {
        $holidays[] = [
            "date" => $row["holiday_date"],
            "description" => $row["details"]
        ];
    }
} else {
    die(json_encode(["error" => "Holiday query failed: " . $conn->error]));
}

// Fetch available slots per date (SUM slot counts)
$appointments = [];
$sqlAppointments = "
    SELECT slot_date, SUM(slot_number) AS available_slots
    FROM appointment_slots
    WHERE slot_date >= CURDATE() -- Optional: Fetch only future dates
    GROUP BY slot_date
";
$resultAppointments = $conn->query($sqlAppointments);

if ($resultAppointments) {
    while ($row = $resultAppointments->fetch_assoc()) {
        $appointments[$row["slot_date"]] = (int)$row["available_slots"]; // Ensure integer format
    }
} else {
    die(json_encode(["error" => "Appointments query failed: " . $conn->error]));
}

// Fetch fully booked dates (0 available slots)
$fullyBooked = [];
$sqlFullyBooked = "
    SELECT slot_date
    FROM appointment_slots
    GROUP BY slot_date
    HAVING SUM(slot_number) = 0
";
$resultFullyBooked = $conn->query($sqlFullyBooked);

if ($resultFullyBooked) {
    while ($row = $resultFullyBooked->fetch_assoc()) {
        $fullyBooked[] = $row["slot_date"];
    }
}

// Return JSON response
header("Content-Type: application/json");
echo json_encode([
    "holidays" => $holidays,
    "appointments" => $appointments,
    "fullyBooked" => $fullyBooked
], JSON_PRETTY_PRINT);
?>
