CREATE OR ALTER PROCEDURE addProduct(
	@pid VARCHAR(200),	
	@pname VARCHAR(155),
	@pdescription VARCHAR(155),
	@pimage VARCHAR(1000),
	@pquantity INT,
	@price INT,
	@pcategory VARCHAR(155)) 
AS
BEGIN
INSERT INTO Products(PID ,PNAME, PDESCRIPTION, PIMAGE, PQUANTITY,PRICE,PCATEGORY) VALUES(@pid, @pname, @pdescription ,@pimage, @pquantity, @price, @pcategory)
END

EXEC addProduct @pid='2324', @pname='Keyboard', @pdescription='Flexible Qwerty keyboard', @pimage='link', @pquantity=76, @price=430, @pcategory='peripherals'