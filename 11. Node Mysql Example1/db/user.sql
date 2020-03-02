CREATE database nodeSql;

CREATE TABLE `user` (
  `id` int(10) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `creation_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `email`, `password`,`creation_date`) VALUES
(11, 'tammy.lord@experts.com', 'c7730226fb8fdb7aa1561e62fad0af79', '2019-08-26 15:02:50');