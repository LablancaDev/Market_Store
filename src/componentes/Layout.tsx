// src/components/Layout.tsx
import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import { NavBarProps } from './NavBar';

// Define la interfaz para las props del Layout
interface LayoutProps {
  children: React.ReactNode; // Aquí definimos que children puede ser cualquier nodo de React
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;



