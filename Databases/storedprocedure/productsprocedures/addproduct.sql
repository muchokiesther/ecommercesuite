CREATE OR ALTER PROCEDURE addproduct(
	@productid VARCHAR(200), 
	@productname VARCHAR(155), 
	@productdescription VARCHAR(155),
	@productimage VARCHAR(155),
	@price INT ) 
AS
BEGIN
INSERT INTO products(productid ,productName, productDescription, productImage, price) VALUES(@productid, @productname, @productdescription ,@productimage, @price)
END