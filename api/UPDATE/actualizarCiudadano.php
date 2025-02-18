<?php
    require_once("../conexion.php");
    header('Content-Type: application/json');

    try {
        $conexion = conectarDB();

        // Obtiene los datos del formulario
        $idCenso = $_POST['idCenso'];
        $dni = $_POST['dni'];
        $nombre = $_POST['nombre'];
        $apellido = $_POST['apellido'];
        $email = $_POST['email'];
        $fechaNacimiento = $_POST['fechaNacimiento'];
        $idLocalidad = $_POST['idLocalidad'];

        // Consulta de actualización
        $stmt = $conexion->prepare("UPDATE censo 
            SET dni = ?, nombre = ?, apellido = ?, email = ?, fechaNacimiento = ?, idLocalidad = ?
            WHERE idCenso = ?");
        
        $stmt->bindParam(1, $dni);
        $stmt->bindParam(2, $nombre);
        $stmt->bindParam(3, $apellido);
        $stmt->bindParam(4, $email);
        $stmt->bindParam(5, $fechaNacimiento);
        $stmt->bindParam(6, $idLocalidad);
        $stmt->bindParam(7, $idCenso);

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
