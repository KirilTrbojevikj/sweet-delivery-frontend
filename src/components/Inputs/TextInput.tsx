import { ErrorMessage, Field, FormikContext } from "formik";
import React, { useContext } from "react";
import { inputInvalidClass, inputValidClass } from "./base";

interface TextInputProps {
  id: string;
  name: string;
  label?: string;
  placeholder?: string;
  classes?: string;
  type: "email" | "text" | "password" | "date" | "datetime-local" | "number";
}

export const TextInput: React.FC<TextInputProps> = ({
  id,
  name,
  label,
  type,
  placeholder,
  classes,
}) => {
  const context = useContext(FormikContext);
  return (
    <div className={classes}>
      <label htmlFor={id} className="text-gray-800 sm:mt-px sm:pb-2">
        {label}
      </label>
      <div className="mt-1 sm:col-span-2 sm:mt-0">
        <Field
          name={name}
          id={id}
          type={type}
          placeholder={placeholder}
          className={
            context.errors[name]
              ? inputInvalidClass + " " + classes
              : inputValidClass + " " + classes
          }
        />
        <div className="mt-2 mb-4 h-2 text-center">
          <ErrorMessage name={name}>
            {(errorMessage) => (
              <div className="text-xs font-light text-red-600">
                {errorMessage}
              </div>
            )}
          </ErrorMessage>
        </div>
      </div>
    </div>
  );
};
