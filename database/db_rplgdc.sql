-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 13, 2020 at 10:11 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.2

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
  `nama_lomba` varchar(50) NOT NULL,
  `judul` varchar(150) NOT NULL,
  `tahun` int(4) NOT NULL,
  `peringkat` varchar(30) NOT NULL,
  `foto_achievement` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `activities`
--

CREATE TABLE `activities` (
  `id_activities` int(11) NOT NULL,
  `nama_activities` varchar(25) NOT NULL,
  `gambar_activities` varchar(80) NOT NULL,
  `tanggal` date NOT NULL,
  `deskripsi` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `idx` int(11) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`idx`, `username`, `password`) VALUES
(6, 'rplgdcadmin', '$2b$15$D8505ltRGE5mZtsaNcTFsu2.SmpcxJH0nkPHAXW4WVpaDVpoShkAy');

-- --------------------------------------------------------

--
-- Table structure for table `divisions`
--

CREATE TABLE `divisions` (
  `id_divisi` int(11) NOT NULL,
  `nama_divisi` varchar(75) NOT NULL,
  `gambar_divisi` varchar(75) NOT NULL,
  `deskripsi` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `member_achievement`
--

CREATE TABLE `member_achievement` (
  `id_member` int(11) NOT NULL,
  `nama_member` varchar(20) NOT NULL,
  `jurusan` varchar(20) NOT NULL,
  `angkatan` varchar(12) NOT NULL,
  `id_achievement` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `news`
--

CREATE TABLE `news` (
  `id_news` int(11) NOT NULL,
  `judul` varchar(50) NOT NULL,
  `gambar` varchar(60) NOT NULL,
  `deskripsi` varchar(300) NOT NULL,
  `link_url` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `org_structures`
--

CREATE TABLE `org_structures` (
  `id_org_structures` int(11) NOT NULL,
  `nama_org_structures` varchar(100) NOT NULL,
  `posisi_org_structures` varchar(50) NOT NULL,
  `foto_org_structures` varchar(75) NOT NULL,
  `order_org_structures` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `pivot_division_activities`
--

CREATE TABLE `pivot_division_activities` (
  `idx` int(11) NOT NULL,
  `id_activities` int(11) NOT NULL,
  `id_divisi` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `pivot_division_tools`
--

CREATE TABLE `pivot_division_tools` (
  `idx` int(11) NOT NULL,
  `id_divisi` int(11) NOT NULL,
  `id_tools` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `pivot_product_tools`
--

CREATE TABLE `pivot_product_tools` (
  `idx` int(11) NOT NULL,
  `id_tools` int(11) NOT NULL,
  `id_products` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id_products` int(11) NOT NULL,
  `nama_products` varchar(40) NOT NULL,
  `gambar_products` varchar(80) NOT NULL,
  `kategori_products` enum('web','android','game','UI/UX','sound') NOT NULL,
  `deskripsi` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `recruitment`
--

CREATE TABLE `recruitment` (
  `id_recruitment` int(10) NOT NULL,
  `foto_profile` varchar(80) NOT NULL,
  `nim` varchar(10) NOT NULL,
  `nama_lengkap` varchar(50) NOT NULL,
  `tanggal_lahir` date NOT NULL,
  `jenis_kelamin` varchar(10) NOT NULL,
  `jurusan` varchar(50) NOT NULL,
  `angkatan` varchar(4) NOT NULL,
  `divisi` enum('frontend','backend','uiux','mobile','gdc') NOT NULL,
  `cv` varchar(100) NOT NULL,
  `motivation_letter` varchar(100) NOT NULL,
  `portofolio` varchar(500) NOT NULL,
  `status1` tinyint(1) DEFAULT 0,
  `status2` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `socials`
--

CREATE TABLE `socials` (
  `id_social` int(11) NOT NULL,
  `type` varchar(20) NOT NULL,
  `value` varchar(75) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tools`
--

CREATE TABLE `tools` (
  `id_tools` int(11) NOT NULL,
  `nama_tools` varchar(20) NOT NULL,
  `gambar_tools` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `achievements`
--
ALTER TABLE `achievements`
  ADD PRIMARY KEY (`id_achievement`);

--
-- Indexes for table `activities`
--
ALTER TABLE `activities`
  ADD PRIMARY KEY (`id_activities`);

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`idx`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `divisions`
--
ALTER TABLE `divisions`
  ADD PRIMARY KEY (`id_divisi`);

--
-- Indexes for table `member_achievement`
--
ALTER TABLE `member_achievement`
  ADD PRIMARY KEY (`id_member`),
  ADD KEY `id_achievement` (`id_achievement`);

--
-- Indexes for table `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id_news`);

--
-- Indexes for table `org_structures`
--
ALTER TABLE `org_structures`
  ADD PRIMARY KEY (`id_org_structures`);

--
-- Indexes for table `pivot_division_activities`
--
ALTER TABLE `pivot_division_activities`
  ADD PRIMARY KEY (`idx`),
  ADD KEY `id_activities` (`id_activities`),
  ADD KEY `id_divisi` (`id_divisi`);

--
-- Indexes for table `pivot_division_tools`
--
ALTER TABLE `pivot_division_tools`
  ADD PRIMARY KEY (`idx`),
  ADD KEY `id_divisi` (`id_divisi`),
  ADD KEY `id_tools` (`id_tools`);

--
-- Indexes for table `pivot_product_tools`
--
ALTER TABLE `pivot_product_tools`
  ADD PRIMARY KEY (`idx`),
  ADD KEY `id_tools` (`id_tools`),
  ADD KEY `id_products` (`id_products`);

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
  MODIFY `id_achievement` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `activities`
--
ALTER TABLE `activities`
  MODIFY `id_activities` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `divisions`
--
ALTER TABLE `divisions`
  MODIFY `id_divisi` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `member_achievement`
--
ALTER TABLE `member_achievement`
  MODIFY `id_member` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `news`
--
ALTER TABLE `news`
  MODIFY `id_news` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `org_structures`
--
ALTER TABLE `org_structures`
  MODIFY `id_org_structures` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `pivot_division_activities`
--
ALTER TABLE `pivot_division_activities`
  MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pivot_division_tools`
--
ALTER TABLE `pivot_division_tools`
  MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pivot_product_tools`
--
ALTER TABLE `pivot_product_tools`
  MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id_products` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `recruitment`
--
ALTER TABLE `recruitment`
  MODIFY `id_recruitment` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `socials`
--
ALTER TABLE `socials`
  MODIFY `id_social` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tools`
--
ALTER TABLE `tools`
  MODIFY `id_tools` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `member_achievement`
--
ALTER TABLE `member_achievement`
  ADD CONSTRAINT `member_achievement_ibfk_1` FOREIGN KEY (`id_achievement`) REFERENCES `achievements` (`id_achievement`) ON DELETE CASCADE;

--
-- Constraints for table `pivot_division_activities`
--
ALTER TABLE `pivot_division_activities`
  ADD CONSTRAINT `pivot_division_activities_ibfk_1` FOREIGN KEY (`id_divisi`) REFERENCES `divisions` (`id_divisi`) ON DELETE CASCADE,
  ADD CONSTRAINT `pivot_division_activities_ibfk_2` FOREIGN KEY (`id_activities`) REFERENCES `activities` (`id_activities`) ON DELETE CASCADE;

--
-- Constraints for table `pivot_division_tools`
--
ALTER TABLE `pivot_division_tools`
  ADD CONSTRAINT `pivot_division_tools_ibfk_1` FOREIGN KEY (`id_tools`) REFERENCES `tools` (`id_tools`) ON DELETE CASCADE,
  ADD CONSTRAINT `pivot_division_tools_ibfk_2` FOREIGN KEY (`id_divisi`) REFERENCES `divisions` (`id_divisi`) ON DELETE CASCADE;

--
-- Constraints for table `pivot_product_tools`
--
ALTER TABLE `pivot_product_tools`
  ADD CONSTRAINT `pivot_product_tools_ibfk_1` FOREIGN KEY (`id_products`) REFERENCES `products` (`id_products`) ON DELETE CASCADE,
  ADD CONSTRAINT `pivot_product_tools_ibfk_2` FOREIGN KEY (`id_tools`) REFERENCES `tools` (`id_tools`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
