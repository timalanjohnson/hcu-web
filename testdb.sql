-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 15, 2019 at 09:12 AM
-- Server version: 5.7.14
-- PHP Version: 7.0.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `testdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_horses`
--

CREATE TABLE `tbl_horses` (
  `id` int(20) NOT NULL,
  `description` varchar(255) NOT NULL,
  `entry_date` date NOT NULL,
  `exit_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_horses`
--

INSERT INTO `tbl_horses` (`id`, `description`, `entry_date`, `exit_date`) VALUES
(1, 'Brown male.', '2019-09-12', NULL),
(3, 'Brown female', '2019-09-11', NULL),
(4, 'Brown female', '2019-04-11', '2019-07-17');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_users`
--

CREATE TABLE `tbl_users` (
  `uid` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `pass` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_users`
--

INSERT INTO `tbl_users` (`uid`, `name`, `email`, `pass`, `phone`) VALUES
(12, 'James', 'jamesmohr@gmail.com', 'asd8fhawddf', '8740481234'),
(11, 'James', 'jamesmohr@gmail.com', 'uhassdfh9', '87441279542'),
(6, 'Tom', 'tom@misch.com', 'asdf', ''),
(7, 'Tim Johnson', 'timjohnson.za@gmail.com', 'asdf', '0715320381'),
(8, 'Tim Johnson', '17002289@vcconnect.co.za', 'asdfasdf', '0715320381'),
(9, 'tom', 'timjohnson.za123@gmail.com', 'asdf', '0715320381'),
(10, 'Tim Johnson', 'timjohnson.za2@gmail.com', 'asdf', '0715320381');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_horses`
--
ALTER TABLE `tbl_horses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_users`
--
ALTER TABLE `tbl_users`
  ADD PRIMARY KEY (`uid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_horses`
--
ALTER TABLE `tbl_horses`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `tbl_users`
--
ALTER TABLE `tbl_users`
  MODIFY `uid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
