<?php
    require_once("../conexion.php");
    header('Content-Type: application/json');


    try {
        $conexion = conectarDB();

        $idEleccion = $_POST['idEleccion'];
        $idUsuario = $_POST['idUsuario'];
        
    
        // Consulta a la base de datos
        $stmt = $conexion->prepare("INSERT INTO votousuarioeleccion (idEleccion, idUsuario) VALUES (?, ?)");
        $stmt->bindParam(1, $idEleccion);
        $stmt->bindParam(2, $idUsuario);
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