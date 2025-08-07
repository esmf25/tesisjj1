
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="w-full p-4 md:p-6 border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-cyan-400">
          Tesis Interactiva
        </h1>
        <p className="text-sm md:text-base text-slate-400 mt-1">
          Aislamiento de nuevas cepas tolerantes a desecación y sus aplicaciones biotecnológicas
        </p>
      </div>
    </header>
  );
};

export default Header;
