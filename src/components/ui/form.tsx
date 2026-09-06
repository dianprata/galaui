import * as React from "react";
import { Form as BaseForm } from "@base-ui/react";
import { cn } from "@/lib/utils";

export interface FormProps<FormValues extends Record<string, any> = Record<string, any>>
  extends BaseForm.Props<FormValues> {
  className?: string;
}

const Form = React.forwardRef(function Form<
  FormValues extends Record<string, any> = Record<string, any>
>(
  { className, ...props }: FormProps<FormValues>,
  ref: React.Ref<HTMLFormElement>
) {
  return (
    <BaseForm
      ref={ref}
      className={cn("space-y-4", className)}
      {...props}
    />
  );
}) as <FormValues extends Record<string, any> = Record<string, any>>(
  props: FormProps<FormValues> & { ref?: React.Ref<HTMLFormElement> }
) => React.JSX.Element;

export { Form };
