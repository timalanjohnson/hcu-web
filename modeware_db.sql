-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Oct 30, 2019 at 06:43 PM
-- Server version: 5.7.26
-- PHP Version: 7.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `modeware_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_horse`
--

DROP TABLE IF EXISTS `tbl_horse`;
CREATE TABLE IF NOT EXISTS `tbl_horse` (
  `HorseID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(45) DEFAULT NULL,
  `Age` varchar(255) DEFAULT NULL,
  `isDesceased` tinyint(4) NOT NULL DEFAULT '0',
  `mircochipCode` varchar(45) DEFAULT NULL,
  `Breed` varchar(255) DEFAULT NULL,
  `Colour` varchar(255) DEFAULT NULL,
  `FoundBy` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`HorseID`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_horse`
--

INSERT INTO `tbl_horse` (`HorseID`, `Name`, `Age`, `isDesceased`, `mircochipCode`, `Breed`, `Colour`, `FoundBy`) VALUES
(14, 'Takkies', '6', 0, '123456789', 'Horse Breed', 'Brown', 'James'),
(18, 'Nike', '8', 0, '123456789', 'hanoverian', 'bay', 'thomas'),
(19, 'James', '8', 0, '123456789', 'hanoverian', 'bay', 'thomas'),
(20, 'Fox', '12', 1, '987654321', 'Some Race Horse Breed', 'bay', 'Michael'),
(21, 'Tea', '21', 0, '258369147', 'Ford', 'White', 'Michael'),
(22, 'Takkies', '6', 0, '123456789', 'Horse Breed', 'Brown', 'James the Great');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_horse_history`
--

DROP TABLE IF EXISTS `tbl_horse_history`;
CREATE TABLE IF NOT EXISTS `tbl_horse_history` (
  `HorseHistoryID` int(11) NOT NULL AUTO_INCREMENT,
  `HorseID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  `AdmissionDate` date NOT NULL,
  `DischargeDate` date DEFAULT NULL,
  `Note` varchar(255) NOT NULL,
  `Owner` varchar(255) NOT NULL,
  `Gender` varchar(255) NOT NULL,
  `Weight` int(11) NOT NULL,
  `Height` int(11) NOT NULL,
  `HorseCondition` varchar(255) NOT NULL,
  `treatment` varchar(255) NOT NULL,
  `Carer` varchar(255) NOT NULL,
  `UpdateTimeStamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`HorseHistoryID`),
  KEY `HorseID` (`HorseID`),
  KEY `HorseID_2` (`HorseID`),
  KEY `UserIDFK` (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=88 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_horse_history`
--

INSERT INTO `tbl_horse_history` (`HorseHistoryID`, `HorseID`, `UserID`, `AdmissionDate`, `DischargeDate`, `Note`, `Owner`, `Gender`, `Weight`, `Height`, `HorseCondition`, `treatment`, `Carer`, `UpdateTimeStamp`, `Image`) VALUES
(1, 14, 1, '2019-10-21', NULL, 'Pay Boet', 'Tim', 'Horse Gender', 500, 175, 'Poor', 'Money', '', '2019-10-22 11:45:40', NULL),
(3, 14, 1, '2019-10-21', NULL, 'Pay Boet', 'Tim', 'Horse Gender', 500, 175, 'Better', 'Money', 'James', '2019-10-22 14:42:37', NULL),
(65, 14, 1, '2019-10-21', NULL, '17891235 FNB Please send POP', 'Tim', 'Horse Gender', 500, 175, 'Fixed', 'Money', 'James', '2019-10-22 15:08:02', NULL),
(66, 18, 1, '2019-10-22', NULL, 'I need a cheque', 'Some Old Guy', 'gelding', 500, 160, 'poor', 'put on drip and pain killers for discomfort.', 'Michael', '2019-10-22 21:36:07', NULL),
(67, 19, 1, '2019-10-22', NULL, 'I need a cheque', 'Some Old Guy', 'gelding', 500, 160, 'poor', 'put on drip and pain killers for discomfort.', 'Michael', '2019-10-22 21:38:00', NULL),
(68, 19, 1, '2019-10-22', NULL, 'I need a cheque', 'Some Old Guy', 'gelding', 500, 160, 'poor', 'put on drip and pain killers for discomfort.', 'Michael', '2019-10-22 21:38:13', NULL),
(69, 14, 1, '2019-10-21', '2019-10-28', 'Thanks for the Payment', 'Tim', 'Horse Gender', 500, 175, 'Fixed', 'Money', 'James', '2019-10-22 23:23:36', NULL),
(70, 19, 1, '2019-10-22', '2019-10-23', 'I need a cheque', 'Some Old Guy', 'gelding', 500, 160, 'poor', 'put on drip and pain killers for discomfort.', 'Michael', '2019-10-23 16:22:30', NULL),
(71, 19, 1, '2019-10-23', NULL, 'I need a cheque', 'Some Old Guy', 'gelding', 500, 160, 'poor', 'put on drip and pain killers for discomfort.', 'Michael', '2019-10-23 16:23:44', NULL),
(72, 18, 1, '2019-10-22', '2019-10-23', 'I need a cheque', 'Some Old Guy', 'gelding', 500, 160, 'Fixed', 'put on drip and pain killers for discomfort.', 'Michael', '2019-10-23 18:44:47', NULL),
(73, 18, 1, '2019-10-23', NULL, 'I need a cheque', 'Some Old Guy', 'gelding', 500, 160, 'Fixed', 'put on drip and pain killers for discomfort.', 'Michael', '2019-10-23 18:45:33', NULL),
(74, 19, 1, '2019-10-22', '2019-10-24', 'I need a cheque', 'Some Old Guy', 'gelding', 500, 160, 'poor', 'put on drip and pain killers for discomfort.', 'Michael', '2019-10-23 21:27:53', NULL),
(75, 18, 1, '2019-10-22', '2019-10-25', 'I need a cheque', 'Some Old Guy', 'gelding', 500, 160, 'Fixed', 'put on drip and pain killers for discomfort.', 'Michael', '2019-10-23 21:28:03', NULL),
(76, 20, 1, '2019-10-02', NULL, 'Deep cut on the hind foot', 'Glen', 'Stallion', 650, 182, 'Could be worse', 'put on drip and pain killers for discomfort.', 'Jame', '2019-10-23 22:04:17', NULL),
(77, 20, 1, '2019-10-02', '2019-10-24', 'Deep cut on the hind foot', 'Glen', 'Stallion', 650, 182, 'Could be worse', 'put on drip and pain killers for discomfort.', 'Jame', '2019-10-23 22:50:17', NULL),
(78, 21, 1, '2019-10-23', NULL, 'Think We can make a Mil', 'Linda', 'Mare', 870, 210, 'Amazing', 'Make the horse watch TV', 'Jame', '2019-10-23 23:06:34', NULL),
(79, 21, 1, '2019-10-23', NULL, 'Think We can make a Mil', 'Linda', 'Mare', 870, 210, 'Amazing', 'Make the horse watch TV', 'notadmin', '2019-10-30 15:51:32', 'null'),
(80, 22, 1, '2019-10-30', NULL, '17891235 FNB Please send POP', 'Tim', 'Horse Gender', 466, 177, 'Critical', 'Feed Him Meat', 'notadmin', '2019-10-30 16:04:11', '59054d09-eeef-4eca-8fe0-17d40c0834fc.png'),
(81, 22, 1, '2019-10-30', NULL, '17891235 FNB Please send POP', 'Tim', 'Horse Gender', 466, 177, 'Critical', 'He loves Snow?', 'notadmin', '2019-10-30 19:34:55', 'null'),
(82, 22, 1, '2019-10-30', NULL, '17891235 FNB Please send POP', 'Tim', 'Horse Gender', 466, 177, 'Healthy', 'He loves Snow?', 'notadmin', '2019-10-30 19:44:38', 'null'),
(83, 22, 1, '2019-10-30', NULL, '17891235 FNB Please send POP', 'Tim', 'Horse Gender', 466, 177, 'Healthy', 'He loves Snow?', 'notadmin', '2019-10-30 19:52:39', 'null'),
(84, 22, 1, '2019-10-30', NULL, '17891235 FNB Please send POP', 'Tim', 'Horse Gender', 466, 177, 'Healthy', 'He loves Snow?', 'notadmin', '2019-10-30 20:04:04', 'null'),
(85, 22, 1, '2019-10-30', NULL, '17891235 FNB Please send POP', 'Tim', 'Horse Gender', 466, 177, 'Healthy', 'He loves Snow?', 'notadmin', '2019-10-30 20:08:29', 'null'),
(86, 22, 1, '2019-10-30', NULL, '17891235 FNB Please send POP', 'Tim', 'Horse Gender', 466, 177, 'Healthy', 'He loves Snow?', 'notadmin', '2019-10-30 20:33:55', 'null'),
(87, 22, 1, '2019-10-30', NULL, '17891235 FNB Please send POP', 'Tim', 'Horse Gender', 466, 177, 'Healthy', 'He loves Snow?', 'notadmin', '2019-10-30 20:35:48', 'null');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_medicine`
--

DROP TABLE IF EXISTS `tbl_medicine`;
CREATE TABLE IF NOT EXISTS `tbl_medicine` (
  `MedicationID` int(11) NOT NULL AUTO_INCREMENT,
  `Description` varchar(45) NOT NULL,
  `Cost` decimal(2,0) NOT NULL,
  `inStock` int(11) NOT NULL,
  PRIMARY KEY (`MedicationID`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_notification`
--

DROP TABLE IF EXISTS `tbl_notification`;
CREATE TABLE IF NOT EXISTS `tbl_notification` (
  `NotificatinID` int(11) NOT NULL AUTO_INCREMENT,
  `Description` varchar(45) NOT NULL,
  `NotifiyDate` date NOT NULL,
  `reoccurance` varchar(45) NOT NULL,
  PRIMARY KEY (`NotificatinID`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_stable`
--

DROP TABLE IF EXISTS `tbl_stable`;
CREATE TABLE IF NOT EXISTS `tbl_stable` (
  `StableID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(45) NOT NULL,
  `StableNumber` int(11) NOT NULL,
  `StablePopulation` int(11) NOT NULL,
  `Available` tinyint(4) NOT NULL,
  PRIMARY KEY (`StableID`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_user`
--

DROP TABLE IF EXISTS `tbl_user`;
CREATE TABLE IF NOT EXISTS `tbl_user` (
  `UserID` int(11) NOT NULL AUTO_INCREMENT,
  `Username` varchar(45) NOT NULL,
  `Password` varchar(45) NOT NULL,
  `firstName` varchar(45) NOT NULL,
  `lastName` varchar(45) NOT NULL,
  `emailAddress` varchar(45) NOT NULL,
  `Status` varchar(45) NOT NULL,
  `UserType` varchar(45) NOT NULL,
  `Address` varchar(45) NOT NULL,
  PRIMARY KEY (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_user`
--

INSERT INTO `tbl_user` (`UserID`, `Username`, `Password`, `firstName`, `lastName`, `emailAddress`, `Status`, `UserType`, `Address`) VALUES
(1, 'admin', 'admin', 'James', 'Mohr', 'james.mohr@gmail.com', 'Single', 'admin', 'Varkens vlei Rd'),
(2, 'notadmin', 'notadmin', 'Josh', 'Smit', 'jamesgmohr69@gmail.com', ' ', 'carer', ' ');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_horse_history`
--
ALTER TABLE `tbl_horse_history`
  ADD CONSTRAINT `HorseHistory_FK` FOREIGN KEY (`HorseID`) REFERENCES `tbl_horse` (`HorseID`),
  ADD CONSTRAINT `UserIDFK` FOREIGN KEY (`UserID`) REFERENCES `tbl_user` (`UserID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
