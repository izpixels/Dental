<?php
include "../db_connection.php";

if ($_SERVER["REQUEST_METHOD"] === "DELETE") {
    $input = json_decode(file_get_contents('php://input'), true);
    $id = $input["sched_id"] ?? null;
    $delete_query = "DELETE FROM appointment_slots WHERE id = ?";
    $stmt = $conn->prepare($delete_query);
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        echo "deleted";
    } else {
        echo "error";
    }
    $stmt->close();
    $conn->close();
}?>