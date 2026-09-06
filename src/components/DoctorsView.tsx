import React, { useState } from 'react';
import { Language, DoctorExpert } from '../types';
import { translations } from '../data/translations';
import { loadDoctors, saveDoctors } from '../utils/storage';
import { 
  UserCheck, 
  Stethoscope, 
  ShieldCheck, 
  Search, 
  PlusCircle, 
  ExternalLink, 
  Globe2, 
  Building2, 
  X,
  AlertCircle,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

interface DoctorsViewProps {
  lang: Language;
  onBack?: () => void;
}

export const DoctorsView: React.FC<DoctorsViewProps> = ({ lang, onBack }) => {
  const t = translations[lang];
  const ArrowIcon = lang === 'ar' ? ArrowRight : ArrowLeft;
  const [doctors, setDoctors] = useState<DoctorExpert[]>(loadDoctors);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form state for adding a specialist
  const [formName, setFormName] = useState('');
  const [formSpecialty, setFormSpecialty] = useState('');
  const [formCountry, setFormCountry] = useState('');
  const [formInstitution, setFormInstitution] = useState('');
  const [formLanguages, setFormLanguages] = useState('العربية, English');
  const [formUrl, setFormUrl] = useState('');

  const filteredDoctors = doctors.filter((doc) => {
    const nameStr = (doc.name[lang] || doc.name.en).toLowerCase();
    const instStr = (doc.institution[lang] || doc.institution.en).toLowerCase();
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery = !q || nameStr.includes(q) || instStr.includes(q);
    return matchesQuery;
  });

  const handleAddDoctor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formInstitution.trim()) return;

    const newDoc: DoctorExpert = {
      id: `doc-${Date.now()}`,
      name: {
        ar: formName,
        en: formName,
        fr: formName,
        ha: formName,
        zh: formName
      },
      specialty: {
        ar: formSpecialty,
        en: formSpecialty,
        fr: formSpecialty,
        ha: formSpecialty,
        zh: formSpecialty
      },
      country: {
        ar: formCountry,
        en: formCountry,
        fr: formCountry,
        ha: formCountry,
        zh: formCountry
      },
      institution: {
        ar: formInstitution,
        en: formInstitution,
        fr: formInstitution,
        ha: formInstitution,
        zh: formInstitution
      },
      languages: formLanguages.split(',').map(s => s.trim()),
      officialConsultationUrl: formUrl || 'https://www.who.int/',
      verifiedStatus: true
    };

    const updated = [newDoc, ...doctors];
    setDoctors(updated);
    saveDoctors(updated);
    setShowAddModal(false);
    // Reset form
    setFormName('');
    setFormSpecialty('');
    setFormCountry('');
    setFormInstitution('');
    setFormUrl('');
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-blue-700 via-indigo-700 to-slate-800 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-blue-400/30">
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-black border border-white/25">
            <Stethoscope className="w-3.5 h-3.5 text-blue-200" />
            <span>{t.doctors}</span>
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
          {t.doctorsHeader}
        </h2>
        
        <p className="text-sm sm:text-base text-blue-100 leading-relaxed max-w-3xl font-medium">
          {t.doctorsSubtitle}
        </p>

        {/* Ethical Verification Disclaimer */}
        <div className="mt-4 p-3 bg-blue-950/60 rounded-2xl border border-blue-400/25 flex items-start gap-2.5 text-xs text-blue-200 font-semibold">
          <AlertCircle className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
          <span>{t.doctorDisclaimer}</span>
        </div>
      </div>

      {/* Control Bar: Search & Add Specialist */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-md border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute top-3.5 start-3.5" />
          <input
            type="text"
            placeholder={lang === 'ar' ? 'ابحث باسم الطبيب أو المستشفى...' : 'Search doctor or hospital name...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full ps-10 pe-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs sm:text-sm font-black shadow-md transition-all active:scale-95 cursor-pointer self-stretch sm:self-auto justify-center"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{lang === 'ar' ? 'إضافة طبيب متخصص' : 'Add Medical Specialist'}</span>
        </button>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map((doc) => (
          <div
            key={doc.id}
            className="bg-white rounded-3xl p-6 shadow-lg border border-slate-200/90 hover:border-blue-300 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-black bg-blue-50 text-blue-800 border border-blue-200">
                  {doc.country[lang] || doc.country.en}
                </span>

                <span className="inline-flex items-center gap-1 text-[11px] font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{t.verifiedDoctorBadge}</span>
                </span>
              </div>

              <div className="pt-2">
                <h3 className="text-lg font-black text-slate-900 leading-snug">
                  {doc.name[lang] || doc.name.en}
                </h3>
                <p className="text-xs font-black text-blue-700 mt-1">
                  {doc.specialty[lang] || doc.specialty.en}
                </p>
              </div>

              {/* Institution */}
              <div className="flex items-start gap-2 text-xs font-bold text-slate-600">
                <Building2 className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>{doc.institution[lang] || doc.institution.en}</span>
              </div>

              {/* Languages */}
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500 pt-1">
                <Globe2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{t.languagesSpoken} {doc.languages.join(' • ')}</span>
              </div>
            </div>

            {/* Official Booking link */}
            <div className="mt-5 pt-4 border-t border-slate-100">
              <a
                href={doc.officialConsultationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-slate-900 hover:bg-blue-600 text-white rounded-xl text-xs font-black shadow-md transition-all active:scale-95"
              >
                <span>{t.consultationLink}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Add Specialist Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-blue-200 animate-fadeIn">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <h3 className="font-black text-lg text-slate-900">
                {lang === 'ar' ? 'إضافة طبيب أو خبير متخصص' : 'Register a Medical Specialist'}
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddDoctor} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'ar' ? 'اسم الطبيب والدرجة العلمية *' : 'Doctor Name & Degree *'}
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Sarah Jenkins, MD"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'ar' ? 'التخصص الطبي *' : 'Specialty *'}
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. طب الصدر والرئة / Pulmonology"
                  value={formSpecialty}
                  onChange={(e) => setFormSpecialty(e.target.value)}
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
                    placeholder="e.g. Saudi Arabia"
                    value={formCountry}
                    onChange={(e) => setFormCountry(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === 'ar' ? 'اللغات' : 'Languages'}
                  </label>
                  <input
                    type="text"
                    placeholder="Arabic, English"
                    value={formLanguages}
                    onChange={(e) => setFormLanguages(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'ar' ? 'المؤسسة الطبية / المستشفى *' : 'Hospital / Institution *'}
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. University Hospital"
                  value={formInstitution}
                  onChange={(e) => setFormInstitution(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'ar' ? 'رابط الحجز أو الملف الرسمي' : 'Official Consultation URL'}
                </label>
                <input
                  type="url"
                  placeholder="https://hospital.org/booking"
                  value={formUrl}
                  onChange={(e) => setFormUrl(e.target.value)}
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
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-black text-xs shadow-md"
                >
                  {lang === 'ar' ? 'حفظ الطبيب' : 'Save Specialist'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
