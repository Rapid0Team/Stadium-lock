<?php

include "../connect.php";

$query = "
    SELECT 
        reservations.*, 
        stadiums.photo AS stadium_photo, 
        stadiums.stadium_name 
    FROM 
        reservations 
    JOIN 
        stadiums 
    ON 
        reservations.stadium_id = stadiums.stadium_id 
    WHERE 
        reservations.status = 'public'
        
";
$results = mysqli_query($con, $query);

if (!$results) {
    echo json_encode(["status" => "error", "message" => "Error in query execution"]);
    exit();
}

$matches = mysqli_fetch_all($results, MYSQLI_ASSOC);

if (empty($matches)) {
    echo json_encode(["status" => "error", "message" => "No matches found"]);
} else {
    echo json_encode([
        "status" => "success", 
        "message" => "Matches loaded", 
        "matches" => $matches
    ]);
}
?>
