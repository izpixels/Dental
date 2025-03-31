-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 28, 2025 at 01:01 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dentalcare_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `appointment`
--

CREATE TABLE `appointment` (
  `id` int(11) NOT NULL,
  `patient_id` varchar(50) NOT NULL,
  `transaction_number` varchar(20) NOT NULL,
  `patient_name` varchar(100) NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `service_1` varchar(100) NOT NULL,
  `cost_1` decimal(10,2) NOT NULL,
  `service_2` varchar(100) DEFAULT NULL,
  `cost_2` decimal(10,2) DEFAULT NULL,
  `service_3` varchar(100) DEFAULT NULL,
  `cost_3` decimal(10,2) DEFAULT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'Pending',
  `notes` varchar(255) NOT NULL DEFAULT 'Awaiting confirmation.',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `appointment`
--

INSERT INTO `appointment` (`id`, `patient_id`, `transaction_number`, `patient_name`, `date`, `time`, `service_1`, `cost_1`, `service_2`, `cost_2`, `service_3`, `cost_3`, `status`, `notes`, `created_at`) VALUES
(7, 'ID-2025-030', 'TR-2025-0001', 'Elyssa Junella T. Ramos', '2025-03-30', '11:00:00', 'Teeth Cleaning', 800.00, NULL, 0.00, NULL, 0.00, 'pending', 'Awaiting confirmation.', '2025-03-28 11:33:53');

-- --------------------------------------------------------

--
-- Table structure for table `appointment_slots`
--

CREATE TABLE `appointment_slots` (
  `id` int(11) NOT NULL,
  `slot_date` date NOT NULL,
  `slot_number` int(11) NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `duration_minutes` int(11) NOT NULL,
  `slots_taken` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `appointment_slots`
--

INSERT INTO `appointment_slots` (`id`, `slot_date`, `slot_number`, `start_time`, `end_time`, `duration_minutes`, `slots_taken`) VALUES
(1, '2025-04-01', 20, '08:00:00', '16:30:00', 45, 0),
(2, '2025-04-02', 20, '09:30:00', '16:00:00', 45, 0),
(3, '2025-04-03', 20, '08:00:00', '16:30:00', 45, 0),
(4, '2025-04-04', 20, '10:30:00', '16:00:00', 45, 0),
(5, '2025-04-05', 20, '08:00:00', '16:30:00', 45, 0),
(6, '2025-04-06', 20, '08:00:00', '16:30:00', 45, 0),
(7, '2025-04-07', 20, '09:30:00', '16:00:00', 45, 0),
(8, '2025-04-08', 20, '08:00:00', '16:30:00', 45, 0),
(9, '2025-04-09', 0, '10:30:00', '16:00:00', 45, 0),
(10, '2025-04-10', 15, '08:00:00', '16:30:00', 45, 0),
(11, '2025-04-11', 15, '08:00:00', '16:30:00', 45, 0),
(12, '2025-04-12', 15, '09:30:00', '16:00:00', 45, 0),
(13, '2025-04-21', 20, '08:00:00', '16:30:00', 45, 0),
(14, '2025-04-22', 10, '10:30:00', '16:00:00', 45, 0),
(15, '2025-04-23', 20, '08:00:00', '16:30:00', 45, 0),
(16, '2025-04-24', 0, '08:00:00', '16:30:00', 45, 0),
(17, '2025-04-25', 20, '09:30:00', '16:00:00', 45, 0),
(18, '2025-04-26', 20, '08:00:00', '16:30:00', 45, 0),
(19, '2025-04-27', 15, '10:30:00', '16:00:00', 45, 0),
(20, '2025-04-28', 20, '08:00:00', '16:30:00', 45, 0),
(21, '2025-04-01', 10, '09:00:00', '16:30:00', 45, 0),
(22, '2025-03-27', 10, '09:30:00', '16:00:00', 45, 0),
(23, '2025-03-28', 10, '10:00:00', '16:30:00', 45, 0),
(24, '2025-03-29', 10, '10:30:00', '16:00:00', 45, 0),
(25, '2025-03-30', 10, '11:00:00', '16:30:00', 45, 0);

-- --------------------------------------------------------

--
-- Table structure for table `holiday_form`
--

CREATE TABLE `holiday_form` (
  `id` int(11) NOT NULL,
  `holiday_date` date NOT NULL,
  `details` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `holiday_form`
--

INSERT INTO `holiday_form` (`id`, `holiday_date`, `details`) VALUES
(33, '2025-04-13', 'Palm Sunday'),
(35, '2025-04-14', 'Holy Monday'),
(36, '2025-04-15', 'Holy Tuesday'),
(37, '2025-04-16', 'Spy Wednesday'),
(38, '2025-04-17', 'Maundy Thursday'),
(39, '2025-04-18', 'Good Friday'),
(40, '2025-04-19', 'Holy Saturday'),
(41, '2025-04-20', 'Easter Sunday');

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `id` int(11) NOT NULL,
  `service_name` varchar(255) NOT NULL,
  `cost` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`id`, `service_name`, `cost`, `created_at`) VALUES
(1, 'Dental Braces\r\n', 1000.00, '2025-03-24 13:35:22'),
(2, 'CLEANING', 1800.00, '2025-03-24 14:10:52'),
(3, 'PASTA', 8000.00, '2025-03-24 15:24:31'),
(4, 'Dental Bridges', 15000.00, '2025-03-24 17:15:53'),
(5, 'PUSTISO', 1000.00, '2025-03-24 17:21:29'),
(6, 'Teeth Cleaning ', 800.00, '2025-03-24 17:28:47'),
(7, 'Dental Check-Up & Consultation ', 500.00, '2025-03-24 17:30:41'),
(8, 'Dental Fillings (Tooth Restoration)', 800.00, '2025-03-24 17:32:18'),
(9, 'Tooth Extraction (Simple)', 1000.00, '2025-03-24 17:33:25'),
(10, 'Wisdom Tooth Extraction (Surgical', 5000.00, '2025-03-24 17:34:46'),
(11, 'Teeth Whitening (Bleaching)', 3000.00, '2025-03-24 17:35:27'),
(12, 'Dental Veneers (Composite or Porcelain)', 5000.00, '2025-03-24 17:36:19'),
(13, 'Dental Bonding ', 3000.00, '2025-03-24 17:39:37'),
(14, 'Smile Makeove', 50000.00, '2025-03-24 17:40:45'),
(15, 'Metal Braces (Traditional)', 30000.00, '2025-03-24 17:42:47'),
(16, 'Ceramic Braces', 50000.00, '2025-03-24 17:43:54'),
(17, 'Invisible Aligners (Invisalign, Clear Aligners', 80000.00, '2025-03-24 17:44:55'),
(18, 'Retainers', 3000.00, '2025-03-24 17:45:44'),
(19, 'Dental Crowns (Porcelain, Zirconia, Metal)', 8000.00, '2025-03-24 17:46:39'),
(20, 'Dental Crowns (Porcelain, Zirconia, Metal)', 8000.00, '2025-03-24 17:47:11');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone_number` varchar(11) NOT NULL,
  `password` varchar(255) NOT NULL,
  `birth_date` date NOT NULL,
  `street_address` varchar(255) NOT NULL,
  `barangay` varchar(255) NOT NULL,
  `city` varchar(100) NOT NULL,
  `region` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `profile_pic` varchar(255) NOT NULL DEFAULT 'default.jpg',
  `patient_id` varchar(20) DEFAULT NULL,
  `usertype` enum('admin','dentist','patient') NOT NULL DEFAULT 'patient'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `full_name`, `email`, `phone_number`, `password`, `birth_date`, `street_address`, `barangay`, `city`, `region`, `created_at`, `profile_pic`, `patient_id`, `usertype`) VALUES
(30, 'Elyssa Junella T. Ramos', 'elyssaramos17@gmail.com', '09151855197', '$2y$10$hYIyaHW6W3gWVsCs9p3OxuSyydJGCSkaO6yvOQIBXtAxF47X8z7ka', '2003-06-10', 'b9 l12 vermillion st. pecson ville Subd', 'tungkong mnagga', 'san jose del monte ', 'bulacan', '2025-03-26 12:01:35', 'uploads/profile_30.jpg', 'ID-2025-030', 'patient'),
(31, 'kimbies Cuenza', 'kimcuenza@gmail.com', '09923509690', '$2y$10$J8U3IIScD2ImBQeQ1yp1V.DaDpfnmRWpT6A8V1cSYThYMYtNZTVBe', '2002-11-29', 'b7 l15 ipil st. terrazza martha', 'poblacion1', 'SJDM', 'bulacan', '2025-03-26 12:04:21', 'uploads/profile_31.jpg', 'ID-2025-031', 'patient'),
(32, 'Kimbies M. Cuenza', 'Kimcuenza60@gmail.com', '09186654321', '$2y$10$ADPJ8JF.KUFcORht4ALqZe.M7vljmJzJVQkIForA.MohDCmGAKMlW', '2000-02-11', 'Blk 7 Lot15 ipil st. Terrazza  Martha subd.', 'Poblacion l', 'San Jose Del Monte', 'Bulacan', '2025-03-28 05:11:06', 'default.jpg', 'ID-2025-032', 'patient'),
(33, 'Dr. Misiona ', 'admin@example.com', '09887765541', '$2y$10$DMQ//XMegb.AXCfm7WWY9epqJquKfQzXDNTqET4x9K.M.20ioTak.', '2000-02-11', 'Blk8 Lot17', 'Road 10', 'Norzagaray', 'Bulacan', '2025-03-28 05:19:07', 'default.jpg', 'ID-2025-033', 'admin'),
(34, 'Elyssa Junella Ramos', 'elyramos17@gmail.com', '09923509699', '$2y$10$vii1VtkbuT4mKtPn1nQ3yuYOZhWxRa2GQzpQlGmq8HnhW40kHm8CG', '2003-06-10', 'b9 l12 Vermillion St. Pecsonville Subd.', 'Tungkong Mangga', 'SJDM', 'Bulacan', '2025-03-28 06:02:43', 'uploads/profile_34.jpg', 'ID-2025-034', 'patient');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appointment`
--
ALTER TABLE `appointment`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `transaction_number` (`transaction_number`);

--
-- Indexes for table `appointment_slots`
--
ALTER TABLE `appointment_slots`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `holiday_form`
--
ALTER TABLE `holiday_form`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `patient_id` (`patient_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appointment`
--
ALTER TABLE `appointment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `appointment_slots`
--
ALTER TABLE `appointment_slots`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `holiday_form`
--
ALTER TABLE `holiday_form`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
