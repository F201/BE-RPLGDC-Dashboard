-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 07, 2020 at 03:31 PM
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
  `peringkat` int(3) NOT NULL,
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
(1, 'Back End', 'back-end programming'),
(4, 'front end', 'front end developer');

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
(3, 'rekim', 'front end ', 2018, 'b77c41c4721116d6d58088cf70cd10c5.png');

-- --------------------------------------------------------

--
-- Table structure for table `pivot_product_tools`
--

CREATE TABLE `pivot_product_tools` (
  `idx` int(11) NOT NULL,
  `id_tools` int(11) NOT NULL,
  `id_products` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `pivot_product_tools`
--

INSERT INTO `pivot_product_tools` (`idx`, `id_tools`, `id_products`) VALUES
(1, 3, 1),
(2, 4, 1),
(3, 4, 2),
(4, 3, 2);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id_products` int(11) NOT NULL,
  `nama_products` varchar(40) NOT NULL,
  `gambar_products` varchar(75) NOT NULL,
  `kategori_products` enum('web','android','game','UI/UX','sound') NOT NULL,
  `deskripsi` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id_products`, `nama_products`, `gambar_products`, `kategori_products`, `deskripsi`) VALUES
(1, 'hello', 'world.png', 'web', 'ini sisfo hello'),
(2, 'fhbd', 'fbdesn', 'android', 'ybfedusn');

-- --------------------------------------------------------

--
-- Table structure for table `recruitment`
--

CREATE TABLE `recruitment` (
  `id_recruitment` int(10) NOT NULL,
  `foto_profile` varchar(200) NOT NULL,
  `nama_lengkap` varchar(50) NOT NULL,
  `tanggal_lahir` date NOT NULL,
  `jenis_kelamin` varchar(10) NOT NULL,
  `jurusan` varchar(50) NOT NULL,
  `angkatan` varchar(4) NOT NULL,
  `divisi` enum('frontend','backend','uiux','mobile','gdc') NOT NULL,
  `cv` varchar(100) NOT NULL,
  `motivation_letter` varchar(100) NOT NULL,
  `portofolio` varchar(500) NOT NULL,
  `status1` tinyint(1) DEFAULT '0',
  `status2` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `recruitment`
--

INSERT INTO `recruitment` (`id_recruitment`, `foto_profile`, `nama_lengkap`, `tanggal_lahir`, `jenis_kelamin`, `jurusan`, `angkatan`, `divisi`, `cv`, `motivation_letter`, `portofolio`, `status1`, `status2`) VALUES
(1, 'profile.png', 'ilham izzul hadyan', '2000-09-25', 'Male', 'Informatika', '18', 'frontend', 'cv.png', 'mot.png', 'ini portofolio', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `socials`
--

CREATE TABLE `socials` (
  `id_social` int(11) NOT NULL,
  `type` varchar(20) NOT NULL,
  `value` varchar(75) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `socials`
--

INSERT INTO `socials` (`id_social`, `type`, `value`) VALUES
(1, 'link_ig', 'https://www.instagram.com/rplgdc_'),
(2, 'id_line', '@ajh8699v');

-- --------------------------------------------------------

--
-- Table structure for table `tools`
--

CREATE TABLE `tools` (
  `id_tools` int(11) NOT NULL,
  `nama_tools` varchar(20) NOT NULL,
  `gambar_tools` varchar(75) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tools`
--

INSERT INTO `tools` (`id_tools`, `nama_tools`, `gambar_tools`) VALUES
(3, 'angular', 'b5b6bc9d4610277a5919557c52fd3bc7.png'),
(4, 'react', '2ba9211b3c4a5651860bcb727981a6b0.jpg');

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
-- Indexes for table `pivot_product_tools`
--
ALTER TABLE `pivot_product_tools`
  ADD PRIMARY KEY (`idx`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id_products`);

--
-- Indexes for table `recruitment`
--
ALTER TABLE `recruitment`
  ADD PRIMARY KEY (`id_recruitment`);

--
-- Indexes for table `socials`
--
ALTER TABLE `socials`
  ADD PRIMARY KEY (`id_social`);

--
-- Indexes for table `tools`
--
ALTER TABLE `tools`
  ADD PRIMARY KEY (`id_tools`);

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
  MODIFY `id_divisi` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `org_structures`
--
ALTER TABLE `org_structures`
  MODIFY `id_org_structures` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `pivot_product_tools`
--
ALTER TABLE `pivot_product_tools`
  MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id_products` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `recruitment`
--
ALTER TABLE `recruitment`
  MODIFY `id_recruitment` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `socials`
--
ALTER TABLE `socials`
  MODIFY `id_social` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tools`
--
ALTER TABLE `tools`
  MODIFY `id_tools` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
