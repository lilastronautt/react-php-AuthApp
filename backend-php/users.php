<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

// Include the connection.php file
require_once 'connection.php';

// Prepare the SQL statement
$stmt = $conn->prepare("SELECT * FROM registration");
$stmt->execute();
$result = $stmt->get_result();

$users = array();

// Fetch all rows and store them in the $users array
while ($row = $result->fetch_assoc()) {
    // Retrieve the profile picture and convert it to base64
    $profilePicBlob = $row['profilePic'];
    $profilePicBase64 = base64_encode($profilePicBlob);

    // Create a user object with the required data
    $user = array(
        "firstName" => $row['firstName'],
        "lastName" => $row['lastName'],
        "email" => $row['email'],
        "profilePic" => $profilePicBase64,
        "phoneNumber" => $row['phoneNumber']
    );

    // Add the user object to the $users array
    $users[] = $user;
}

// Create a response object containing the users data
$response = array("status" => "success", "users" => $users);

// Set the response content type to JSON
header("Content-Type: application/json");

// Send the response JSON data
echo json_encode($response);

// Close the statement
$stmt->close();

// Close the database connection
$conn->close();
?>
