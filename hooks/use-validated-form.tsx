import { type FieldValues, useForm, UseFormProps } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Schema } from "zod";

export type UseValidatedFormProps<TFieldValues extends FieldValues, TContext> = Omit<
  UseFormProps<TFieldValues, TContext>,
  "resolver"
> & {};

export function useValidatedForm<TSchema extends Schema<FieldValues>, TContext>(
  schema: TSchema,
  props?: UseValidatedFormProps<TSchema["_input"], TContext>
) {
  return useForm<TSchema["_input"], TContext, TSchema["_output"]>(props);
}
