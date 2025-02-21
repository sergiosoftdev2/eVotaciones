<?php
    require_once("../conexion.php");
    header('Content-Type: application/json');

    try {
        $conexion = conectarDB();

        $idUsuario = (int)$_POST['idUsuario'];
        $idEleccion = (int)$_POST['idEleccion'];

        if (!isset($_POST['idUsuario']) || !isset($_POST['idEleccion'])) {
            echo json_encode(['error' => 'Faltan parámetros requeridos']);
            exit();
        }


        // Consulta a la base de datos
        $stmt = $conexion->prepare("SELECT * FROM votousuarioeleccion WHERE idUsuario = ? AND idEleccion = ?");
        $stmt->bindParam(1, $idUsuario);
        $stmt->bindParam(2, $idEleccion);
        $stmt->execute();
        
        // Comprobamos si hay resultados
        if ($stmt->rowCount() > 0) {
            // Si se encuentran datos, los devolvemos como JSON
            $datos = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($datos);
        } else {
            // Si no se encuentran datos, devolvemos un array vacío
            echo json_encode(["state" => false, "idusuario" => $idUsuario, "idEleccion" => $idEleccion]);
        }
    } catch (PDOException $e) {
        // Si ocurre un error, lo capturamos y devolvemos el mensaje como JSON
        echo json_encode(['error' => $e->getMessage()]);
    }

    exit();
?>