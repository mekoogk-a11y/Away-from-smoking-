import React, { useState } from 'react';
import { Language, UserProfile } from '../types';
import { translations } from '../data/translations';
import { CURRENCIES, saveUserProfile } from '../utils/storage';
import { X, Sparkles, TrendingUp, Calendar, DollarSign, Check } from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  profile: UserProfile;
  onSaveProfile: (newProfile: UserProfile) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  lang,
  profile,
  onSaveProfile
}) => {
  if (!isOpen) return null;

  const t = translations[lang];

  const [cigsPerDay, setCigsPerDay] = useState(profile.cigarettesPerDay);
  const [packPrice, setPackPrice] = useState(profile.packPrice);
  const [cigsPerPack, setCigsPerPack] = useState(profile.cigarettesPerPack);
  const [quitDate, setQuitDate] = useState(
    new Date(profile.quitDate).toISOString().slice(0, 16)
  );
  const [currency, setCurrency] = useState(profile.currency);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: UserProfile = {
      cigarettesPerDay: Math.max(1, Number(cigsPerDay) || 20),
      packPrice: Math.max(0.1, Number(packPrice) || 25),
      cigarettesPerPack: Math.max(1, Number(cigsPerPack) || 20),
      quitDate: new Date(quitDate).toISOString(),
      currency,
      isConfigured: true,
      soundEnabled: profile.soundEnabled ?? true
    };
    onSaveProfile(updated);
    saveUserProfile(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-orange-200 animate-fadeIn">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-orange-100 text-orange-700 rounded-2xl">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-slate-900">
                {t.setupProfile}
              </h3>
              <p className="text-xs text-slate-500 font-semibold">
                {lang === 'ar' ? 'أدخل تفاصيل استهلاكك لحساب التوفير والتعافي' : 'Enter your smoking habits to track your savings and biological recovery'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {t.cigsPerDay} *
              </label>
              <input
                type="number"
                min="1"
                max="200"
                required
                value={cigsPerDay}
                onChange={(e) => setCigsPerDay(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 font-bold text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {t.packPrice} *
              </label>
              <input
                type="number"
                step="0.1"
                min="0.1"
                required
                value={packPrice}
                onChange={(e) => setPackPrice(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 font-bold text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {t.cigsPerPack} *
              </label>
              <input
                type="number"
                min="1"
                max="100"
                required
                value={cigsPerPack}
                onChange={(e) => setCigsPerPack(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 font-bold text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {t.currency}
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 font-bold text-sm bg-white"
              >
                {CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code} ({c.symbol})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              {t.lastCigDate} *
            </label>
            <input
              type="datetime-local"
              required
              value={quitDate}
              onChange={(e) => setQuitDate(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 font-bold text-sm"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 font-bold text-xs cursor-pointer"
            >
              {lang === 'ar' ? 'إلغاء' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer"
            >
              {t.saveData}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
