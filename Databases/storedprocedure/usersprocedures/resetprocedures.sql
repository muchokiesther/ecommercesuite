USE [ASSIGNMENT]

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER   PROCEDURE [dbo].[resetPassword]
    @email VARCHAR(255),
    @password VARCHAR(200)  
AS
BEGIN

    -- Update the password for the user with the provided email
    UPDATE users
    SET password = @password, isReset=1
    WHERE email = @email;
   
END;
