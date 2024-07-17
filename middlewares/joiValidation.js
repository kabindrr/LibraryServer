import joi from "joi";

const STR = joi.string();
const STR_REQUIRED = joi.string().required();
const PHONE = joi.number().allow("", null);
const EMAIL = joi.string().email({ minDomainSegments: 2 });
const NUM_REQ = joi.number();
const ISTRUE = joi.boolean().allow(null);

const joiValidator = (schema, req, res, next) => {
  try {
    const { error } = schema.validate(req.body);

    error
      ? res.json({
          status: "error",
          message: error.message,
        })
      : next();
  } catch (error) {
    res.json({
      status: "error",
      message: error,
    });
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
  return joiValidator(schema, req, res, next);
};
