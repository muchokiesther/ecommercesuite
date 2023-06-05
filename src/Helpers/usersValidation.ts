//schemas for users

import Joi, {ref} from 'joi'



export const RegistrationSchema =  Joi.object({
    username:Joi.string().required().min(2),
    fullname:Joi.string().required().min(4),
    email:Joi.string().required().email().messages({
        'string.empty': 'Please add an email',
        'string.email': 'Not a valid email'
    }),
    phonenumber:Joi.number().required(),
    upassword:Joi.string().required().pattern((new RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$`))),
    confirmpassword: Joi.equal(ref('upassword')),
})
export const regSchema =  Joi.object({
    userName:Joi.string().required().min(2),
    fullName:Joi.string().required().min(4),
    email:Joi.string().email().required(),
    phoneNumber:Joi.number().required(),
    password:Joi.string().pattern((new  RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$`)))
   

})
export const resetSchema =  Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().pattern((new  RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$`))),

})

// role:Joi.string()

export const LoginSchema = Joi.object({
    email: Joi.string().required().email().messages({
                'string.empty': 'Please add an email',
                'string.email': 'Not a valid email'
            }),
    upassword: Joi.string().required()
})

