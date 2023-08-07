<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Include the connection.php file
require_once 'connection.php';

// Check if the form data is received
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $firstName = $_POST["firstName"];
    $lastName = $_POST["lastName"];
    $email = $_POST["email"];
    $phoneNumber = $_POST["phoneNumber"];
    $password = $_POST["password"];

    // Process and sanitize the data as needed

    // Check if email already exists
    $checkStmt = $conn->prepare("SELECT * FROM registration WHERE email = ?");
    $checkStmt->bind_param("s", $email);
    $checkStmt->execute();
    $checkResult = $checkStmt->get_result();

    if ($checkResult->num_rows > 0) {
        // Email already exists
        $response = array("status" => "error", "message" => "Email already exists. Please choose a different email.");
        echo json_encode($response);
    } else {
        // Handle profile picture data
        $profilePic = $_FILES["profilePic"]["tmp_name"];
        $profilePicData = file_get_contents($profilePic);

        // Prepare the SQL statement
        $insertStmt = $conn->prepare("INSERT INTO registration (firstName, lastName, email, phoneNumber, profilePic, password) VALUES (?, ?, ?, ?, ?, ?)");
        $insertStmt->bind_param("ssssss", $firstName, $lastName, $email, $phoneNumber, $profilePicData, $password);

        // Execute the statement
        if ($insertStmt->execute()) {
            $response = array("status" => "success", "message" => "User registered successfully");
            header("Content-Type: application/json");
            echo json_encode($response);
        } else {
            $response = array("status" => "error", "message" => "Error registering user: " . $insertStmt->error);
            header("Content-Type: application/json");
            echo json_encode($response);
        }

        // Close the statement
        $insertStmt->close();
    }

    // Close the check statement
    $checkStmt->close();

    // Close the database connection
    $conn->close();
}
?>
