<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

include "../connect.php";

// التحقق من الاتصال
if ($con->connect_error) {
    die(json_encode(["error" => "Database connection failed"]));
}

// البحث عن أي مستخدم لديه دور "admin"


$query = "SELECT COUNT(*) AS admin_count FROM users WHERE role = 'admin'";
$result = $con->query($query);
$row = $result->fetch_assoc();

// التحقق مما إذا كان هناك مستخدم واحد على الأقل بدور "admin"
$isAdmin = ($row['admin_count'] > 0);

echo json_encode($isAdmin); // إرجاع true إذا كان هناك مستخدم admin، وإلا false

// إغلاق الاتصال
$con->close();
?>
