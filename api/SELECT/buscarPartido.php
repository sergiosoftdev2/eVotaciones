<?php
    require_once("../conexion.php");
    header('Content-Type: application/json');

    try {
        $conexion = conectarDB();
        
        // Recibir el dni desde la solicitud POST
        $idPartido = $_POST['idPartido'];

        // Consulta a la base de datos
        $stmt = $conexion->prepare("SELECT * FROM partido WHERE idPartido = ?");
        $stmt->bindParam(1, $idPartido);
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
