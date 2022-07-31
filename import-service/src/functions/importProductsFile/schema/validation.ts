import * as joi from "joi";

export const FILE_NAME_PARAM_NAME = "name";

export const schema = joi.object({
  // Name of the file. Should be a .csv file name with the length from 5 to 20 symbols.
  // E.g. 1.csv, some-file-name.csv

  [FILE_NAME_PARAM_NAME]: joi
    .string()
    .min(5)
    .max(20)
    .pattern(/\.csv$/)
    .required(),
});

export const validatorOptions = {
  errors: { wrap: { label: "'" } },
};
