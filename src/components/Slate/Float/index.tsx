import { Portal } from '@/components/Portal';
import { ReactNode, useRef } from 'react';
import { useFloat, useFloatVisible } from './useFloat';
import { useSlate } from 'slate-react';

interface BalloonToolbarProps {
  children: ReactNode;
  direction?: 'top' | 'bottom';
  portalElement?: Element;
}

export const FloatToolbar = ({
  children,
  direction = 'top',
  portalElement,
}: BalloonToolbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const editor = useSlate();

  const [hidden] = useFloatVisible({ editor, ref });
  useFloat({ editor, ref, direction });

  return (
    <Portal element={portalElement}>
      <div
        ref={ref}
        id='float_portal'
        style={{
          visibility: hidden ? 'hidden' : 'visible',
        }}
      >
        {children}
      </div>
    </Portal>
  );
};
