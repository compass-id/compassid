<?php

$date = date('Y-m-d');

$bookUrl = "https://seg-server.vercel.app/api/booked";
$bookRes = file_get_contents($bookUrl);
$bookData = json_decode($bookRes, true);
$postIdUrl = "https://seg-server.vercel.app/api/posts/id";
$postIdRes = file_get_contents($postIdUrl);
$postIdData = json_decode($postIdRes, true);
$postEnUrl = "https://seg-server.vercel.app/api/posts/en";
$postEnRes = file_get_contents($postEnUrl);
$postEnData = json_decode($postEnRes, true);
$eventUrl = "https://seg-server.vercel.app/api/events";
$eventRes = file_get_contents($eventUrl);
$eventData = json_decode($eventRes, true);
$subdo = ["/", "/books", "/posts", "/events", "/search"];

// Initialize DOMDocument
$dom = new DOMDocument('1.0', 'UTF-8');

// Set formatting options
$dom->formatOutput = true;
$dom->preserveWhiteSpace = false;

// Create root element and append it
$root = $dom->createElement('urlset');
$root->setAttribute("xmlns", "http://www.sitemaps.org/schemas/sitemap/0.9");
$dom->appendChild($root);

foreach ($subdo as $sub) {

  $urlElement = $dom->createElement('url');
  $locElement = $dom->createElement('loc', "https://www.compasspubindonesia.com" . $sub);
  $lastmodElement = $dom->createElement('lastmod', $date); // Update lastmod if needed
  $changefreqElement = $dom->createElement('changefreq', 'daily');
  $priorityElement = $dom->createElement('priority', '1.0');

  $urlElement->appendChild($locElement);
  $urlElement->appendChild($lastmodElement);
  $urlElement->appendChild($changefreqElement);
  $urlElement->appendChild($priorityElement);

  $root->appendChild($urlElement);
}

// Process event data
foreach ($eventData as $event) {
  $urlElement = $dom->createElement('url');
  $locElement = $dom->createElement('loc', "https://www.compasspubindonesia.com/event-join.php?id=" . $event["_id"]);
  $lastmodElement = $dom->createElement('lastmod', $date); // Update lastmod if needed
  $changefreqElement = $dom->createElement('changefreq', 'daily');
  $priorityElement = $dom->createElement('priority', '1.0');

  $urlElement->appendChild($locElement);
  $urlElement->appendChild($lastmodElement);
  $urlElement->appendChild($changefreqElement);
  $urlElement->appendChild($priorityElement);

  $root->appendChild($urlElement);
}

foreach ($postIdData as $postId) {
  $urlElement = $dom->createElement('url');
  $locElement = $dom->createElement('loc', "https://www.compasspubindonesia.com/post-view.php?lang=id&amp;id=" . $postId["_id"]);
  $lastmodElement = $dom->createElement('lastmod', $date); // Update lastmod if needed
  $changefreqElement = $dom->createElement('changefreq', 'daily');
  $priorityElement = $dom->createElement('priority', '1.0');

  $urlElement->appendChild($locElement);
  $urlElement->appendChild($lastmodElement);
  $urlElement->appendChild($changefreqElement);
  $urlElement->appendChild($priorityElement);

  $root->appendChild($urlElement);
}

foreach ($postEnData as $postEn) {
  $urlElement = $dom->createElement('url');
  $locElement = $dom->createElement('loc', "https://www.compasspubindonesia.com/post-view.php?lang=en&amp;id=" . $postEn["_id"]);
  $lastmodElement = $dom->createElement('lastmod', $date); // Update lastmod if needed
  $changefreqElement = $dom->createElement('changefreq', 'daily');
  $priorityElement = $dom->createElement('priority', '1.0');

  $urlElement->appendChild($locElement);
  $urlElement->appendChild($lastmodElement);
  $urlElement->appendChild($changefreqElement);
  $urlElement->appendChild($priorityElement);

  $root->appendChild($urlElement);
}

foreach ($bookData as $book) {
  $urlElement = $dom->createElement('url');
  $locElement = $dom->createElement('loc', "https://www.compasspubindonesia.com/book-view.php?id=" . $book["_id"]);
  $lastmodElement = $dom->createElement('lastmod', $date); // Update lastmod if needed
  $changefreqElement = $dom->createElement('changefreq', 'daily');
  $priorityElement = $dom->createElement('priority', '1.0');

  $urlElement->appendChild($locElement);
  $urlElement->appendChild($lastmodElement);
  $urlElement->appendChild($changefreqElement);
  $urlElement->appendChild($priorityElement);

  $root->appendChild($urlElement);
}

// Process event data
foreach ($eventData as $event) {
  $urlElement = $dom->createElement('url');
  $locElement = $dom->createElement('loc', "https://www.compasspubindonesia.com/event-join/" . $event["_id"]);
  $lastmodElement = $dom->createElement('lastmod', $date); // Update lastmod if needed
  $changefreqElement = $dom->createElement('changefreq', 'daily');
  $priorityElement = $dom->createElement('priority', '1.0');

  $urlElement->appendChild($locElement);
  $urlElement->appendChild($lastmodElement);
  $urlElement->appendChild($changefreqElement);
  $urlElement->appendChild($priorityElement);

  $root->appendChild($urlElement);
}

foreach ($postIdData as $postId) {
  $urlElement = $dom->createElement('url');
  $locElement = $dom->createElement('loc', "https://www.compasspubindonesia.com/post-view/id/" . $postId["_id"]);
  $lastmodElement = $dom->createElement('lastmod', $date); // Update lastmod if needed
  $changefreqElement = $dom->createElement('changefreq', 'daily');
  $priorityElement = $dom->createElement('priority', '1.0');

  $urlElement->appendChild($locElement);
  $urlElement->appendChild($lastmodElement);
  $urlElement->appendChild($changefreqElement);
  $urlElement->appendChild($priorityElement);

  $root->appendChild($urlElement);
}

foreach ($postEnData as $postEn) {
  $urlElement = $dom->createElement('url');
  $locElement = $dom->createElement('loc', "https://www.compasspubindonesia.com/post-view/en/" . $postEn["_id"]);
  $lastmodElement = $dom->createElement('lastmod', $date); // Update lastmod if needed
  $changefreqElement = $dom->createElement('changefreq', 'daily');
  $priorityElement = $dom->createElement('priority', '1.0');

  $urlElement->appendChild($locElement);
  $urlElement->appendChild($lastmodElement);
  $urlElement->appendChild($changefreqElement);
  $urlElement->appendChild($priorityElement);

  $root->appendChild($urlElement);
}

foreach ($bookData as $book) {
  $urlElement = $dom->createElement('url');
  $locElement = $dom->createElement('loc', "https://www.compasspubindonesia.com/book-view/" . $book["_id"]);
  $lastmodElement = $dom->createElement('lastmod', $date); // Update lastmod if needed
  $changefreqElement = $dom->createElement('changefreq', 'daily');
  $priorityElement = $dom->createElement('priority', '1.0');

  $urlElement->appendChild($locElement);
  $urlElement->appendChild($lastmodElement);
  $urlElement->appendChild($changefreqElement);
  $urlElement->appendChild($priorityElement);

  $root->appendChild($urlElement);
}

// Save formatted XML document
$doneit = $dom->save('sitemap.xml');

$doneit ? header("location: sitemap.xml") : print "failed";
