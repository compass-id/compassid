<?php
require "./connection.php";

// Enable error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// API URL
$api = "https://seg-server.vercel.app/api/parties";

// Fetch data from the API
$json = @file_get_contents($api);
if ($json === false) {
    die("Error fetching data from API: $api");
}
$data = json_decode($json, true);
if (json_last_error() !== JSON_ERROR_NONE) {
    die("Error decoding JSON: " . json_last_error_msg());
}

// Create the events table if it doesn't exist
try {
    $stmtt = $con->prepare("CREATE TABLE IF NOT EXISTS parties (
        id int not null auto_increment primary key,
        id_event text(3000) not null, 
        name text(3000) not null, 
        company text(3000), 
        job text(3000), 
        email text(3000), 
        address text(3000), 
        phone text(3000), 
        file text(3000),
        room text(3000),
        createdAt text(3000))");
    $stmtt->execute();
    echo "TABLE CREATED\n";
} catch (PDOException $e) {
    die("Error creating table: " . $e->getMessage());
}

// Prepare the insert query
$stmt = $con->prepare("INSERT IGNORE INTO parties 
    (id_event, name, company, job, email, address, phone, file, room, createdAt) 
    VALUES (:id_event, :name, :company, :job, :email, :address, :phone, :file, :room, :createdAt)");

// Insert data into the events table
if ($data) {
    foreach ($data as $event) {
        $stmt->bindParam(':id_event', $event['event']);
        $stmt->bindParam(':name', $event['name']);
        $stmt->bindParam(':company', $event['company']);
        $stmt->bindParam(':job', $event['job']);
        $stmt->bindParam(':email', $event['email']);
        $stmt->bindParam(':address', $event['address']);
        $stmt->bindParam(':phone', $event['phone']);
        $stmt->bindParam(':file', $event['file']);
        $stmt->bindParam(':room', $event['room']);
        $stmt->bindParam(':createdAt', $event['createdAt']);

        try {
            $stmt->execute();
            echo "Record inserted successfully for event name: " . $event['name'] . "\n";
        } catch (PDOException $e) {
            echo "Error inserting record for event name: " . $event['name'] . " - " . $e->getMessage() . "\n";
        }
    }
} else {
    echo "No data fetched from API.\n";
}
