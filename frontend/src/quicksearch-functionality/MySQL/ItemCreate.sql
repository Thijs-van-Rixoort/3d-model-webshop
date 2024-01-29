CREATE SCHEMA placeholder;


CREATE TABLE productList
(
  `productid` varchar (6),
  `price` decimal (5,2),
  `productname` text (64),
  `productdescription` text (256),
  `sellerid` varchar (20),
  `producticon` text,
  primary key (`productid`)
);
