<?php
    require_once("../conexion.php");
    header('Content-Type: application/json');

    try {
        $conexion = conectarDB();
        
        // Recibir el dni desde la solicitud POST
        $comunidad = $_POST['comunidad'];

        // Consulta a la base de datos
        $stmt = $conexion->prepare("
            SELECT e.* 
            FROM escanos e
            JOIN localidad l ON e   .idLocalidad = l.idLocalidad
            JOIN comunidadautonoma co ON l.idComunidad = co.idComunidad
            WHERE co.idComunidad = ?
        ");

        $stmt->bindParam(1, $comunidad, PDO::PARAM_INT);
        $stmt->execute();
        
        // Comprobamos si hay resultados
        if ($stmt->rowCount() > 0) {
            // Si se encuentran datos, los devolvemos como JSON
            $datos = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($datos);
        } else {
            // Si no se encuentran datos, devolvemos un array vacío
            echo json_encode(['message' => 'No data found']);
        }
    } catch (PDOException $e) {
        // Si ocurre un error, lo capturamos y devolvemos el mensaje como JSON
        echo json_encode(['error' => $e->getMessage()]);
    }

    exit();
?>
