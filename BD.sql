CREATE DATABASE `controle_avisos`;

use 'controle_avisos'


CREATE TABLE `aniversariantes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nomeAniversariante` varchar(45) DEFAULT NULL,
  `dataAniversario` varchar(45) DEFAULT NULL,
  `felicitador` varchar(45) DEFAULT NULL,
  `observacao` varchar(1000) DEFAULT NULL,
  `apresentado` tinyint DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `avisos_gerais` (
  `id` int NOT NULL AUTO_INCREMENT,
  `aviso` varchar(1000) DEFAULT NULL,
  `apresentado` tinyint DEFAULT '0',
  `avisador` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `carta_mudanca` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) DEFAULT NULL,
  `procedencia` varchar(255) DEFAULT NULL,
  `nomearquivo` varchar(255) NOT NULL,
  `tamanhoarquivo` int NOT NULL,
  `tipoarquivo` varchar(255) NOT NULL,
  `apresentado` tinyint DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `carta_recomendacao` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) DEFAULT NULL,
  `procedencia` varchar(255) DEFAULT NULL,
  `nomearquivo` varchar(255) NOT NULL,
  `tamanhoarquivo` int NOT NULL,
  `tipoarquivo` varchar(255) NOT NULL,
  `apresentado` tinyint DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `comunicado_especial` (
  `id` int NOT NULL AUTO_INCREMENT,
  `comunicado` varchar(1000) DEFAULT NULL,
  `remetente` varchar(45) DEFAULT NULL,
  `destinatario` varchar(45) DEFAULT NULL,
  `apresentado` tinyint DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `pedido_oportunidade` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nomePedinte` varchar(45) DEFAULT NULL,
  `oportunidade` varchar(100) DEFAULT NULL,
  `observacoes` varchar(100) DEFAULT NULL,
  `apresentado` tinyint DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `pedido_oracao` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nomePedinte` varchar(100) DEFAULT NULL,
  `nomeFavorecido` varchar(100) DEFAULT NULL,
  `apresentado` tinyint DEFAULT '0',
  `observacoes` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `visitantes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) NOT NULL,
  `procedencia` varchar(45) DEFAULT NULL,
  `apresentado` tinyint DEFAULT '0',
  `convidante` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;