interface Window {
    __STATE__: any
}

import { FormState } from "final-form";
declare module 'final-form' {
   interface FormState {
     localValid: boolean,
   }
}
