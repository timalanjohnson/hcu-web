-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 01, 2019 at 08:12 AM
-- Server version: 5.7.14
-- PHP Version: 7.0.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hcu`
--

-- --------------------------------------------------------

--
-- Stand-in structure for view `notification_data`
-- (See below for the actual view)
--
CREATE TABLE `notification_data` (
`AdmissionDate` varchar(74)
,`DischargeDate` varchar(74)
,`Name` varchar(45)
,`Carer` varchar(255)
,`emailAddress` varchar(45)
,`phone` varchar(18)
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
(29, 'Mercedes', '12', 0, '', 'Unknown', 'Grey', 'Lewis Hamilton'),
(30, 'Ferrari', '23', 0, '', 'Italian', 'Black', 'Enzo'),
(31, 'Dreamer', '5', 0, '7654353445', 'Arabian', 'Black and White', 'Sipho'),
(32, 'Rudi', '13', 0, '345263885', 'Italian', 'Brown', 'Bonnie');

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
(96, 29, 1, '2019-11-01', NULL, 'Nothing of note.', 'Toto Wolff', 'Mare', 458, 212, 'Healthy', 'Food and water', 'James', '2019-11-01 09:08:42', 'c0ce8680-b367-473a-9a88-1ee6a1034cd6.png'),
(97, 30, 1, '2019-11-01', NULL, 'This horse has seen better days.', 'Binotto', 'Stallion', 512, 231, 'Stable', 'Rest', 'Bonnie', '2019-11-01 09:11:14', '7c8b9547-f4d2-4887-99dc-275077480abd.png'),
(98, 30, 1, '2019-11-01', NULL, 'This horse has seen better days.', 'Binotto', 'Stallion', 509, 231, 'Stable', 'Rest and food', 'Bonnie', '2019-11-01 09:11:44', '3e2ba8db-7001-4f5a-a18d-77778d11db89.png'),
(99, 31, 1, '2019-10-23', NULL, 'Horse is scared of water', 'James Mohr', 'Female', 300, 500, 'Stable', 'Medication once a day', 'Bonnie', '2019-11-01 09:15:08', '6ac17f6c-5d0e-4c72-8455-b9b4cb5dca07.png'),
(100, 32, 1, '2019-10-25', NULL, 'Horse is really not well, need intense care', 'Claire Rideout', 'Male', 500, 600, 'Critical', 'Rest and Food', 'James', '2019-11-01 09:17:33', 'ba6eaa7c-0587-4143-9064-4619581650ca.png');

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
(1, 'admin', 'admin', 'Tim', 'Johnson', 'timjohnson.za@gmail.com', ' ', 'admin', '10 Nice Rd', '0715320381'),
(4, 'James', 'james', 'James', 'Mohr', 'jamesmohr69@gmail.com', ' ', 'carer', ' ', '0794970002'),
(5, 'Bonnie', 'bonnie', 'Bonnie', 'True', 'bonnie.true1@gmail.com', ' ', 'carer', ' ', '0715320381'),
(6, 'Brin', 'brin', 'Brinlee', 'Oaker', 'brin@email.com', ' ', 'carer', ' ', '0614234387');

-- --------------------------------------------------------

--
-- Structure for view `notification_data`
--
DROP TABLE IF EXISTS `notification_data`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `notification_data`  AS  select date_format(`his`.`AdmissionDate`,'%D-%M-%Y') AS `AdmissionDate`,date_format(`his`.`DischargeDate`,'%D-%M-%Y') AS `DischargeDate`,`ho`.`Name` AS `Name`,`his`.`Carer` AS `Carer`,`us`.`emailAddress` AS `emailAddress`,`us`.`phone` AS `phone`,`us`.`firstName` AS `firstName` from ((`tbl_horse` `ho` join `tbl_horse_history` `his`) join `tbl_user` `us`) where ((`us`.`Username` = `his`.`Carer`) and (`ho`.`HorseID` = `his`.`HorseID`) and `his`.`HorseHistoryID` in (select max(`his`.`HorseHistoryID`) from (`tbl_horse_history` `his` join `tbl_horse` `ho`) where (`his`.`HorseID` = `ho`.`HorseID`) group by `ho`.`HorseID`) and isnull(`his`.`DischargeDate`)) group by `ho`.`HorseID` ;

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
  MODIFY `HorseID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;
--
-- AUTO_INCREMENT for table `tbl_horse_history`
--
ALTER TABLE `tbl_horse_history`
  MODIFY `HorseHistoryID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;
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
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
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
