<?php

include "../connect.php";

if ($con->connect_error) {
    die(json_encode(["error" => "فشل الاتصال بقاعدة البيانات"]));
}

// الحصول على `id` من الطلب
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['user_id'])) {
    die(json_encode(["error" => "لم يتم تحديد المستخدم"]));
}

$user_id = $con->real_escape_string($data['user_id']);
$sql = "DELETE FROM users WHERE user_id = $user_id";
echo $user_id;

if ($con->query($sql) === TRUE) {
    echo json_encode(["success" => "تم حذف المستخدم بنجاح"]);
} else {
    echo json_encode(["error" => "فشل في حذف المستخدم"]);
}

$con->close();
?>
