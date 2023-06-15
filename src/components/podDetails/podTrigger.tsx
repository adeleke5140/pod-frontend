import { DialogEvent } from "../dialog/dialogEvent";
import { PodDetailsModal, PodDetailsModalProps } from "./podDetails";

interface DispatchProps {
  show: (content: PodDetailsModalProps) => void
}

export const PodDetailsTrigger: DispatchProps = {
  show: (content) => {
    return DialogEvent.dispatch("dialog:show", <PodDetailsModal {...content} />)
  }
}
