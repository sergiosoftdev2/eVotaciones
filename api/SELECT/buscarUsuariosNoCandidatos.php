<?php
require_once("../conexion.php");
header('Content-Type: application/json');

try {
    $conexion = conectarDB();

    $stmt = $conexion->prepare("
        SELECT u.*
        FROM usuario u
        WHERE NOT EXISTS (
            SELECT 1
            FROM candidato c
            WHERE c.idUsuario = u.idUsuario
        )
    ");
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        $datos = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($datos);
    } else {
        echo json_encode(['message' => 'No se encontraron usuarios que no estén en la tabla candidatos.']);
    }

} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}

exit();
?>