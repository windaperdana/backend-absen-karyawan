-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 20, 2022 at 06:03 PM
-- Server version: 10.1.37-MariaDB
-- PHP Version: 7.3.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `absen_karyawan`
--

-- --------------------------------------------------------

--
-- Table structure for table `tb_karyawan`
--

CREATE TABLE `tb_karyawan` (
  `id` int(11) NOT NULL,
  `nik` int(11) DEFAULT NULL,
  `nama_karyawan` varchar(250) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `no_tlp` varchar(100) DEFAULT NULL,
  `password` varchar(200) DEFAULT NULL,
  `status_karyawan` int(11) DEFAULT NULL COMMENT '1 = tetap, 0 = new/probotion',
  `role_login` varchar(100) DEFAULT NULL,
  `date_join` timestamp NULL DEFAULT NULL,
  `status_login` int(11) DEFAULT NULL COMMENT '1 = login, 0 = logout'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tb_karyawan`
--

INSERT INTO `tb_karyawan` (`id`, `nik`, `nama_karyawan`, `email`, `no_tlp`, `password`, `status_karyawan`, `role_login`, `date_join`, `status_login`) VALUES
(3, 1111, 'Putu Reksa Winda', 'reksaperdana43@gmail.com', '08384322134', '$2a$12$7Q9BOncPWcX9vHyEXxFW.uwK0XJC8WD8ucpmAeyFSU5gr1syysSE.', 0, 'karyawan', '2022-02-18 03:50:45', 0),
(5, 2222, 'Admin HRD', 'adminhrd@gmail.com', '08121212121', '$2a$12$jLJqrGjC5oNia3RC.CETGuolYjokLc6OfO0kYfymczY0FIIFnvbna', 0, 'admin_hrd', '2022-02-20 07:08:45', 1);

-- --------------------------------------------------------

--
-- Table structure for table `tb_login_karyawan`
--

CREATE TABLE `tb_login_karyawan` (
  `id` int(11) NOT NULL,
  `nik` int(11) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `date_login` timestamp NULL DEFAULT NULL,
  `date_logout` timestamp NULL DEFAULT NULL,
  `img` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tb_login_karyawan`
--

INSERT INTO `tb_login_karyawan` (`id`, `nik`, `email`, `date_login`, `date_logout`, `img`) VALUES
(1, 1111, 'reksaperdana43@gmail.com', '2022-02-20 16:08:10', '2022-02-20 16:08:23', '1111.png'),
(2, 2222, 'adminhrd@gmail.com', '2022-02-20 16:08:41', '2022-02-20 16:18:47', '2222.png'),
(3, 2222, 'adminhrd@gmail.com', '2022-02-20 16:19:30', NULL, '2222.png');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tb_karyawan`
--
ALTER TABLE `tb_karyawan`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tb_karyawan_nik_IDX` (`nik`) USING BTREE,
  ADD KEY `tb_karyawan_email_IDX` (`email`) USING BTREE;

--
-- Indexes for table `tb_login_karyawan`
--
ALTER TABLE `tb_login_karyawan`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tb_karyawan`
--
ALTER TABLE `tb_karyawan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `tb_login_karyawan`
--
ALTER TABLE `tb_login_karyawan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
