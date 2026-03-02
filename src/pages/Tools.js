import React, { useState } from 'react';
import { QrCode, Download, RefreshCw, Link as LinkIcon } from 'lucide-react';

export default function Tools() {
  const [url, setUrl] = useState('');
  const [qrUrl, setQrUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const generateQR = (e) => {
    e.preventDefault();
    if (!url) return;
    
    setLoading(true);
    const encodedUrl = encodeURIComponent(url);
    const newQrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodedUrl}`;
    
    setTimeout(() => {
      setQrUrl(newQrUrl);
      setLoading(false);
    }, 600);
  };

  const handleDownload = async (e) => {
    e.preventDefault();
    if (!qrUrl) return;
    
    try {
      const response = await fetch(qrUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = 'qr-kod.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Download failed:', error);
      window.open(qrUrl, '_blank');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Užitečné Nástroje</h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Vyzkoušejte generátor QR kódů pro vaše produkty QR kódy můžete umístit na balíčky, vizitky nebo do kamenné prodejny pro rychlý přístup k produktům.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <LinkIcon className="w-6 h-6 text-yellow-500" />
            Vložte URL nebo text
          </h2>
          <form onSubmit={generateQR} className="space-y-6">
            <div>
              <label htmlFor="url" className="block text-sm font-medium text-slate-700 mb-2">
                URL produktu nebo akce
              </label>
              <input
                type="text"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://vas-eshop.cz/produkt"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={loading || !url}
              className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <QrCode className="w-5 h-5" />}
              Generovat QR kód
            </button>
          </form>
        </div>

        {/* Result Side */}
        <div className="bg-slate-900 p-8 rounded-3xl text-white min-h-[400px] flex flex-col items-center justify-center text-center border border-white/10 shadow-2xl">
          {qrUrl ? (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-4">Váš QR kód</h2>
              <div className="bg-white p-4 rounded-2xl inline-block shadow-lg">
                <img 
                  src={qrUrl} 
                  alt="Generated QR Code" 
                  className="w-64 h-64"
                />
              </div>
              <div className="flex gap-4 justify-center">
                <button 
                  onClick={handleDownload}
                  className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-slate-900 rounded-full text-sm font-medium transition-all flex items-center gap-2"
                >
                  <Download className="w-4 h-4" /> Stáhnout
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4 opacity-50">
              <QrCode className="w-20 h-20 mx-auto mb-4" />
              <h2 className="text-2xl font-bold">Váš QR kód se zobrazí zde</h2>
              <p className="max-w-xs mx-auto">
                Zadejte URL adresu vlevo a klikněte na tlačítko pro vygenerování kódu.
              </p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}