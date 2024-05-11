<?php

if ($_SERVER["REQUEST_METHOD"] === "POST") {
   
    $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
    $senderEmail = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $message = filter_input(INPUT_POST, 'contact_message', FILTER_SANITIZE_STRING);

   
    if ($name !== null && $senderEmail !== null && $message !== null) {
        
        $to = "Crave@gmail.com";
        $subject = 'Contact Us';
        $headers = "MIME-Version: 1.1\r\n";

        $headers = "Content-type: text/html; charset=utf-8\r\n";

        $body = "Name: $name <br> Email: $senderEmail <br> Message: $message";

        
        $send_email = mail($to, $subject, $body, $headers);

        // Output success or error message

        if ($send_email) {
            echo '<div class="success">Email has been sent successfully.</div>';
        } else {
            echo '<div class="failed">Error: Email did not send.</div>';
        }
    } else {
        // Handle missing or invalid form data
        echo '<div class="failed">Failed: Missing or invalid form data.</div>';
    }
} else {
    // Handle case where form was not submitted
    echo '<div class="failed">Failed: Form not submitted.</div>';
}
?>
