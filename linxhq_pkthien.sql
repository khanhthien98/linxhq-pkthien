-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: localhost    Database: linxhq_pkthien
-- ------------------------------------------------------
-- Server version	8.0.25

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `leave_request`
--

DROP TABLE IF EXISTS `leave_request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `leave_request` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) DEFAULT NULL,
  `email` varchar(300) DEFAULT NULL,
  `start_leave` varchar(300) DEFAULT NULL,
  `end_leave` varchar(300) DEFAULT NULL,
  `reason` text,
  `confirm_person` varchar(200) DEFAULT NULL,
  `status` varchar(100) DEFAULT 'Chờ phê duyệt',
  `created_date` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leave_request`
--

LOCK TABLES `leave_request` WRITE;
/*!40000 ALTER TABLE `leave_request` DISABLE KEYS */;
INSERT INTO `leave_request` VALUES (1,'Phạm Khánh Thiện','pkthien.it@gmail.com','25/07/2021 00:00:00','25/07/2021 03:00:00','Tiêm vaccine','Thiện','Phê duyệt','26/07/2021 20:00:00'),(2,'Nguyễn Thành Trung','trungtt96@gmail.com','25/07/2021 00:00:00','25/07/2021 03:00:00','Đi khám sức khoẻ','Thiện','Phê duyệt','26/7/2021 23:44:23'),(3,'Phạm Khánh Thiện','pkthien.it@gmail.com','25/07/2021 00:00:00','25/07/2021 05:00:00','Đi chơi','Thiện','Từ chối','27/7/2021 00:01:12'),(4,'Phạm Khánh Thiện','pkthien.it@gmail.com','25/07/2021 00:00:00','25/07/2021 03:00:00','Xem bóng đá','Thiện','Chờ phê duyệt','28/7/2021 23:08:12'),(5,'Phạm Khánh Thiện','pkthien.it@gmail.com','25/07/2021 00:00:00','25/07/2021 01:00:00','Đón con','Thiện','Từ chối','25/7/2021 1:18:36'),(6,'Phạm Khánh Thiện','pkthien.it@gmail.com','25/07/2021 06:00:00','25/07/2021 13:00:00','Ốm','Thiện','Phê duyệt','25/7/2021 01:23:35'),(7,'Phạm Khánh Thiện','pkthien.it@gmail.com','25/07/2021 00:00:03','25/07/2021 01:01:01','Ốm','Thiện','Từ chối','25/7/2021 01:27:38');
/*!40000 ALTER TABLE `leave_request` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-07-31 19:52:51
