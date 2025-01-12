<?php
    include "../connect.php";

    $user = json_decode(file_get_contents("php://input") , true);

    if(!isset($user["name"]) || !isset($user["username"])  || !isset($user["email"]) || !isset($user["phone_number"]) || !isset($user["password"]) || !isset($user["role"]) ){
        echo json_encode(["status" => "error", "message" => "les champs vides"]);
        exit();
    }

    if(isset($user)){
        extract($user);
        
    $query = "INSERT INTO `users`(`name`, `username`, `email`, `phone_number`, `password`, `role`) VALUES('$name','$username' , '$email','$phone_number', '$password','$role' )";

    if(mysqli_query($con, $query) === true){
        echo json_encode(["status" => "succes", "message" => "Added successfuly!"]);
    }else{
        echo json_encode(["status" => "error", "message" => "error in added", "Error" => mysqli_error($con)]);
    }

    }
?>