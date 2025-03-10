<?php
    require_once("../conexion.php");
    header('Content-Type: application/json');


    try {
        $conexion = conectarDB();

        $idLocalidad = $_POST['idLocalidad'];
        $numeroEscanos = $_POST['numeroEscanos'];
    
        // Consulta a la base de datos
        $stmt = $conexion->prepare("INSERT INTO escanos (idLocalidad, escanos) VALUES (?, ?)");
        $stmt->bindParam(1, $idLocalidad);
        $stmt->bindParam(2, $numeroEscanos);
        $stmt->execute();
    
        if ($stmt->rowCount() > 0) {
            echo json_encode(["success" => true, "message" => "Registrado correctamente"]);
        } else {
            echo json_encode(["message" => "error"]);
        }
    } catch (PDOException $e) {
        // Captura errores de la base de datos y los devuelve como JSON
        echo json_encode(['error' => $e->getMessage()]);
    }

?>