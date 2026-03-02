import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Search, Code, Globe } from 'lucide-react';

const highlights = [
  {
    icon: <Search className="w-6 h-6 text-yellow-400" />,
    title: "UX Audit",
    description: "Proklepnu váš e-shop očima zákazníka a navrhnu změny, které povedou k většímu počtu dokončených nákupů."
  },
  {
    icon: <Code className="w-6 h-6 text-blue-400" />,
    title: "Kódování úprav na míru",
    description: "Standardní šablona vám nestačí? Doplním unikátní funkce, přidám bloky nebo vizuální prvky."
  },
  {
    icon: <Globe className="w-6 h-6 text-green-400" />,
    title: "SEO & On-page optimalizace",
    description: "Nastavím správnou strukturu kategorií, meta tagy a poradím, jak psát texty, které miluje Google, AI i lidé."
  },
/*
  {
    icon: <Palette className="w-6 h-6 text-purple-400" />,
    title: "Grafický redesign šablony",
    description: "Vdechnu vaší stávající šabloně nový život. Moderní vzhled, který ladí s vaší značkou a buduje důvěru."
  },
  {
    icon: <Calendar className="w-6 h-6 text-orange-400" />,
    title: "Příprava na sezónní kampaně",
    description: "Technicky i graficky připravím váš e-shop na nápor během Black Friday, Vánoc, novinek i výprodejů."
  },
  {
    icon: <GraduationCap className="w-6 h-6 text-indigo-400" />,
    title: "Individuální školení Shoptetu",
    description: "Naučím vás ovládat administraci tak efektivně, že si drobné změny a správu produktů zvládnete dělat sami."
  }
    */
];

const tabs = [
  {
    id: 'first',
    label: 'Marketing',
    content: 'Efektivní marketing pro Shoptet.'
  },
  {
    id: 'second',
    label: 'Design',
    content: 'Vzhled prodává.'
  },
  {
    id: 'third',
    label: 'Automatizace',
    content: 'Šetřete čas automatizací procesů.'
  },
  {
    id: 'fourth',
    label: 'Podpora',
    content: 'Nejste v tom sami.'
  }
];

export default function Home() {
  const [activeTab, setActiveTab] = useState('first');
  
  const heroTextParts = React.useMemo(() => [
    { text: "Pomáhám českým e-shopům růst.", highlight: false },
    { text: " Poradím vám se strategií,", highlight: false },
    { text: " vyladím design ", highlight: false },
    { text: " nakóduji úpravy na míru,", highlight: false },
  ], []);

  const highlightedIndex = React.useMemo(() => Math.floor(Math.random() * heroTextParts.length), [heroTextParts]);

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden rounded-3xl bg-slate-900 text-white mt-8">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="/pozadi-header-1920x1080.jpg" 
            alt="Background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-yellow-500/20 rounded-full border border-yellow-500/30">
                <ShoppingCart className="w-12 h-12 text-yellow-400" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
              Vaše pravá ruka <span className="text-yellow-400">pro úspěšný Shoptet.</span>
            </h1>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
              {heroTextParts.map((part, index) => (
                <span 
                  key={index} 
                  className={index === highlightedIndex ? "text-yellow-400 font-semibold" : ""}
                >
                  {part.text}
                </span>
              ))}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4 italic serif">S čím začneme?</h2>
          <div className="h-1 w-20 bg-yellow-500 mx-auto rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {highlights.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-slate-900">{item.title}</h3>
              <p className="text-slate-600 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tabs Section */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="bg-slate-900 rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden">
          <div className="flex flex-wrap gap-2 mb-12 border-b border-white/10 pb-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-yellow-500 text-slate-900'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="min-h-[200px]"
            >
              <h3 className="text-3xl font-bold text-white mb-6">
                {tabs.find(t => t.id === activeTab)?.label}
              </h3>
              <p className="text-xl text-slate-400 leading-relaxed max-w-3xl">
                {tabs.find(t => t.id === activeTab)?.content}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}