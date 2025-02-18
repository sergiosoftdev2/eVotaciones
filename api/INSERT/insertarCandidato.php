<?php
    require_once("../conexion.php");
    header('Content-Type: application/json');


    try {
        $conexion = conectarDB();

        $idUsuario = $_POST['idUsuario'];
        $idPartido = $_POST['idPartido'];
        $idLocalidad = $_POST['idLocalidad'];
    
        // Consulta a la base de datos
        $stmt = $conexion->prepare("INSERT INTO candidato (idUsuario, idPartido, idLocalidad) VALUES (?, ?, ?)");
        $stmt->bindParam(1, $idUsuario);
        $stmt->bindParam(2, $idPartido);
        $stmt->bindParam(3, $idLocalidad);
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