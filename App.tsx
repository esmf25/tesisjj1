
import React, { useState } from 'react';
import Header from './components/Header';
import ScenarioSimulator from './components/ScenarioSimulator';
import { GLOSSARY_TERMS, THESIS_CONCLUSIONS } from './constants';
import { GlossaryTerm, InfoContent } from './types';

type Tab = 'simulator' | 'conclusions' | 'glossary';

const Conclusions: React.FC<{ content: InfoContent }> = ({ content }) => (
  <div className="p-4 md:p-8 max-w-4xl mx-auto animate-fade-in">
    <div className="bg-slate-800/50 p-6 md:p-8 rounded-2xl border border-slate-700">
      <h2 className="text-3xl font-bold text-cyan-400 mb-6 text-center">{content.title}</h2>
      <div className="prose prose-invert prose-lg max-w-none text-slate-300" dangerouslySetInnerHTML={{ __html: content.content }}></div>
    </div>
  </div>
);

const Glossary: React.FC<{ terms: GlossaryTerm[] }> = ({ terms }) => (
  <div className="p-4 md:p-8 max-w-4xl mx-auto animate-fade-in">
    <div className="bg-slate-800/50 p-6 md:p-8 rounded-2xl border border-slate-700">
       <h2 className="text-3xl font-bold text-cyan-400 mb-6 text-center">Glosario de Términos</h2>
       <div className="space-y-4">
        {terms.map(term => (
          <div key={term.term}>
            <dt className="text-lg font-semibold text-cyan-300">{term.term}</dt>
            <dd className="mt-1 text-slate-300">{term.definition}</dd>
          </div>
        ))}
       </div>
    </div>
  </div>
);

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('simulator');
  
  const renderContent = () => {
    switch (activeTab) {
      case 'simulator':
        return <ScenarioSimulator />;
      case 'conclusions':
        return <Conclusions content={THESIS_CONCLUSIONS} />;
      case 'glossary':
        return <Glossary terms={GLOSSARY_TERMS} />;
      default:
        return <ScenarioSimulator />;
    }
  };

  const TabButton: React.FC<{tabId: Tab; children: React.ReactNode}> = ({tabId, children}) => {
    const isActive = activeTab === tabId;
    return (
      <button 
        onClick={() => setActiveTab(tabId)}
        className={`px-4 py-2 text-sm md:text-base font-medium rounded-md transition-colors ${
          isActive 
            ? 'bg-cyan-600 text-white' 
            : 'text-slate-300 hover:bg-slate-700'
        }`}
      >
        {children}
      </button>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      <main>
        <div className="max-w-7xl mx-auto p-4">
          <div className="flex justify-center space-x-2 md:space-x-4 bg-slate-800 p-2 rounded-lg max-w-md mx-auto">
            <TabButton tabId="simulator">Simulador</TabButton>
            <TabButton tabId="conclusions">Conclusiones</TabButton>
            <TabButton tabId="glossary">Glosario</TabButton>
          </div>
        </div>
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
