"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

export const Hero = () => {
  const [videoReady, setVideoReady] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const [needsGesture, setNeedsGesture] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  /** Si el usuario apagó el audio a propósito, no lo volvemos a forzar */
  const userStoppedRef = useRef(false);
  const wasPlayingBeforeHideRef = useRef(false);

  useEffect(() => {
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  const startAudio = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || userStoppedRef.current) return false;

    try {
      audio.volume = 0.7;
      await audio.play();
      setAudioError(false);
      setNeedsGesture(false);
      return true;
    } catch {
      setNeedsGesture(true);
      return false;
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlay = () => setAudioPlaying(true);
    const onPause = () => setAudioPlaying(false);
    const onError = () => {
      setAudioPlaying(false);
      setAudioError(true);
    };

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("error", onError);
    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("error", onError);
    };
  }, []);

  // Autoplay + unlock en la 1ª interacción (PC / mobile)
  useEffect(() => {
    let unlocked = false;

    const tryStart = async () => {
      if (unlocked || userStoppedRef.current) return;
      const ok = await startAudio();
      if (ok) {
        unlocked = true;
        removeListeners();
      }
    };

    const onGesture = () => {
      void tryStart();
    };

    const removeListeners = () => {
      window.removeEventListener("pointerdown", onGesture);
      window.removeEventListener("click", onGesture);
      window.removeEventListener("keydown", onGesture);
      window.removeEventListener("touchstart", onGesture);
      window.removeEventListener("scroll", onGesture);
      window.removeEventListener("wheel", onGesture);
    };

    void tryStart();

    window.addEventListener("pointerdown", onGesture, { passive: true });
    window.addEventListener("click", onGesture, { passive: true });
    window.addEventListener("keydown", onGesture);
    window.addEventListener("touchstart", onGesture, { passive: true });
    window.addEventListener("scroll", onGesture, { passive: true });
    window.addEventListener("wheel", onGesture, { passive: true });

    return removeListeners;
  }, [startAudio]);

  // Pausar al cambiar de app / pestaña; reanudar al volver
  useEffect(() => {
    const onVisibility = () => {
      const audio = audioRef.current;
      if (!audio) return;

      if (document.hidden) {
        wasPlayingBeforeHideRef.current = !audio.paused && !userStoppedRef.current;
        if (!audio.paused) audio.pause();
        return;
      }

      if (wasPlayingBeforeHideRef.current && !userStoppedRef.current) {
        void startAudio();
      }
    };

    const onPageHide = () => {
      const audio = audioRef.current;
      if (!audio) return;
      wasPlayingBeforeHideRef.current = !audio.paused && !userStoppedRef.current;
      audio.pause();
    };

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", onPageHide);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", onPageHide);
    };
  }, [startAudio]);

  const toggleAudio = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused) {
      userStoppedRef.current = true;
      wasPlayingBeforeHideRef.current = false;
      audio.pause();
      return;
    }

    userStoppedRef.current = false;
    const ok = await startAudio();
    if (!ok) setAudioError(true);
  };

  const whatsappNumber = "+5493794347949";
  const whatsappMessage =
    "Hola! Me gustaría reservar una fecha para un evento con DreamDrinks.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  return (
    <section className="relative h-screen flex items-center justify-center bg-surface">

      <audio
        ref={audioRef}
        src="/assets/audio/off-my-mind.mp3"
        loop
        preload="auto"
        playsInline
      />

      <div className="absolute inset-0 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onCanPlay={() => setVideoReady(true)}
          className={`absolute inset-0 w-full h-full object-cover scale-110 transition-opacity duration-[500ms] ease-in ${
            videoReady ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src="/assets/videos/videoLiviano.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/55" />
      </div>

      <button
        onClick={toggleAudio}
        className="absolute bottom-8 left-6 z-20 flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-300 text-xs group"
        aria-label={audioPlaying ? "Silenciar música" : "Reproducir música"}
        title={
          audioError
            ? "No se encontró el audio"
            : audioPlaying
              ? "Apagar música"
              : "Encender música"
        }
      >
        {audioPlaying ? (
          <>
            <span className="flex items-end gap-px h-4">
              <span className="w-0.5 bg-current rounded-full animate-[bounce_0.7s_ease-in-out_infinite] h-2" />
              <span className="w-0.5 bg-current rounded-full animate-[bounce_0.7s_ease-in-out_0.15s_infinite] h-4" />
              <span className="w-0.5 bg-current rounded-full animate-[bounce_0.7s_ease-in-out_0.3s_infinite] h-1.5" />
              <span className="w-0.5 bg-current rounded-full animate-[bounce_0.7s_ease-in-out_0.05s_infinite] h-3" />
            </span>
            <span>Off my mind — Mallin</span>
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.064A4 4 0 108 17V8.82l8-1.6V13.064A4 4 0 1020 15V3h-2z" />
            </svg>
            <span className={needsGesture ? "opacity-100" : "opacity-100 md:opacity-70 group-hover:opacity-100 transition-opacity duration-200"}>
              {audioError
                ? "Audio no disponible"
                : needsGesture
                  ? "Click para activar música"
                  : "Off my mind — Mallin"}
            </span>
          </>
        )}
      </button>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-16 flex flex-col items-center text-center">
        <div className="relative w-72 h-36 md:w-80 md:h-40 mb-8">
          <Image
            src="/assets/logos/complete-logo-white.PNG"
            alt="DreamDrinks Logo"
            fill
            className="object-contain"
            sizes="(max-width: 640px) 224px, (max-width: 768px) 288px, 320px"
            quality={100}
            priority
          />
        </div>

        <p className="text-white mb-8 max-w-xl uppercase text-[10px] tracking-[0.08em] font-medium leading-relaxed">
          Experiencias que transforman cada celebración en un momento inolvidable.
        </p>

        <Link
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="border-2 border-white/70 bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-gray-900 font-montserrat font-semibold py-3 px-6 rounded-lg text-[10px] tracking-[2px] uppercase transition-all duration-300 flex items-center gap-2 justify-center"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.304" />
          </svg>
          COTIZAR
        </Link>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};
