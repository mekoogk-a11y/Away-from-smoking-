import React, { useState } from 'react';
import { Language, QuitCenter } from '../types';
import { translations } from '../data/translations';
import { loadCenters, saveCenters } from '../utils/storage';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Globe, 
  ExternalLink, 
  Search, 
  PlusCircle, 
  ShieldCheck, 
  Navigation,
  X,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

interface CentersViewProps {
  lang: Language;
  onBack?: () => void;
}

export const CentersView: React.FC<CentersViewProps> = ({ lang, onBack }) => {
  const t = translations[lang];
  const ArrowIcon = lang === 'ar' ? ArrowRight : ArrowLeft;
  const [centers, setCenters] = useState<QuitCenter[]>(loadCenters);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('ALL');
  const [selectedServiceType, setSelectedServiceType] = useState('ALL');
  const [showAddModal, setShowAddModal] = useState(false);

  // Add center form state
  const [formName, setFormName] = useState('');
  const [formCountry, setFormCountry] = useState('');
  const [formCity, setFormCity] = useState('');
  const [formType, setFormType] = useState<'hospital' | 'clinic' | 'virtual' | 'quitline'>('hospital');
  const [formAccreditation, setFormAccreditation] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formAddress, setFormAddress] = useState('');
  const [formWebsite, setFormWebsite] = useState('');

  const countries = [
    { code: 'ALL', labelAr: 'جميع الدول', labelEn: 'All Countries' },
    { code: 'SA', labelAr: '🇸🇦 المملكة العربية السعودية', labelEn: '🇸🇦 Saudi Arabia' },
    { code: 'GB', labelAr: '🇬🇧 المملكة المتحدة', labelEn: '🇬🇧 United Kingdom' },
    { code: 'FR', labelAr: '🇫🇷 فرنسا', labelEn: '🇫🇷 France' },
    { code: 'CN', labelAr: '🇨🇳 الصين', labelEn: '🇨🇳 China' },
    { code: 'AE', labelAr: '🇦🇪 الإمارات', labelEn: '🇦🇪 UAE' },
    { code: 'EG', labelAr: '🇪🇬 مصر', labelEn: '🇪🇬 Egypt' },
    { code: 'NG', labelAr: '🇳🇬 نيجيريا', labelEn: '🇳🇬 Nigeria' },
  ];

  const filteredCenters = centers.filter((c) => {
    const matchesCountry = selectedCountry === 'ALL' || c.countryCode === selectedCountry;
    const matchesType = selectedServiceType === 'ALL' || c.serviceType === selectedServiceType;
    const q = searchQuery.toLowerCase().trim();
    const nameStr = (c.name[lang] || c.name.en).toLowerCase();
    const cityStr = (c.city[lang] || c.city.en).toLowerCase();
    const matchesQuery = !q || nameStr.includes(q) || cityStr.includes(q);
    return matchesCountry && matchesType && matchesQuery;
  });

  const handleAddCenter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formCity.trim()) return;

    const newCenter: QuitCenter = {
      id: `center-${Date.now()}`,
      name: {
        ar: formName,
        en: formName,
        fr: formName,
        ha: formName,
        zh: formName
      },
      country: {
        ar: formCountry,
        en: formCountry,
        fr: formCountry,
        ha: formCountry,
        zh: formCountry
      },
      countryCode: 'CUSTOM',
      city: {
        ar: formCity,
        en: formCity,
        fr: formCity,
        ha: formCity,
        zh: formCity
      },
      serviceType: formType,
      serviceTypeLabel: {
        ar: formType === 'hospital' ? 'عيادة مستشفى' : 'مركز رعاية',
        en: formType === 'hospital' ? 'Hospital Clinic' : 'Care Center',
        fr: 'Centre de soins',
        ha: 'Cibiyar Lafiya',
        zh: '医疗服务机构'
      },
      languagesSupported: ['العربية', 'English'],
      accreditation: formAccreditation || 'وزارة الصحة المحلية / Local Health Authority',
      phone: formPhone || 'N/A',
      address: formAddress || formCity,
      website: formWebsite || 'https://www.who.int/',
      mapQuery: `${formName} ${formCity}`
    };

    const updated = [newCenter, ...centers];
    setCenters(updated);
    saveCenters(updated);
    setShowAddModal(false);
    // Reset
    setFormName('');
    setFormCountry('');
    setFormCity('');
    setFormAccreditation('');
    setFormPhone('');
    setFormAddress('');
    setFormWebsite('');
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-teal-700 via-emerald-700 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-teal-400/30">
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-black border border-white/25">
            <Navigation className="w-3.5 h-3.5 text-teal-200" />
            <span>Find a Quit Smoking Center</span>
          </div>

          {onBack && (
            <button
              onClick={onBack}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-xl text-xs font-black text-white transition-all cursor-pointer active:scale-95 group"
              title={lang === 'ar' ? 'رجوع إلى الصفحة السابقة' : 'Back to previous page'}
            >
              <ArrowIcon className="w-4 h-4 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
              <span>{lang === 'ar' ? 'سهم رجوع' : 'Back'}</span>
            </button>
          )}
        </div>
        
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-2">
          {t.centersHeader}
        </h2>
        
        <p className="text-sm sm:text-base text-teal-100 leading-relaxed max-w-3xl font-medium">
          {t.centersSubtitle}
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-md border border-slate-200 space-y-4">
        {/* Country Selector Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {countries.map((c) => (
            <button
              key={c.code}
              onClick={() => setSelectedCountry(c.code)}
              className={`px-3.5 py-2 rounded-xl text-xs font-black whitespace-nowrap transition-all cursor-pointer ${
                selectedCountry === c.code
                  ? 'bg-teal-700 text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {lang === 'ar' ? c.labelAr : c.labelEn}
            </button>
          ))}
        </div>

        {/* Search & Service Type */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute top-3.5 start-3.5" />
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full ps-10 pe-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-bold focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <select
            value={selectedServiceType}
            onChange={(e) => setSelectedServiceType(e.target.value)}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-bold bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="ALL">{t.allServiceTypes}</option>
            <option value="hospital">{t.hospitalClinic}</option>
            <option value="clinic">{t.communityCenter}</option>
            <option value="virtual">{t.virtualClinic}</option>
          </select>

          <button
            onClick={() => setShowAddModal(true)}
            className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-black shadow-md transition-all active:scale-95 cursor-pointer whitespace-nowrap"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{lang === 'ar' ? 'إضافة مركز' : 'Add Center'}</span>
          </button>
        </div>
      </div>

      {/* Centers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCenters.map((center) => (
          <div
            key={center.id}
            className="bg-white rounded-3xl p-6 shadow-lg border border-slate-200/90 hover:border-teal-400 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-teal-50 text-teal-800 border border-teal-200">
                    {center.country[lang] || center.country.en}
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700">
                    {center.city[lang] || center.city.en}
                  </span>
                </div>

                <span className="inline-flex items-center gap-1 text-[11px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? 'معتمد' : 'Accredited'}</span>
                </span>
              </div>

              <h3 className="text-lg font-black text-slate-900 leading-snug">
                {center.name[lang] || center.name.en}
              </h3>

              {/* Accreditation */}
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                <span className="font-bold text-slate-500 block text-[11px]">
                  {t.accreditedBy}
                </span>
                <span className="font-black text-slate-800">
                  {center.accreditation}
                </span>
              </div>

              {/* Address */}
              <div className="flex items-start gap-2 text-xs font-bold text-slate-600">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>{center.address}</span>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="font-black text-slate-900 dir-ltr">{center.phone}</span>
              </div>
            </div>

            {/* Action Buttons: Maps & Website */}
            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(center.mapQuery || center.name.en + ' ' + center.city.en)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-black shadow-md transition-all active:scale-95"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>{t.openMapLocation}</span>
              </a>

              <a
                href={center.website}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors"
                title={t.visitOfficialSite}
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Add Center Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-teal-200 animate-fadeIn">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <h3 className="font-black text-lg text-slate-900">
                {lang === 'ar' ? 'إضافة مركز أو عيادة إقلاع' : 'Add Cessation Center'}
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddCenter} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'ar' ? 'اسم المركز أو المستشفى *' : 'Center Name *'}
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === 'ar' ? 'الدولة *' : 'Country *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formCountry}
                    onChange={(e) => setFormCountry(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === 'ar' ? 'المدينة *' : 'City *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formCity}
                    onChange={(e) => setFormCity(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'ar' ? 'جهة الاعتماد الطبية *' : 'Accreditation Body *'}
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ministry of Health"
                  value={formAccreditation}
                  onChange={(e) => setFormAccreditation(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === 'ar' ? 'الهاتف / الخط الساخن' : 'Phone / Helpline'}
                  </label>
                  <input
                    type="text"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === 'ar' ? 'الموقع الإلكتروني' : 'Website'}
                  </label>
                  <input
                    type="url"
                    value={formWebsite}
                    onChange={(e) => setFormWebsite(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'ar' ? 'العنوان التفصيلي' : 'Address'}
                </label>
                <input
                  type="text"
                  value={formAddress}
                  onChange={(e) => setFormAddress(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 font-bold text-xs"
                >
                  {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-black text-xs shadow-md"
                >
                  {lang === 'ar' ? 'حفظ المركز' : 'Save Center'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
