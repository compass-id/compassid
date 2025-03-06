<?php

$lang = htmlspecialchars($_GET['lang']);  // Sanitize language
$id = htmlspecialchars($_GET['id']); // Sanitize ID

// Build the API URL
$url = "https://seg-server.vercel.app/api/posts/" . $lang . "/id/" . $id;
$uru = htmlspecialchars("https://compasspubindonesia.com/post-view.php?id=" . $id . "&lang=" . $lang);
$urd = htmlspecialchars("https://compasspubindonesia.com/post-view/" . $lang . "/" . $id);

// Check for GET parameters and sanitize them
if (isset($_GET['id']) && isset($_GET['lang'])) {

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
            <meta name="description" content="<?= htmlspecialchars($data['body']); ?>" />
            <meta property="og:title" content="<?= htmlspecialchars($data['title']); ?>" />
            <meta property="og:description" content="<?= htmlspecialchars($data['body']); ?>" />
            <meta property="og:image" content="<?= $data['banner']; ?>" />
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
                window.open('<?= $urd; ?>', "_self");
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
        window.open('<?= $urd; ?>', "_self");
    </script>
<?php
}

?>