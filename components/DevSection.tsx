
import React from 'react';
import { DEV_DOCS, DevDoc, GITHUB_REPO } from '../devData';
import { Terminal, Download, FileText, Code2, Database, Github, ExternalLink, Folder } from 'lucide-react';

const DevSection: React.FC = () => {
  const downloadDoc = (doc: DevDoc) => {
    const element = document.createElement("a");
    const file = new Blob([doc.content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${doc.id}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 font-sans">
      <header className="space-y-4 font-lexend">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-emerald-100 uppercase tracking-widest flex items-center gap-3">
              <Terminal className="w-6 h-6 text-emerald-500" />
              Dev & Knowledge Base
            </h2>
            <p className="text-sm text-emerald-700 font-semibold uppercase tracking-tighter">Arquitectura técnica y sabiduría algorítmica</p>
          </div>
          
          <a 
            href={GITHUB_REPO} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-6 py-3 bg-[#2a2a24] border border-emerald-900/30 rounded-2xl hover:border-emerald-500/50 transition-all group"
          >
            <Github className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
            <div className="text-left">
              <div className="text-[10px] text-emerald-700 font-black uppercase tracking-widest">Repositorio Oficial</div>
              <div className="text-xs text-emerald-100 font-semibold flex items-center gap-1">
                Digital-alignment/quetzal
                <ExternalLink className="w-3 h-3 opacity-50" />
              </div>
            </div>
          </a>
        </div>
      </header>

      <div className="bg-[#151510] border border-emerald-900/10 rounded-3xl p-6 flex items-center gap-4">
        <Folder className="w-6 h-6 text-emerald-900" />
        <div className="text-[10px] text-emerald-900 font-black uppercase tracking-[0.3em]">Directorio: knowledge/</div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {DEV_DOCS.map((doc) => (
          <div key={doc.id} className="bg-[#2a2a24] stone-texture rounded-3xl p-8 border border-emerald-900/20 hover:border-emerald-500/30 transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
              <FileText className="w-32 h-32" />
            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-start gap-6 relative z-10">
              <div className="space-y-4 flex-1">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-900/20 rounded-xl border border-emerald-500/20">
                    <Code2 className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white group-hover:text-emerald-300 transition-colors font-lexend">
                      {doc.title}
                    </h3>
                    <code className="text-[9px] text-emerald-800 font-black uppercase">{doc.path}</code>
                  </div>
                </div>
                
                <p className="text-sm text-gray-400 font-medium leading-relaxed font-sans max-w-2xl">
                  {doc.description}
                </p>

                <div className="p-4 bg-[#151510] rounded-2xl border border-emerald-900/30 font-mono text-[11px] text-emerald-500/70 overflow-x-auto whitespace-pre-wrap max-h-48 overflow-y-auto scrollbar-hide">
                  {doc.content}
                </div>
              </div>

              <button 
                onClick={() => downloadDoc(doc)}
                className="flex items-center gap-2 px-6 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl transition-all shadow-lg shadow-emerald-900/40 text-xs font-black uppercase tracking-widest font-lexend shrink-0"
              >
                <Download className="w-4 h-4" />
                Descargar .TXT
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#151510] border border-emerald-900/10 rounded-[2.5rem] p-10 flex flex-col md:flex-row items-center gap-8 border-dashed">
        <div className="p-5 bg-emerald-900/20 rounded-full border border-emerald-500/20">
          <Database className="w-10 h-10 text-emerald-400" />
        </div>
        <div className="space-y-3">
          <h3 className="text-xl font-black text-emerald-200 uppercase tracking-widest font-lexend">Integridad del Oráculo</h3>
          <p className="text-sm text-gray-500 leading-relaxed font-normal font-sans max-w-2xl">
            Este oráculo utiliza el sistema de correlación <span className="text-emerald-400 font-black">GMT 584,283</span>. La base de conocimientos se actualiza mediante contribuciones en el repositorio oficial para garantizar la precisión histórica y espiritual.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DevSection;
