
import React, { useState, useMemo } from 'react';
import { Search, Filter, BookOpen, User, Compass, Layers, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { BLOG_POSTS } from '../constants';
import { BlogCategory, BlogPost } from '../types';

const BlogSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<BlogCategory>('Todos');

  const categories: BlogCategory[] = ['Todos', 'Estructura', 'Nahuales', 'Cruz Maya'];

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'Todos' || post.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Estructura': return <Layers className="w-4 h-4" />;
      case 'Nahuales': return <User className="w-4 h-4" />;
      case 'Cruz Maya': return <Compass className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 font-sans">
      <header className="space-y-4 font-lexend">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-emerald-100 uppercase tracking-widest flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-emerald-500" />
              Biblioteca de Sabiduría
            </h2>
            <p className="text-sm text-emerald-700 font-semibold uppercase tracking-tighter font-lexend">Explora el conocimiento ancestral maya</p>
          </div>

          <div className="relative w-full md:w-80 group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-emerald-800 group-focus-within:text-emerald-500 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="¿Qué deseas aprender hoy?..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#151510] border border-emerald-900/50 rounded-2xl pl-12 pr-4 py-3 text-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50 transition-all font-semibold placeholder:text-emerald-900/40 font-lexend"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-widest transition-all border font-lexend ${
                activeCategory === cat
                  ? 'bg-emerald-600 border-emerald-400 text-white shadow-lg shadow-emerald-900/40'
                  : 'bg-[#22221b] border-emerald-900/30 text-emerald-700 hover:border-emerald-500/30 hover:text-emerald-500'
              }`}
            >
              <span className="shrink-0">{getCategoryIcon(cat)}</span>
              {cat}
            </button>
          ))}
        </div>
      </header>

      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <div 
              key={post.id} 
              className="bg-[#2a2a24] stone-texture rounded-3xl p-6 border border-emerald-900/20 hover:border-emerald-500/40 hover:jade-glow transition-all group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-[10px] font-semibold text-emerald-500 uppercase tracking-widest bg-emerald-900/20 px-2.5 py-1 rounded-full border border-emerald-900/30 font-lexend">
                    {getCategoryIcon(post.category)}
                    {post.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-[10px] font-semibold text-gray-500 uppercase font-lexend">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </div>
                </div>
                <h3 className="text-lg font-black text-white group-hover:text-emerald-300 transition-colors leading-tight font-lexend">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 italic font-normal">
                  "{post.excerpt}"
                </p>
              </div>
              
              <div className="mt-6 pt-6 border-t border-emerald-900/10 flex items-center justify-between group/btn cursor-pointer">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-emerald-700 group-hover/btn:text-emerald-400 transition-colors font-lexend">Ver artículo completo</span>
                <div className="p-2 bg-[#151510] rounded-full border border-emerald-900/20 group-hover/btn:bg-emerald-600 transition-all">
                  <ArrowRight className="w-3 h-3 text-emerald-600 group-hover/btn:text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-[#151510] rounded-3xl p-12 text-center border border-emerald-900/20 space-y-4 font-lexend">
          <div className="w-16 h-16 bg-emerald-900/20 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20">
            <Sparkles className="w-8 h-8 text-emerald-700" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-black text-emerald-200 uppercase tracking-widest font-lexend">Sin resultados</h3>
            <p className="text-sm text-gray-500 italic max-w-sm mx-auto font-normal font-sans">
              No hemos encontrado artículos que coincidan con "{searchQuery}". Prueba buscando por nahual, cuenta larga o cruz maya.
            </p>
          </div>
          <button 
            onClick={() => {setSearchQuery(''); setActiveCategory('Todos');}}
            className="text-xs font-semibold uppercase tracking-widest text-emerald-500 hover:text-emerald-400 transition-colors underline underline-offset-4"
          >
            Limpiar filtros
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogSection;
