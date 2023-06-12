import { Cross2Icon } from "@radix-ui/react-icons";
import { DialogClose } from "@radix-ui/react-dialog";

export const DialogCloseButton = () => (
  <DialogClose asChild>
    <button className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-[#f5f5f5] p-2">
      <Cross2Icon />
    </button>
  </DialogClose>
);
