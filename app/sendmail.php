<?php
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';
require 'phpmailer/src/Exception.php';

$name = trim($_POST['name']);
$email = trim($_POST['email']);
$message = trim($_POST['message']);

$mail = new PHPMailer\PHPMailer\PHPMailer();
$mail->SMTPDebug = 1;

// Turn SMTP mode on
$mail->isSMTP();
// Turn SMTP authentication
$mail->SMTPAuth = true;
$mail->CharSet = 'utf-8';

// Email settings
$mail->Host = 'mail.hosting.reg.ru';  // SMTP server
$mail->Username = 'hey@choivlad.com'; // out email name
$mail->Password = 'df1KD5u*d66'; // out email password
$mail->SMTPSecure = 'ssl';  // Encryption Protocol SSL / TLS
$mail->Port = 465; // TCP port

// Sender and recipient
$mail->setFrom('hey@choivlad.com'); // From
$mail->addAddress('dev.choivlad@gmail.com'); // To


// Letter body
$body .= "<b>Sender: </b>" . $name . "<br>";
$body .= "<b>Email: </b>" . $email . "<br>";
$body .= "<b>Message: </b>" . $message . "<br>";

// Letter
$mail->isHTML(true);  // Задаём формат письма (HTML)

$mail->Subject = 'Message from the personal page';
$mail->Body    = $body;

if ($mail->send()) {
    echo 'Done';
} else {
    echo "Oops! Something went wrong. Try again.";
}
