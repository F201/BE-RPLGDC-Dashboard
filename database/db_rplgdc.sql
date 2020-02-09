-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 09, 2020 at 01:07 PM
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
(3, 'jj', 'nn', 'if', 2019, 2, 'a01f133a85bd6e651e8296597d18b6b3.png'),
(4, '', '', '', 0, 0, ''),
(5, '', '', '', 0, 0, ''),
(6, '', '', '', 0, 0, ''),
(7, '', '', '', 0, 0, ''),
(8, '', '', '', 0, 0, ''),
(9, 'hello world', 'john doe', 'IF', 2020, 1, 'f660547877f293b086f33c0b3f9f085d'),
(10, 'hello world', 'john doe', 'IF', 2020, 1, 'foto_achievement-1581164091354'),
(11, 'hello world', 'john doe', 'IF', 2020, 1, 'foto_achievement-1581164138239'),
(12, 'hello world', 'john doe', 'IF', 2020, 1, 'foto_achievement-1581164232772'),
(13, 'hello world', 'john doe', 'IF', 2020, 1, 'foto_achievement-1581164677693'),
(14, 'hello world', 'john doe', 'IF', 2020, 1, 'foto_achievement-1581164974526'),
(15, 'hello world', 'john doe', 'IF', 2020, 1, '3b4844a2d1a0538fa3a2856b8f811ced'),
(16, 'hello world', 'john doe', 'IF', 2020, 1, '60cfda5eb762704214bbc1177a7a7c14'),
(17, 'hello world', 'john doe', 'IF', 2020, 1, 'fe7b26986ca57eaddc1f80d8ca6036b9'),
(18, 'hello world', 'john doe', 'IF', 2020, 1, '6caa1e445f61335b64e58c1f6884396e'),
(19, 'hello world', 'john doe', 'IF', 2020, 1, '7608634b7c3f0b521f5dfd634c015b1c'),
(20, 'hello world', 'john doe', 'IF', 2020, 1, '492bcd16b8bda4cb82cc9fb4af662d7e.jpg'),
(21, 'hello world', 'john doe', 'IF', 2020, 1, 'foto_achievement-1581165445159.jpg'),
(22, 'hello world', 'john doe', 'IF', 2020, 1, 'foto_achievement-1581165469839.jpg.jpg'),
(23, 'hello world', 'john doe', 'IF', 2020, 1, 'foto_achievement-1581166348818.jpg'),
(24, 'hello world', 'john doe', 'IF', 2020, 1, 'foto_achievement-1581166593774.jpg'),
(25, 'hello world', 'john doe', 'IF', 2020, 1, 'foto_achievement-1581166675406.jpg'),
(26, 'hello world', 'john doe', 'IF', 2020, 1, 'foto_achievement-1581166725740.jpg'),
(27, 'hello world', 'john doe', 'IF', 2020, 1, 'foto_achievement-1581166736568.jpg'),
(28, 'hello world', 'john doe', 'IF', 2020, 1, 'foto_achievement-1581166769542.jpg'),
(29, 'hello world', 'john doe', 'IF', 2020, 1, 'foto_achievement-1581166794137.jpg'),
(30, 'hello world', 'john doe', 'IF', 2020, 1, 'foto_achievement-1581166823286.jpg'),
(31, 'hello world', 'john doe', 'IF', 2020, 1, 'foto_achievement-1581166857204.jpg'),
(32, 'hello world', 'john doe', 'IF', 2020, 1, 'foto_achievement-1581166888254.jpg'),
(33, 'hello world', 'john doe', 'IF', 2020, 1, 'foto_achievement-1581167200845.jpg'),
(34, 'hello world', 'john doe', 'IF', 2020, 1, 'foto_achievement-1581167216892.jpg'),
(35, 'hello world', 'john doe', 'IF', 2020, 1, 'foto_achievement-1581167428339.jpg'),
(36, 'hello world', 'john doe', 'IF', 2020, 1, 'foto_achievement-1581167443762.jpg'),
(37, 'hello world', 'john doe', 'IF', 2020, 1, 'foto_achievement-1581167557980.jpg'),
(38, 'hello world', 'john doe', 'IF', 2020, 1, 'foto_achievement-1581169278436.jpg'),
(39, 'hello world', 'john doe', 'IF', 2020, 1, 'foto_achievement-1581169532848.jpg'),
(40, 'hello world', 'john doe', 'IF', 2020, 1, 'foto_achievement-1581169585391.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `activities`
--

CREATE TABLE `activities` (
  `id_activities` int(11) NOT NULL,
  `nama_activities` varchar(25) NOT NULL,
  `tanggal` date NOT NULL,
  `deskripsi` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
(1, 'UI UX', 'UI/UX');

-- --------------------------------------------------------

--
-- Table structure for table `org_structures`
--

CREATE TABLE `org_structures` (
  `id_org_structures` int(11) NOT NULL,
  `nama_org_structures` varchar(100) NOT NULL,
  `posisi_org_structures` varchar(50) NOT NULL,
  `angkatan_org_structures` int(4) NOT NULL,
  `order_org_structures` varchar(75) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `org_structures`
--

INSERT INTO `org_structures` (`id_org_structures`, `nama_org_structures`, `posisi_org_structures`, `angkatan_org_structures`, `order_org_structures`) VALUES
(3, 'ijul', 'back end', 2019, 'https://www.dropbox.com/s/hy4jxu6je5hu1zu/cf391c02109c0e15284eb24d855811b0.'),
(4, 'rekim', 'front end ', 2018, 'https://www.dropbox.com/s/i2odmvyfsmzpjle/e8c227ddcf5abc4cf305febdcaf3f5e7.');

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

--
-- Dumping data for table `pivot_product_tools`
--

INSERT INTO `pivot_product_tools` (`idx`, `id_tools`, `id_products`) VALUES
(1, 3, 1),
(2, 4, 1),
(3, 3, 2);

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
(1, 'ini produk', 'https://www.dropbox.com/s/zo19ahpg45mfwjr/2f4e866ab97a62992754f51ce04f71d7.', '', 'ini dsfiycbnouewafncobu idjksadncv jb'),
(2, 'fhbd', 'fbdesn', 'android', 'ybfedusn'),
(4, 'fjldsnaikdvnc', 'https://www.dropbox.com/s/86xarv15o4a0by4/3688ff269cfb124c0ea14cfa1383494d.', 'web', 'yrhdbikfbvib  iuesfcb uijdnvcuiesnfc');

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
  `status1` tinyint(1) DEFAULT 0,
  `status2` tinyint(1) NOT NULL DEFAULT 0
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
(4, 'angular', 'https://www.dropbox.com/s/3842zbwsdcypv02/7098a49b4fab4e8468ad6e57874ab076.'),
(5, 'react', 'https://www.dropbox.com/s/hrjwenfsrfc07wz/9f40422bffe4909e5ea4a5e46741a1f3.');

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
  MODIFY `id_activities` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `divisions`
--
ALTER TABLE `divisions`
  MODIFY `id_divisi` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `org_structures`
--
ALTER TABLE `org_structures`
  MODIFY `id_org_structures` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

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
  MODIFY `id_tools` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

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
