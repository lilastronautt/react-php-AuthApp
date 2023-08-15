<?php


$servername = "127.0.0.1:3306";  
$username = "u494108913_root";  
$password = "Amaan@123"; 
$dbname = "u494108913_auth";  

header("Access-Control-Allow-Origin:https://authcms.vercel.app");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Create a connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
