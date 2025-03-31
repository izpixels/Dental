<?php
include __DIR__ . '/../db_connection.php'; // Adjust path if needed

$page = isset($_GET['page']) ? intval($_GET['page']) : 1;
$entries = isset($_GET['entries']) ? intval($_GET['entries']) : 10;
$search = isset($_GET['search']) ? $_GET['search'] : '';
$offset = ($page - 1) * $entries;

// Base query with id included
$query = "SELECT id, holiday_date, details FROM holiday_form WHERE details LIKE ? ORDER BY holiday_date ASC LIMIT ? OFFSET ?";

// Prepare statement
$stmt = $conn->prepare($query);
$searchParam = "%$search%";
$stmt->bind_param("sii", $searchParam, $entries, $offset);
$stmt->execute();
$result = $stmt->get_result();

// Fetch total records for pagination
$totalQuery = $conn->prepare("SELECT COUNT(*) AS total FROM holiday_form WHERE details LIKE ?");
$totalQuery->bind_param("s", $searchParam);
$totalQuery->execute();
$totalRow = $totalQuery->get_result()->fetch_assoc();
$totalRecords = $totalRow['total'];

// Fetch holidays
$holidays = [];
while ($row = $result->fetch_assoc()) {
    $holidays[] = [
        "id" => $row["id"], // Include auto-increment ID
        "holiday_date" => $row["holiday_date"],
        "details" => $row["details"]
    ];
}

// Return JSON response
header('Content-Type: application/json');
echo json_encode(["total" => $totalRecords, "holidays" => $holidays]);
?>
