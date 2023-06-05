CREATE TABLE Orders(
	ORDERID VARCHAR(200)PRIMARY KEY,
	CID VARCHAR(200),
	UID VARCHAR(200),
	UEMAIL VARCHAR(150),
	PNAME VARCHAR(155),
	PDESCRIPTION VARCHAR(155),
	PRICE INT,
	PCOUNT INT,
	ORDERDATE DATE DEFAULT getDate(),
	ORDERSTATUS VARCHAR(100) CHECK(ORDERSTATUS IN ('Pending','Processing','Rejected','Completed')) DEFAULT 'Pending',
	ISDELETED INT DEFAULT 0,
	FOREIGN KEY (UID) REFERENCES dbo.Users (USERID),
	FOREIGN KEY (CID) REFERENCES dbo.Cartbasket
)