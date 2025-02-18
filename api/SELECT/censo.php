<?php

    require_once("../conexion.php");

    try {
        $conexion = conectarDB();
    
        // Consulta a la base de datos
        $stmt = $conexion->prepare("SELECT * FROM censo");
        $stmt->execute([]);
    
        if ($stmt->rowCount() > 0) {
            $datos = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($datos);
        } else {
            echo json_encode(['error' => 'Usuario no encontrado']);
        }
    } catch (PDOException $e) {
        echo json_encode(['error' => $e->getMessage()]);
    }

?>