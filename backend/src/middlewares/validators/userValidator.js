import { check, validationResult } from 'express-validator'

export const validateRegister = [
    check('firstName')
        .exists()
        .not()
        .isEmpty(),
    check('lastName')
        .exists()
        .not()
        .isEmpty(),
    check('email')
        .exists()
        .isEmail(),
    check('password')
        .exists()
        .not()
        .isEmpty()
        .isLength({min:6}),
    (req, res, next) => {
        try {
            validationResult(req).throw()
            return next()
        } catch (error) {
            res.status(400).send(error)
        }
    }
];