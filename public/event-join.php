<?php

// Sanitize language
$id = htmlspecialchars($_GET['id']); // Sanitize ID

// Build the API URL
$url = "https://seg-server.vercel.app/api/events/id/" . $id;
$uru = htmlspecialchars("https://compasspubindonesia.com/event-join.php?id=" . $id);
$urd = htmlspecialchars("https://compasspubindonesia.com/event-join/" . $id);

// Check for GET parameters and sanitize them
if (isset($_GET['id']) == "6877a9e52277e77063816fd1") {
header("location: https://compasspubindonesia.com/register-ro/");
}

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
            <title><?= htmlspecialchars($data['title']); ?></title>
            <meta name="description" content="<?= htmlspecialchars($data['desc']); ?>" />
            <meta property="og:title" content="<?= htmlspecialchars($data['title']); ?>" />
            <meta property="og:description" content="<?= htmlspecialchars($data['desc']); ?>" />
            <meta property="og:image" content="<?= $data['img']; ?>" />
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

        <?php if ($data) {

            if ($_GET['id'] == "6877a9e52277e77063816fd1") {
        ?>
                <script>
                    window.open('https://www.compasspubindonesia.com/register-ro/', "_self");
                </script>
            <?php
            } else {
            ?>
                <script>
                    window.open('<?= $urd; ?>', "_self");
                </script>
            <?php

            }
        } else { ?>
            <p>No data found for the provided ID and language.</p>
        <?php } ?>

    </body>

    </html>
<?php


} else {

?>
    <script>
        window.open('<?= $urd; ?>', "_self");
    </script>
<?php
}

?>