import type { PropsWithChildren } from 'react';

export function LayoutBase({ children }: PropsWithChildren) {
  return <div style={{ height: '100vh' }}>{children}</div>;
}
