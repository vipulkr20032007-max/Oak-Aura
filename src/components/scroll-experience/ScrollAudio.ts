// Web Audio API ambient audio synthesizer for Velora Living 3D Experience
// Synthesizes a subtle, warm, soothing harmonic tone without requiring external audio files.

class AmbientSoundEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private masterGain: GainNode | null = null;
  private oscillators: OscillatorNode[] = [];

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }

  private start() {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!this.ctx) {
        this.ctx = new AudioCtx();
      }
      if (this.ctx.state === "suspended") {
        this.ctx.resume();
      }

      const now = this.ctx.currentTime;
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.001, now);
      this.masterGain.gain.exponentialRampToValueAtTime(0.06, now + 2); // very gentle, soothing volume
      this.masterGain.connect(this.ctx.destination);

      // Warm frequencies (A chord harmonic drone: A2 110Hz, E3 164.8Hz, C#4 277.2Hz)
      const freqs = [110, 164.81, 220, 277.18];
      this.oscillators = freqs.map((freq) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.25, now);
        osc.connect(gain);
        gain.connect(this.masterGain!);
        osc.start(now);
        return osc;
      });

      this.isPlaying = true;
    } catch {
      this.isPlaying = false;
    }
  }

  private stop() {
    if (this.ctx && this.masterGain) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
      this.masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 1);
      setTimeout(() => {
        this.oscillators.forEach((osc) => {
          try {
            osc.stop();
            osc.disconnect();
          } catch {
            // ignore
          }
        });
        this.oscillators = [];
        this.isPlaying = false;
      }, 1000);
    } else {
      this.isPlaying = false;
    }
  }
}

export const ambientSound = typeof window !== "undefined" ? new AmbientSoundEngine() : null;
