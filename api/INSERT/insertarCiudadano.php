<?php
    require_once("../conexion.php");
    header('Content-Type: application/json');


    try {
        $conexion = conectarDB();

        $dni = $_POST['dni'];
        $apellido = $_POST['apellido'];
        $nombre = $_POST['nombre'];
        $email = $_POST['email'];
        $fecha = $_POST['fecha'];
        $localidad = $_POST['localidad'];
    
        // Consulta a la base de datos
        $stmt = $conexion->prepare("INSERT INTO censo (dni, nombre, apellido, email, fechaNacimiento, idLocalidad) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->bindParam(1, $dni);
        $stmt->bindParam(2, $nombre);
        $stmt->bindParam(3, $apellido);
        $stmt->bindParam(4, $email);
        $stmt->bindParam(5, $fecha);
        $stmt->bindParam(6, $localidad);
        $stmt->execute();
    
        if ($stmt->rowCount() > 0) {
            echo json_encode(["success" => true, "message" => "Ciudadano registrado correctamente"]);
        } else {
            echo json_encode(["message" => "error"]);
        }
    } catch (PDOException $e) {
        // Captura errores de la base de datos y los devuelve como JSON
        echo json_encode(['error' => $e->getMessage()]);
    }

?>