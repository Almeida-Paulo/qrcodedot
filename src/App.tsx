/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Download, Link as LinkIcon, RefreshCw, Share2, Palette, Check, Languages } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type Language = 'en' | 'pt';

const translations = {
  pt: {
    title: 'QR code. | Gerador de QR Code Grátis',
    subtitle: 'Transformar links em QR code grátis. Converta qualquer URL em código QR de alta resolução em segundos.',
    targetUrl: 'URL de Destino',
    foreground: 'Cor do Código',
    background: 'Cor de Fundo',
    resolution: 'Resolução',
    reset: 'Resetar Gerador',
    download: 'Baixar Imagem',
    footer: 'Construído para ser simples e útil.',
    privacy: 'Privacidade',
    terms: 'Termos',
    contact: 'Contato',
    copy: 'Copiar URL',
    placeholder: 'https://exemplo.com.br',
    langSwitch: 'Switch to English'
  },
  en: {
    title: 'QR code. | Free High-Resolution QR Generator',
    subtitle: 'Convert links into clean, high-resolution QR codes for free in seconds.',
    targetUrl: 'Target URL',
    foreground: 'Foreground',
    background: 'Background',
    resolution: 'Resolution',
    reset: 'Reset Generator',
    download: 'Download Image',
    footer: 'Built to be simple and useful.',
    privacy: 'Privacy',
    terms: 'Terms',
    contact: 'Contact',
    copy: 'Copy URL',
    placeholder: 'https://example.com',
    langSwitch: 'Mudar para Português'
  }
};

export default function App() {
  const [lang, setLang] = useState<Language>('pt');
  const [url, setUrl] = useState('https://toolfilled.xyz');
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [size, setSize] = useState(256);
  const [copied, setCopied] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);

  const t = translations[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = t.title;
  }, [lang, t.title]);

  const downloadQRCode = () => {
    const canvas = qrRef.current?.querySelector('canvas');
    if (canvas) {
      const pngUrl = canvas
        .toDataURL('image/png')
        .replace('image/png', 'image/octet-stream');
      const downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      downloadLink.download = `qrcodedot-${Date.now()}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  };

  const toggleLanguage = () => {
    setLang(prev => prev === 'en' ? 'pt' : 'en');
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-[#1a1a1a] font-sans selection:bg-black selection:text-white">
      {/* Language Switcher */}
      <div className="fixed top-6 right-6 z-50">
        <button
          onClick={toggleLanguage}
          aria-label={t.langSwitch}
          className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-black/5 px-4 py-2 rounded-full shadow-sm hover:bg-white transition-all group"
        >
          <Languages size={16} className="text-muted group-hover:text-black" aria-hidden="true" />
          <span className="text-xs font-semibold tracking-wider uppercase">
            {lang === 'en' ? 'PT-BR' : 'EN-US'}
          </span>
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12 md:py-24">
        {/* Header */}
        <header className="mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-6xl md:text-8xl font-light tracking-tighter mb-4">
              QR code<span className="font-semibold italic">.</span>
            </h1>
            <p className="text-muted text-lg max-w-md mx-auto">
              {t.subtitle}
            </p>
          </motion.div>
        </header>

        <main className="grid md:grid-cols-2 gap-12 items-start">
          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-black/5">
              <div className="space-y-6">
                {/* URL Input */}
                <div className="space-y-2">
                  <label htmlFor="urlInput" className="text-xs uppercase tracking-widest font-semibold text-muted flex items-center gap-2">
                    <LinkIcon size={14} />
                    {t.targetUrl}
                  </label>
                  <div className="relative group">
                    <input
                      id="urlInput"
                      type="url"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder={t.placeholder}
                      className="w-full bg-[#f9f9f9] border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/5 transition-all"
                    />
                    <button
                      onClick={copyToClipboard}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-muted hover:text-black transition-colors"
                      title={t.copy}
                      aria-label={t.copy}
                    >
                      {copied ? <Check size={18} className="text-green-600" aria-hidden="true" /> : <Share2 size={18} aria-hidden="true" />}
                    </button>
                  </div>
                </div>

                {/* Customization */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="fgColorInput" className="text-xs uppercase tracking-widest font-semibold text-muted flex items-center gap-2">
                      <Palette size={14} />
                      {t.foreground}
                    </label>
                    <div className="flex items-center gap-2 bg-[#f9f9f9] border border-black/10 rounded-xl p-2">
                      <input
                        id="fgColorInput"
                        type="color"
                        value={fgColor}
                        onChange={(e) => setFgColor(e.target.value)}
                        className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-none"
                      />
                      <span className="text-xs font-mono uppercase">{fgColor}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="bgColorInput" className="text-xs uppercase tracking-widest font-semibold text-muted flex items-center gap-2">
                      <Palette size={14} />
                      {t.background}
                    </label>
                    <div className="flex items-center gap-2 bg-[#f9f9f9] border border-black/10 rounded-xl p-2">
                      <input
                        id="bgColorInput"
                        type="color"
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-none"
                      />
                      <span className="text-xs font-mono uppercase">{bgColor}</span>
                    </div>
                  </div>
                </div>

                {/* Size Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label htmlFor="sizeInput" className="text-xs uppercase tracking-widest font-semibold text-muted">{t.resolution}</label>
                    <span className="text-xs font-mono">{size}px</span>
                  </div>
                  <input
                    id="sizeInput"
                    type="range"
                    min="128"
                    max="512"
                    step="32"
                    value={size}
                    onChange={(e) => setSize(Number(e.target.value))}
                    className="w-full h-1.5 bg-black/10 rounded-lg appearance-none cursor-pointer accent-black"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setUrl('https://');
              }}
              aria-label={t.reset}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl border border-black/10 hover:bg-black hover:text-white transition-all duration-300 group"
            >
              <RefreshCw size={18} className="group-hover:rotate-180 transition-transform duration-500" aria-hidden="true" />
              {t.reset}
            </button>
          </motion.div>

          {/* Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col items-center gap-8"
          >
            <div className="relative group">
              <div className="absolute -inset-4 bg-black/5 rounded-[40px] blur-2xl group-hover:bg-black/10 transition-all duration-500" />
              <div
                ref={qrRef}
                className="relative bg-white p-8 rounded-[32px] shadow-2xl border border-black/5 overflow-hidden"
              >
                <QRCodeCanvas
                  value={url || ' '}
                  size={size}
                  fgColor={fgColor}
                  bgColor={bgColor}
                  level="H"
                  includeMargin={false}
                  className="max-w-full h-auto"
                />
              </div>
            </div>

            <button
              onClick={downloadQRCode}
              disabled={!url}
              className="flex items-center gap-3 bg-black text-white px-8 py-4 rounded-full font-medium hover:scale-105 active:scale-95 transition-all shadow-xl shadow-black/10 disabled:opacity-50 disabled:scale-100"
            >
              <Download size={20} />
              {t.download}
            </button>
          </motion.div>
        </main>

        {/* Footer */}
        <footer className="mt-24 pt-8 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-4 text-muted text-sm">
          <p>© 2026 Qrcodedot. {t.footer}</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-black transition-colors">{t.privacy}</a>
            <a href="#" className="hover:text-black transition-colors">{t.terms}</a>
            <a href="#" className="hover:text-black transition-colors">{t.contact}</a>
          </div>
        </footer>
      </div>

      {/* Custom styles for the slider */}
      <style>{`
        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 16px;
          height: 16px;
          background: black;
          border-radius: 50%;
          cursor: pointer;
        }
        .text-muted {
          color: #666;
        }
      `}</style>
    </div>
  );
}
