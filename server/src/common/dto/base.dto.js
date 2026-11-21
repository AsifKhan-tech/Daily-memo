import Joi from "joi";

class Basedto {
  static schema = Joi.object({});

  static validateInput(data) {
    //this.schema: refers the schema that pass in data variable
    const { errors, value } = this.schema.validate(data, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (errors) {
      console.log(errors);
      const errors = errors.details.map((detail) => detail.message);
      return { errors, value: null };
    }
    return { errors: null, value };
  }
}

export default Basedto;
