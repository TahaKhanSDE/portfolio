'use client';

import React, { useState, useEffect, useRef } from 'react';

interface AudioConfig {
  trackName: string;
  src: string;
  bpm: number;
}

const DEFAULT_AUDIO: AudioConfig = {
  trackName: 'my-new-type-of-hero',
  src: '/my-new-type-of-hero.mp3',
  bpm: 128,
};

// 24-band frequency spectrum curve matching the graphic profile
const SPECTRUM_BARS = [
  15, 22, 35, 28, 48, 62, 38, 55, 75, 92, 45, 60, 85, 98, 70, 52, 40, 58, 72, 85, 48, 32, 24, 16
];

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const [isMuted, setIsMuted] = useState(false);
  const [audioConfig, setAudioConfig] = useState<AudioConfig>(DEFAULT_AUDIO);
  const [animTick, setAnimTick] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Sync with Secret Studio modifications
  useEffect(() => {
    const saved = localStorage.getItem('thk_audio_config');
    if (saved) {
      try {
        setAudioConfig(JSON.parse(saved));
      } catch {
        setAudioConfig(DEFAULT_AUDIO);
      }
    }

    const handleConfigUpdate = (e: CustomEvent<AudioConfig>) => {
      setAudioConfig(e.detail);
      localStorage.setItem('thk_audio_config', JSON.stringify(e.detail));
    };

    window.addEventListener('audio_config_updated', handleConfigUpdate as EventListener);
    return () => {
      window.removeEventListener('audio_config_updated', handleConfigUpdate as EventListener);
    };
  }, []);

  // Autoplay Logic: Unmuted by default with gesture fallback
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;

    el.muted = false;
    el.volume = volume;

    el.play()
      .then(() => setIsPlaying(true))
      .catch(() => {
        const startAudio = () => {
          if (el && el.paused) {
            el.muted = false;
            el.volume = volume;
            el.play()
              .then(() => setIsPlaying(true))
              .catch(() => {});
          }
          window.removeEventListener('pointerdown', startAudio);
          window.removeEventListener('scroll', startAudio);
          window.removeEventListener('keydown', startAudio);
          window.removeEventListener('touchstart', startAudio);
        };

        window.addEventListener('pointerdown', startAudio, { once: true });
        window.addEventListener('scroll', startAudio, { once: true });
        window.addEventListener('keydown', startAudio, { once: true });
        window.addEventListener('touchstart', startAudio, { once: true });
      });
  }, [audioConfig.src, volume]);

  // Volume synchronization
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Real-time animation loop linked to volume
  useEffect(() => {
    if (!isPlaying || isMuted || volume === 0) return;

    let frameId: number;
    const animate = () => {
      const speed = 0.05 + volume * 0.18;
      setAnimTick((prev) => prev + speed);
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [isPlaying, isMuted, volume]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true));
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (val > 0 && isMuted) setIsMuted(false);
  };

  const effectiveVol = isMuted ? 0 : volume;

  return (
    <aside
      aria-label="Soundtrack Deck"
      className="fixed z-50 select-none font-mono transition-all duration-300
        right-2.5 sm:right-4 md:right-6 
        bottom-4 md:bottom-auto md:top-1/2 md:-translate-y-1/2"
    >
      <audio
        ref={audioRef}
        src={audioConfig.src}
        autoPlay
        playsInline
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <div className="relative flex items-center">
        
        {/* EXTERNAL SPECTRUM BARS: Protruding horizontally OUTSIDE the left vertical wall */}
        <div 
          className="hidden md:flex flex-col justify-between absolute right-full mr-2 h-[55vh] max-h-[540px] pointer-events-none z-40 items-end"
          aria-hidden="true"
        >
          {SPECTRUM_BARS.map((baseHeight, idx) => {
            const wave = Math.sin(animTick + idx * 0.42) * 0.5 + 0.5;
            const widthPx = isPlaying && effectiveVol > 0
              ? Math.max(4, Math.round(baseHeight * wave * (effectiveVol + 0.35) * 0.8))
              : 3;

            return (
              <div 
                key={idx} 
                className="flex items-center justify-end h-2 w-32 overflow-visible"
              >
                <div
                  className="h-[3px] rounded-l-sm transition-all duration-75"
                  style={{
                    width: `${widthPx}px`,
                    background: idx < 8 
                      ? 'linear-gradient(90deg, #FFD13B, #FBBF24)' 
                      : idx < 16 
                      ? 'linear-gradient(90deg, #F59E0B, #FFD13B)' 
                      : 'linear-gradient(90deg, #D97706, #F59E0B)',
                    opacity: isPlaying && effectiveVol > 0 ? 0.95 : 0.2,
                    boxShadow: isPlaying && effectiveVol > 0 ? '0 0 6px rgba(255, 209, 59, 0.45)' : 'none',
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* 10% Scaled Vertical Deck */}
        <div className="
          bg-[#121316]/95 border-2 border-[#FFD13B] rounded-2xl shadow-[6px_6px_0px_0px_#000] backdrop-blur-md
          flex items-center justify-between p-2.5
          md:flex-col md:w-[56px] lg:w-[62px] md:h-[66vh] md:max-h-[640px] md:min-h-[460px] relative z-50
        ">
          
          {/* Top Play/Pause (~18% Height) */}
          <div className="flex items-center md:flex-col gap-1.5 md:h-[18%] justify-center">
            <button
              onClick={togglePlay}
              title={isPlaying ? 'Pause Track' : 'Play Background Audio'}
              className="w-9 h-9 lg:w-10 lg:h-10 rounded-lg bg-[#FFD13B] text-[#121316] font-black flex items-center justify-center hover:scale-105 active:scale-95 transition-transform shadow-[2px_2px_0px_0px_#000] cursor-pointer"
            >
              <i className={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-play'} text-sm ${isPlaying ? '' : 'ml-0.5'}`}></i>
            </button>
            <span className="text-[8px] text-[#FFD13B] font-black tracking-widest uppercase hidden md:inline">
              {isPlaying ? 'ON' : 'OFF'}
            </span>
          </div>

          {/* Compact Song Name with Hover Reveal (~14% Height) */}
          <div className="relative group/track mx-2 md:mx-0 md:h-[14%] flex items-center justify-center w-full">
            <div className="md:rotate-90 whitespace-nowrap flex items-center gap-1.5 max-w-[90px] md:max-w-[100px] cursor-pointer">
              <span className={`w-1.5 h-1.5 rounded-full bg-[#FFD13B] ${isPlaying ? 'animate-pulse' : 'opacity-40'}`}></span>
              <span className="text-[10px] font-bold text-[#F4F5F7] tracking-wider uppercase truncate">
                {audioConfig.trackName}
              </span>
            </div>

            {/* Hover Tooltip Out to the Left */}
            <div className="hidden group-hover/track:flex absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-zinc-950 border border-[#FFD13B] text-[#FFD13B] text-[10px] font-bold uppercase rounded shadow-lg whitespace-nowrap z-50 pointer-events-none">
              {audioConfig.trackName}
            </div>
          </div>

          {/* Center Deco Divider Accent */}
          <div className="hidden md:flex flex-col items-center gap-1 py-1 text-zinc-700">
            <span className="w-1 h-1 rounded-full bg-zinc-700"></span>
            <span className="w-1 h-1 rounded-full bg-zinc-700"></span>
            <span className="w-1 h-1 rounded-full bg-zinc-700"></span>
          </div>

          {/* BOTTOM: VOLUME ALLOCATION CARRYING 40% OF BOX HEIGHT */}
          <div className="flex items-center md:flex-col justify-between pl-2 md:pl-0 md:pt-2 md:w-full md:h-[40%] border-t border-zinc-800/80">
            
            {/* Mute/Unmute */}
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="text-zinc-400 hover:text-[#FFD13B] transition-colors text-sm cursor-pointer py-1"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              <i className={`fa-solid ${isMuted || volume === 0 ? 'fa-volume-xmark text-red-400' : volume < 0.5 ? 'fa-volume-low' : 'fa-volume-high'}`}></i>
            </button>

            {/* 40% Span Vertical Slider */}
            <div className="relative flex-1 flex items-center justify-center w-full py-2">
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                aria-label="Soundtrack Volume"
                className="
                  w-16 h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#FFD13B]
                  md:w-28 md:-rotate-90 md:origin-center
                "
              />
            </div>

            {/* Percentage Display */}
            <span className="hidden md:block text-[8px] font-bold text-[#FFD13B]/80 pb-1">
              {isMuted ? '0%' : `${Math.round(volume * 100)}%`}
            </span>
          </div>

        </div>
      </div>
    </aside>
  );
}