-For local run
-Create database userstories in mysql then run below commands to create table register
CREATE TABLE `register` (
  `id` int(11) NOT NULL,
  `teacher` text NOT NULL,
  `student` text NOT NULL,
  `suspend` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


INSERT INTO `register` (`id`, `teacher`, `student`, `suspend`) VALUES
(1, 'teacherthree@gmail.com', 'studentone@gmail.com', 'R'),
(2, 'teacherthree@gmail.com', 'studenttwo@gmail.com', 'S'),
(3, 'teacherone@gmail.com', 'studentone@gmail.com', 'R'),
(4, 'teacherone@gmail.com', 'studentfour@gmail.com', 'R'),
(5, 'teachertwo@gmail.com', 'studenttwo@gmail.com', 'S'),
(6, 'teachertwo@gmail.com', 'studentfour@gmail.com', 'R'),
(7, 'teacherfour@gmail.com', 'studentone@gmail.com', 'R'),
(8, 'teacherfour@gmail.com', 'studenttwo@gmail.com', 'S');

-Go to your project directory
-Run on command line like 'npm run dev'
-Open one your api services application(for example POSTMAN)
-Get all api for your test
-API call for example
localhost:8000/api/register
localhost:8000/api/commonstudents?teacher=teacherone@gmail.com&teacher=teachertwo@gmail.com
localhost:8000/api/suspend
localhost:8000/api/retrievefornotifications
