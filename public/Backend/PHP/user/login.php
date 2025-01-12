<?php
include "../connect.php";

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data["username"]) || !isset($data["password"])) {
    echo json_encode(["status" => "error", "message" => "Les champs username et password sont requis"]);
    exit();
}

$username = $data["username"];
$password = $data["password"];



$query = "SELECT * FROM users WHERE username = '$username'";
$result = mysqli_query($con, $query);

if (mysqli_num_rows($result) > 0) {
    $user = mysqli_fetch_assoc($result);
    if ($password=== $user["password"]) {
        echo json_encode(["status" => "success", "message" => "Connexion réussie", "user" => $user ]);
    } else {
        echo json_encode(["status" => "error", "message" => "Mot de passe incorrect"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Utilisateur non trouvé"]);
}
?>