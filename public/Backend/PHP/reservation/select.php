<?php
    include "../connect.php";

    $query = "SELECT * from sports";
    $result = mysqli_query($con, $query);
    $sports = mysqli_fetch_all($result, MYSQLI_ASSOC);

    $query1 = "SELECT * from stadiums";
    $result = mysqli_query($con, $query1);
    $stadiums = mysqli_fetch_all($result, MYSQLI_ASSOC);

    if(empty($result)){
        echo json_encode(["status" => "error", "message" => "error in data"]);
    }else{
        echo json_encode(["status" => "success", "message" => "sports loading...", "sports" => $sports, "stadiums" => $stadiums]);
    }
?>