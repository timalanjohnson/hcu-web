-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 28, 2019 at 09:57 AM
-- Server version: 5.7.14
-- PHP Version: 7.0.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
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

CREATE TABLE `tbl_horse` (
  `HorseID` int(11) NOT NULL,
  `Name` varchar(45) DEFAULT NULL,
  `Age` varchar(255) DEFAULT NULL,
  `isDesceased` tinyint(4) NOT NULL DEFAULT '0',
  `mircochipCode` varchar(45) DEFAULT NULL,
  `Breed` varchar(255) DEFAULT NULL,
  `Colour` varchar(255) DEFAULT NULL,
  `FoundBy` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_horse`
--

INSERT INTO `tbl_horse` (`HorseID`, `Name`, `Age`, `isDesceased`, `mircochipCode`, `Breed`, `Colour`, `FoundBy`) VALUES
(14, 'Takkies', '6', 0, '123456789', 'Horse Breed', 'Brown', 'James'),
(18, 'Nike', '8', 0, '123456789', 'hanoverian', 'bay', 'thomas'),
(19, 'James', '8', 0, '123456789', 'hanoverian', 'bay', 'thomas'),
(20, 'Fox', '12', 1, '987654321', 'Some Race Horse Breed', 'bay', 'Michael'),
(22, 'Bonnie', '30', 0, '', 'Mustang', 'White', 'Bonnie'),
(23, 'Mercedes', '12', 0, '', 'German', 'Silver', 'Lewis Hamilton');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_horse_history`
--

CREATE TABLE `tbl_horse_history` (
  `HorseHistoryID` int(11) NOT NULL,
  `HorseID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  `AdmissionDate` date NOT NULL,
  `DischargeDate` date DEFAULT NULL,
  `Note` varchar(1024) NOT NULL,
  `Owner` varchar(255) NOT NULL,
  `Gender` varchar(255) NOT NULL,
  `Weight` int(11) NOT NULL,
  `Height` int(11) NOT NULL,
  `HorseCondition` varchar(255) NOT NULL,
  `treatment` varchar(1024) NOT NULL,
  `Carer` varchar(255) NOT NULL,
  `UpdateTimeStamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_horse_history`
--

INSERT INTO `tbl_horse_history` (`HorseHistoryID`, `HorseID`, `UserID`, `AdmissionDate`, `DischargeDate`, `Note`, `Owner`, `Gender`, `Weight`, `Height`, `HorseCondition`, `treatment`, `Carer`, `UpdateTimeStamp`) VALUES
(1, 14, 1, '2019-10-21', NULL, 'Pay Boet', 'Tim', 'Horse Gender', 500, 175, 'Poor', 'Money', '', '2019-10-22 11:45:40'),
(3, 14, 1, '2019-10-21', NULL, 'Pay Boet', 'Tim', 'Horse Gender', 500, 175, 'Better', 'Money', 'James', '2019-10-22 14:42:37'),
(65, 14, 1, '2019-10-21', NULL, '17891235 FNB Please send POP', 'Tim', 'Horse Gender', 500, 175, 'Fixed', 'Money', 'James', '2019-10-22 15:08:02'),
(66, 18, 1, '2019-10-22', NULL, 'I need a cheque', 'Some Old Guy', 'gelding', 500, 160, 'poor', 'put on drip and pain killers for discomfort.', 'Michael', '2019-10-22 21:36:07'),
(67, 19, 1, '2019-10-22', NULL, 'I need a cheque', 'Some Old Guy', 'gelding', 500, 160, 'poor', 'put on drip and pain killers for discomfort.', 'Michael', '2019-10-22 21:38:00'),
(68, 19, 1, '2019-10-22', NULL, 'I need a cheque', 'Some Old Guy', 'gelding', 500, 160, 'poor', 'put on drip and pain killers for discomfort.', 'Michael', '2019-10-22 21:38:13'),
(69, 14, 1, '2019-10-21', '2019-10-28', 'Thanks for the Payment', 'Tim', 'Horse Gender', 500, 175, 'Fixed', 'Money', 'James', '2019-10-22 23:23:36'),
(70, 19, 1, '2019-10-22', '2019-10-23', 'I need a cheque', 'Some Old Guy', 'gelding', 500, 160, 'poor', 'put on drip and pain killers for discomfort.', 'Michael', '2019-10-23 16:22:30'),
(71, 19, 1, '2019-10-23', NULL, 'I need a cheque', 'Some Old Guy', 'gelding', 500, 160, 'poor', 'put on drip and pain killers for discomfort.', 'Michael', '2019-10-23 16:23:44'),
(72, 18, 1, '2019-10-22', '2019-10-23', 'I need a cheque', 'Some Old Guy', 'gelding', 500, 160, 'Fixed', 'put on drip and pain killers for discomfort.', 'Michael', '2019-10-23 18:44:47'),
(73, 18, 1, '2019-10-23', NULL, 'I need a cheque', 'Some Old Guy', 'gelding', 500, 160, 'Fixed', 'put on drip and pain killers for discomfort.', 'Michael', '2019-10-23 18:45:33'),
(74, 19, 1, '2019-10-22', '2019-10-24', 'I need a cheque', 'Some Old Guy', 'gelding', 500, 160, 'poor', 'put on drip and pain killers for discomfort.', 'Michael', '2019-10-23 21:27:53'),
(75, 18, 1, '2019-10-22', '2019-10-25', 'I need a cheque', 'Some Old Guy', 'gelding', 500, 160, 'Fixed', 'put on drip and pain killers for discomfort.', 'Michael', '2019-10-23 21:28:03'),
(80, 22, 1, '2019-10-24', NULL, 'Very cool', 'Bonnie', 'Female', 500, 29, 'Bad', 'Food', 'James', '2019-10-24 09:54:11'),
(81, 22, 1, '2019-10-24', NULL, 'Very cool', 'Bonnie', 'Female', 500, 35, 'Bad', 'Food', 'James', '2019-10-24 09:55:10'),
(82, 22, 1, '2019-10-24', NULL, 'Very cool', 'Bonnie', 'Female', 500, 35, 'undefined', 'Food', 'James', '2019-10-28 10:13:49'),
(83, 22, 1, '2019-10-24', NULL, 'Very cool', 'Bonnie', 'Female', 500, 35, 'undefined', 'Food', 'James', '2019-10-28 10:20:14'),
(84, 22, 1, '2019-10-24', NULL, 'Very cool', 'Bonnie', 'Female', 500, 35, 'undefined', 'Food', 'James', '2019-10-28 10:35:10'),
(85, 22, 1, '2019-10-24', NULL, 'Very cool', 'Bonnie', 'Female', 500, 35, 'undefined', 'Food', 'James', '2019-10-28 10:35:16'),
(86, 22, 1, '2019-10-24', NULL, 'Very cool', 'Bonnie', 'Female', 500, 35, 'undefined', 'Food', 'James', '2019-10-28 10:41:38'),
(87, 22, 1, '2019-10-24', NULL, 'Very cool', 'Bonnie', 'Female', 500, 35, 'undefined', 'Food', 'James', '2019-10-28 10:42:53'),
(88, 22, 1, '2019-10-24', NULL, 'Very cool', 'Bonnie', 'Female', 500, 35, 'undefined', 'Food', 'James', '2019-10-28 10:46:58'),
(89, 22, 1, '2019-10-24', NULL, 'Very cool', 'Bonnie', 'Female', 500, 35, 'undefined', 'Food', 'James', '2019-10-28 10:48:09'),
(90, 22, 1, '2019-10-24', NULL, 'Very cool', 'Bonnie', 'Female', 500, 35, 'Better', 'Food', 'James', '2019-10-28 10:50:30'),
(91, 23, 1, '2019-10-28', NULL, 'Horse is healthy. Recommend only food and water.', 'Toto Wolff', 'Male', 824, 240, 'Healthy', 'Food and water', 'Bonnie', '2019-10-28 11:14:11'),
(92, 23, 1, '2019-10-28', NULL, 'Horse is healthy. Recommend only food and water.', 'Toto Wolff', 'Male', 824, 240, 'Stable', 'Food and water', 'Bonnie', '2019-10-28 11:18:10'),
(93, 23, 1, '2019-10-28', NULL, 'Horse is healthy. Recommend only food and water.', 'Toto Wolff', 'Male', 824, 240, 'Critical', 'Food and water', 'Bonnie', '2019-10-28 11:27:40'),
(94, 23, 1, '2019-10-28', NULL, 'Horse is healthy. Recommend only food and water.', 'Toto Wolff', 'Male', 824, 240, 'Healthy', 'Food and water', 'Bonnie', '2019-10-28 11:39:55'),
(95, 14, 1, '2019-10-28', NULL, 'Thanks for the Payment', 'Tim', 'Horse Gender', 500, 175, 'Healthy', 'Money', 'James', '2019-10-28 11:40:19'),
(96, 18, 1, '2019-10-27', NULL, 'I need a cheque', 'Some Old Guy', 'gelding', 500, 160, 'Stable', 'put on drip and pain killers for discomfort.', 'Michael', '2019-10-28 11:40:31'),
(97, 19, 1, '2019-10-25', NULL, 'I need a cheque', 'Some Old Guy', 'gelding', 500, 160, 'Stable', 'put on drip and pain killers for discomfort.', 'Michael', '2019-10-28 11:40:41');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_medicine`
--

CREATE TABLE `tbl_medicine` (
  `MedicationID` int(11) NOT NULL,
  `Description` varchar(45) NOT NULL,
  `Cost` decimal(2,0) NOT NULL,
  `inStock` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_notification`
--

CREATE TABLE `tbl_notification` (
  `NotificatinID` int(11) NOT NULL,
  `Description` varchar(45) NOT NULL,
  `NotifiyDate` date NOT NULL,
  `reoccurance` varchar(45) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_stable`
--

CREATE TABLE `tbl_stable` (
  `StableID` int(11) NOT NULL,
  `Name` varchar(45) NOT NULL,
  `StableNumber` int(11) NOT NULL,
  `StablePopulation` int(11) NOT NULL,
  `Available` tinyint(4) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_user`
--

CREATE TABLE `tbl_user` (
  `UserID` int(11) NOT NULL,
  `Username` varchar(45) NOT NULL,
  `Password` varchar(45) NOT NULL,
  `firstName` varchar(45) NOT NULL,
  `lastName` varchar(45) NOT NULL,
  `emailAddress` varchar(45) NOT NULL,
  `Status` varchar(45) NOT NULL,
  `UserType` varchar(45) NOT NULL,
  `Address` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_user`
--

INSERT INTO `tbl_user` (`UserID`, `Username`, `Password`, `firstName`, `lastName`, `emailAddress`, `Status`, `UserType`, `Address`) VALUES
(1, 'admin', 'admin', 'James', 'Mohr', 'james.mohr@gmail.com', 'Single', 'admin', 'Varkens vlei Rd'),
(2, 'tim', 'tim', 'Tim', 'Johnson', 'timjohnson.za@gmail.com', ' ', 'carer', ' '),
(3, 'bonnie', 'bonnie', 'Bonnie', 'True', 'bonnie.true@email.com', ' ', 'carer', ' ');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_horse`
--
ALTER TABLE `tbl_horse`
  ADD PRIMARY KEY (`HorseID`);

--
-- Indexes for table `tbl_horse_history`
--
ALTER TABLE `tbl_horse_history`
  ADD PRIMARY KEY (`HorseHistoryID`),
  ADD KEY `HorseID` (`HorseID`),
  ADD KEY `HorseID_2` (`HorseID`),
  ADD KEY `UserIDFK` (`UserID`);

--
-- Indexes for table `tbl_medicine`
--
ALTER TABLE `tbl_medicine`
  ADD PRIMARY KEY (`MedicationID`);

--
-- Indexes for table `tbl_notification`
--
ALTER TABLE `tbl_notification`
  ADD PRIMARY KEY (`NotificatinID`);

--
-- Indexes for table `tbl_stable`
--
ALTER TABLE `tbl_stable`
  ADD PRIMARY KEY (`StableID`);

--
-- Indexes for table `tbl_user`
--
ALTER TABLE `tbl_user`
  ADD PRIMARY KEY (`UserID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_horse`
--
ALTER TABLE `tbl_horse`
  MODIFY `HorseID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
--
-- AUTO_INCREMENT for table `tbl_horse_history`
--
ALTER TABLE `tbl_horse_history`
  MODIFY `HorseHistoryID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=98;
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

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
