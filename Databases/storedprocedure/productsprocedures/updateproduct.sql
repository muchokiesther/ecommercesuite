CREATE OR ALTER PROCEDURE updateProduct(
    @pid VARCHAR(200),
    @pname VARCHAR(155), 
    @pdescription VARCHAR(155), 
    @pimage VARCHAR(1000), 
    @pquantity INT,
    @price INT,
    @pcategory VARCHAR(155))
AS 
BEGIN
UPDATE Products SET PNAME=@pname, PDESCRIPTION=@pdescription, PIMAGE=@pimage, PQUANTITY=@pquantity, PRICE=@price, PCATEGORY=@pcategory WHERE PID=@pid AND isDeleted=0
END