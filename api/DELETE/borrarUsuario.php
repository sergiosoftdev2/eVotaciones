<?php
    require_once("../conexion.php");
    header('Content-Type: application/json');

    try {
        $conexion = conectarDB();
        $idCenso = $_POST['idCenso'];
    
        // Primero elimina las filas dependientes en la tabla 'votousuarioeleccion'
        $stmt = $conexion->prepare("DELETE FROM votousuarioeleccion WHERE idUsuario = (SELECT idUsuario FROM usuario WHERE idCenso = ?)");
        $stmt->bindParam(1, $idCenso);
        $stmt->execute();
    
        // Ahora elimina el usuario
        $stmt = $conexion->prepare("DELETE FROM usuario WHERE idCenso = ?");
        $stmt->bindParam(1, $idCenso);
        $stmt->execute();
    
        if ($stmt->rowCount() > 0) {
            echo json_encode(["success" => true]);
        } else {
            echo json_encode(['message' => 'No data found']);
        }
    } catch (PDOException $e) {
        echo json_encode(['error' => $e->getMessage()]);
    }

    exit();
?>
