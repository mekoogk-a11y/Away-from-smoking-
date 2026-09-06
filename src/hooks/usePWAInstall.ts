import { useEffect, useState } from 'react';

export interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);
  const [browserName, setBrowserName] = useState<'chrome' | 'edge' | 'safari' | 'firefox' | 'other'>('other');

  useEffect(() => {
    // 1. Detect if running in standalone mode (already installed as PWA)
    const checkStandalone = () => {
      const isStandaloneMedia = window.matchMedia('(display-mode: standalone)').matches;
      const isNavStandalone = (window.navigator as unknown as { standalone?: boolean }).standalone === true;
      const isFullscreenMedia = window.matchMedia('(display-mode: fullscreen)').matches;
      const isMinimalUi = window.matchMedia('(display-mode: minimal-ui)').matches;
      const isDocumentStandalone = document.referrer.includes('android-app://');
      
      const installed = isStandaloneMedia || isNavStandalone || isFullscreenMedia || isMinimalUi || isDocumentStandalone;
      setIsInstalled(installed);
    };

    checkStandalone();

    // 2. Detect platform & browser
    const ua = window.navigator.userAgent.toLowerCase();
    const isIOSDevice = /iphone|ipad|ipod/.test(ua);
    const isAndroidDevice = /android/.test(ua);
    setIsIOS(isIOSDevice);
    setIsAndroid(isAndroidDevice);

    if (/edg\//.test(ua)) {
      setBrowserName('edge');
    } else if (/chrome|crios/.test(ua)) {
      setBrowserName('chrome');
    } else if (/safari/.test(ua) && !/chrome|crios/.test(ua)) {
      setBrowserName('safari');
    } else if (/firefox|fxios/.test(ua)) {
      setBrowserName('firefox');
    } else {
      setBrowserName('other');
    }

    // 3. Capture beforeinstallprompt event (Android / Chromium / Edge / Chrome)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    // 4. Listen for successful installation
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      localStorage.setItem('pwa_app_installed', 'true');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Watch for display-mode changes
    const matchDisplay = window.matchMedia('(display-mode: standalone)');
    const handleDisplayChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setIsInstalled(true);
      }
    };
    try {
      matchDisplay.addEventListener('change', handleDisplayChange);
    } catch {
      // old browser fallback
    }

    // Check localStorage fallback
    if (localStorage.getItem('pwa_app_installed') === 'true' && (window.matchMedia('(display-mode: standalone)').matches || isNavStandaloneFallback())) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      try {
        matchDisplay.removeEventListener('change', handleDisplayChange);
      } catch {
        // ignore
      }
    };
  }, []);

  const isNavStandaloneFallback = () => {
    return (window.navigator as unknown as { standalone?: boolean }).standalone === true;
  };

  const install = async (): Promise<'accepted' | 'dismissed' | 'manual'> => {
    if (!deferredPrompt) {
      return 'manual';
    }
    try {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        setIsInstalled(true);
        setDeferredPrompt(null);
        localStorage.setItem('pwa_app_installed', 'true');
      }
      return choice.outcome;
    } catch {
      return 'manual';
    }
  };

  return {
    isInstallable: !!deferredPrompt,
    isInstalled,
    isIOS,
    isAndroid,
    browserName,
    install,
    canPromptDirectly: !!deferredPrompt
  };
}
