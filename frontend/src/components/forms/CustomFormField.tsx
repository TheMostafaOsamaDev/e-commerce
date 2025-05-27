import { FormFieldType } from "@/lib/constants";
import { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { ComponentProps } from "react";

interface CustomFormFieldProps {
  control: Control<any>;
  fieldType: FormFieldType;
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: unknown) => React.ReactNode;
  className?: string;
}

const RenderField = ({
  field,
  props,
}: {
  field: ComponentProps<"input">;
  props: CustomFormFieldProps;
}) => {
  const {
    fieldType,
    label,
    placeholder,
    disabled,
    dateFormat,
    showTimeSelect,
    className,
  } = props;

  switch (fieldType) {
    case FormFieldType.TEXT:
      return (
        <FormControl>
          <Input
            placeholder={placeholder}
            {...field}
            className={className}
            disabled={disabled}
          />
        </FormControl>
      );

    case FormFieldType.PHONE_NUMBER:
      return (
        <FormControl>
          <Input
            type="tel"
            placeholder={placeholder}
            {...field}
            className={className}
            disabled={disabled}
          />
        </FormControl>
      );

    case FormFieldType.EMAIL:
      return (
        <FormControl>
          <Input
            type="email"
            placeholder={placeholder}
            {...field}
            className={className}
            disabled={disabled}
          />
        </FormControl>
      );

    case FormFieldType.PASSWORD:
      return (
        <FormControl>
          <Input
            type="password"
            placeholder={placeholder}
            {...field}
            className={className}
            disabled={disabled}
          />
        </FormControl>
      );

    case FormFieldType.NUMBER:
      return (
        <FormControl>
          <Input
            type="number"
            placeholder={placeholder}
            {...field}
            className={className}
            disabled={disabled}
          />
        </FormControl>
      );
  }
};

const CustomFormField = (props: CustomFormFieldProps) => {
  const { control, name, fieldType, label } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel>{label}</FormLabel>
          )}

          <RenderField field={field} props={props} />

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
