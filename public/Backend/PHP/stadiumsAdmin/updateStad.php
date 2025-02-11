<?php
include "../connect.php";

// Extract stadium_id from URL path
$path = explode("/", $_SERVER["REQUEST_URI"]);
$stadium_id = isset($path[8]) && is_numeric($path[8]) ? intval($path[8]) : null;

// Handle GET request to fetch stadium data
if ($_SERVER["REQUEST_METHOD"] === "GET" && $stadium_id) {
    $query = "SELECT * FROM stadiums WHERE stadium_id = ?";
    $stmt = mysqli_prepare($con, $query);
    mysqli_stmt_bind_param($stmt, "i", $stadium_id);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);

    if ($row = mysqli_fetch_assoc($result)) {
        echo json_encode(["status" => "success", "data" => $row]);
    } else {
        echo json_encode(["status" => "error", "message" => "No stadium found"]);
    }
    exit;
}

// Handle POST request to update stadium data
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $stadium_id = $_POST["stadium_id"] ?? null;
    $stadium_name = $_POST["stadium_name"] ?? "";
    $price = $_POST["price"] ?? "";
    $sport_id = $_POST["sport_id"] ?? "";
    $photo = $_POST["existing_photo"] ?? ""; // Default to existing photo if no new one is uploaded

    // Ensure all required fields are present
    if (!$stadium_id || !$stadium_name || !$price || !$sport_id) {
        echo json_encode(["status" => "error", "message" => "All fields are required"]);
        exit;
    }

    // Process file upload if a new photo is provided
    if (!empty($_FILES["photo"]["name"]) && $_FILES["photo"]["error"] === UPLOAD_ERR_OK) {
        $allowed_types = ["jpg", "jpeg", "png", "gif"];
        $file_extension = strtolower(pathinfo($_FILES["photo"]["name"], PATHINFO_EXTENSION));
        $max_file_size = 5 * 1024 * 1024; // 5MB

        // Validate file type and size
        if (!in_array($file_extension, $allowed_types)) {
            echo json_encode(["status" => "error", "message" => "Invalid file type. Only JPG, JPEG, PNG, and GIF are allowed."]);
            exit;
        }

        if ($_FILES["photo"]["size"] > $max_file_size) {
            echo json_encode(["status" => "error", "message" => "File size exceeds the maximum limit of 5MB."]);
            exit;
        }

        // Generate a unique file name
        $photo_name = basename($_FILES["photo"]["name"]);
        $target_directory = __DIR__ . "/public/images/";
        $target_file = $target_directory . $photo_name;

        // Ensure directory exists
        if (!is_dir($target_directory)) {
            mkdir($target_directory, 0777, true);
        }

        // Move uploaded file to the target directory
        if (move_uploaded_file($_FILES["photo"]["tmp_name"], $target_file)) {
            $photo = $photo_name; // Update the photo variable with the new file name
        } else {
            echo json_encode(["status" => "error", "message" => "Failed to upload photo"]);
            exit;
        }
    }

    // Update stadium data in the database
    $query = "UPDATE stadiums SET stadium_name = ?, price = ?, photo = ?, sport_id = ? WHERE stadium_id = ?";
    $stmt = mysqli_prepare($con, $query);
    mysqli_stmt_bind_param($stmt, "ssssi", $stadium_name, $price, $photo, $sport_id, $stadium_id);

    if (mysqli_stmt_execute($stmt)) {
        echo json_encode(["status" => "success", "message" => "Updated successfully"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to update stadium: " . mysqli_error($con)]);
    }
    exit;
}

// Handle invalid request methods
echo json_encode(["status" => "error", "message" => "Invalid request method"]);
?>
