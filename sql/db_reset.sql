-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 31, 2019 at 08:49 AM
-- Server version: 5.7.14
-- PHP Version: 7.0.10

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
  `phone` varchar(18) NOT NULL,
  PRIMARY KEY (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_user`
--

INSERT INTO `tbl_user` (`UserID`, `Username`, `Password`, `firstName`, `lastName`, `emailAddress`, `Status`, `UserType`, `Address`, `phone`) VALUES
(1, 'admin', 'admin', 'Tim', 'Johnson', 'timjohnson.za@gmail.com', ' ', 'admin', '10 Nice Rd', '0715320381');


-- --------------------------------------------------------

--
-- Structure for view `notification_data`
--
-- DROP TABLE IF EXISTS `notification_data`;

-- CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `notification_data`  AS  select `tbl_horse_history`.`AdmissionDate` AS `AdmissionDate`,`tbl_horse_history`.`DischargeDate` AS `DischargeDate`,`tbl_horse`.`Name` AS `Name`,`tbl_horse_history`.`Carer` AS `Carer`,`tbl_user`.`emailAddress` AS `emailAddress`,`tbl_user`.`firstName` AS `firstName` from ((`tbl_horse_history` join `tbl_horse`) join `tbl_user`) where ((`tbl_horse`.`HorseID` = `tbl_horse_history`.`HorseID`) and isnull(`tbl_horse_history`.`DischargeDate`) and (`tbl_user`.`firstName` = `tbl_horse_history`.`Carer`)) group by `tbl_horse_history`.`HorseID` ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_horse`
--
-- ALTER TABLE `tbl_horse`
--  ADD PRIMARY KEY (`HorseID`);



--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_horse`
--
ALTER TABLE `tbl_horse`
  MODIFY `HorseID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;
--
-- AUTO_INCREMENT for table `tbl_horse_history`
--
ALTER TABLE `tbl_horse_history`
  MODIFY `HorseHistoryID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=96;

--
-- AUTO_INCREMENT for table `tbl_medicine`
--
ALTER TABLE `tbl_medicine`
  MODIFY `MedicationID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_notification`
--
ALTER TABLE `tbl_notification`
  MODIFY `NotificatinID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_stable`
--
ALTER TABLE `tbl_stable`
  MODIFY `StableID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_user`
--
ALTER TABLE `tbl_user`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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


-- DROP VIEW IF EXISTS notification_data;	

CREATE VIEW notification_data AS 
SELECT DATE_FORMAT(his.AdmissionDate,'%D-%M-%Y') AS AdmissionDate, DATE_FORMAT(his.DischargeDate,'%D-%M-%Y') AS DischargeDate, ho.Name, his.Carer, us.emailAddress, us.phone, us.firstName FROM tbl_horse ho, tbl_horse_history his, tbl_user us WHERE us.Username = his.Carer AND ho.HorseID = his.HorseID AND his.HorseHistoryID IN (SELECT MAX(HorseHistoryID) FROM tbl_horse_history AS his, tbl_horse ho WHERE his.HorseID = ho.HorseID GROUP BY ho.HorseID) AND his.DischargeDate is NULL GROUP BY ho.HorseID;