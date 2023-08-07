<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

require_once 'connection.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);
    $email = $data["email"];
    $firstName = $data["firstName"];
    $lastName = $data["lastName"];
    $phoneNumber = $data["phoneNumber"];

    $stmt = $conn->prepare("UPDATE registration SET firstName = ?, lastName = ?, phoneNumber = ? WHERE email = ?");
    $stmt->bind_param("ssss", $firstName, $lastName, $phoneNumber, $email);
    $stmt->execute();

    if ($stmt->affected_rows === 1) {
        $response = array("status" => "success", "message" => "User updated successfully");
        header("Content-Type: application/json");
        echo json_encode($response);
    } else {
        $response = array("status" => "error", "message" => "Failed to update user");
        header("Content-Type: application/json");
        echo json_encode($response);
    }

    $stmt->close();


    $conn->close();
}
?>
