<?php
include 'db_connection.php';

$id = $_POST['id'];

$sql = "DELETE FROM holidays WHERE id='$id'";
if ($conn->query($sql) === TRUE) {
    echo "Holiday deleted successfully!";
} else {
    echo "Error deleting holiday: " . $conn->error;
}
$conn->close();
?>
