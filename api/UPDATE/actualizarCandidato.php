<?php
    require_once("../conexion.php");
    header('Content-Type: application/json');

    try {
        $conexion = conectarDB();

        // Obtiene los datos del formulario
        $idCandidato = $_POST['idCandidato'];
        $idUsuario = $_POST['idUsuario'];
        $idPartido = $_POST['idPartido'];
        $idLocalidad = $_POST['idLocalidad'];

        // Consulta de actualización
        $stmt = $conexion->prepare("UPDATE partido 
            SET idPartido = ?, idUsuario = ?, idLocalidad = ?
            WHERE idCandidato = ?");
        
        $stmt->bindParam(1, $idPartido);
        $stmt->bindParam(2, $idUsuario);
        $stmt->bindParam(3, $idLocalidad);
        $stmt->bindParam(3, $idCandidato);

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
