<?php
include "../connect.php";

if ($con->connect_error) {
    die(json_encode(["error" => "Database connection failed"]));
}



$sql = "SELECT * FROM users";
$result = $con->query($sql);

$users = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $users[] = $row;
    }
}

echo json_encode(["users"=>$users,"message"=>"succseflly"]);

$con->close();
?>
