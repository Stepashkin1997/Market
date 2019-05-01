CREATE DATABASE  IF NOT EXISTS `market` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */;
USE `market`;
-- MySQL dump 10.13  Distrib 8.0.15, for Win64 (x86_64)
--
-- Host: localhost    Database: market
-- ------------------------------------------------------
-- Server version	8.0.15

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `employee` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `surname` varchar(45) NOT NULL,
  `date_start` date NOT NULL,
  `id_otdel` int(11) DEFAULT NULL,
  `id_position` int(11) DEFAULT NULL,
  `id_specialization` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `for_idx` (`id_otdel`) /*!80000 INVISIBLE */,
  KEY `lol_idx` (`id_specialization`),
  KEY `emp_idx` (`id_position`),
  CONSTRAINT `emppos` FOREIGN KEY (`id_position`) REFERENCES `position` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `empspe` FOREIGN KEY (`id_specialization`) REFERENCES `specialization` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `for_id->id_otdels` FOREIGN KEY (`id_otdel`) REFERENCES `otdels` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (1,'Ivan','Fetcherov','2019-04-04',1,1,1),(2,'Andrey','Popov','2019-04-04',2,1,1),(3,'Alex','Ivanov','2019-04-04',3,1,1),(4,'Alex','Sidorov','2019-04-04',4,1,1),(5,'Nikita','Gorbenko','2019-04-04',5,1,1),(6,'Vlad','Yrov','2019-04-04',6,1,1),(7,'Maria','Petrova','2019-04-04',7,1,1),(8,'Alex','Golodyeva','2019-04-04',5,2,1),(9,'Anastasia','Roshel','2019-04-04',6,2,1),(10,'Svetlana','Volkova','2019-04-04',1,2,1),(11,'Galina','Petrva','2019-04-04',2,2,1),(12,'Yuriy','Fetchenko','2019-04-04',3,2,1),(13,'Konstantin','Zhigalov','2019-04-04',4,2,1),(14,'Vladimir','Kutashov','2019-04-04',7,2,1),(15,'Vitaly','Korshunov','2019-04-05',1,1,1),(16,'Vasilisa','Bryzgalova','2019-04-06',2,1,1),(17,'Mark','Kim','2019-05-01',3,1,1),(18,'Dmitry','Fetchenko','2019-05-03',4,1,1),(19,'Maria','Samoylova','2019-05-24',5,1,1),(20,'Julia','Kim','2019-05-24',6,1,1),(21,'Vasily','Morozko','2019-06-02',7,1,1);
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `otdels`
--

DROP TABLE IF EXISTS `otdels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `otdels` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `id_name_glav` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ggg_idx` (`id_name_glav`),
  CONSTRAINT `for_id->id_name_glav` FOREIGN KEY (`id_name_glav`) REFERENCES `employee` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `otdels`
--

LOCK TABLES `otdels` WRITE;
/*!40000 ALTER TABLE `otdels` DISABLE KEYS */;
INSERT INTO `otdels` VALUES (1,'fish',10),(2,'lactic',11),(3,'bread',12),(4,'alcohol',13),(5,'meat',8),(6,'vegetable',9),(7,'fruits',14);
/*!40000 ALTER TABLE `otdels` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `position`
--

DROP TABLE IF EXISTS `position`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `position` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `position`
--

LOCK TABLES `position` WRITE;
/*!40000 ALTER TABLE `position` DISABLE KEYS */;
INSERT INTO `position` VALUES (1,'consultant'),(2,'manager');
/*!40000 ALTER TABLE `position` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `id_otdel` int(11) DEFAULT NULL,
  `coast` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `for_idx` (`id_otdel`),
  CONSTRAINT `for_otdels.id->id_otdel` FOREIGN KEY (`id_otdel`) REFERENCES `otdels` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'moloko',2,50,200),(2,'bread',3,30,356),(3,'vine',4,700,134),(4,'mango',7,50,45),(5,'orange',7,50,67),(6,'vodka',4,150,115),(7,'beef',5,350,14),(8,'pork',5,300,20),(9,'cheese',2,200,143),(10,'kefi',2,47,178),(11,'ketchup',2,67,89),(12,'mayonnaise',2,123,112),(13,'caviar',1,1000,20),(14,'potato',6,200,20),(15,'tomato',6,100,15),(16,'yogurt',2,67,33),(17,'cucumber',6,33,23),(18,'cookie',3,77,28),(19,'beer',4,81,67),(20,'sausage',2,125,22),(21,'gin',4,700,5),(22,'rum',4,700,5);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchase`
--

DROP TABLE IF EXISTS `purchase`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `purchase` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_product` int(11) DEFAULT NULL,
  `id_otdel` int(11) DEFAULT NULL,
  `data_sale` date NOT NULL,
  `id_employee` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `kek_idx` (`id_product`),
  KEY `purotd_idx` (`id_otdel`),
  KEY `puremp_idx` (`id_employee`),
  CONSTRAINT `puremp` FOREIGN KEY (`id_employee`) REFERENCES `employee` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `purotd` FOREIGN KEY (`id_otdel`) REFERENCES `otdels` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `purpro` FOREIGN KEY (`id_product`) REFERENCES `product` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchase`
--

LOCK TABLES `purchase` WRITE;
/*!40000 ALTER TABLE `purchase` DISABLE KEYS */;
INSERT INTO `purchase` VALUES (1,1,3,'2019-04-04',3),(2,2,4,'2019-04-04',4),(3,3,4,'2019-04-04',4),(4,4,7,'2019-04-04',7),(5,5,7,'2019-04-05',7),(6,6,4,'2019-04-05',4),(7,7,5,'2019-04-05',5),(8,8,5,'2019-04-05',5),(9,9,2,'2019-04-05',2),(10,10,2,'2019-04-06',2),(11,11,2,'2019-04-06',2),(12,12,2,'2019-04-06',2),(13,13,1,'2019-04-07',1),(14,14,6,'2019-04-07',6),(15,15,6,'2019-04-07',6),(16,16,2,'2019-04-07',2),(17,17,6,'2019-04-07',6),(18,18,3,'2019-04-07',3),(19,19,4,'2019-04-08',4),(20,20,2,'2019-04-08',2),(21,21,4,'2019-04-08',4),(22,22,4,'2019-04-08',4),(23,2,4,'2019-04-08',4),(24,6,4,'2019-04-08',4),(25,3,4,'2019-04-09',4),(26,5,7,'2019-04-09',7);
/*!40000 ALTER TABLE `purchase` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `specialization`
--

DROP TABLE IF EXISTS `specialization`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `specialization` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `specialization`
--

LOCK TABLES `specialization` WRITE;
/*!40000 ALTER TABLE `specialization` DISABLE KEYS */;
INSERT INTO `specialization` VALUES (1,'a');
/*!40000 ALTER TABLE `specialization` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-01 19:47:41
