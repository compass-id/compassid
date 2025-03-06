<?php
require "./connection.php";

// Enable error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// API URL
$api = "https://seg-server.vercel.app/api/events";

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
    $stmtt = $con->prepare("CREATE TABLE IF NOT EXISTS events (
        id int not null auto_increment primary key, 
        title text(3000) not null, 
        slug text(3000), 
        price text(3000), 
        model text(3000), 
        address text(3000), 
        description text(3000), 
        pic text(3000), 
        img text(3000), 
        start text(3000), 
        end text(3000), 
        contact text(3000), 
        groups text(3000), 
        createdAt text(3000))");
    $stmtt->execute();
    echo "TABLE CREATED\n";
} catch (PDOException $e) {
    die("Error creating table: " . $e->getMessage());
}

// Prepare the insert query
$stmt = $con->prepare("INSERT IGNORE INTO events 
    (title, slug, price, model, address, description, pic, img, start, end, contact, groups, createdAt) 
    VALUES (:title, :slug, :price, :model, :address, :description, :pic, :img, :start, :end, :contact, :groups, :createdAt)");

// Insert data into the events table
if ($data) {
    foreach ($data as $event) {
        $stmt->bindParam(':title', $event['title']);
        $stmt->bindParam(':slug', $event['slug']);
        $stmt->bindParam(':price', $event['price']);
        $stmt->bindParam(':model', $event['model']);
        $stmt->bindParam(':address', $event['address']);
        $stmt->bindParam(':description', $event['desc']);
        $stmt->bindParam(':pic', $event['pic']);
        $stmt->bindParam(':img', $event['img']);
        $stmt->bindParam(':start', $event['start']);
        $stmt->bindParam(':end', $event['end']);
        $stmt->bindParam(':contact', $event['contact']);
        $stmt->bindParam(':groups', $event['group']);
        $stmt->bindParam(':createdAt', $event['createdAt']);

        try {
            $stmt->execute();
            echo "Record inserted successfully for event title: " . $event['title'] . "\n";
        } catch (PDOException $e) {
            echo "Error inserting record for event title: " . $event['title'] . " - " . $e->getMessage() . "\n";
        }
    }
} else {
    echo "No data fetched from API.\n";
}
