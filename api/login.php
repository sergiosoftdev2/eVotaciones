<?php
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);

    require_once("conexion.php");
    header('Content-Type: application/json');

    try {
        $conexion = conectarDB();
    
        $idCenso = isset($_POST['idCenso']) ? (int) $_POST['idCenso'] : 0;
        $password = isset($_POST['contrasena']) ? $_POST['contrasena'] : '';
    
        if (!$idCenso || !$password) {
            echo json_encode(['error' => 'Datos incompletos']);
            exit;
        }
    
        // Consulta a la base de datos
        $stmt = $conexion->prepare("SELECT * FROM usuario WHERE idCenso = ?");
        $stmt->execute([$idCenso]);
    
        if ($stmt->rowCount() > 0) {
            $datos = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            
            if (password_verify($password, $datos[0]['password'])) {
                echo json_encode(["success" => true, "datos" => $datos]);
            } else {
                echo json_encode(["success" => false, "contraseña" => $password, "error" => "Contraseña incorrecta"]);
            }
        } else {
            echo json_encode(['error' => 'Usuario no encontrado']);
        }
    } catch (PDOException $e) {
        echo json_encode(['error' => $e->getMessage()]);
    }
    
?>
