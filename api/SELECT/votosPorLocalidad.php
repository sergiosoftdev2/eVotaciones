<?php

    require_once("../conexion.php");

    try {
        $conexion = conectarDB();

        $idEleccion = $_POST['idEleccion'];
    
        // Consulta a la base de datos: contamos los votos por idLocalidad y partido
        $stmt = $conexion->prepare("
            SELECT idLocalidad, idPartido, COUNT(*) as num_votos
            FROM voto 
            WHERE idEleccion = ? 
            GROUP BY idLocalidad, idPartido
            ORDER BY idLocalidad;
        ");

        $stmt->bindParam(1, $idEleccion);
        $stmt->execute();  // Sin parámetros aquí
    
        if ($stmt->rowCount() > 0) {
            $datos = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($datos);
        } else {
            echo json_encode(['error' => 'No se encontraron votos']);
        }
    } catch (PDOException $e) {
        echo json_encode(['error' => $e->getMessage()]);
    }

?>
