import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { DialogEvent } from "./dialogEvent";

interface DialogRootProps {
  container: HTMLDivElement | null | undefined;
}

export const DialogRoot = ({ container }: DialogRootProps) => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState<React.ReactNode | null>(null);

  const openModal = (content: React.ReactNode) => {
    setContent(content);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const onOpenChange = (open: boolean) => {
    if (!open) {
      DialogEvent.dispatch("dialog:hide", null);
    }
    setOpen(open);
  };

  useEffect(() => {
    DialogEvent.listen("dialog:show", (content) => openModal(content));
    DialogEvent.listen("dialog:hide", closeModal);
  });

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal container={container}>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-blackA9 data-[state=open]:animate-overlayShow"></Dialog.Overlay>
        <Dialog.Content className="fixed left-[50%] top-[50%] z-[9999] translate-x-[-50%] translate-y-[-50%] focus:outline-none data-[state=open]:animate-contentShow">
          <div className="flex-1">{content}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
