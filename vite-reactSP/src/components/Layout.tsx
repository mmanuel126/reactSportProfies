import React from 'react';
import Footer from './PageFooter'; 

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <main className="flex-grow-1">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;