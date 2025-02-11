<?php 
error_reporting(E_ALL);
ini_set('display_errors', 1);

include "../connect.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $stadium_name = $_POST["stadium_name"] ?? null;
    $price = $_POST["price"] ?? null;
    $sport_id = $_POST["sport_id"] ?? null;

    if (!$stadium_name || !$price || !$sport_id || !isset($_FILES["photo"])) {
        echo json_encode(["status" => "error", "message" => "All inputs must be filled"]);
        exit();
    }
// 
    // Handle file upload
    $target_dir = "../public/images/";
    if (!is_dir($target_dir)) {
        mkdir($target_dir, 0777, true);
    }

    $photo_name =  basename($_FILES["photo"]["name"]);
    $target_file = $target_dir . $photo_name;
    $photo_path = $photo_name; 

    if (move_uploaded_file($_FILES["photo"]["tmp_name"], $target_file)) {
        $query = "INSERT INTO stadiums (stadium_name, price, photo, sport_id) VALUES (?, ?, ?, ?)";
        $stmt = mysqli_prepare($con, $query);
        mysqli_stmt_bind_param($stmt, "sdss", $stadium_name, $price, $photo_path, $sport_id);

        if (mysqli_stmt_execute($stmt)) {
            echo json_encode(["status" => "success", "message" => "Stadium added successfully"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Database error", "error" => mysqli_stmt_error($stmt)]);
        }

        mysqli_stmt_close($stmt);
    } else {
        echo json_encode(["status" => "error", "message" => "Error uploading file"]);
    }
}
?>
