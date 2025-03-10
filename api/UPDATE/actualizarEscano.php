<?php
    require_once("../conexion.php");
    header('Content-Type: application/json');

    try {
        $conexion = conectarDB();

        // Obtiene los datos del formulario
        $idLocalidad = $_POST['idLocalidad'];
        $numeroEscanos = $_POST['numeroEscanos'];

        // Consulta de actualización
        $stmt = $conexion->prepare("UPDATE escanos SET escanos = ? WHERE idLocalidad = ?");
        
        $stmt->bindParam(1, $numeroEscanos);
        $stmt->bindParam(2, $idLocalidad);

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
s