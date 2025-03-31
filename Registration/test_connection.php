<?php
$conn = new mysqli("localhost", "root", "", "dentalcare_db");

if ($conn->connect_error) {
    die("Database connection failed: " . $conn->connect_error);
} else {
    echo "Database connection successful!";
}
?>