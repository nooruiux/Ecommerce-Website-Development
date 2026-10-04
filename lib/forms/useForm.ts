"use client";

import { useCallback, useState, type ChangeEvent, type FocusEvent, type FormEvent } from "react";
import { validate, type Rule } from "./validate";

// Inline validation on blur; after the first submit, fields re-validate while typing.
export function useForm<T extends Record<string, string>>(
  initial: T,
  schema: Partial<Record<keyof T, Rule[]>>,
) {
  const [values, setValues] = useState<T>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const check = useCallback(
    (name: keyof T, next: T) => {
      const result = validate(schema as Record<string, Rule[]>, next, [name as string]);
      setErrors((e) => ({ ...e, [name]: result[name as string] }));
    },
    [schema],
  );

  const field = (name: keyof T & string) => ({
    name,
    value: values[name],
    error: errors[name],
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const next = { ...values, [name]: e.target.value };
      setValues(next);
      if (submitted || errors[name]) check(name, next);
    },
    onBlur: (e: FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      if (e.target.value !== "" || errors[name] || submitted) check(name, values);
    },
  });

  const handleSubmit =
    (onValid: (values: T) => void, fields?: (keyof T)[]) => (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setSubmitted(true);
      const result = validate(
        schema as Record<string, Rule[]>,
        values,
        fields as string[] | undefined,
      );
      setErrors(result as Partial<Record<keyof T, string>>);
      const firstInvalid = Object.keys(result)[0];
      if (firstInvalid) {
        e.currentTarget.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
        return;
      }
      onValid(values);
    };

  return { values, setValues, errors, field, handleSubmit };
}
