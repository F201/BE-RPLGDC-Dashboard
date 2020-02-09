-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 09, 2020 at 05:52 PM
-- Server version: 10.3.15-MariaDB
-- PHP Version: 7.3.6

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
-- Struktur dari tabel `achievements`
--

CREATE TABLE `achievements` (
  `id_achievement` int(11) NOT NULL,
  `judul` varchar(150) NOT NULL,
  `nama_pemenang` varchar(75) NOT NULL,
  `jurusan` varchar(50) NOT NULL,
  `tahun` int(4) NOT NULL,
  `peringkat` int(3) NOT NULL,
  `foto_achievement` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `achievements`
--

INSERT INTO `achievements` (`id_achievement`, `judul`, `nama_pemenang`, `jurusan`, `tahun`, `peringkat`, `foto_achievement`) VALUES
(3, 'jj', 'nn', 'if', 2019, 2, 'a01f133a85bd6e651e8296597d18b6b3.png');

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
(1, 'makrab 2.0 gan', 'https://www.dropbox.com/s/3tpu8v4r20rmc85/78b31e55d4d60ec2ed065bb6675584b5.png?d', '2000-09-25', 'ini makrab cuy'),
(3, 'makrab gan 3.0', 'https://www.dropbox.com/s/274fzdyoyrviw3n/923e244e4900b7624a808f8d8db80d72.png?d', '2000-09-25', 'ini makrab cuy');

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
-- Dumping data untuk tabel `divisions`
--

INSERT INTO `divisions` (`id_divisi`, `nama_divisi`, `deskripsi`) VALUES
(1, 'UI UX', 'UI/UX'),
(5, 'front end', 'front end developer');

-- --------------------------------------------------------

--
-- Struktur dari tabel `org_structures`
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

INSERT INTO `org_structures` (`id_org_structures`, `nama_org_structures`, `posisi_org_structures`, `angkatan_org_structures`, `foto_org_structures`) VALUES
(3, 'rekim', 'front end ', 2018, 'b77c41c4721116d6d58088cf70cd10c5.png');

-- --------------------------------------------------------

--
-- Struktur dari tabel `pivot_product_tools`
--

CREATE TABLE `pivot_product_tools` (
  `idx` int(11) NOT NULL,
  `id_tools` int(11) NOT NULL,
  `id_products` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `pivot_product_tools`
--

INSERT INTO `pivot_product_tools` (`idx`, `id_tools`, `id_products`) VALUES
(1, 1, 3),
(2, 1, 4);

-- --------------------------------------------------------

--
-- Struktur dari tabel `products`
--

CREATE TABLE `products` (
  `id_products` int(11) NOT NULL,
  `nama_products` varchar(40) NOT NULL,
  `gambar_products` varchar(80) NOT NULL,
  `kategori_products` enum('web','android','game','UI/UX','sound') NOT NULL,
  `deskripsi` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `products`
--

INSERT INTO `products` (`id_products`, `nama_products`, `gambar_products`, `kategori_products`, `deskripsi`) VALUES
(1, 'hello', 'world.png', 'web', 'ini sisfo hello');

-- --------------------------------------------------------

--
-- Struktur dari tabel `recruitment`
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
  `status1` tinyint(1) NOT NULL DEFAULT '0',
  `status2` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `recruitment`
--

INSERT INTO `recruitment` (`id_recruitment`, `foto_profile`, `nim`, `nama_lengkap`, `tanggal_lahir`, `jenis_kelamin`, `jurusan`, `angkatan`, `divisi`, `cv`, `motivation_letter`, `portofolio`, `status1`, `status2`) VALUES
(1, 'profile.png', '', 'ilham izzul hadyan', '2000-09-25', 'Male', 'Informatika', '18', 'frontend', 'cv.png', 'mot.png', 'ini portofolio', 0, 0),
(2, '7b78b480dfbac8d02c474b711da1a4ba.jpg', '1301174660', 'Muhammad Sulthan Angka Kurniawan', '0000-00-00', 'laki-laki', 'S1 Informatika', '2017', 'backend', '5aa439b174532047e4c9f6fa3f45177f.pdf', '6bdbcb8d74c4ab2f8c37c3245e5e4c5d.PNG', 'ini portofolio, ini juga portofolio', 1, 0);

-- --------------------------------------------------------

--
-- Struktur dari tabel `socials`
--

CREATE TABLE `socials` (
  `id_social` int(11) NOT NULL,
  `type` varchar(20) NOT NULL,
  `value` varchar(75) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `socials`
--

INSERT INTO `socials` (`id_social`, `type`, `value`) VALUES
(1, 'link_ig', 'https://www.instagram.com/rplgdc_'),
(2, 'id_line', '@ajh8699v');

-- --------------------------------------------------------

--
-- Struktur dari tabel `tools`
--

CREATE TABLE `tools` (
  `id_tools` int(11) NOT NULL,
  `nama_tools` varchar(20) NOT NULL,
  `gambar_tools` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `tools`
--

INSERT INTO `tools` (`id_tools`, `nama_tools`, `gambar_tools`) VALUES
(3, 'angular', 'b5b6bc9d4610277a5919557c52fd3bc7.png'),
(4, 'react', '2ba9211b3c4a5651860bcb727981a6b0.jpg');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `achievements`
--
ALTER TABLE `achievements`
  ADD PRIMARY KEY (`id_achievement`);

--
-- Indeks untuk tabel `divisions`
--
ALTER TABLE `divisions`
  ADD PRIMARY KEY (`id_divisi`);

--
-- Indeks untuk tabel `org_structures`
--
ALTER TABLE `org_structures`
  ADD PRIMARY KEY (`id_org_structures`);

--
-- Indeks untuk tabel `pivot_product_tools`
--
ALTER TABLE `pivot_product_tools`
  ADD PRIMARY KEY (`idx`);

--
-- Indeks untuk tabel `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id_products`);

--
-- Indeks untuk tabel `recruitment`
--
ALTER TABLE `recruitment`
  ADD PRIMARY KEY (`id_recruitment`);

--
-- Indeks untuk tabel `socials`
--
ALTER TABLE `socials`
  ADD PRIMARY KEY (`id_social`);

--
-- Indeks untuk tabel `tools`
--
ALTER TABLE `tools`
  ADD PRIMARY KEY (`id_tools`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `achievements`
--
ALTER TABLE `achievements`
  MODIFY `id_achievement` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `activities`
--
ALTER TABLE `activities`
  MODIFY `id_activities` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `divisions`
--
ALTER TABLE `divisions`
  MODIFY `id_divisi` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `org_structures`
--
ALTER TABLE `org_structures`
  MODIFY `id_org_structures` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

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
-- AUTO_INCREMENT untuk tabel `pivot_product_tools`
--
ALTER TABLE `pivot_product_tools`
  MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `products`
--
ALTER TABLE `products`
  MODIFY `id_products` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `recruitment`
--
ALTER TABLE `recruitment`
  MODIFY `id_recruitment` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `socials`
--
ALTER TABLE `socials`
  MODIFY `id_social` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `tools`
--
ALTER TABLE `tools`
  MODIFY `id_tools` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
