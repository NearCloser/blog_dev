import { ReactNode, ReactPortal, useEffect, useState } from "react";
import * as ReactDOM from "react-dom";

interface PortalProps {
  children: ReactNode;
  element?: Element;
}
export const Portal = ({
  children,
  element,
}: PortalProps): ReactPortal | null => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, [element]);

  return mounted
    ? ReactDOM.createPortal(children, element || document.body)
    : null;
};
