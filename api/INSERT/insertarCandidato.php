<?php
    require_once("../conexion.php");
    header('Content-Type: application/json');


    try {
        $conexion = conectarDB();

        $idUsuario = $_POST['idUsuario'];
        $idPartido = $_POST['idPartido'];
        $idLocalidad = $_POST['idLocalidad'];
        $numeroCandidato = $_POST['numeroCandidato'];
        $eleccionAsocidada = $_POST["eleccionAsociada"];
    
        // Consulta a la base de datos
        $stmt = $conexion->prepare("INSERT INTO candidato (idUsuario, idPartido, idLocalidad, numeroCandidato) VALUES (?, ?, ?, ?, ?)");
        $stmt->bindParam(1, $idUsuario);
        $stmt->bindParam(2, $idPartido);
        $stmt->bindParam(3, $idLocalidad);
        $stmt->bindParam(4, $eleccionAsociada);
        $stmt->bindParam(5, $numeroCandidato);
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