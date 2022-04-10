CREATE TABLE `todoes_tb` (
  `todo_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `create_date` datetime DEFAULT NULL,
  `success` varchar(10) NOT NULL DEFAULT 'false',
  `uid` int(10) unsigned NOT NULL,
  PRIMARY KEY (`todo_id`),
  KEY `todoes_tb_FK` (`uid`),
  CONSTRAINT `todoes_tb_FK` FOREIGN KEY (`uid`) REFERENCES `users_tb` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;