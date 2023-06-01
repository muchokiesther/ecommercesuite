//schemas for users

import joi from 'joi'


export const regSchema =  joi.object({
    userName:joi.string().required().min(2),
    fullName:joi.string().required().min(4),
    email:joi.string().email().required(),
    phoneNumber:joi.number().required(),
    password:joi.string().pattern((new  RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$`)))
   

})
export const resetSchema =  joi.object({
    email:joi.string().email().required(),
    password:joi.string().pattern((new  RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$`))),

})

