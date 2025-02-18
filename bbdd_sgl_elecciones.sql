CREATE TABLE `candidato` (
  `idCandidato` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `idPartido` int(11) NOT NULL,
  `idLocalidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `censo`
--

CREATE TABLE `censo` (
  `idCenso` int(11) NOT NULL,
  `dni` varchar(9) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `fechaNacimiento` date NOT NULL,
  `idLocalidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `censo`
--

INSERT INTO `censo` (`idCenso`, `dni`, `nombre`, `apellido`, `email`, `fechaNacimiento`, `idLocalidad`) VALUES
(1, '12345678A', 'Carlos', 'Gómez', 'carlos.gomez@example.com', '1990-05-15', 5),
(5, '32165498E', 'Yolanda', 'Ruiz', 'alejandro.ruiz@example.com', '1988-12-01', 1),
(69, '78805988Y', 'Manolo', 'Lama', 'manolo@gmail.com', '1977-06-17', 12),
(73, '67798544P', 'Juan', 'Cuesta', 'juancuesta@gmail.com', '1973-02-25', 18),
(74, '67790999Ñ', 'Fermin', 'Trujillo', 'fermin@gmail.com', '1966-08-30', 48),
(76, '56607899P', 'Pedro', 'Sanchez', 'felipe@gmail.com', '1992-02-12', 21),
(77, '11111111A', 'Administrador', 'Administrador', 'admin@admin.com', '1999-12-17', 15),
(78, '89976543R', 'Manolo', 'Escobar', 'manoloescobar@gmail.com', '1988-06-25', 16),
(79, '47856255P', 'Alejandro', 'Carmona', 'alejhandro@papa.com', '1999-12-17', 46),
(95, '11111154C', 'María', 'García', 'maria.garcia@example.com', '1990-05-15', 5),
(96, '22222222B', 'Juan', 'Pérez', 'juan.perez@example.com', '1988-12-01', 1),
(97, '33333333C', 'Ana', 'López', 'ana.lopez@example.com', '1977-06-17', 12),
(98, '44444444D', 'Carlos', 'Sánchez', 'carlos.sanchez@example.com', '1973-02-25', 18),
(99, '55555555E', 'Sofía', 'Rodríguez', 'sofia.rodriguez@example.com', '1966-08-30', 48),
(100, '66666666F', 'Miguel', 'Díaz', 'miguel.diaz@example.com', '1992-02-12', 21),
(101, '77777777G', 'Elena', 'Fernández', 'elena.fernandez@example.com', '1999-12-17', 15),
(102, '88888888H', 'Pedro', 'Gómez', 'pedro.gomez@example.com', '1988-06-25', 16),
(103, '99999999I', 'Isabel', 'Martínez', 'isabel.martinez@example.com', '1999-12-17', 46),
(104, '10101010J', 'David', 'Ruiz', 'david.ruiz@example.com', '1985-03-20', 10),
(105, '12121212K', 'Lucía', 'García', 'lucia.garcia@example.com', '1995-07-15', 5),
(106, '13131313L', 'Javier', 'Pérez', 'javier.perez@example.com', '1980-11-02', 15),
(107, '14141414M', 'Carmen', 'López', 'carmen.lopez@example.com', '1970-04-08', 8),
(108, '15151515N', 'Raúl', 'Sánchez', 'raul.sanchez@example.com', '1998-09-19', 33),
(109, '16161616O', 'Marta', 'Rodríguez', 'marta.rodriguez@example.com', '1962-01-26', 2),
(110, '85371902T', 'Laura', 'García', 'laura.garcia@example.com', '1995-03-10', 7),
(111, '39746128S', 'Pablo', 'Martínez', 'pablo.martinez@example.com', '1982-07-22', 11),
(112, '51829347Q', 'Carla', 'Fernández', 'carla.fernandez@example.com', '1979-11-05', 25),
(113, '96403581P', 'Mario', 'González', 'mario.gonzalez@example.com', '1991-04-18', 18),
(114, '27518469O', 'Alicia', 'Sánchez', 'alicia.sanchez@example.com', '1987-09-01', 9),
(115, '63925708N', 'Javier', 'Rodríguez', 'javier.rodriguez@example.com', '1974-06-12', 3),
(116, '14036829M', 'Elena', 'Díaz', 'elena.diaz@example.com', '1998-12-28', 15),
(117, '78159240L', 'Sergio', 'Pérez', 'sergio.perez@example.com', '1983-08-15', 22),
(118, '41260358K', 'Isabel', 'Gómez', 'isabel.gomez@example.com', '1976-02-09', 1),
(119, '85371902J', 'David', 'López', 'david.lopez@example.com', '1993-05-25', 12),
(120, '39746128I', 'Raquel', 'Suárez', 'raquel.suarez@example.com', '1980-10-30', 20),
(121, '51829347H', 'Álvaro', 'Ruiz', 'alvaro.ruiz@example.com', '1996-07-03', 8),
(122, '96403581G', 'Marta', 'García', 'marta.garcia@example.com', '1971-03-17', 5),
(123, '27518469F', 'Adrián', 'Martínez', 'adrian.martinez@example.com', '1989-11-21', 19),
(124, '63925708E', 'Paula', 'Fernández', 'paula.fernandez@example.com', '1978-08-07', 14),
(125, '14036829D', 'Daniel', 'González', 'daniel.gonzalez@example.com', '1992-04-14', 2),
(126, '78159240C', 'Sofía', 'Sánchez', 'sofia.sanchez@example.com', '1997-12-01', 17),
(127, '41260358B', 'Alejandro', 'Rodríguez', 'alejandro.rodriguez@example.com', '1984-09-08', 21),
(128, '85371902A', 'Carmen', 'Díaz', 'carmen.diaz@example.com', '1975-05-19', 10),
(129, '39746128Z', 'Jorge', 'Pérez', 'jorge.perez@example.com', '1990-06-26', 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comunidadautonoma`
--

CREATE TABLE `comunidadautonoma` (
  `idComunidad` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `comunidadautonoma`
--

INSERT INTO `comunidadautonoma` (`idComunidad`, `nombre`) VALUES
(1, 'Andalucía'),
(2, 'Aragón'),
(3, 'Asturias'),
(5, 'Canarias'),
(6, 'Cantabria'),
(7, 'Castilla y León'),
(8, 'Castilla-La Mancha'),
(9, 'Cataluña'),
(17, 'Comunidad Valenciana'),
(10, 'Extremadura'),
(11, 'Galicia'),
(4, 'Islas Baleares'),
(15, 'La Rioja'),
(12, 'Madrid'),
(13, 'Murcia'),
(14, 'Navarra'),
(16, 'País Vasco');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `eleccion`
--

CREATE TABLE `eleccion` (
  `idEleccion` int(11) NOT NULL,
  `tipo` enum('autonomica','general') NOT NULL,
  `estado` enum('abierta','cerrada','finalizada') NOT NULL,
  `fechaInicio` date NOT NULL,
  `fechaFin` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `localidad`
--

CREATE TABLE `localidad` (
  `idLocalidad` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `idComunidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `localidad`
--

INSERT INTO `localidad` (`idLocalidad`, `nombre`, `idComunidad`) VALUES
(1, 'Sevilla', 1),
(2, 'Málaga', 1),
(3, 'Granada', 1),
(4, 'Zaragoza', 2),
(5, 'Huesca', 2),
(6, 'Teruel', 2),
(7, 'Oviedo', 3),
(8, 'Gijón', 3),
(9, 'Avilés', 3),
(10, 'Palma', 4),
(11, 'Ibiza', 4),
(12, 'Menorca', 4),
(13, 'Las Palmas de Gran Canaria', 5),
(14, 'Santa Cruz de Tenerife', 5),
(15, 'La Laguna', 5),
(16, 'Santander', 6),
(17, 'Torrelavega', 6),
(18, 'Castro Urdiales', 6),
(19, 'Valladolid', 7),
(20, 'Burgos', 7),
(21, 'Salamanca', 7),
(22, 'Toledo', 8),
(23, 'Albacete', 8),
(24, 'Ciudad Real', 8),
(25, 'Barcelona', 9),
(26, 'Tarragona', 9),
(27, 'Girona', 9),
(28, 'Badajoz', 10),
(29, 'Cáceres', 10),
(30, 'Mérida', 10),
(31, 'A Coruña', 11),
(32, 'Vigo', 11),
(33, 'Santiago de Compostela', 11),
(34, 'Madrid', 12),
(35, 'Alcalá de Henares', 12),
(36, 'Getafe', 12),
(37, 'Murcia', 13),
(38, 'Cartagena', 13),
(39, 'Lorca', 13),
(40, 'Pamplona', 14),
(41, 'Tudela', 14),
(42, 'Estella', 14),
(43, 'Logroño', 15),
(44, 'Calahorra', 15),
(45, 'Arnedo', 15),
(46, 'Bilbao', 16),
(47, 'San Sebastián', 16),
(48, 'Vitoria', 16),
(49, 'Valencia', 17),
(50, 'Alicante', 17),
(51, 'Castellón de la Plana', 17);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `partido`
--

CREATE TABLE `partido` (
  `idPartido` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `siglas` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `partido`
--

INSERT INTO `partido` (`idPartido`, `nombre`, `siglas`) VALUES
(2, 'Partido Popular', 'PP'),
(4, 'Unidas Podemos', 'UP'),
(5, 'Ciudadanos Malos', 'Cs'),
(6, 'Esquerra Republicana de Catalunya a', 'ERC'),
(7, 'Junts', 'JxCat'),
(8, 'Partido Nacionalista Vasco', 'PNV'),
(10, 'Coalición Canaria', 'CC'),
(12, 'Se acabo la fiesta', 'SALF'),
(13, 'BILDU', 'Bildu Bild'),
(14, 'Partido Socialista Obrero Español', 'PSOE'),
(15, 'YO LO VALGO', 'YEAH');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `resultado`
--

CREATE TABLE `resultado` (
  `idResultado` int(11) NOT NULL,
  `idEleccion` int(11) NOT NULL,
  `idPartido` int(11) NOT NULL,
  `votosObtenidos` int(11) DEFAULT 0,
  `escañosObtenidos` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `idUsuario` int(11) NOT NULL,
  `idCenso` int(11) NOT NULL,
  `password` varchar(255) NOT NULL,
  `rol` enum('administrador','censista','votante','candidato') NOT NULL,
  `haVotado` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`idUsuario`, `idCenso`, `password`, `rol`, `haVotado`) VALUES
(44, 1, '$2y$10$o2inoN7xVuQTmAVD9y5Lc.VfD.cfPVMEcqRvuvy8KPQ8tUCoijiUK', 'censista', 0),
(50, 5, '$2y$10$OEeHTZ7Ar1UqkhtpjSpNr.NFTSCHIuk9NaY3bCazJgSRChwinJhAS', 'votante', 0),
(51, 69, '$2y$10$32/eLGu5GxpWhDpAvBIa8eCd6SCjZ9WDZo5vqvG.u3mWwq4ezVk3W', 'votante', 0),
(52, 73, '$2y$10$8mWsTeOX0teVNtLpdHruyehYKXlZf9viOEZAmxCw1p0ilMFmzLJ/G', 'votante', 0),
(53, 74, '$2y$10$a5JtgfgnxWDNt6iaZl3W5egV0CuNOEeAiWhmFUyydYg3/4EijOXI2', 'votante', 0),
(54, 77, '$2y$10$wXAlsKQVyP9R6UHiCImGDuz9aFkZYplODeBsUc0mc8Ley9P1DJs8C', 'administrador', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `voto`
--

CREATE TABLE `voto` (
  `idVoto` int(11) NOT NULL,
  `idEleccion` int(11) NOT NULL,
  `idPartido` int(11) NOT NULL,
  `idLocalidad` int(11) NOT NULL,
  `fechaHora` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `candidato`
--
ALTER TABLE `candidato`
  ADD PRIMARY KEY (`idCandidato`),
  ADD KEY `idUsuario` (`idUsuario`),
  ADD KEY `idPartido` (`idPartido`),
  ADD KEY `idLocalidad` (`idLocalidad`);

--
-- Indices de la tabla `censo`
--
ALTER TABLE `censo`
  ADD PRIMARY KEY (`idCenso`),
  ADD UNIQUE KEY `dni` (`dni`),
  ADD KEY `idLocalidad` (`idLocalidad`);

--
-- Indices de la tabla `comunidadautonoma`
--
ALTER TABLE `comunidadautonoma`
  ADD PRIMARY KEY (`idComunidad`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `eleccion`
--
ALTER TABLE `eleccion`
  ADD PRIMARY KEY (`idEleccion`),
  ADD UNIQUE KEY `tipo` (`tipo`,`fechaInicio`,`fechaFin`);

--
-- Indices de la tabla `localidad`
--
ALTER TABLE `localidad`
  ADD PRIMARY KEY (`idLocalidad`),
  ADD KEY `idComunidad` (`idComunidad`);

--
-- Indices de la tabla `partido`
--
ALTER TABLE `partido`
  ADD PRIMARY KEY (`idPartido`),
  ADD UNIQUE KEY `nombre` (`nombre`),
  ADD UNIQUE KEY `siglas` (`siglas`);

--
-- Indices de la tabla `resultado`
--
ALTER TABLE `resultado`
  ADD PRIMARY KEY (`idResultado`),
  ADD KEY `idEleccion` (`idEleccion`),
  ADD KEY `idPartido` (`idPartido`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`idUsuario`),
  ADD KEY `idCenso` (`idCenso`);

--
-- Indices de la tabla `voto`
--
ALTER TABLE `voto`
  ADD PRIMARY KEY (`idVoto`),
  ADD KEY `idPartido` (`idPartido`),
  ADD KEY `idLocalidad` (`idLocalidad`),
  ADD KEY `idEleccion` (`idEleccion`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `candidato`
--
ALTER TABLE `candidato`
  MODIFY `idCandidato` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `censo`
--
ALTER TABLE `censo`
  MODIFY `idCenso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=130;

--
-- AUTO_INCREMENT de la tabla `comunidadautonoma`
--
ALTER TABLE `comunidadautonoma`
  MODIFY `idComunidad` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `eleccion`
--
ALTER TABLE `eleccion`
  MODIFY `idEleccion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `localidad`
--
ALTER TABLE `localidad`
  MODIFY `idLocalidad` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT de la tabla `partido`
--
ALTER TABLE `partido`
  MODIFY `idPartido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `resultado`
--
ALTER TABLE `resultado`
  MODIFY `idResultado` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT de la tabla `voto`
--
ALTER TABLE `voto`
  MODIFY `idVoto` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `candidato`
--
ALTER TABLE `candidato`
  ADD CONSTRAINT `candidato_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE CASCADE,
  ADD CONSTRAINT `candidato_ibfk_2` FOREIGN KEY (`idPartido`) REFERENCES `partido` (`idPartido`) ON DELETE CASCADE,
  ADD CONSTRAINT `candidato_ibfk_3` FOREIGN KEY (`idLocalidad`) REFERENCES `localidad` (`idLocalidad`) ON DELETE CASCADE;

--
-- Filtros para la tabla `censo`
--
ALTER TABLE `censo`
  ADD CONSTRAINT `censo_ibfk_1` FOREIGN KEY (`idLocalidad`) REFERENCES `localidad` (`idLocalidad`) ON DELETE CASCADE;

--
-- Filtros para la tabla `localidad`
--
ALTER TABLE `localidad`
  ADD CONSTRAINT `localidad_ibfk_1` FOREIGN KEY (`idComunidad`) REFERENCES `comunidadautonoma` (`idComunidad`) ON DELETE CASCADE;

--
-- Filtros para la tabla `resultado`
--
ALTER TABLE `resultado`
  ADD CONSTRAINT `resultado_ibfk_1` FOREIGN KEY (`idEleccion`) REFERENCES `eleccion` (`idEleccion`) ON DELETE CASCADE,
  ADD CONSTRAINT `resultado_ibfk_2` FOREIGN KEY (`idPartido`) REFERENCES `partido` (`idPartido`) ON DELETE CASCADE;

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`idCenso`) REFERENCES `censo` (`idCenso`) ON DELETE CASCADE;

--
-- Filtros para la tabla `voto`
--
ALTER TABLE `voto`
  ADD CONSTRAINT `voto_ibfk_1` FOREIGN KEY (`idPartido`) REFERENCES `partido` (`idPartido`) ON DELETE CASCADE,
  ADD CONSTRAINT `voto_ibfk_2` FOREIGN KEY (`idLocalidad`) REFERENCES `localidad` (`idLocalidad`) ON DELETE CASCADE,
  ADD CONSTRAINT `voto_ibfk_3` FOREIGN KEY (`idEleccion`) REFERENCES `eleccion` (`idEleccion`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
