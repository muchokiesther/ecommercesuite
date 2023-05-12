CREATE OR ALTER PROCEDURE updateProduct(
    @productid VARCHAR(200),
    @pname VARCHAR(155), 
    @pdesc VARCHAR(155), 
    @pimage VARCHAR(155), 
    @price INT)
AS 
BEGIN
UPDATE products SET productName=@pname, productDescription=@pdesc, productImage=@pimage, price=@price WHERE productid=@productid AND isDeleted=0
END