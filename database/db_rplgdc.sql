-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 03, 2019 at 03:39 PM
-- Server version: 10.4.8-MariaDB
-- PHP Version: 7.3.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_rplgdc`
--

-- --------------------------------------------------------

--
-- Table structure for table `achievements`
--

CREATE TABLE `achievements` (
  `id_achievement` int(11) NOT NULL,
  `judul` varchar(150) NOT NULL,
  `nama_pemenang` varchar(75) NOT NULL,
  `jurusan` varchar(50) NOT NULL,
  `tahun` int(4) NOT NULL,
  `peringkat` int(2) NOT NULL,
  `foto_achievement` varchar(75) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `achievements`
--

INSERT INTO `achievements` (`id_achievement`, `judul`, `nama_pemenang`, `jurusan`, `tahun`, `peringkat`, `foto_achievement`) VALUES
(3, 'jj', 'nn', 'if', 2019, 2, 'a01f133a85bd6e651e8296597d18b6b3.png');

-- --------------------------------------------------------

--
-- Table structure for table `divisions`
--

CREATE TABLE `divisions` (
  `id_divisi` int(11) NOT NULL,
  `nama_divisi` varchar(75) NOT NULL,
  `deskripsi` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `divisions`
--

INSERT INTO `divisions` (`id_divisi`, `nama_divisi`, `deskripsi`) VALUES
(1, 'Back End', 'back-end programming');

-- --------------------------------------------------------

--
-- Table structure for table `org_structures`
--

CREATE TABLE `org_structures` (
  `id_org_structures` int(11) NOT NULL,
  `nama_org_structures` varchar(100) NOT NULL,
  `posisi_org_structures` varchar(50) NOT NULL,
  `angkatan_org_structures` int(4) NOT NULL,
  `foto_org_structures` varchar(75) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `org_structures`
--

INSERT INTO `org_structures` (`id_org_structures`, `nama_org_structures`, `posisi_org_structures`, `angkatan_org_structures`, `foto_org_structures`) VALUES
(2, '22', '22', 22, '07ab5bd46c5201579a6eca0487105a48.png');

-- --------------------------------------------------------

--
-- Table structure for table `socials`
--

CREATE TABLE `socials` (
  `id_social` int(11) NOT NULL,
  `type` varchar(10) NOT NULL,
  `value` varchar(75) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `socials`
--

INSERT INTO `socials` (`id_social`, `type`, `value`) VALUES
(1, 'link_ig', 'https://www.instagram.com/rplgdc_'),
(2, 'id_line', '@ajh8699v');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `achievements`
--
ALTER TABLE `achievements`
  ADD PRIMARY KEY (`id_achievement`);

--
-- Indexes for table `divisions`
--
ALTER TABLE `divisions`
  ADD PRIMARY KEY (`id_divisi`);

--
-- Indexes for table `org_structures`
--
ALTER TABLE `org_structures`
  ADD PRIMARY KEY (`id_org_structures`);

--
-- Indexes for table `socials`
--
ALTER TABLE `socials`
  ADD PRIMARY KEY (`id_social`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `achievements`
--
ALTER TABLE `achievements`
  MODIFY `id_achievement` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `divisions`
--
ALTER TABLE `divisions`
  MODIFY `id_divisi` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `org_structures`
--
ALTER TABLE `org_structures`
  MODIFY `id_org_structures` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `socials`
--
ALTER TABLE `socials`
  MODIFY `id_social` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
