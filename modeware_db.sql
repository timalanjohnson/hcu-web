-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 31, 2019 at 08:49 AM
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
-- Stand-in structure for view `notification_data`
-- (See below for the actual view)
--
CREATE TABLE `notification_data` (
`AdmissionDate` date
,`DischargeDate` date
,`Name` varchar(45)
,`Carer` varchar(255)
,`emailAddress` varchar(45)
,`firstName` varchar(45)
);

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
(21, 'Tea', '21', 0, '258369147', 'Ford', 'White', 'Michael'),
(22, 'Takkies', '6', 1, '123456789', 'Horse Breed', 'Brown', 'James the Great');

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
  `Note` varchar(255) NOT NULL,
  `Owner` varchar(255) NOT NULL,
  `Gender` varchar(255) NOT NULL,
  `Weight` int(11) NOT NULL,
  `Height` int(11) NOT NULL,
  `HorseCondition` varchar(255) NOT NULL,
  `treatment` varchar(255) NOT NULL,
  `Carer` varchar(255) NOT NULL,
  `UpdateTimeStamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
(92, 22, 1, '2019-10-30', NULL, '17891235 FNB Please send POP', 'Tim', 'Horse Gender', 466, 177, 'Healthy', 'He loves Snow? Is this even a horse', 'notadmin', '2019-10-31 07:12:50', '00a77476-d569-4d70-b1d1-d1e6596d04ad.png'),
(93, 22, 1, '2019-10-30', NULL, '17891235 FNB Please send POP', 'Tim', 'Horse Gender', 466, 177, 'Healthy', 'The horse is a glove now?', 'notadmin', '2019-10-31 07:16:30', '3d5768cb-e6c2-4e7e-be59-59e7970c4c0c.png'),
(94, 22, 1, '2019-10-30', '2019-10-31', 'gave him the wrong meds', 'Tim', 'Horse Gender', 466, 177, 'Healthy', 'Well there is nothing to do now', 'notadmin', '2019-10-31 07:25:19', 'e1d41042-77bc-4f3b-aa6c-7c8c293ce6e5.png'),
(95, 21, 1, '2019-10-23', NULL, 'Think We can make a Mil', 'Linda', 'Mare', 870, 210, 'Amazing', 'Make the horse watch TV', 'notadmin', '2019-10-31 10:29:04', '[object Promise]');

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
  `Address` varchar(45) NOT NULL,
  `phone` varchar(18) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_user`
--

INSERT INTO `tbl_user` (`UserID`, `Username`, `Password`, `firstName`, `lastName`, `emailAddress`, `Status`, `UserType`, `Address`, `phone`) VALUES
(1, 'admin', 'admin', 'James', 'Mohr', 'james.mohr@gmail.com', 'Single', 'admin', 'Varkens vlei Rd', ''),
(2, 'notadmin', 'notadmin', 'Josh', 'Smit', 'jamesgmohr69@gmail.com', ' ', 'carer', ' ', ''),
(3, 'Tim', 'asdf', 'Tim', 'Johnson', 'timjohnson.za@gmail.com', ' ', 'admin', ' ', '0715320381');

-- --------------------------------------------------------

--
-- Structure for view `notification_data`
--
DROP TABLE IF EXISTS `notification_data`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `notification_data`  AS  select `tbl_horse_history`.`AdmissionDate` AS `AdmissionDate`,`tbl_horse_history`.`DischargeDate` AS `DischargeDate`,`tbl_horse`.`Name` AS `Name`,`tbl_horse_history`.`Carer` AS `Carer`,`tbl_user`.`emailAddress` AS `emailAddress`,`tbl_user`.`firstName` AS `firstName` from ((`tbl_horse_history` join `tbl_horse`) join `tbl_user`) where ((`tbl_horse`.`HorseID` = `tbl_horse_history`.`HorseID`) and isnull(`tbl_horse_history`.`DischargeDate`) and (`tbl_user`.`firstName` = `tbl_horse_history`.`Carer`)) group by `tbl_horse_history`.`HorseID` ;

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
  MODIFY `HorseID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
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

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
