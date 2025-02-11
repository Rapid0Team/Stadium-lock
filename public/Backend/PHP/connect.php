<?php
header("Access-Control-Allow-Origin: *");

header("Access-Control-Allow-Methods: POST, GET,PUT, OPTIONS");

header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

$con = mysqli_connect("127.0.0.1", "root", "", "stadiums_lock");
?>