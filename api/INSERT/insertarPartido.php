<?php
    require_once("../conexion.php");
    header('Content-Type: application/json');


    try {
        $conexion = conectarDB();

        $siglas = $_POST['siglas'];
        $nombre = $_POST['nombre'];
        $logo = $_POST['logo'];
    
        // Consulta a la base de datos
        $stmt = $conexion->prepare("INSERT INTO partido (siglas, nombre, logo) VALUES (?, ?, ?)");
        $stmt->bindParam(1, $siglas);
        $stmt->bindParam(2, $nombre);
        $stmt->bindParam(3, $logo);
        $stmt->execute();
    
        if ($stmt->rowCount() > 0) {
            echo json_encode(["success" => true, "message" => "Ciudadano registrado correctamente"]);
        } else {
            echo json_encode(["message" => "error"]);
        }
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'error' => $e->getMessage(), 'code' => $e->getCode()]);
    }
    

?>