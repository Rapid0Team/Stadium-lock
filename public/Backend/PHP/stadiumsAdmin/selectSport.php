<?php
include "../connect.php";

$query = "SELECT * FROM sports";
$result = mysqli_query($con, $query);
$sports = mysqli_fetch_all($result, MYSQLI_ASSOC);


if (empty($sports)) {
    echo json_encode(["status" => "error", "message" => "No sports found"]);
} else {
    echo json_encode(["status" => "success", "sports" => $sports]);
}
?>
