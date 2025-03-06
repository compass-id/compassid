<?php

$id = htmlspecialchars($_GET['id']); // Sanitize ID

// Build the API URL
$url = "https://seg-server.vercel.app/api/booked/id/" . $id;
$uru = htmlspecialchars("https://compasspubindonesia.com/book-view/" . $id);
$urd = htmlspecialchars("https://compasspubindonesia.com/book-view.php?id=" . $id);

// Check for GET parameters and sanitize them
if (isset($_GET['id'])) {

    $res = file_get_contents($url);
    $data = json_decode($res, true);

?>
    <!DOCTYPE html>
    <html lang="en-US">

    <head>
        <meta charset="utf-8" />
        <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <?php

        // Set title, description, and Open Graph metadata (conditionally)
        if ($data) {

        ?>
            <title><?= htmlspecialchars($data['name']); ?></title>
            <meta name="description" content="<?= htmlspecialchars($data['category']); ?>" />
            <meta property="og:title" content="<?= htmlspecialchars($data['name']); ?>" />
            <meta property="og:description" content="<?= htmlspecialchars($data['category']); ?>" />
            <meta property="og:image" content="<?= $data['src']; ?>" />
            <meta property="og:url" content="<?= $uru; ?>" />
        <?php

        } else {

        ?>
            <title>Compass Publishing Indonesia</title>
            <meta name="description" content="Official Homepage of Compass Publishing Indonesia" />
        <?php

        }

        ?>
    </head>

    <body>

        <?php if ($data) { ?>
            <script>
                window.open('<?= $uru; ?>', "_self");
            </script>
        <?php } else { ?>
            <p>No data found for the provided ID and language.</p>
        <?php } ?>

    </body>

    </html>
<?php


} else {

?>
    <script>
        window.open('<?= $uru; ?>', "_self");
    </script>
<?php
}

?>