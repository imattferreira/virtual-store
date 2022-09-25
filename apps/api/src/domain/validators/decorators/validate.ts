import {
  hasValidLengthRange,
  isEmailValid,
  isIdValid,
  isPasswordValid,
} from "../string";
import { isObjEmpty } from "../../../utils/object";

type RulesByFieldType = "email" | "password" | "id";

export interface RulesByFieldLength {
  min: number;
  max: number;
}

export interface RulesByFieldRange {
  min: number;
  max: number;
}

interface Validations {
  length: Partial<RulesByFieldLength>;
  required: boolean;
  size: Partial<RulesByFieldRange>;
  type: RulesByFieldType;
}

interface IValidateFieldByRules {
  errors: Record<string, string>;
  field: string;
  fieldRules: object;
  fields: Record<string, unknown>;
}

type Rules<T> = Partial<
  T extends object ? { [P in keyof T]: Rules<T[P]> } : Validations
>;

const VALIDATION_ERROR_MESSAGES = {
  INCORRECT_LENGTH: "incorrect field length",
  INCORRECT_SIZE: "incorrect field size",
  INVALID: "invalid field",
  REQUIRED: "field is required",
};
const VALIDATIONS = {
  email: isEmailValid,
  password: isPasswordValid,
  id: isIdValid,
};

const isValidFieldType = (field: string, type: RulesByFieldType) =>
  VALIDATIONS[type](field) ?? false;

const hasValidRules = (rules: object) =>
  "length" in rules ||
  "required" in rules ||
  "size" in rules ||
  "type" in rules;

function validateFieldByRules({
  errors,
  field,
  fieldRules,
  fields,
}: IValidateFieldByRules): object {
  if (!hasValidRules(fieldRules)) {
    Object.entries(fieldRules).forEach(
      ([childField, childRules]: [string, object]) =>
        validateFieldByRules({
          errors,
          field: childField,
          fieldRules: childRules,
          fields,
        })
    );
  }

  const { length, required, size, type } = fieldRules as Partial<Validations>;
  const fieldValue = fields[field];

  if (required && !fieldValue) {
    return { ...errors, [field]: VALIDATION_ERROR_MESSAGES.REQUIRED };
  }

  if (fieldValue) {
    if (type && !isValidFieldType(field, type)) {
      return { ...errors, [field]: VALIDATION_ERROR_MESSAGES.INVALID };
    }

    if (length && !hasValidLengthRange(field, length)) {
      return {
        ...errors,
        [field]: VALIDATION_ERROR_MESSAGES.INCORRECT_LENGTH,
      };
    }

    if (size && !hasValidLengthRange(field, size)) {
      return { ...errors, [field]: VALIDATION_ERROR_MESSAGES.INCORRECT_SIZE };
    }
  }
  return errors;
}

function ValidateDecorator<Params extends object>(rules: Rules<Params>) {
  return (
    target: object,
    propertyName: string,
    descriptor: PropertyDescriptor
  ) => {
    // const method = descriptor.value;

    descriptor.value = function (...args: Array<unknown>) {
      const fields = args[0] as Record<string, unknown>;

      const validationErrors = Object.entries(rules).reduce(
        (errors, [field, fieldRules]) =>
          validateFieldByRules({
            errors,
            field,
            fieldRules: fieldRules as object,
            fields,
          }),
        {}
      );

      if (!isObjEmpty(validationErrors)) {
        const [errorMsg] = Object.values(validationErrors) as string[];

        throw new Error(errorMsg);
      }

      return descriptor;
    };
  };
}

export default ValidateDecorator;
