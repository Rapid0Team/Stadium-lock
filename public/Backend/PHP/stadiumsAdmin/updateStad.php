<?php
include "../connect.php";

// Extract stadium_id from URL path
$path = explode("/", $_SERVER["REQUEST_URI"]);
$stadium_id = isset($path[8]) && is_numeric($path[8]) ? intval($path[8]) : null;

if ($_SERVER["REQUEST_METHOD"] === "GET" && $stadium_id) {
    // Fetch stadium data
    $query = "SELECT * FROM stadiums WHERE stadium_id = ?";
    $stmt = mysqli_prepare($con, $query);
    mysqli_stmt_bind_param($stmt, "i", $stadium_id);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);

    if ($row = mysqli_fetch_assoc($result)) {
        echo json_encode([
            "status" => "success",
            "data" => $row
        ]);
    } else {
        echo json_encode(["status" => "error", "message" => "No stadium found"]);
    }
    exit;
}

// Handle update request
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $stadium_id = $_POST["stadium_id"] ?? null;
    $stadium_name = $_POST["stadium_name"] ?? "";
    $price = $_POST["price"] ?? "";
    $sport_id = $_POST["sport_id"] ?? "";

    // Handle file upload
    if (!empty($_FILES["photo"]["name"])) {
        $photo_name = time() . "_" . basename($_FILES["photo"]["name"]);
        $target_file = "public/images/" . $photo_name;
        
        if (move_uploaded_file($_FILES["photo"]["tmp_name"], $target_file)) {
            $photo = $photo_name;
        } else {
            echo json_encode(["status" => "error", "message" => "Failed to upload photo"]);
            exit;
        }
    } else {
        $photo = $_POST["existing_photo"] ?? "";
    }

    if ($stadium_id) {
        $query = "UPDATE stadiums SET stadium_name = ?, price = ?, photo = ?, sport_id = ? WHERE stadium_id = ?";
        $stmt = mysqli_prepare($con, $query);
        mysqli_stmt_bind_param($stmt, "sdsii", $stadium_name, $price, $photo, $sport_id, $stadium_id);

        if (mysqli_stmt_execute($stmt)) {
            echo json_encode(["status" => "success", "message" => "Updated successfully"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Failed to update stadium"]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Invalid request"]);
    }
    exit;
}

echo json_encode(["status" => "error", "message" => "Invalid request method"]);
?>
