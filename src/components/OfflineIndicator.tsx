import React, { useState, useEffect } from 'react';
import { WifiOff, Wifi } from 'lucide-react';
import { Language } from '../types';

interface OfflineIndicatorProps {
  lang: Language;
}

export const OfflineIndicator: React.FC<OfflineIndicatorProps> = ({ lang }) => {
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );
  const [showReconnected, setShowReconnected] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowReconnected(true);
      setTimeout(() => setShowReconnected(false), 3500);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowReconnected(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline && !showReconnected) return null;

  if (showReconnected) {
    return (
      <div className="fixed bottom-4 start-4 z-50 flex items-center gap-2 rounded-2xl bg-emerald-600 px-4 py-2.5 text-xs font-black text-white shadow-xl animate-slideUp border border-emerald-400/40">
        <Wifi className="w-4 h-4 text-white" />
        <span>{lang === 'ar' ? 'تمت استعادة الاتصال بالإنترنت' : 'Internet connection restored'}</span>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 start-4 z-50 flex items-center gap-2.5 rounded-2xl bg-slate-900/95 backdrop-blur-md px-4 py-2.5 text-xs font-black text-amber-300 shadow-2xl border border-amber-500/40 animate-slideUp">
      <WifiOff className="w-4 h-4 text-amber-400" />
      <span>
        {lang === 'ar' 
          ? 'وضع عدم الاتصال — يعمل التطبيق بكفاءة من الذاكرة المحلية المخزنة' 
          : 'Offline Mode — Running from cached local storage'}
      </span>
      <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping ms-1" />
    </div>
  );
};
