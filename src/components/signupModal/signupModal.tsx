import { redirectURL } from "~/constants";
import { ArrowRight } from "react-feather";
import { DialogCloseButton } from "../dialog/dialogCloseButton";

export const SignupModal = () => {
  return (
    <div className="flex w-[90vw] max-w-[600px] flex-col rounded-lg bg-white p-10 text-center shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px]">
      <DialogCloseButton />
      <div className="flex flex-col px-10">
        <h1 className="mb-6 font-bespoke text-4xl font-bold">
          Sign In to <span className="text-blue-500">POD</span>
        </h1>
        <a
          href={redirectURL}
          className="text-md group flex cursor-pointer gap-2 self-center rounded-3xl bg-blue-600 px-5 py-3 font-semibold text-white transition-colors ease-out hover:bg-blue-700 disabled:opacity-50"
        >
          <span className="font-supreme">Login With Github</span>
          <ArrowRight className="transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </div>
  );
};
