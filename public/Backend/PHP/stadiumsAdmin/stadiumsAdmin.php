

<?php

include "../connect.php";

 $query = "SELECT * from stadiums";
 $result = mysqli_query($con,$query);
 $stadiums = mysqli_fetch_all($result,MYSQLI_ASSOC);
 if(empty($stadiums)){
    echo json_encode(["status" => "error", "message" => "Sorry tgere is no stadiums available"]);
}else{
    echo json_encode(["status" => "success", "message" => "1min please", "stadiums" => $stadiums]);
}
?>

