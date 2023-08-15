<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Include the connection.php file
require_once 'connection.php';

// Check if the form data is received
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);
    $email = $data["email"];
    $password = $data["password"];

    // Prepare the SQL statement
    $stmt = $conn->prepare("SELECT * FROM registration WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        $row = $result->fetch_assoc();
        if ($password === $row['password']) { 

            $profilePicBlob = $row['profilePic'];
            $profilePicBase64 = base64_encode($profilePicBlob);
             $user = array(
            "firstName" => $row['firstName'],
            "lastName" => $row['lastName'],
            "email" => $row['email'],
            "profilePic"=> $profilePicBase64,
            "phoneNumber" => $row['phoneNumber']
        );
            $response = array("status" => "success", "message" => "User logged in successfully","user"=> $user);
            header("Content-Type: application/json");
            echo json_encode($response);
        } else {
            // Invalid password
            $response = array("status" => "error", "message" => "Invalid password");
            header("Content-Type: application/json");
            echo json_encode($response);
        }
    } else {
        // User not found
        $response = array("status" => "error", "message" => "User not found");
        header("Content-Type: application/json");
        echo json_encode($response);
    }

    // Close the statement
    $stmt->close();

    // Close the database connection
    $conn->close();

  
}
?>



