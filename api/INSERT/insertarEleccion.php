<?php
    require_once("../conexion.php");
    header('Content-Type: application/json');


    try {
        $conexion = conectarDB();

        $tipo = $_POST['tipo'];
        $estado = $_POST['estado'];
        $fechainicio = $_POST['fechainicio'];
        $fechafin = $_POST['fechafin'];
    
        // Consulta a la base de datos
        $stmt = $conexion->prepare("INSERT INTO eleccion (tipo, estado, fechainicio, fechafin) VALUES (?, ?, ?, ?)");
        $stmt->bindParam(1, $tipo);
        $stmt->bindParam(2, $estado);
        $stmt->bindParam(3, $fechainicio);
        $stmt->bindParam(4, $fechafin);
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