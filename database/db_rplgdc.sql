-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 02 Feb 2020 pada 12.00
-- Versi server: 10.1.38-MariaDB
-- Versi PHP: 7.3.3

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
  `peringkat` int(2) NOT NULL,
  `foto_achievement` varchar(75) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `achievements`
--

INSERT INTO `achievements` (`id_achievement`, `judul`, `nama_pemenang`, `jurusan`, `tahun`, `peringkat`, `foto_achievement`) VALUES
(3, 'jj', 'nn', 'if', 2019, 2, 'a01f133a85bd6e651e8296597d18b6b3.png');

-- --------------------------------------------------------

--
-- Struktur dari tabel `divisions`
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
(1, 'Back End', 'back-end programming');

-- --------------------------------------------------------

--
-- Struktur dari tabel `org_structures`
--

CREATE TABLE `org_structures` (
  `id_org_structures` int(11) NOT NULL,
  `nama_org_structures` varchar(100) NOT NULL,
  `posisi_org_structures` varchar(50) NOT NULL,
  `angkatan_org_structures` int(4) NOT NULL,
  `foto_org_structures` varchar(75) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `org_structures`
--

INSERT INTO `org_structures` (`id_org_structures`, `nama_org_structures`, `posisi_org_structures`, `angkatan_org_structures`, `foto_org_structures`) VALUES
(2, '22', '22', 22, '07ab5bd46c5201579a6eca0487105a48.png');

-- --------------------------------------------------------

--
-- Struktur dari tabel `recuirement`
--

CREATE TABLE `recuirement` (
  `id_recruitment` int(10) NOT NULL,
  `foto_profile` varchar(200) NOT NULL,
  `nama_lengkap` varchar(50) NOT NULL,
  `tanggal_lahir` date NOT NULL,
  `jenis_kelamin` varchar(10) NOT NULL,
  `jurusan` varchar(50) NOT NULL,
  `angkatan` varchar(4) NOT NULL,
  `divisi` varchar(20) NOT NULL,
  `cv` varchar(100) NOT NULL,
  `motivation_letter` varchar(100) NOT NULL,
  `portofolio` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struktur dari tabel `socials`
--

CREATE TABLE `socials` (
  `id_social` int(11) NOT NULL,
  `type` varchar(10) NOT NULL,
  `value` varchar(75) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `socials`
--

INSERT INTO `socials` (`id_social`, `type`, `value`) VALUES
(1, 'link_ig', 'https://www.instagram.com/rplgdc_'),
(2, 'id_line', '@ajh8699v');

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
-- Indeks untuk tabel `recuirement`
--
ALTER TABLE `recuirement`
  ADD PRIMARY KEY (`id_recruitment`);

--
-- Indeks untuk tabel `socials`
--
ALTER TABLE `socials`
  ADD PRIMARY KEY (`id_social`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `achievements`
--
ALTER TABLE `achievements`
  MODIFY `id_achievement` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `divisions`
--
ALTER TABLE `divisions`
  MODIFY `id_divisi` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `org_structures`
--
ALTER TABLE `org_structures`
  MODIFY `id_org_structures` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `recuirement`
--
ALTER TABLE `recuirement`
  MODIFY `id_recruitment` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `socials`
--
ALTER TABLE `socials`
  MODIFY `id_social` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
