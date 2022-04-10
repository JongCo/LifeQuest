CREATE TABLE `tokens_tb` (
  `token` varchar(100) NOT NULL,
  `uid` int(11) unsigned NOT NULL,
  PRIMARY KEY (`token`),
  KEY `tokens_tb_FK` (`uid`),
  CONSTRAINT `tokens_tb_FK` FOREIGN KEY (`uid`) REFERENCES `users_tb` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;