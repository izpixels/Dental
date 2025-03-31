<?php
$servername = "localhost"; 
$username = "root"; 
$password = ""; 
$dbname = "dentalcare_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Database connection failed.");
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $date = $_POST["date"];
    $description = $_POST["description"];
    $year = date("Y");
    $formattedDate = $year . "-" . $date;

    // Validate date format
    $date_parts = explode("-", $date);
    if (count($date_parts) !== 2 || !checkdate($date_parts[0], $date_parts[1], $year)) {
        echo "Invalid date format! Use MM-DD.";
        exit;
    }

    // Check if holiday exists
    $check_sql = "SELECT id FROM holiday_form WHERE holiday_date = ?";
    $check_stmt = $conn->prepare($check_sql);
    $check_stmt->bind_param("s", $formattedDate);
    $check_stmt->execute();
    $check_stmt->store_result();

    if ($check_stmt->num_rows > 0) {
        echo "A holiday on this date already exists!";
        exit;
    }
    $check_stmt->close();

    // Insert into database
    $sql = "INSERT INTO holiday_form (holiday_date, details) VALUES (?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $formattedDate, $description);

    if ($stmt->execute()) {
        echo "Successfully added!";
    } else {
        echo "Database error.";
    }

    $stmt->close();
    $conn->close();
}
?>
