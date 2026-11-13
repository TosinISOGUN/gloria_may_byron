import { createContext, useContext } from "react";

import { en, type Messages } from "./index";

/** The messages for the page being shown. Outside a language layout (the error pages) it is English. */
const MessagesContext = createContext<Messages>(en);

export const MessagesProvider = MessagesContext.Provider;

/** The visitor's language text, for any component: `const t = useT(); t.common.getInTouch`. */
export function useT(): Messages {
  return useContext(MessagesContext);
}
