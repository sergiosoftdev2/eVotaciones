<?php

    require_once("../conexion.php");

    try {
        $conexion = conectarDB();

        $idEleccion = $_POST['idEleccion'];
        $idLocalidad = $_POST['idLocalidad'];
        $idPartido = $_POST['idPartido'];
    
        // Consulta a la base de datos: contamos los votos por idLocalidad y partido
        $stmt = $conexion->prepare("
            SELECT * FROM candidato WHERE eleccionAsociada = ? AND idLocalidad = ? AND idPartido = ? ORDER BY numeroCandidato ASC");

        $stmt->bindParam(1, $idEleccion);
        $stmt->bindParam(2, $idLocalidad);
        $stmt->bindParam(3, $idPartido);
        
        $stmt->execute();  // Sin parámetros aquí
    
        if ($stmt->rowCount() > 0) {
            $datos = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($datos[0]);
        } else {
            echo json_encode(['error' => 'No se encontraron votos']);
        }
    } catch (PDOException $e) {
        echo json_encode(['error' => $e->getMessage()]);
    }

?>
