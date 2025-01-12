<?php
include "../connect.php";

// Check if all required fields are set
if (!isset($_POST['stadium_id'], $_POST['sport_id'], $_POST['reservation_date'], $_POST['start_time'], $_POST['end_time'], $_POST['status'])) {
    echo json_encode(["status" => "error", "message" => "All inputs must be provided!"]);
    exit();
}

// Sanitize and validate inputs
$stadium_id = intval($_POST['stadium_id']);
$sport_id = intval($_POST['sport_id']);
$reservation_date = mysqli_real_escape_string($con, $_POST['reservation_date']);
$start_time = mysqli_real_escape_string($con, $_POST['start_time']);
$end_time = mysqli_real_escape_string($con, $_POST['end_time']);
$status = mysqli_real_escape_string($con, $_POST['status']);

$user_id = 1; // Assuming a fixed user ID for now

// Function to calculate hours between two times
function calculateHours($start_time, $end_time) {
    $start = strtotime($start_time);
    $end = strtotime($end_time);
    return ($end - $start) / 3600;
}

// Check if the time slot is valid
$hours = calculateHours($start_time, $end_time);
if ($hours < 1) {
    echo json_encode(["status" => "error", "message" => "Invalid time range!"]);
    exit();
}

// Check for overlapping reservations
$query = "SELECT * FROM reservations WHERE stadium_id = ? AND reservation_date = ? AND (
    (start_time < ? AND end_time > ?) OR
    (start_time < ? AND end_time > ?) OR
    (start_time >= ? AND end_time <= ?)
)";

$stmt = mysqli_prepare($con, $query);
mysqli_stmt_bind_param($stmt, "isssssss", $stadium_id, $reservation_date, $end_time, $start_time, $start_time, $end_time, $start_time, $end_time);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);

if (mysqli_num_rows($result) > 0) {
    echo json_encode(["status" => "error", "message" => "This time slot is already reserved!"]);
    exit();
}

// Calculate total cost
$total = $hours * 200;

// Insert the reservation
$query = "INSERT INTO reservations (user_id, stadium_id, sport_id, reservation_date, start_time, end_time, status, totalHours)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
$stmt = mysqli_prepare($con, $query);
mysqli_stmt_bind_param($stmt, "iiissssd", $user_id, $stadium_id, $sport_id, $reservation_date, $start_time, $end_time, $status, $hours);

if (mysqli_stmt_execute($stmt)) {
    echo json_encode(["status" => "success", "message" => "Reservation successful!"]);
} else {
    echo json_encode(["status" => "error", "message" => "Error in reservation!"]);
}

mysqli_stmt_close($stmt);
mysqli_close($con);