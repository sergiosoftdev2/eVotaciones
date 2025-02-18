<?php
require_once("../conexion.php");
header('Content-Type: application/json');

try {
    $conexion = conectarDB();

    // Recibir el idUsuario desde la solicitud POST
    $idUsuario = $_POST['idUsuario'];

    // Consulta a la base de datos
    $stmt = $conexion->prepare("
        SELECT c.* 
        FROM censo c
        INNER JOIN usuarios u ON c.idCenso = u.idCenso
        WHERE u.idUsuario = ?
    ");
    $stmt->bindParam(1, $idUsuario);
    $stmt->execute();

    // Comprobamos si hay resultados
    if ($stmt->rowCount() > 0) {
        // Si se encuentran datos, los devolvemos como JSON
        $datos = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($datos);
    } else {
        // Si no se encuentran datos, devolvemos un array vacío o un mensaje
        echo json_encode(['message' => 'No se encontraron datos para este usuario.']); 
        // O: echo json_encode([]); // Un array vacío
    }

} catch (PDOException $e) {
    // Si ocurre un error, lo capturamos y devolvemos el mensaje como JSON
    echo json_encode(['error' => $e->getMessage()]);
}

exit();
?>