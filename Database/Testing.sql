-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Aug 21, 2019 at 07:54 PM
-- Server version: 10.0.38-MariaDB-0ubuntu0.16.04.1
-- PHP Version: 7.0.33-0ubuntu0.16.04.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `Testing`
--

-- --------------------------------------------------------

--
-- Table structure for table `block`
--

CREATE TABLE `block` (
  `id` int(10) UNSIGNED NOT NULL,
  `course_id` int(10) UNSIGNED NOT NULL,
  `course_block_id` int(10) UNSIGNED NOT NULL,
  `user_id` mediumint(8) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `choose_course`
--

CREATE TABLE `choose_course` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(80) NOT NULL,
  `from` int(11) NOT NULL,
  `until` int(11) NOT NULL,
  `grade_until` int(11) NOT NULL,
  `long_year` tinyint(3) UNSIGNED DEFAULT NULL,
  `disable_limits` tinyint(1) NOT NULL DEFAULT '0',
  `disable_session` tinyint(1) NOT NULL DEFAULT '0',
  `depart_id` mediumint(8) UNSIGNED NOT NULL,
  `user_id` mediumint(8) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `choose_sector`
--

CREATE TABLE `choose_sector` (
  `id` int(10) UNSIGNED NOT NULL,
  `from` int(11) NOT NULL,
  `until` int(11) NOT NULL,
  `semester` tinyint(3) UNSIGNED NOT NULL,
  `sector_semester` tinyint(3) UNSIGNED NOT NULL,
  `depart_id` mediumint(8) UNSIGNED NOT NULL,
  `user_id` mediumint(8) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `id` int(10) UNSIGNED NOT NULL,
  `curriculum_id` mediumint(8) UNSIGNED NOT NULL,
  `course_name` varchar(60) NOT NULL,
  `teacher_id` mediumint(8) UNSIGNED NOT NULL,
  `dscr` text NOT NULL,
  `credits` tinyint(3) UNSIGNED NOT NULL,
  `ects` tinyint(3) UNSIGNED NOT NULL,
  `lab` tinyint(1) NOT NULL,
  `session` tinyint(1) NOT NULL,
  `weight` smallint(5) UNSIGNED NOT NULL,
  `user_id` mediumint(8) UNSIGNED NOT NULL,
  `disable` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `course_block`
--

CREATE TABLE `course_block` (
  `id` int(10) UNSIGNED NOT NULL,
  `semester_id` int(10) UNSIGNED NOT NULL,
  `type` tinyint(3) UNSIGNED NOT NULL,
  `max_select` tinyint(3) UNSIGNED NOT NULL,
  `min_pass` tinyint(3) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `course_chain`
--

CREATE TABLE `course_chain` (
  `id` int(10) UNSIGNED NOT NULL,
  `block_id` int(10) UNSIGNED NOT NULL,
  `chain_course_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `curriculum`
--

CREATE TABLE `curriculum` (
  `id` mediumint(8) UNSIGNED NOT NULL,
  `curriculum_name` varchar(50) NOT NULL,
  `depart_id` mediumint(8) UNSIGNED NOT NULL,
  `semester_number` tinyint(3) UNSIGNED NOT NULL,
  `max_course` tinyint(3) UNSIGNED NOT NULL,
  `user_id` mediumint(8) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `id` mediumint(8) UNSIGNED NOT NULL,
  `depart_name` varchar(100) NOT NULL,
  `depart_code` varchar(50) NOT NULL,
  `phone1` bigint(20) UNSIGNED NOT NULL,
  `phone2` bigint(20) UNSIGNED NOT NULL,
  `address` varchar(100) NOT NULL,
  `lat` double NOT NULL,
  `lng` double NOT NULL,
  `email` varchar(60) CHARACTER SET latin1 COLLATE latin1_general_ci NOT NULL,
  `semesters` tinyint(3) UNSIGNED NOT NULL,
  `descr` text NOT NULL,
  `uni_id` smallint(5) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `enrollment`
--

CREATE TABLE `enrollment` (
  `id` smallint(5) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL,
  `disable` tinyint(1) NOT NULL,
  `user_id` mediumint(8) UNSIGNED NOT NULL,
  `uni_id` smallint(5) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `grades`
--

CREATE TABLE `grades` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` mediumint(8) UNSIGNED NOT NULL,
  `teacher_id` mediumint(8) UNSIGNED NOT NULL,
  `course_id` int(10) UNSIGNED NOT NULL,
  `register_course_id` int(10) UNSIGNED NOT NULL,
  `temp_grade` tinyint(3) UNSIGNED NOT NULL,
  `grade` tinyint(3) UNSIGNED NOT NULL,
  `verify_grade` mediumint(8) UNSIGNED NOT NULL,
  `weight` smallint(5) UNSIGNED NOT NULL,
  `depart_id` mediumint(8) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `login_log`
--

CREATE TABLE `login_log` (
  `user_id` mediumint(8) UNSIGNED NOT NULL,
  `ip` varbinary(16) NOT NULL,
  `attempt` tinyint(3) UNSIGNED NOT NULL,
  `last_attempt` int(11) NOT NULL
) ENGINE=MEMORY DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `my_course`
--

CREATE TABLE `my_course` (
  `id` int(10) UNSIGNED NOT NULL,
  `choose_course_id` int(10) UNSIGNED NOT NULL,
  `user_id` mediumint(8) UNSIGNED NOT NULL,
  `course_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `my_sector`
--

CREATE TABLE `my_sector` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` mediumint(8) UNSIGNED NOT NULL,
  `sector_id` int(10) UNSIGNED NOT NULL,
  `date` int(11) NOT NULL,
  `choose_sector_id` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `register_course`
--

CREATE TABLE `register_course` (
  `id` int(10) UNSIGNED NOT NULL,
  `choose_course_id` int(10) UNSIGNED NOT NULL,
  `user_id` mediumint(8) UNSIGNED NOT NULL,
  `date` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `sector`
--

CREATE TABLE `sector` (
  `id` int(10) UNSIGNED NOT NULL,
  `sector_name` varchar(60) NOT NULL,
  `curriculum_id` mediumint(8) UNSIGNED NOT NULL,
  `start_semester` tinyint(3) UNSIGNED NOT NULL,
  `last_sector_id` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `semester`
--

CREATE TABLE `semester` (
  `id` int(10) UNSIGNED NOT NULL,
  `sector_id` int(10) UNSIGNED NOT NULL,
  `semester` tinyint(3) UNSIGNED NOT NULL,
  `min_pass` tinyint(3) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `staff_info`
--

CREATE TABLE `staff_info` (
  `user_id` mediumint(8) UNSIGNED NOT NULL,
  `description` text NOT NULL,
  `contact_hours` text NOT NULL,
  `site` varchar(50) NOT NULL,
  `staff_sector` tinyint(3) UNSIGNED NOT NULL,
  `depart_id` mediumint(8) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `thesis`
--

CREATE TABLE `thesis` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` mediumint(8) UNSIGNED NOT NULL,
  `teacher_id` mediumint(8) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL,
  `descr` text CHARACTER SET utf8 COLLATE utf8_german2_ci NOT NULL,
  `verify_id` mediumint(8) UNSIGNED NOT NULL,
  `temp_grade` tinyint(3) UNSIGNED NOT NULL,
  `grade` tinyint(3) UNSIGNED NOT NULL,
  `verify_grade` mediumint(8) UNSIGNED NOT NULL,
  `weight` smallint(5) UNSIGNED NOT NULL,
  `depart_id` mediumint(8) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `token`
--

CREATE TABLE `token` (
  `user_id` int(10) UNSIGNED NOT NULL,
  `token` char(64) CHARACTER SET latin1 COLLATE latin1_general_ci NOT NULL,
  `valid` int(11) NOT NULL,
  `last_visit` int(11) NOT NULL,
  `remember` tinyint(1) NOT NULL
) ENGINE=MEMORY DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `university`
--

CREATE TABLE `university` (
  `id` smallint(5) UNSIGNED NOT NULL,
  `uni_name` varchar(100) NOT NULL,
  `user_id` mediumint(8) UNSIGNED NOT NULL,
  `img` varchar(50) NOT NULL,
  `phone1` bigint(20) UNSIGNED NOT NULL,
  `phone2` bigint(20) UNSIGNED NOT NULL,
  `address` varchar(100) NOT NULL,
  `lat` double NOT NULL,
  `lng` double NOT NULL,
  `email` varchar(60) CHARACTER SET latin1 COLLATE latin1_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` mediumint(8) UNSIGNED NOT NULL,
  `username` varchar(16) CHARACTER SET latin1 COLLATE latin1_general_ci NOT NULL,
  `email` varchar(50) CHARACTER SET latin1 COLLATE latin1_general_ci NOT NULL,
  `aem` smallint(5) UNSIGNED NOT NULL,
  `password` char(60) NOT NULL,
  `access_level` tinyint(3) UNSIGNED NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `father_name` varchar(50) NOT NULL,
  `phone` bigint(20) UNSIGNED NOT NULL,
  `phone2` bigint(20) UNSIGNED NOT NULL,
  `address` varchar(100) NOT NULL,
  `post_code` mediumint(8) UNSIGNED NOT NULL,
  `date_of_registration` date NOT NULL,
  `semester_enter` tinyint(3) UNSIGNED NOT NULL,
  `current_semester` tinyint(3) UNSIGNED NOT NULL,
  `enrollment` smallint(5) UNSIGNED NOT NULL,
  `first_degree` tinyint(1) NOT NULL,
  `status` tinyint(3) UNSIGNED NOT NULL,
  `gender` tinyint(3) UNSIGNED NOT NULL,
  `birth_date` date NOT NULL,
  `country` char(2) CHARACTER SET latin1 COLLATE latin1_general_ci NOT NULL,
  `user_id` mediumint(8) UNSIGNED NOT NULL,
  `depart_id` mediumint(8) UNSIGNED NOT NULL,
  `curriculum_id` mediumint(8) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `block`
--
ALTER TABLE `block`
  ADD PRIMARY KEY (`id`),
  ADD KEY `course-block-id` (`course_block_id`),
  ADD KEY `course_id` (`course_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `choose_course`
--
ALTER TABLE `choose_course`
  ADD PRIMARY KEY (`id`),
  ADD KEY `from` (`from`),
  ADD KEY `until` (`until`),
  ADD KEY `depart-id` (`depart_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `choose_sector`
--
ALTER TABLE `choose_sector`
  ADD PRIMARY KEY (`id`),
  ADD KEY `from` (`from`),
  ADD KEY `until` (`until`),
  ADD KEY `semester` (`semester`),
  ADD KEY `depart-id` (`depart_id`),
  ADD KEY `user-id` (`user_id`);

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`id`),
  ADD KEY `curriculum-id` (`curriculum_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `teacher_id` (`teacher_id`);

--
-- Indexes for table `course_block`
--
ALTER TABLE `course_block`
  ADD PRIMARY KEY (`id`),
  ADD KEY `semester-id` (`semester_id`);

--
-- Indexes for table `course_chain`
--
ALTER TABLE `course_chain`
  ADD PRIMARY KEY (`id`),
  ADD KEY `block-id` (`block_id`);

--
-- Indexes for table `curriculum`
--
ALTER TABLE `curriculum`
  ADD PRIMARY KEY (`id`),
  ADD KEY `depart_id` (`depart_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`id`),
  ADD KEY `uni_id` (`uni_id`);

--
-- Indexes for table `enrollment`
--
ALTER TABLE `enrollment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `uni_id` (`uni_id`) USING BTREE;

--
-- Indexes for table `grades`
--
ALTER TABLE `grades`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `teacher_id` (`teacher_id`),
  ADD KEY `course_id` (`course_id`),
  ADD KEY `verify_grade` (`verify_grade`),
  ADD KEY `depart_id` (`depart_id`),
  ADD KEY `register_course_id` (`register_course_id`) USING BTREE;

--
-- Indexes for table `login_log`
--
ALTER TABLE `login_log`
  ADD KEY `user_ip` (`user_id`,`ip`);

--
-- Indexes for table `my_course`
--
ALTER TABLE `my_course`
  ADD PRIMARY KEY (`id`),
  ADD KEY `choose-course-id` (`choose_course_id`),
  ADD KEY `user-id` (`user_id`),
  ADD KEY `course_id` (`course_id`);

--
-- Indexes for table `my_sector`
--
ALTER TABLE `my_sector`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user-id` (`user_id`),
  ADD KEY `sector-id` (`sector_id`),
  ADD KEY `choose-sector-id` (`choose_sector_id`);

--
-- Indexes for table `register_course`
--
ALTER TABLE `register_course`
  ADD PRIMARY KEY (`id`),
  ADD KEY `choose-course-id` (`choose_course_id`),
  ADD KEY `user-id` (`user_id`);

--
-- Indexes for table `sector`
--
ALTER TABLE `sector`
  ADD PRIMARY KEY (`id`),
  ADD KEY `curriculum-id` (`curriculum_id`),
  ADD KEY `last_sector_id` (`last_sector_id`);

--
-- Indexes for table `semester`
--
ALTER TABLE `semester`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sector-id` (`sector_id`),
  ADD KEY `semester` (`semester`);

--
-- Indexes for table `staff_info`
--
ALTER TABLE `staff_info`
  ADD KEY `user_id` (`user_id`),
  ADD KEY `depart_id` (`depart_id`);

--
-- Indexes for table `thesis`
--
ALTER TABLE `thesis`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `teacher_id` (`teacher_id`),
  ADD KEY `verify_id` (`verify_id`),
  ADD KEY `verify_grade` (`verify_grade`),
  ADD KEY `depart_id` (`depart_id`);

--
-- Indexes for table `token`
--
ALTER TABLE `token`
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `university`
--
ALTER TABLE `university`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `unique_index` (`first_name`,`last_name`,`father_name`,`birth_date`),
  ADD KEY `depart_id` (`depart_id`),
  ADD KEY `curriculum_id` (`curriculum_id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `block`
--
ALTER TABLE `block`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=84;
--
-- AUTO_INCREMENT for table `choose_course`
--
ALTER TABLE `choose_course`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `choose_sector`
--
ALTER TABLE `choose_sector`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `course`
--
ALTER TABLE `course`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;
--
-- AUTO_INCREMENT for table `course_block`
--
ALTER TABLE `course_block`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;
--
-- AUTO_INCREMENT for table `course_chain`
--
ALTER TABLE `course_chain`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;
--
-- AUTO_INCREMENT for table `curriculum`
--
ALTER TABLE `curriculum`
  MODIFY `id` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;
--
-- AUTO_INCREMENT for table `department`
--
ALTER TABLE `department`
  MODIFY `id` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `enrollment`
--
ALTER TABLE `enrollment`
  MODIFY `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `grades`
--
ALTER TABLE `grades`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `my_course`
--
ALTER TABLE `my_course`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `my_sector`
--
ALTER TABLE `my_sector`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
--
-- AUTO_INCREMENT for table `register_course`
--
ALTER TABLE `register_course`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `sector`
--
ALTER TABLE `sector`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;
--
-- AUTO_INCREMENT for table `semester`
--
ALTER TABLE `semester`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=95;
--
-- AUTO_INCREMENT for table `thesis`
--
ALTER TABLE `thesis`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `university`
--
ALTER TABLE `university`
  MODIFY `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
