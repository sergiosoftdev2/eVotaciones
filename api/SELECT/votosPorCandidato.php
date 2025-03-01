<?php

    require_once("../conexion.php");

    try {
        $conexion = conectarDB();

        $idEleccion = $_POST['idEleccion'];
    
        // Consulta a la base de datos: contar votos por candidato
        $stmt = $conexion->prepare("
            SELECT idEleccion, idPartido, idLocalidad, idCandidato, COUNT(*) AS total_votos
            FROM voto 
            WHERE idEleccion = ? 
            GROUP BY idCandidato 
            ORDER BY total_votos DESC;
        ");
        $stmt->bindParam(1, $idEleccion);
        $stmt->execute();  // Ejecutar la consulta
    
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
