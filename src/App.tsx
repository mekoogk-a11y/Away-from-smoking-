import React, { useState, useEffect } from 'react';
import { Language, UserProfile, VideoItem, Achievement, CalculatedStats } from './types';
import { 
  loadUserProfile, 
  saveUserProfile, 
  loadLanguage, 
  saveLanguage, 
  loadVideos, 
  loadAchievements, 
  calculateStats,
  getDefaultProfile
} from './utils/storage';
import { translations } from './data/translations';
import { Navbar } from './components/Navbar';
import { BackNavBanner } from './components/BackNavBanner';
import { HomeView } from './components/HomeView';
import { HarmfulEffectsView } from './components/HarmfulEffectsView';
import { MedicalDamageView } from './components/MedicalDamageView';
import { ExpertHelpView } from './components/ExpertHelpView';
import { DoctorsView } from './components/DoctorsView';
import { CentersView } from './components/CentersView';
import { VideosView } from './components/VideosView';
import { JourneyTrackerView } from './components/JourneyTrackerView';
import { CravingRescueView } from './components/CravingRescueView';
import { AchievementsView } from './components/AchievementsView';
import { AboutView } from './components/AboutView';
import { MedicalSourcesView } from './components/MedicalSourcesView';
import { LegalViews } from './components/LegalViews';
import { NeedHelpModal } from './components/NeedHelpModal';
import { ProfileModal } from './components/ProfileModal';
import { Footer } from './components/Footer';
import { PWASplashScreen } from './components/PWASplashScreen';
import { OfflineIndicator } from './components/OfflineIndicator';

export default function App() {
  const [lang, setLang] = useState<Language>('ar');
  const [profile, setProfile] = useState<UserProfile>(getDefaultProfile);
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [tabHistory, setTabHistory] = useState<string[]>(['home']);
  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);
  const [showNeedHelpModal, setShowNeedHelpModal] = useState<boolean>(false);
  const [stats, setStats] = useState<CalculatedStats>(() => calculateStats(getDefaultProfile()));

  // Initialize from local storage
  useEffect(() => {
    const savedLang = loadLanguage();
    const savedProfile = loadUserProfile();
    const savedVideos = loadVideos();
    const savedAchievements = loadAchievements();

    setLang(savedLang);
    setProfile(savedProfile);
    setVideos(savedVideos);
    setAchievements(savedAchievements);
    setStats(calculateStats(savedProfile));
  }, []);

  // Update HTML document attributes on language change
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.title = lang === 'ar' ? 'كيف تترك التدخين | Quit Smoking' : 'Quit Smoking | كيف تترك التدخين';
  }, [lang]);

  // Live second-by-second ticker for calculated stats
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(calculateStats(profile));
    }, 1000);
    return () => clearInterval(interval);
  }, [profile]);

  const handleToggleLanguage = (newLang: Language) => {
    setLang(newLang);
    saveLanguage(newLang);
  };

  const handleUpdateProfile = (newProfile: UserProfile) => {
    setProfile(newProfile);
    saveUserProfile(newProfile);
    setStats(calculateStats(newProfile));
  };

  const handleResetData = () => {
    const def = getDefaultProfile();
    setProfile(def);
    setStats(calculateStats(def));
    setVideos(loadVideos());
    setAchievements(loadAchievements());
    setCurrentTab('home');
    setTabHistory(['home']);
  };

  // Navigates to a new tab while recording history
  const navigateTo = (tab: string) => {
    if (tab === currentTab) return;
    setTabHistory((prev) => [...prev, tab]);
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Goes back to the previous tab/section the user came from
  const handleBack = () => {
    if (tabHistory.length > 1) {
      const nextHistory = [...tabHistory];
      nextHistory.pop(); // remove current tab
      const prev = nextHistory[nextHistory.length - 1] || 'home';
      setTabHistory(nextHistory);
      setCurrentTab(prev);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCurrentTab('home');
      setTabHistory(['home']);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleGoHome = () => {
    setCurrentTab('home');
    setTabHistory(['home']);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // The tab from which the current section was opened
  const prevTab = tabHistory.length > 1 ? tabHistory[tabHistory.length - 2] : 'home';

  return (
    <div className={`min-h-screen bg-slate-50 text-slate-900 flex flex-col font-['Cairo','Outfit',sans-serif] ${lang === 'en' ? 'font-[\'Outfit\',sans-serif]' : ''}`}>
      
      {/* Top Navigation Bar */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={navigateTo}
        lang={lang}
        onToggleLanguage={handleToggleLanguage}
        onOpenNeedHelpNow={() => setShowNeedHelpModal(true)}
      />

      {/* Main Page Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        
        {/* Back Navigation Bar for each section of the application */}
        <BackNavBanner
          lang={lang}
          currentTab={currentTab}
          prevTab={prevTab}
          onBack={handleBack}
          onGoHome={handleGoHome}
        />

        {/* 1: Home Dashboard */}
        {currentTab === 'home' && (
          <HomeView
            lang={lang}
            profile={profile}
            stats={stats}
            onNavigate={navigateTo}
            onOpenProfileModal={() => setShowProfileModal(true)}
            onOpenNeedHelpNow={() => setShowNeedHelpModal(true)}
          />
        )}

        {/* 2: Medical Damage Photography */}
        {currentTab === 'medical-photos' && (
          <MedicalDamageView lang={lang} onBack={handleBack} />
        )}

        {/* 3: Expert Help & Official Helplines */}
        {currentTab === 'expert' && (
          <ExpertHelpView lang={lang} onBack={handleBack} />
        )}

        {/* 4: Doctors & Clinical Specialists Directory */}
        {currentTab === 'doctors' && (
          <DoctorsView lang={lang} onBack={handleBack} />
        )}

        {/* 5: Global Cessation Centers & Clinics */}
        {currentTab === 'centers' && (
          <CentersView lang={lang} onBack={handleBack} />
        )}

        {/* 6: Educational & Physiological Harm Details */}
        {currentTab === 'harms' && (
          <HarmfulEffectsView lang={lang} onBack={handleBack} />
        )}

        {/* 7: Educational Video Library */}
        {currentTab === 'videos' && (
          <VideosView
            lang={lang}
            videos={videos}
            onUpdateVideos={setVideos}
            onBack={handleBack}
          />
        )}

        {/* 8: Quit Journey & Savings Calculations */}
        {currentTab === 'journey' && (
          <JourneyTrackerView
            lang={lang}
            profile={profile}
            stats={stats}
            onUpdateProfile={handleUpdateProfile}
            onBack={handleBack}
          />
        )}

        {/* 9: Cravings Rescue & 4-7-8 Breathing Tools */}
        {currentTab === 'cravings' && (
          <CravingRescueView lang={lang} onBack={handleBack} />
        )}

        {/* 10: Milestones & Badges */}
        {currentTab === 'achievements' && (
          <AchievementsView
            lang={lang}
            stats={stats}
            achievements={achievements}
            onBack={handleBack}
          />
        )}

        {/* 11: Scientific Medical References */}
        {currentTab === 'sources' && (
          <MedicalSourcesView lang={lang} onBack={handleBack} />
        )}

        {/* 12: Legal Privacy Policy & Terms */}
        {currentTab === 'legal' && (
          <LegalViews lang={lang} onBack={handleBack} />
        )}

        {/* 13: About The Platform */}
        {currentTab === 'about' && (
          <AboutView
            lang={lang}
            profile={profile}
            stats={stats}
            onResetData={handleResetData}
            onBack={handleBack}
          />
        )}
      </main>

      {/* Urgent "أحتاج مساعدة الآن" Modal */}
      <NeedHelpModal
        isOpen={showNeedHelpModal}
        onClose={() => setShowNeedHelpModal(false)}
        lang={lang}
        onNavigate={navigateTo}
      />

      {/* Setup Profile Modal */}
      <ProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        lang={lang}
        profile={profile}
        onSaveProfile={handleUpdateProfile}
      />

      {/* Footer with exact required verbatim credits */}
      <Footer
        lang={lang}
        onSelectTab={navigateTo}
        onToggleLanguage={handleToggleLanguage}
      />

      {/* Professional PWA Splash Screen */}
      <PWASplashScreen lang={lang} />

      {/* Offline Status Connectivity Banner */}
      <OfflineIndicator lang={lang} />

    </div>
  );
}
