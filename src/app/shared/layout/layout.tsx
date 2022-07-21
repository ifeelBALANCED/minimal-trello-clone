import { Header } from '@/app/shared';
import { ReactNode } from 'react';

type LayoutProps = { children: ReactNode };

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="d-flex flex-column h-100">
      <Header />
      {children}
    </div>
  );
};
