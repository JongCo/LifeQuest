CREATE TABLE `users_tb` (
  `uid` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` char(64) NOT NULL,
  PRIMARY KEY (`uid`),
  UNIQUE KEY `users_tb_un` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;