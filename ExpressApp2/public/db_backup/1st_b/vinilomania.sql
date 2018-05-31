-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Май 31 2018 г., 15:29
-- Версия сервера: 5.5.53
-- Версия PHP: 7.0.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `vinilomania`
--

-- --------------------------------------------------------

--
-- Структура таблицы `albums`
--

CREATE TABLE `albums` (
  `ID_album` int(11) NOT NULL,
  `album_cover` varchar(70) DEFAULT NULL,
  `addition_pics` varchar(200) DEFAULT NULL,
  `ID_author` int(11) NOT NULL,
  `alb_name` varchar(50) NOT NULL,
  `ID_disktype1` int(11) DEFAULT NULL,
  `ID_disktype2` int(11) DEFAULT NULL,
  `alb_price1` int(11) DEFAULT NULL,
  `alb_price2` int(11) DEFAULT NULL,
  `ID_style` int(11) NOT NULL,
  `ID_genre` int(11) NOT NULL,
  `ID_prodtype` int(11) DEFAULT NULL,
  `count1` int(11) DEFAULT NULL,
  `count2` int(11) DEFAULT NULL,
  `countdisk1` int(11) DEFAULT NULL,
  `countdisk2` int(11) DEFAULT NULL,
  `ID_origin` int(11) NOT NULL,
  `ID_label` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

--
-- Дамп данных таблицы `albums`
--

INSERT INTO `albums` (`ID_album`, `album_cover`, `addition_pics`, `ID_author`, `alb_name`, `ID_disktype1`, `ID_disktype2`, `alb_price1`, `alb_price2`, `ID_style`, `ID_genre`, `ID_prodtype`, `count1`, `count2`, `countdisk1`, `countdisk2`, `ID_origin`, `ID_label`) VALUES
(1, '0889854699123.jpg', '5dad5a84a8aafec41c02f7e8c0f9d59d_0.jpeg', 1, 'Greatest Hits 40 Trips Around The Sun', 1, 2, 880, 2340, 19, 12, 1, 12, 13, 1, 2, 1, 2),
(2, '0190758020228.jpg', '5dad5a84a8aafec41c02f7e8c0f9d59d_0.jpeg', 2, 'Seventeen', 1, 2, 1365, 2535, 22, 12, 1, 23, 15, 2, 3, 1, 1),
(9, NULL, NULL, 1, 'new', 1, NULL, 31, 123, 1, 4, 1, 12, 2, 1, 2, 1, 1),
(12, NULL, NULL, 1, 'fghfg', 1, NULL, 0, 0, 1, 4, 1, 123, 0, 2, 32, 1, 1),
(14, NULL, NULL, 1, 'Test1', NULL, 2, 123, 3122, 18, 12, 2, 13, 32, 1, 2, 1, 1),
(16, NULL, NULL, 1, 'hgf', 1, NULL, 424, 4235, 1, 4, 1, 23, 23, 2, 4, 1, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `alb_type`
--

CREATE TABLE `alb_type` (
  `ID_alb_type` int(11) NOT NULL,
  `ID_disktype` int(11) NOT NULL,
  `alb_price` int(11) NOT NULL,
  `count` int(11) NOT NULL,
  `ID_album` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `authors`
--

CREATE TABLE `authors` (
  `ID_author` int(11) NOT NULL,
  `author_name` varchar(50) NOT NULL,
  `description` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

--
-- Дамп данных таблицы `authors`
--

INSERT INTO `authors` (`ID_author`, `author_name`, `description`) VALUES
(1, 'Toto', NULL),
(2, 'Kayak', NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `disktypes`
--

CREATE TABLE `disktypes` (
  `ID_disktype` int(11) NOT NULL,
  `disktype_n` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

--
-- Дамп данных таблицы `disktypes`
--

INSERT INTO `disktypes` (`ID_disktype`, `disktype_n`) VALUES
(1, 'CD'),
(2, 'винил');

-- --------------------------------------------------------

--
-- Структура таблицы `genres`
--

CREATE TABLE `genres` (
  `ID_genre` int(11) NOT NULL,
  `genre_name` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

--
-- Дамп данных таблицы `genres`
--

INSERT INTO `genres` (`ID_genre`, `genre_name`) VALUES
(4, 'Классика'),
(5, 'Русская'),
(11, 'Поп'),
(12, 'Рок'),
(13, 'Джаз/блюз'),
(14, 'Хип-хоп'),
(15, 'Фанк/соул'),
(16, 'Электроника');

-- --------------------------------------------------------

--
-- Структура таблицы `labels`
--

CREATE TABLE `labels` (
  `ID_label` int(11) NOT NULL,
  `label_name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `labels`
--

INSERT INTO `labels` (`ID_label`, `label_name`) VALUES
(1, 'Sony Music'),
(2, 'Columbia');

-- --------------------------------------------------------

--
-- Структура таблицы `mgenre_entity`
--

CREATE TABLE `mgenre_entity` (
  `ID_entity_g` int(11) NOT NULL,
  `ID_author` int(11) NOT NULL,
  `ID_genre` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `mgenre_entity`
--

INSERT INTO `mgenre_entity` (`ID_entity_g`, `ID_author`, `ID_genre`) VALUES
(1, 1, 12);

-- --------------------------------------------------------

--
-- Структура таблицы `mstyle_entity`
--

CREATE TABLE `mstyle_entity` (
  `ID_entity_s` int(11) NOT NULL,
  `ID_author` int(11) NOT NULL,
  `ID_style` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `mstyle_entity`
--

INSERT INTO `mstyle_entity` (`ID_entity_s`, `ID_author`, `ID_style`) VALUES
(1, 1, 19);

-- --------------------------------------------------------

--
-- Структура таблицы `orders`
--

CREATE TABLE `orders` (
  `ID_order` int(11) NOT NULL,
  `User_ID` int(11) NOT NULL,
  `ID_album` int(11) NOT NULL,
  `ID_order_status` int(11) NOT NULL,
  `order_date` datetime DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `ID_disktype` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `orders`
--

INSERT INTO `orders` (`ID_order`, `User_ID`, `ID_album`, `ID_order_status`, `order_date`, `quantity`, `ID_disktype`) VALUES
(1, 1, 1, 1, NULL, 1, 1),
(2, 1, 1, 1, NULL, 1, 2);

-- --------------------------------------------------------

--
-- Структура таблицы `order_statuses`
--

CREATE TABLE `order_statuses` (
  `ID_order_status` int(11) NOT NULL,
  `order_status_name` varchar(13) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `order_statuses`
--

INSERT INTO `order_statuses` (`ID_order_status`, `order_status_name`) VALUES
(1, 'Создан'),
(2, 'Оформлен'),
(3, 'Оплачен'),
(4, 'Доставлен');

-- --------------------------------------------------------

--
-- Структура таблицы `origins`
--

CREATE TABLE `origins` (
  `ID_origin` int(11) NOT NULL,
  `origin_name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

--
-- Дамп данных таблицы `origins`
--

INSERT INTO `origins` (`ID_origin`, `origin_name`) VALUES
(1, 'Импорт'),
(2, 'Россия');

-- --------------------------------------------------------

--
-- Структура таблицы `prodtypes`
--

CREATE TABLE `prodtypes` (
  `ID_prodtype` int(11) NOT NULL,
  `prodtype_name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

--
-- Дамп данных таблицы `prodtypes`
--

INSERT INTO `prodtypes` (`ID_prodtype`, `prodtype_name`) VALUES
(1, 'Новинки'),
(2, 'бестселлеры'),
(3, 'предзаказы');

-- --------------------------------------------------------

--
-- Структура таблицы `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('tDDjMBk98YI7zN9zNxOR3bPKJ8zwzdo8', 1527855836, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":{\"username\":\"u1@email\",\"userID\":1,\"userRoleID\":2}}}');

-- --------------------------------------------------------

--
-- Структура таблицы `songs`
--

CREATE TABLE `songs` (
  `ID_song` int(11) NOT NULL,
  `song_name` varchar(30) NOT NULL,
  `song_duration` time NOT NULL,
  `number_in_alb` int(11) DEFAULT NULL,
  `ID_album` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `songs`
--

INSERT INTO `songs` (`ID_song`, `song_name`, `song_duration`, `number_in_alb`, `ID_album`) VALUES
(2, 'Spanish Sea', '00:04:20', 2, 1),
(3, 'Alone', '00:04:32', 1, 1),
(4, 'I\'ll Supply The Love', '00:03:45', 3, 1),
(5, 'I\'ll Be Over You', '00:03:52', 4, 1),
(6, 'Stranger In Town', '00:04:48', 5, 1),
(7, '99', '00:05:15', 6, 1),
(8, 'song', '00:12:12', 1, 2),
(9, 'song', '00:12:12', 1, 2),
(31, 'song', '00:12:12', 1, 2),
(32, 'song', '00:12:12', 1, 2),
(33, '324', '23:54:00', 1, 16),
(34, '324', '23:54:00', 2, 16),
(35, '324', '23:54:00', 3, 16),
(36, '324', '23:54:00', 4, 16);

-- --------------------------------------------------------

--
-- Структура таблицы `styles`
--

CREATE TABLE `styles` (
  `ID_style` int(11) NOT NULL,
  `style_name` varchar(18) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `styles`
--

INSERT INTO `styles` (`ID_style`, `style_name`) VALUES
(1, 'Vocal'),
(2, 'Ballad'),
(3, 'Pop-rock'),
(4, 'Chanson'),
(5, 'Synth-pop'),
(6, 'Europop'),
(7, 'Soul'),
(8, 'Disco'),
(9, 'Soft-rock'),
(10, 'Country'),
(11, 'Electro'),
(12, 'Rock&Roll'),
(13, 'Classical'),
(14, 'Indie-pop'),
(15, 'House'),
(16, 'Folk'),
(17, 'Alternative-rock'),
(18, 'Hard-rock'),
(19, 'Classic-rock'),
(20, 'Blues-rock'),
(21, 'Folk-rock'),
(22, 'Prog-rock'),
(23, 'Indie-rock'),
(24, 'Psychedelic-rock'),
(25, 'Punk'),
(26, 'Acoustic'),
(27, 'Art-rock'),
(28, 'Glam'),
(29, 'Heavy-metal'),
(30, 'Thrash'),
(31, 'Death-metal'),
(32, 'Nu-metal'),
(33, 'Doom-metal'),
(34, 'Metalcore'),
(35, 'Hardcore');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `User_ID` int(11) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(50) NOT NULL,
  `user_name` varchar(20) DEFAULT NULL,
  `user_surname` varchar(30) DEFAULT NULL,
  `user_patronymic` varchar(25) DEFAULT NULL,
  `user_role_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`User_ID`, `password`, `email`, `user_name`, `user_surname`, `user_patronymic`, `user_role_ID`) VALUES
(1, 'u1u1u1u', 'u1@email', NULL, NULL, NULL, 2),
(2, 'ppp', 'hhh', 'nnn', 'mmm', 'ccc', 1),
(4, 'pppp', 'u2', 'fff', 'nnn', 'ooo', 1),
(7, 'y123y5', 'y123@123', '', '', '', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `user_roles`
--

CREATE TABLE `user_roles` (
  `user_role_ID` int(11) NOT NULL,
  `role_name` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `user_roles`
--

INSERT INTO `user_roles` (`user_role_ID`, `role_name`) VALUES
(1, 'customer'),
(2, 'admin');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `albums`
--
ALTER TABLE `albums`
  ADD PRIMARY KEY (`ID_album`),
  ADD KEY `ID_author` (`ID_author`),
  ADD KEY `ID_prodtype` (`ID_prodtype`),
  ADD KEY `ID_origin` (`ID_origin`),
  ADD KEY `ID_label` (`ID_label`),
  ADD KEY `ID_disktype1` (`ID_disktype1`),
  ADD KEY `ID_disktype2` (`ID_disktype2`),
  ADD KEY `ID_genre` (`ID_genre`),
  ADD KEY `ID_style` (`ID_style`);

--
-- Индексы таблицы `alb_type`
--
ALTER TABLE `alb_type`
  ADD PRIMARY KEY (`ID_alb_type`),
  ADD KEY `ID_album` (`ID_album`),
  ADD KEY `ID_disktype` (`ID_disktype`);

--
-- Индексы таблицы `authors`
--
ALTER TABLE `authors`
  ADD PRIMARY KEY (`ID_author`);

--
-- Индексы таблицы `disktypes`
--
ALTER TABLE `disktypes`
  ADD PRIMARY KEY (`ID_disktype`);

--
-- Индексы таблицы `genres`
--
ALTER TABLE `genres`
  ADD PRIMARY KEY (`ID_genre`);

--
-- Индексы таблицы `labels`
--
ALTER TABLE `labels`
  ADD PRIMARY KEY (`ID_label`);

--
-- Индексы таблицы `mgenre_entity`
--
ALTER TABLE `mgenre_entity`
  ADD PRIMARY KEY (`ID_entity_g`),
  ADD KEY `ID_author` (`ID_author`),
  ADD KEY `ID_genre` (`ID_genre`);

--
-- Индексы таблицы `mstyle_entity`
--
ALTER TABLE `mstyle_entity`
  ADD PRIMARY KEY (`ID_entity_s`),
  ADD KEY `ID_author` (`ID_author`),
  ADD KEY `ID_style` (`ID_style`);

--
-- Индексы таблицы `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`ID_order`),
  ADD KEY `ID_album` (`ID_album`),
  ADD KEY `ID_order_status` (`ID_order_status`),
  ADD KEY `ID_disktype` (`ID_disktype`),
  ADD KEY `User_ID` (`User_ID`);

--
-- Индексы таблицы `order_statuses`
--
ALTER TABLE `order_statuses`
  ADD PRIMARY KEY (`ID_order_status`);

--
-- Индексы таблицы `origins`
--
ALTER TABLE `origins`
  ADD PRIMARY KEY (`ID_origin`);

--
-- Индексы таблицы `prodtypes`
--
ALTER TABLE `prodtypes`
  ADD PRIMARY KEY (`ID_prodtype`);

--
-- Индексы таблицы `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Индексы таблицы `songs`
--
ALTER TABLE `songs`
  ADD PRIMARY KEY (`ID_song`),
  ADD KEY `ID_album` (`ID_album`);

--
-- Индексы таблицы `styles`
--
ALTER TABLE `styles`
  ADD PRIMARY KEY (`ID_style`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`User_ID`),
  ADD KEY `user_role_ID` (`user_role_ID`);

--
-- Индексы таблицы `user_roles`
--
ALTER TABLE `user_roles`
  ADD PRIMARY KEY (`user_role_ID`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `albums`
--
ALTER TABLE `albums`
  MODIFY `ID_album` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT для таблицы `alb_type`
--
ALTER TABLE `alb_type`
  MODIFY `ID_alb_type` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT для таблицы `authors`
--
ALTER TABLE `authors`
  MODIFY `ID_author` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT для таблицы `disktypes`
--
ALTER TABLE `disktypes`
  MODIFY `ID_disktype` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT для таблицы `genres`
--
ALTER TABLE `genres`
  MODIFY `ID_genre` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT для таблицы `labels`
--
ALTER TABLE `labels`
  MODIFY `ID_label` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT для таблицы `mgenre_entity`
--
ALTER TABLE `mgenre_entity`
  MODIFY `ID_entity_g` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT для таблицы `mstyle_entity`
--
ALTER TABLE `mstyle_entity`
  MODIFY `ID_entity_s` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT для таблицы `orders`
--
ALTER TABLE `orders`
  MODIFY `ID_order` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT для таблицы `order_statuses`
--
ALTER TABLE `order_statuses`
  MODIFY `ID_order_status` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT для таблицы `origins`
--
ALTER TABLE `origins`
  MODIFY `ID_origin` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT для таблицы `prodtypes`
--
ALTER TABLE `prodtypes`
  MODIFY `ID_prodtype` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT для таблицы `songs`
--
ALTER TABLE `songs`
  MODIFY `ID_song` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;
--
-- AUTO_INCREMENT для таблицы `styles`
--
ALTER TABLE `styles`
  MODIFY `ID_style` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;
--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `User_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT для таблицы `user_roles`
--
ALTER TABLE `user_roles`
  MODIFY `user_role_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `albums`
--
ALTER TABLE `albums`
  ADD CONSTRAINT `albums_ibfk_1` FOREIGN KEY (`ID_author`) REFERENCES `authors` (`ID_author`),
  ADD CONSTRAINT `albums_ibfk_10` FOREIGN KEY (`ID_disktype2`) REFERENCES `disktypes` (`ID_disktype`),
  ADD CONSTRAINT `albums_ibfk_11` FOREIGN KEY (`ID_genre`) REFERENCES `genres` (`ID_genre`),
  ADD CONSTRAINT `albums_ibfk_12` FOREIGN KEY (`ID_style`) REFERENCES `styles` (`ID_style`),
  ADD CONSTRAINT `albums_ibfk_4` FOREIGN KEY (`ID_prodtype`) REFERENCES `prodtypes` (`ID_prodtype`),
  ADD CONSTRAINT `albums_ibfk_6` FOREIGN KEY (`ID_origin`) REFERENCES `origins` (`ID_origin`),
  ADD CONSTRAINT `albums_ibfk_7` FOREIGN KEY (`ID_label`) REFERENCES `labels` (`ID_label`),
  ADD CONSTRAINT `albums_ibfk_9` FOREIGN KEY (`ID_disktype1`) REFERENCES `disktypes` (`ID_disktype`);

--
-- Ограничения внешнего ключа таблицы `alb_type`
--
ALTER TABLE `alb_type`
  ADD CONSTRAINT `alb_type_ibfk_1` FOREIGN KEY (`ID_album`) REFERENCES `albums` (`ID_album`),
  ADD CONSTRAINT `alb_type_ibfk_2` FOREIGN KEY (`ID_disktype`) REFERENCES `disktypes` (`ID_disktype`);

--
-- Ограничения внешнего ключа таблицы `mgenre_entity`
--
ALTER TABLE `mgenre_entity`
  ADD CONSTRAINT `mgenre_entity_ibfk_1` FOREIGN KEY (`ID_author`) REFERENCES `authors` (`ID_author`),
  ADD CONSTRAINT `mgenre_entity_ibfk_2` FOREIGN KEY (`ID_genre`) REFERENCES `genres` (`ID_genre`);

--
-- Ограничения внешнего ключа таблицы `mstyle_entity`
--
ALTER TABLE `mstyle_entity`
  ADD CONSTRAINT `mstyle_entity_ibfk_1` FOREIGN KEY (`ID_author`) REFERENCES `authors` (`ID_author`),
  ADD CONSTRAINT `mstyle_entity_ibfk_2` FOREIGN KEY (`ID_style`) REFERENCES `styles` (`ID_style`);

--
-- Ограничения внешнего ключа таблицы `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_5` FOREIGN KEY (`User_ID`) REFERENCES `users` (`User_ID`),
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`ID_album`) REFERENCES `albums` (`ID_album`),
  ADD CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`ID_order_status`) REFERENCES `order_statuses` (`ID_order_status`),
  ADD CONSTRAINT `orders_ibfk_4` FOREIGN KEY (`ID_disktype`) REFERENCES `disktypes` (`ID_disktype`);

--
-- Ограничения внешнего ключа таблицы `songs`
--
ALTER TABLE `songs`
  ADD CONSTRAINT `songs_ibfk_1` FOREIGN KEY (`ID_album`) REFERENCES `albums` (`ID_album`);

--
-- Ограничения внешнего ключа таблицы `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`user_role_ID`) REFERENCES `user_roles` (`user_role_ID`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
