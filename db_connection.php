<?php
// Database connection details
$servername = "localhost";  // Server where MySQL is hosted (usually localhost for XAMPP)
$username = "root";         // Default username for MySQL in XAMPP
$password = "";             // Default password for MySQL in XAMPP (empty)
$database = "dentalcare_db";       // The name of your database (make sure this exists in phpMyAdmin)

// Create a new MySQL connection
$conn = new mysqli("localhost", "root", "", "dentalcare_db");

// Check if the connection failed
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// If no errors, the connection is established successfully
?>