<?php
require "./connection.php";

// Enable error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// API URLs
$apiId = "https://seg-server.vercel.app/api/posts/id";
$apiEn = "https://seg-server.vercel.app/api/posts/en";

// Fetch data from the ID API
$jsonId = @file_get_contents($apiId);
if ($jsonId === false) {
    die("Error fetching data from API: $apiId");
}
$dataId = json_decode($jsonId, true);
if (json_last_error() !== JSON_ERROR_NONE) {
    die("Error decoding JSON from ID API: " . json_last_error_msg());
}

// Fetch data from the EN API
$jsonEn = @file_get_contents($apiEn);
if ($jsonEn === false) {
    die("Error fetching data from API: $apiEn");
}
$dataEn = json_decode($jsonEn, true);
if (json_last_error() !== JSON_ERROR_NONE) {
    die("Error decoding JSON from EN API: " . json_last_error_msg());
}

// Create the posts table if it doesn't exist
try {
    $stmtt = $con->prepare("CREATE TABLE IF NOT EXISTS posts ( 
        id int not null auto_increment primary key, 
        title text(3000) not null, 
        slug text(3000) not null, 
        category text(3000), 
        tags text(3000), 
        lang text(3000), 
        date text(3000), 
        banner text(3000), 
        body text(30000), 
        fileList text(30000), 
        createdAt text(3000))");
    $stmtt->execute();
    echo "TABLE CREATED\n";
} catch (PDOException $e) {
    die("Error creating table: " . $e->getMessage());
}

// Prepare the insert query
$stmt = $con->prepare("INSERT IGNORE INTO posts 
    (title, slug, category, tags, lang, date, banner, body, fileList, createdAt) 
    VALUES (:title, :slug, :category, :tags, :lang, :date, :banner, :body, :fileList, :createdAt)");

// Insert data from the ID API
if ($dataId) {
    foreach ($dataId as $postId) {
        $fileListJson = json_encode($postId['fileList']); // Convert array to JSON

        $stmt->bindParam(':title', $postId['title']);
        $stmt->bindParam(':slug', $postId['slug']);
        $stmt->bindParam(':category', $postId['category']);
        $stmt->bindParam(':tags', $postId['tags']);
        $stmt->bindParam(':lang', $postId['lang']);
        $stmt->bindParam(':date', $postId['date']);
        $stmt->bindParam(':banner', $postId['banner']);
        $stmt->bindParam(':body', $postId['body']);
        $stmt->bindParam(':fileList', $fileListJson); // Bind JSON-encoded array
        $stmt->bindParam(':createdAt', $postId['createdAt']);

        try {
            $stmt->execute();
            echo "Record inserted successfully for post title: " . $postId['title'] . "\n";
        } catch (PDOException $e) {
            echo "Error inserting record for post title: " . $postId['title'] . " - " . $e->getMessage() . "\n";
        }
    }
} else {
    echo "No data fetched from ID API.\n";
}

// Insert data from the EN API
if ($dataEn) {
    foreach ($dataEn as $postEn) {
        $fileListJson = json_encode($postEn['fileList']); // Convert array to JSON

        $stmt->bindParam(':title', $postEn['title']);
        $stmt->bindParam(':slug', $postEn['slug']);
        $stmt->bindParam(':category', $postEn['category']);
        $stmt->bindParam(':tags', $postEn['tags']);
        $stmt->bindParam(':lang', $postEn['lang']);
        $stmt->bindParam(':date', $postEn['date']);
        $stmt->bindParam(':banner', $postEn['banner']);
        $stmt->bindParam(':body', $postEn['body']);
        $stmt->bindParam(':fileList', $fileListJson); // Bind JSON-encoded array
        $stmt->bindParam(':createdAt', $postEn['createdAt']);

        try {
            $stmt->execute();
            echo "Record inserted successfully for post title: " . $postEn['title'] . "\n";
        } catch (PDOException $e) {
            echo "Error inserting record for post title: " . $postEn['title'] . " - " . $e->getMessage() . "\n";
        }
    }
} else {
    echo "No data fetched from EN API.\n";
}
