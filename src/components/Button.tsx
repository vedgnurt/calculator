import { ComponentProps, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = ComponentProps<"button">;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ ...props }, ref) => {
        return (
            <button
                {...props}
                className={twMerge(
                    "data-[pressed=true]:scale-90",
                    "font-medium",
                    "cursor-pointer transition-all duration-100",
                    props.className
                )}
                onMouseDown={(e) => {
                    e.currentTarget.dataset.pressed = "true";
                }}
                onMouseUp={(e) => {
                    delete e.currentTarget.dataset.pressed;
                }}
                ref={ref}
            >
                {props.children}
            </button>
        );
    }
);

export default Button;
