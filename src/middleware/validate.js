const Joi = require("joi");

const registerSchema = Joi.object({
  username: Joi.string().min(4).max(100).required().messages({
    "string.empty": "Username is required",
    "string.min": "Username must be at least 4 characters",
    "string.max": "Username must be less than or equal to 100 characters",
  }),

  email: Joi.string().email().max(100).required().messages({
    "string.empty": "Email is required",
    "string.email": "Email is not valid",
  }),

  password: Joi.string().min(8).max(100).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 8 characters",
  }),

  role: Joi.boolean().required().messages({
    "boolean.base": "Role must be a boolean value",
  }),
});

const workerProfileSchema = Joi.object({
  city: Joi.string().max(100).messages({
    "string.empty": "City is required",
    "string.max": "City must be less than or equal to 100 characters",
  }),

  province: Joi.string().max(100).messages({
    "string.empty": "Province is required",
    "string.max": "Province must be less than or equal to 100 characters",
  }),

  last_work: Joi.string().max(100).messages({
    "string.empty": "Last work is required",
    "string.max": "Last work must be less than or equal to 100 characters",
  }),

  description: Joi.string().max(200).messages({
    "string.empty": "Description is required",
    "string.max": "Description must be less than or equal to 200 characters",
  }),
});

const companyProfileSchema = Joi.object({
  company_name: Joi.string().max(100).messages({
    "string.empty": "Company name is required",
    "string.max": "Company name must be less than or equal to 100 characters",
  }),

  company_email: Joi.string().email().max(100).messages({
    "string.empty": "Company email is required",
    "string.email": "Company email is not valid",
  }),

  company_phone: Joi.string().min(10).max(20).messages({
    "string.empty": "Company phone is required",
    "string.min": "Company phone must be at least 10 characters",
    "string.max": "Company phone must be less than or equal to 20 characters",
  }),

  company_field: Joi.string().max(100).messages({
    "string.empty": "Company field is required",
    "string.max": "Company field must be less than or equal to 100 characters",
  }),

  city: Joi.string().max(100).messages({
    "string.empty": "City is required",
    "string.max": "City must be less than or equal to 100 characters",
  }),

  province: Joi.string().max(100).messages({
    "string.empty": "Province is required",
    "string.max": "Province must be less than or equal to 100 characters",
  }),

  description: Joi.string().max(200).messages({
    "string.empty": "Description is required",
    "string.max": "Description must be less than or equal to 200 characters",
  }),
});

const experienceSchema = Joi.object({
  user_id: Joi.string().required(),
  position: Joi.string().max(100).required().messages({
    "string.empty": "Position is required",
    "string.max": "Position must be less than or equal to 100 characters",
  }),
  company_name: Joi.string().max(100).required().messages({
    "string.empty": "Company name is required",
    "string.max": "Company name must be less than or equal to 100 characters",
  }),
  working_start: Joi.date().required().messages({
    "string.empty": "Working start is required",
  }),
  working_end: Joi.date().required().messages({
    "string.empty": "Working end is required",
  }),
  description: Joi.string().max(200).required().messages({
    "string.empty": "Description is required",
    "string.max": "Description must be less than or equal to 200 characters",
  }),
});

const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      return res.status(400).json({
        message: "Validation error",
        errors: error.details.map((detail) => detail.message),
      });
    }

    req.body = value;

    next();
  };
};

module.exports = {
  registerSchema,
  workerProfileSchema,
  companyProfileSchema,
  experienceSchema,
  validate,
};
