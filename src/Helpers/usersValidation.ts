//schemas for users

import Joi, {ref} from 'joi'


export const regSchema =  Joi.object({
    userName:Joi.string().required().min(2),
    fullName:Joi.string().required().min(4),
    email:Joi.string().required().email().messages({
        'string.empty': 'Please add an email',
        'string.email': 'Not a valid email'
    }),
    phoneNumber:Joi.number().required(),
    password:Joi.string().pattern((new  RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$`))),
    role:Joi.string()

})

// confirmpassword : Joi.equal(ref('password))

// export const resetSchema =  joi.object({
//     email:joi.string().email().required().messages({
//         'string.empty': 'Please add an email',
//         'string.email': 'Not a valid email'
//     }),
//     password:joi.string().required(),

// })

export const LoginSchema = Joi.object({
    email: Joi.string().required().email().messages({
                'string.empty': 'Please add an email',
                'string.email': 'Not a valid email'
            }),
    password: Joi.string().required()
})

