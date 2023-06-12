import { DialogEvent } from "../dialog/dialogEvent";
import { SignupModal } from "./signupModal";

interface DispatchSignupModal {
  show: () => void;
}

export const SignupDialog: DispatchSignupModal = {
  show: () => {
    return DialogEvent.dispatch("dialog:show", <SignupModal />);
  },
};
