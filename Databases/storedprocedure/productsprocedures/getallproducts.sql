CREATE OR ALTER PROCEDURE getAllproducts
AS
BEGIN
    SELECT * FROM products WHERE isDeleted=0
END
EXEC getAllproducts