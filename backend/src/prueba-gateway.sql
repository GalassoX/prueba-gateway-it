SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `owners` (
  `id` int(11) NOT NULL,
  `type_doc` int(11) NOT NULL DEFAULT 0,
  `document` int(11) NOT NULL,
  `name` varchar(64) NOT NULL,
  `address` text NOT NULL,
  `phone` int(11) NOT NULL,
  `mail` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE `owners`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `document` (`document`);

ALTER TABLE `owners`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;


CREATE TABLE `vehicles` (
  `id` int(11) NOT NULL,
  `plate` varchar(7) NOT NULL,
  `brand` varchar(32) NOT NULL,
  `model` text NOT NULL,
  `year` int(11) NOT NULL,
  `color` text NOT NULL,
  `owner` int(11) NOT NULL,
  `notes` text NOT NULL DEFAULT '',
  `register_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE `vehicles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `owner` (`owner`);

ALTER TABLE `vehicles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `vehicles`
  ADD CONSTRAINT `vehicles_ibfk_1` FOREIGN KEY (`owner`) REFERENCES `owners` (`id`);

CREATE TABLE `vehicle_notes` (
  `id` int(11) NOT NULL,
  `vehicle` int(11) NOT NULL,
  `note` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE `vehicle_notes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `vn_fk_v` (`vehicle`);

ALTER TABLE `vehicle_notes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `vehicle_notes`
  ADD CONSTRAINT `vn_fk_v` FOREIGN KEY (`vehicle`) REFERENCES `vehicles` (`id`);

COMMIT;