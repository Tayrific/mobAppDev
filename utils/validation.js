import { validate } from "validate.js";

export const validateString = (id, value) => {
    const constraints = { 
        presence: { allowEmpty: false }
    };

    if (value !== "") {
        constraints.format = {
            pattern: "[a-z]+",
            flags: "i",
            message: "value can only contain letters"
        }
    }

    const validationResult = validate({ [id]: value }, { [id]: constraints });

    return validationResult && validationResult[id];
}

export const validateEmail = (id, value) => {
    const constraints = { 
        presence: { allowEmpty: false }
    };

    if (value !== "") {
        constraints.email = true
    }

    const validationResult = validate({ [id]: value }, { [id]: constraints });

    return validationResult && validationResult[id];
}

export const validatePassword = (id, value) => {
    const PASSWORD_REGEX = new RegExp(
        "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
      );
      const constraints = {
        presence: { allowEmpty: false },
      };

      if (value !== "") {
        constraints.format = {
          pattern: PASSWORD_REGEX,
          flags: "i",
          message: "Password must contain at least one upper case letter, one lower case letter, one special character, one number, and be at least 8 characters long",
        };
      }

    const validationResult = validate({ [id]: value }, { [id]: constraints });

    return validationResult && validationResult[id];
}