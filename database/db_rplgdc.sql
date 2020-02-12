-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 12, 2020 at 08:09 AM
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
  `tahun` int(4) NOT NULL,
  `peringkat` int(3) NOT NULL,
  `foto_achievement` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `achievements`
--

INSERT INTO `achievements` (`id_achievement`, `judul`, `tahun`, `peringkat`, `foto_achievement`) VALUES
(9, 'hello world', 2020, 1, 'f660547877f293b086f33c0b3f9f085d'),
(10, 'hello world', 2020, 1, 'foto_achievement-1581164091354'),
(11, 'hello world', 2020, 1, 'foto_achievement-1581164138239'),
(12, 'hello world', 2020, 1, 'foto_achievement-1581164232772'),
(13, 'hello world', 2020, 1, 'foto_achievement-1581164677693'),
(14, 'hello world', 2020, 1, 'foto_achievement-1581164974526'),
(15, 'hello world', 2020, 1, '3b4844a2d1a0538fa3a2856b8f811ced'),
(16, 'hello world', 2020, 1, '60cfda5eb762704214bbc1177a7a7c14'),
(17, 'hello world', 2020, 1, 'fe7b26986ca57eaddc1f80d8ca6036b9'),
(18, 'hello world', 2020, 1, '6caa1e445f61335b64e58c1f6884396e'),
(19, 'hello world', 2020, 1, '7608634b7c3f0b521f5dfd634c015b1c'),
(20, 'hello world', 2020, 1, '492bcd16b8bda4cb82cc9fb4af662d7e.jpg'),
(21, 'hello world', 2020, 1, 'foto_achievement-1581165445159.jpg'),
(22, 'hello world', 2020, 1, 'foto_achievement-1581165469839.jpg.jpg'),
(23, 'hello world', 2020, 1, 'foto_achievement-1581166348818.jpg'),
(24, 'hello world', 2020, 1, 'foto_achievement-1581166593774.jpg'),
(25, 'hello world', 2020, 1, 'foto_achievement-1581166675406.jpg'),
(26, 'hello world', 2020, 1, 'foto_achievement-1581166725740.jpg'),
(27, 'hello world', 2020, 1, 'foto_achievement-1581166736568.jpg'),
(28, 'hello world', 2020, 1, 'foto_achievement-1581166769542.jpg'),
(29, 'hello world', 2020, 1, 'foto_achievement-1581166794137.jpg'),
(30, 'hello world', 2020, 1, 'foto_achievement-1581166823286.jpg'),
(31, 'hello world', 2020, 1, 'foto_achievement-1581166857204.jpg'),
(32, 'hello world', 2020, 1, 'foto_achievement-1581166888254.jpg'),
(33, 'hello world', 2020, 1, 'foto_achievement-1581167200845.jpg'),
(34, 'hello world', 2020, 1, 'foto_achievement-1581167216892.jpg'),
(35, 'hello world', 2020, 1, 'foto_achievement-1581167428339.jpg'),
(36, 'hello world', 2020, 1, 'foto_achievement-1581167443762.jpg'),
(37, 'hello world', 2020, 1, 'foto_achievement-1581167557980.jpg'),
(38, 'hello world', 2020, 1, 'foto_achievement-1581169278436.jpg'),
(39, 'hello world', 2020, 1, 'foto_achievement-1581169532848.jpg'),
(40, 'hello world', 2020, 1, 'foto_achievement-1581169585391.jpg');

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

--
-- Dumping data for table `activities`
--

INSERT INTO `activities` (`id_activities`, `nama_activities`, `gambar_activities`, `tanggal`, `deskripsi`) VALUES
(1, 'makrab 2.0 gan', 'https://www.dropbox.com/s/3tpu8v4r20rmc85/78b31e55d4d60ec2ed065bb6675584b5.png?d', '2000-09-25', 'ini makrab cuy');

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
(1, '', '$2b$15$vWH4hUpwJE0aRS/5L9pydeMM5W9Dy5r1/nUCAPzNAfL'),
(3, 'ilhamizzul2', '$2b$15$fX5bZfv7Xk2ZTDuqUndKU.myuwTMaiWRgQ7QuU0Zewn'),
(4, 'ilhamizzul3', '$2b$15$8MojogWXp2aSX0.tr09XUuZp9ZRMp6p0jnMlZvIUh09'),
(5, 'ilhamizzul4', '$2b$15$a4MBNkwurqnkk0d7tzCFVeDx61hlPYaApJg.IMtb3.UeAgeHCDJ.W');

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

--
-- Dumping data for table `divisions`
--

INSERT INTO `divisions` (`id_divisi`, `nama_divisi`, `gambar_divisi`, `deskripsi`) VALUES
(1, 'UIUX', 'https://dl.dropbox.com/s/kyi6k8g37jjl6d7/6c0d8f5b32566b9f2b11520926688e0d.p', 'UIUX'),
(5, 'front end', '', 'front end developer'),
(6, 'backend', 'https://dl.dropbox.com/s/jrrstvu3xf1kszv/b459f6a1c49bc4bc8d4bffb7aa6d637a.p', 'backend');

-- --------------------------------------------------------

--
-- Table structure for table `member_achievement`
--

CREATE TABLE `member_achievement` (
  `id_member` int(11) NOT NULL,
  `nama_member` varchar(20) NOT NULL,
  `jurusan` varchar(20) NOT NULL,
  `id_achievement` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `member_achievement`
--

INSERT INTO `member_achievement` (`id_member`, `nama_member`, `jurusan`, `id_achievement`) VALUES
(1, 'jeki', 'IF', 9),
(3, 'rekim', 'IF', 10),
(4, 'affan', 'IFIK', 11),
(5, 'affan', 'IFIK', 10);

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

--
-- Dumping data for table `org_structures`
--

INSERT INTO `org_structures` (`id_org_structures`, `nama_org_structures`, `posisi_org_structures`, `foto_org_structures`, `order_org_structures`) VALUES
(5, 'ijul', 'back end', '', 2018);

-- --------------------------------------------------------

--
-- Table structure for table `pivot_division_activities`
--

CREATE TABLE `pivot_division_activities` (
  `idx` int(11) NOT NULL,
  `id_activities` int(11) NOT NULL,
  `id_divisi` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `pivot_division_activities`
--

INSERT INTO `pivot_division_activities` (`idx`, `id_activities`, `id_divisi`) VALUES
(1, 1, 1),
(3, 1, 5);

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

--
-- Dumping data for table `recruitment`
--

INSERT INTO `recruitment` (`id_recruitment`, `foto_profile`, `nim`, `nama_lengkap`, `tanggal_lahir`, `jenis_kelamin`, `jurusan`, `angkatan`, `divisi`, `cv`, `motivation_letter`, `portofolio`, `status1`, `status2`) VALUES
(2, '', '314325346', 'rgdfgsbrtdnfb', '0000-00-00', 'male', 'IF', '2018', 'backend', '', '', 'rgdj vch bckkns chw wihbxijncs', 1, 1),
(3, '', '314325346', 'rgdfgsbrtdnfb', '0000-00-00', 'male', 'IF', '2018', 'backend', '', '', 'rgdj vch bckkns chw wihbxijncs', 1, 0),
(4, '', '314325346', 'rgdfgsbrtdnfb', '0000-00-00', 'male', 'IF', '2018', 'backend', '', '', 'rgdj vch bckkns chw wihbxijncs', 0, 0),
(5, '', '314325346', 'rgdfgsbrtdnfb', '0000-00-00', 'male', 'IF', '2018', 'backend', '', '', 'rgdj vch bckkns chw wihbxijncs', 0, 0);

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
(2, 'id_line', '@ajh8699v'),
(3, 'whatsapp', '085335831672');

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
-- Dumping data for table `tools`
--

INSERT INTO `tools` (`id_tools`, `nama_tools`, `gambar_tools`) VALUES
(5, 'react', 'https://www.dropbox.com/s/hrjwenfsrfc07wz/9f40422bffe4909e5ea4a5e46741a1f3.'),
(7, 'angular', ''),
(9, 'odejsn', ''),
(10, 'react', ''),
(11, 'reactfr4', '');

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
  MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

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
-- AUTO_INCREMENT for table `org_structures`
--
ALTER TABLE `org_structures`
  MODIFY `id_org_structures` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `pivot_division_activities`
--
ALTER TABLE `pivot_division_activities`
  MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
