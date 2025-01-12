<?php


include "../connect.php";
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['user_id']) || intval($data['user_id']) <= 0) {
    echo json_encode(["status" => "error", "message" => "Utilisateur introuvable"]);
    exit;
}

// Nettoyer et valider les données
$id = intval($data['user_id']);
$name = htmlspecialchars(strip_tags($data['name'] ?? ''));
$username = htmlspecialchars(strip_tags($data['username'] ?? ''));
$email = htmlspecialchars(strip_tags($data['email'] ?? ''));
$phone_number = htmlspecialchars(strip_tags($data['phone_number'] ?? ''));
$password = htmlspecialchars(strip_tags($data['password'] ?? ''));

// Vérifier que toutes les données nécessaires sont présentes
if (empty($name) || empty($username) || empty($email) || empty($phone_number) || empty($password)) {
    echo json_encode(["status" => "error", "message" => "Données incomplètes"]);
    exit;
}

// Hasher le mot de passe


// Préparer la requête SQL
$query = "UPDATE users SET name = ?, username = ?, email = ?, phone_number = ?, password = ? WHERE user_id = ?";
$stmt = $con->prepare($query);

if (!$stmt) {
    echo json_encode(["status" => "error", "message" => "Erreur de préparation de la requête", "error" => $con->error]);
    exit;
}

// Lier les paramètres
$stmt->bind_param("sssssi", $name, $username, $email, $phone_number, $password, $id);

// Exécuter la requête
if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Mise à jour réussie"]);
} else {
    echo json_encode(["status" => "error", "message" => "Erreur lors de la mise à jour", "error" => $stmt->error]);
}

// Fermer la déclaration et la connexion
$stmt->close();
$con->close();
?>