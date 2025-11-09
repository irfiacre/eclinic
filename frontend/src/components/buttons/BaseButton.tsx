import React from "react";
import { PulseLoader } from "react-spinners";

interface ButtonProps extends React.InputHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  handleSubmit?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  loading?: boolean;
  className?: string;
  additionalStyles?: string;
}

const BaseButton = ({
  children,
  type = "submit",
  handleSubmit,
  loading,
  className,
  additionalStyles,
  ...props
}: ButtonProps) => {
  return (
    <div>
      <button
        type={type}
        onClick={handleSubmit}
        className={
          className
            ? className
            : `w-full bg-primary hover:bg-primary/80 focus:outline-none font-medium rounded-md text-md text-center p-5 disabled:bg-borderColorLight ${additionalStyles}`
        }
        disabled={loading}
        {...props}
      >
        {loading ? (
          <PulseLoader
            color={"#ffffff"}
            loading={loading}
            size={10}
            cssOverride={{ width: "100%" }}
            aria-label="Loading Spinner"
            data-testid="loader"
            speedMultiplier={0.5}
          />
        ) : (
          children
        )}
      </button>
    </div>
  );
};

export default BaseButton;
