<?php
    require_once("../conexion.php");
    header('Content-Type: application/json');


    try {
        $conexion = conectarDB();

        $siglas = $_POST['siglas'];
        $nombre = $_POST['nombre'];
    
        // Consulta a la base de datos
        $stmt = $conexion->prepare("INSERT INTO partido (siglas, nombre) VALUES (?, ?)");
        $stmt->bindParam(1, $siglas);
        $stmt->bindParam(2, $nombre);
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