<?php
    require_once("../conexion.php");
    header('Content-Type: application/json');

    try {
        $conexion = conectarDB();

        // Obtiene los datos del formulario
        $idCenso = $_POST['idCenso'];
        $mail = $_POST["mail"];

        // Consulta de actualización
        $stmt = $conexion->prepare("UPDATE censo SET email = ? WHERE idCenso = ?");
        
        $stmt->bindParam(1, $mail);
        $stmt->bindParam(2, $idCenso);

        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            echo json_encode(["success" => true, "message" => "Datos actualizados correctamente"]);
        } else {
            echo json_encode(["success" => false, "message" => "No se realizaron cambios", "datos" => $_POST]);
        }
    } catch (PDOException $e) {
        echo json_encode(['error' => $e->getMessage(), "datos" => $_POST]);
    }
?>
