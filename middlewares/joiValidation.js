import joi from "joi";

const STR = joi.string();
const STR_REQUIRED = joi.string().required();
const PHONE = joi.string().allow("", null);
const EMAIL = joi.string().email({ minDomainSegments: 2 });
const NUM_REQ = joi.number();
const ISTRUE = joi.boolean().allow(null);

export const joiValidator = (req, res, next, schema) => {
  try {
    const { error } = schema.validate(req.body);

    error
      ? res.json({
          status: "error",
          message: error.message,
        })
      : next();
  } catch (error) {
    next(error);
  }
};

export const newUserValidation = (req, res, next) => {
  const schema = joi.object({
    fName: STR_REQUIRED,
    lName: STR_REQUIRED,
    phone: PHONE,
    email: EMAIL,
    password: STR_REQUIRED,
  });
  return joiValidator({ req, res, next, schema });
};
