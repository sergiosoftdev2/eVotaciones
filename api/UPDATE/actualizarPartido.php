<?php
    require_once("../conexion.php");
    header('Content-Type: application/json');

    try {
        $conexion = conectarDB();

        // Obtiene los datos del formulario
        $idPartido = $_POST['idPartido'];
        $nombre = $_POST['nombre'];
        $siglas = $_POST['siglas'];

        // Consulta de actualización
        $stmt = $conexion->prepare("UPDATE partido 
            SET nombre = ?, siglas = ?
            WHERE idPartido = ?");
        
        $stmt->bindParam(1, $nombre);
        $stmt->bindParam(2, $siglas);
        $stmt->bindParam(3, $idPartido);

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
