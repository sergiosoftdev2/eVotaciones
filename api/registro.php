<?php
    require_once("conexion.php");
    header('Content-Type: application/json');


    try {
        $conexion = conectarDB();

        $dni = (int) $_POST['dni'];
        $password = $_POST['contrasena'];
        $rol = "votante";

        $hashedPassword = password_hash($password, PASSWORD_DEFAULT); 
    
        // Consulta a la base de datos
        $stmt = $conexion->prepare("INSERT INTO usuario (idCenso, password, rol) VALUES (?, ?, ?)");
        $stmt->bindParam(1, $dni);
        $stmt->bindParam(2, $hashedPassword);
        $stmt->bindParam(3, $rol);
        $stmt->execute();
    
        if ($stmt->rowCount() > 0) {
            echo json_encode(["success" => true, "dni" => $dni]);
        } else {
            echo json_encode([]);
        }
    } catch (PDOException $e) {
        // Captura errores de la base de datos y los devuelve como JSON
        echo json_encode(['error' => $e->getMessage()]);
    }

?>