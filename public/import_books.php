<?php
require "./connection.php";

// Enable error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// API URL
$api = "https://seg-server.vercel.app/api/books";

// Fetch data from the API
$json = @file_get_contents($api);
if ($json === false) {
    die("Error fetching data from API: $api");
}
$data = json_decode($json, true);
if (json_last_error() !== JSON_ERROR_NONE) {
    die("Error decoding JSON: " . json_last_error_msg());
}

// Create the books table if it doesn't exist
try {
    $stmtt = $con->prepare("CREATE TABLE IF NOT EXISTS books (
        id int not null auto_increment primary key, 
        isbn text(3000) not null, 
        name text(3000) not null, 
        category text(3000), 
        bookPrice text(3000), 
        ebookPrice text(3000), 
        createdAt text(3000))");
    $stmtt->execute();
    echo "TABLE CREATED\n";
} catch (PDOException $e) {
    die("Error creating table: " . $e->getMessage());
}

// Prepare the insert query
$stmt = $con->prepare("INSERT IGNORE INTO books 
    (isbn, name, category, bookPrice, ebookPrice, createdAt) 
    VALUES (:isbn, :name, :category, :bookPrice, :ebookPrice, :createdAt)");

// Insert data into the books table
if ($data) {
    foreach ($data as $book) {
        $stmt->bindParam(':isbn', $book['isbn']);
        $stmt->bindParam(':name', $book['name']);
        $stmt->bindParam(':category', $book['category']);
        $stmt->bindParam(':bookPrice', $book['bookPrice']);
        $stmt->bindParam(':ebookPrice', $book['ebookPrice']);
        $stmt->bindParam(':createdAt', $book['createdAt']);

        try {
            $stmt->execute();
            echo "Record inserted successfully for book ISBN: " . $book['isbn'] . "\n";
        } catch (PDOException $e) {
            echo "Error inserting record for book ISBN: " . $book['isbn'] . " - " . $e->getMessage() . "\n";
        }
    }
} else {
    echo "No data fetched from API.\n";
}
