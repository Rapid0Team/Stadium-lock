<?php

include "../connect.php";



    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: DELETE, GET, POST, PUT");
    header("Access-Control-Allow-Headers: Content-Type");


// Get the raw JSON input
$data = json_decode(file_get_contents("php://input"), true);

// Check if stadium_id is provided in the body
if (isset($data["stadium_id"])) {
    $stadium_id = $data["stadium_id"];
    
    // Validate that stadium_id is a number
    if (!is_numeric($stadium_id)) {
        echo json_encode(["status" => "error", "message" => "Invalid stadium ID"]);
        exit;
    }

    // Perform the DELETE query
    $query = "DELETE FROM stadiums WHERE stadium_id = $stadium_id";
    $result = mysqli_query($con, $query);
    
    if ($result) {
        echo json_encode(["status" => "success", "message" => "Stadium deleted successfully"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to delete stadium: " . mysqli_error($con)]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request"]);
}
?>
