import { Loader } from "react-feather";

type Props = {
  size: "sm" | "md" | "lg";
};

const Spinner = ({ size }: Props) => {
  const variant = {
    sm: "h-5 w-5",
    md: "h-10 w-10",
    lg: "h-16 w-16",
  };

  return (
    <span>
      <Loader className={`${variant[size]} animate-spin`} />
    </span>
  );
};

export { Spinner };
