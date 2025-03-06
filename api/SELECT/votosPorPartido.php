<?php

require_once("../conexion.php");

try {
    $conexion = conectarDB();

    $idEleccion = $_POST['idEleccion'];
    $idLocalidad = isset($_POST['idLocalidad']) ? (int) $_POST['idLocalidad'] : null; // Convertir a entero para evitar problemas

    // Construir la consulta SQL dependiendo de si idLocalidad está presente y mayor que 0
    if ($idLocalidad !== null && $idLocalidad > 0) {
        $sql = "SELECT idPartido, COUNT(*) AS total_votos 
                FROM voto 
                WHERE idEleccion = ? AND idLocalidad = ? 
                GROUP BY idPartido 
                ORDER BY total_votos DESC;";
    } else {
        $sql = "SELECT idPartido, COUNT(*) AS total_votos 
                FROM voto 
                WHERE idEleccion = ? 
                GROUP BY idPartido 
                ORDER BY total_votos DESC;";
    }

    // Preparar la consulta después de definir $sql
    $stmt = $conexion->prepare($sql);

    // Bind de parámetros según si existe idLocalidad y es válida
    if ($idLocalidad !== null && $idLocalidad > 0) {
        $stmt->bindParam(1, $idEleccion, PDO::PARAM_INT);
        $stmt->bindParam(2, $idLocalidad, PDO::PARAM_INT);
    } else {
        $stmt->bindParam(1, $idEleccion, PDO::PARAM_INT);
    }

    $stmt->execute();
    
    if ($stmt->rowCount() > 0) {
        $datos = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($datos);
    } else {
        echo json_encode(['error' => 'No se encontraron votos', 'idLocalidad' => $idLocalidad]);
    }

} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}

?>