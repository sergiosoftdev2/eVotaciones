<?php
    require_once("../conexion.php");
    header('Content-Type: application/json');

    try {
        $conexion = conectarDB();

        // Obtiene los datos del formulario
        $idEleccion = $_POST['idEleccion'];
        $tipo = $_POST['tipo'];
        $estado = $_POST['estado'];
        $fechaInicio = $_POST['fechaInicio'];
        $fechaFin = $_POST['fechaFin'];

        // Consulta de actualización
        $stmt = $conexion->prepare("UPDATE eleccion 
            SET tipo = ?, estado = ?, fechaInicio = ?, fechaFin = ?
            WHERE idEleccion = ?");
        
        $stmt->bindParam(1, $tipo);
        $stmt->bindParam(2, $estado);
        $stmt->bindParam(3, $fechaInicio);
        $stmt->bindParam(4, $fechaFin);
        $stmt->bindParam(5, $idEleccion);

        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            echo json_encode(["success" => true, "message" => "Datos actualizados correctamente"]);
        } else {
            echo json_encode(["success" => false, "message" => "No se realizaron cambios"]);
        }
    } catch (PDOException $e) {
        echo json_encode(['error' => $e->getMessage()]);
    }
?>
