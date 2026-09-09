// Neutral sound utilities for guided breathing and milestone feedback
// Strictly respectful of user settings (can be muted) and devoid of any ads or dialectal promotions

class SoundEffects {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  private getContext(): AudioContext | null {
    if (!this.enabled || typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // Gentle acoustic chime for 4-7-8 breathing cycles
  playBreathChime(type: 'in' | 'hold' | 'out') {
    if (!this.enabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const now = ctx.currentTime;

      if (type === 'in') {
        osc.frequency.setValueAtTime(329.63, now); // E4
        osc.frequency.exponentialRampToValueAtTime(523.25, now + 1.2); // C5
      } else if (type === 'hold') {
        osc.frequency.setValueAtTime(440.0, now); // A4
      } else {
        osc.frequency.setValueAtTime(493.88, now); // B4
        osc.frequency.exponentialRampToValueAtTime(261.63, now + 1.5); // C4
      }

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.08, now + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 1.9);
    } catch {
      // Audio context might be restricted
    }
  }

  // Soft milestone triumph tone
  playFanfare() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const notes = [261.63, 329.63, 392.0, 523.25];
      const now = ctx.currentTime;

      notes.forEach((freq, idx) => {
        if (!ctx) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const noteTime = now + idx * 0.12;

        osc.frequency.setValueAtTime(freq, noteTime);
        gain.gain.setValueAtTime(0.001, noteTime);
        gain.gain.linearRampToValueAtTime(0.08, noteTime + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.5);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(noteTime);
        osc.stop(noteTime + 0.55);
      });
    } catch {
      // Fallback safe
    }
  }

  // Subtle tap haptic sound
  playTap() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const now = ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(200, now + 0.08);

      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.09);
    } catch {
      // safe
    }
  }

  playClick() {
    this.playTap();
  }

  playSuccess() {
    this.playFanfare();
  }

  // Soft rhythmic pulse for timers and steady breathing
  playRhythmPulse() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const now = ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.05);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.06);
    } catch {
      // safe
    }
  }
}

export const soundFx = new SoundEffects();
