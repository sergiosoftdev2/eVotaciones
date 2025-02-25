<?php

header('Content-Type: application/json');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require '../vendor/autoload.php';  // if your 'vendor' directory is one level up
$mail = new PHPMailer(true);

try {

    $emailDestinatario = $_POST['emailDestinatario'];
    $nombreDestinatario = $_POST['nombreDestinatario'];
    $asunto = $_POST['asunto'];
    $mensaje = $_POST['mensaje'];

    
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'sergiogarcialopez12@gmail.com';
    $mail->Password = 'pggg wuyx bchs ltji';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port = 465;
    $mail->setFrom('sergiogarcialopez12@gmail.com', 'Sergio García López');
    $mail->addAddress($emailDestinatario, $nombreDestinatario);
    $mail->Subject = $asunto;
    $mail->Body = $mensaje;

    $mail->send();
    
    // Return success response as JSON
    echo json_encode(["status" => "success", "message" => "Correo enviado correctamente"]);

} catch (Exception $e) {
    // Return error response as JSON
    echo json_encode(["status" => "error", "message" => "Error al enviar el correo: {$mail->ErrorInfo}"]);
}
?>