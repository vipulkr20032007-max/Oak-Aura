"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { ScrollOverlays } from "./ScrollOverlays";
import { ScrollHeader } from "./ScrollHeader";
import { Sparkles, Eye, MousePointer } from "lucide-react";

const TOTAL_FRAMES = 240;

const getFrameUrl = (index: number) => {
  const frameNum = String(index).padStart(3, "0");
  return `/frames/ezgif-frame-${frameNum}.jpg`;
};

interface ScrollCanvasProps {
  onScrollToShop: () => void;
}

export function ScrollCanvas({ onScrollToShop }: ScrollCanvasProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));

  const [isFirstFrameReady, setIsFirstFrameReady] = useState(false);
  const [loadPercentage, setLoadPercentage] = useState(0);
  const [progress, setProgress] = useState(0); // 0.0 to 1.0
  const [currentFrameNum, setCurrentFrameNum] = useState(1);
  const [isAutoplay, setIsAutoplay] = useState(false);

  // Interpolation refs
  const currentFrameRef = useRef(0); // float 0 to 239
  const targetFrameRef = useRef(0);
  const lastRenderedFrameRef = useRef(-1);
  const rafIdRef = useRef<number | null>(null);

  // Draw a frame to canvas with object-fit: cover scaling
  const drawImageToCanvas = useCallback((img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const cw = canvas.width;
    const ch = canvas.height;
    if (cw === 0 || ch === 0) return;

    const imgAspect = (img.naturalWidth || 1920) / (img.naturalHeight || 1080);
    const canvasAspect = cw / ch;

    let renderW = cw;
    let renderH = cw / imgAspect;

    if (canvasAspect > imgAspect) {
      renderW = cw;
      renderH = cw / imgAspect;
    } else {
      renderH = ch;
      renderW = ch * imgAspect;
    }

    const renderX = (cw - renderW) / 2;
    const renderY = (ch - renderH) / 2;

    ctx.drawImage(img, renderX, renderY, renderW, renderH);
  }, []);

  // Retrieve closest loaded frame
  const getNearestLoadedFrame = useCallback((targetIdx: number): HTMLImageElement | null => {
    const clamped = Math.max(0, Math.min(TOTAL_FRAMES - 1, targetIdx));
    if (imagesRef.current[clamped]) return imagesRef.current[clamped];

    for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
      const left = clamped - offset;
      if (left >= 0 && imagesRef.current[left]) {
        return imagesRef.current[left];
      }
      const right = clamped + offset;
      if (right < TOTAL_FRAMES && imagesRef.current[right]) {
        return imagesRef.current[right];
      }
    }
    return imagesRef.current[0] || null;
  }, []);

  // Canvas resize handler for retina/high-DPI displays
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2); // limit to 2x for memory efficiency
    const width = window.innerWidth;
    const height = window.innerHeight;

    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      // Redraw current frame
      const frameIdx = Math.round(currentFrameRef.current);
      const img = getNearestLoadedFrame(frameIdx);
      if (img) {
        drawImageToCanvas(img);
      }
    }
  }, [drawImageToCanvas, getNearestLoadedFrame]);

  // Preload frame images: Step 1 (Keyframes first), Step 2 (Full sequence)
  useEffect(() => {
    let isCancelled = false;
    let loadedCount = 0;

    // Load Frame 1 immediately
    const firstImg = new Image();
    firstImg.src = getFrameUrl(1);
    firstImg.onload = () => {
      if (isCancelled) return;
      imagesRef.current[0] = firstImg;
      setIsFirstFrameReady(true);
      handleResize();
      drawImageToCanvas(firstImg);
      loadedCount++;
    };

    // Keyframes priority (every 8th frame) to get full 360 scrub instantly
    const keyframeIndices: number[] = [];
    for (let i = 2; i <= TOTAL_FRAMES; i += 8) {
      keyframeIndices.push(i);
    }

    const loadQueue = async () => {
      // Phase A: Keyframes
      for (const i of keyframeIndices) {
        if (isCancelled) return;
        const img = new Image();
        img.src = getFrameUrl(i);
        img.onload = () => {
          if (isCancelled) return;
          imagesRef.current[i - 1] = img;
          loadedCount++;
          setLoadPercentage(Math.round((loadedCount / TOTAL_FRAMES) * 100));
        };
      }

      // Small delay then Phase B: all remaining frames
      await new Promise((r) => setTimeout(r, 200));

      for (let i = 1; i <= TOTAL_FRAMES; i++) {
        if (isCancelled) return;
        if (imagesRef.current[i - 1]) continue; // already loaded in keyframes
        const img = new Image();
        img.src = getFrameUrl(i);
        img.onload = () => {
          if (isCancelled) return;
          imagesRef.current[i - 1] = img;
          loadedCount++;
          setLoadPercentage(Math.round((loadedCount / TOTAL_FRAMES) * 100));
        };
      }
    };

    loadQueue();

    return () => {
      isCancelled = true;
    };
  }, [drawImageToCanvas, handleResize]);

  // Main render loop with requestAnimationFrame
  useEffect(() => {
    let running = true;

    const renderLoop = () => {
      if (!running) return;

      if (isAutoplay) {
        // Increment target frame automatically
        targetFrameRef.current = (targetFrameRef.current + 0.4) % TOTAL_FRAMES;
        setProgress(targetFrameRef.current / (TOTAL_FRAMES - 1));
      }

      // Smooth lerp damping
      const diff = targetFrameRef.current - currentFrameRef.current;
      if (Math.abs(diff) > 0.01) {
        currentFrameRef.current += diff * 0.22;
      } else {
        currentFrameRef.current = targetFrameRef.current;
      }

      const roundedFrame = Math.round(currentFrameRef.current);
      if (roundedFrame !== lastRenderedFrameRef.current) {
        const frameImg = getNearestLoadedFrame(roundedFrame);
        if (frameImg) {
          drawImageToCanvas(frameImg);
          lastRenderedFrameRef.current = roundedFrame;
          setCurrentFrameNum(roundedFrame + 1);
        }
      }

      rafIdRef.current = requestAnimationFrame(renderLoop);
    };

    rafIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      running = false;
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [isAutoplay, drawImageToCanvas, getNearestLoadedFrame]);

  // Scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (isAutoplay) return; // user scrolling pauses auto or auto overrides
      const track = trackRef.current;
      if (!track) return;

      const rect = track.getBoundingClientRect();
      const scrollableDistance = rect.height - window.innerHeight;

      if (scrollableDistance <= 0) return;

      const scrolledY = -rect.top;
      const rawProgress = scrolledY / scrollableDistance;
      const clampedProgress = Math.max(0, Math.min(1, rawProgress));

      setProgress(clampedProgress);
      targetFrameRef.current = clampedProgress * (TOTAL_FRAMES - 1);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    handleResize();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [isAutoplay, handleResize]);

  // Scrub bar click/drag handler
  const handleTimelineScrub = (e: React.MouseEvent<HTMLDivElement>) => {
    const bar = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - bar.left;
    const scrubPercent = Math.max(0, Math.min(1, clickX / bar.width));

    setIsAutoplay(false);
    setProgress(scrubPercent);
    targetFrameRef.current = scrubPercent * (TOTAL_FRAMES - 1);

    // Also scroll the window to match the scrub position
    const track = trackRef.current;
    if (track) {
      const trackTop = track.offsetTop;
      const scrollableDistance = track.offsetHeight - window.innerHeight;
      window.scrollTo({
        top: trackTop + scrubPercent * scrollableDistance,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      ref={trackRef}
      id="scroll-animation-track"
      className="relative w-full bg-[#090807] text-[#FAF8F5]"
      style={{ height: "450vh" }} // 450vh track provides silky, comfortable scrub duration
    >
      {/* Sticky Fullscreen Canvas Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-[#090807]">
        
        {/* Floating Minimal Luxury Header */}
        <ScrollHeader
          isAutoplay={isAutoplay}
          onToggleAutoplay={() => setIsAutoplay((prev) => !prev)}
          progress={progress}
        />

        {/* High-Performance Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 block w-full h-full object-cover transition-opacity duration-700 pointer-events-none"
          style={{ opacity: isFirstFrameReady ? 1 : 0 }}
        />

        {/* Loading Spinner Placeholder (only until Frame 1 is ready) */}
        {!isFirstFrameReady && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#090807] z-30 space-y-4">
            <div className="w-12 h-12 rounded-full border-2 border-[#BE9A78] border-t-transparent animate-spin" />
            <div className="text-center">
              <p className="font-serif text-lg tracking-widest text-[#EFE4D6] uppercase">
                VELORA LIVING
              </p>
              <p className="text-xs text-[#BE9A78] tracking-widest uppercase mt-1">
                Preparing Architectural 360° Space...
              </p>
            </div>
          </div>
        )}

        {/* Ambient Subtle Vignette Overlay for Depth */}
        <div className="absolute inset-0 pointer-events-none bg-radial-[ellipse_at_center,_var(--tw-gradient-stops)] from-transparent via-[#090807]/20 to-[#090807]/80 z-10" />

        {/* Synchronized Typographic Annotations */}
        <ScrollOverlays progress={progress} currentFrame={currentFrameNum} />

        {/* Bottom Interactive Floating Timeline Bar */}
        <div className="absolute bottom-16 sm:bottom-12 inset-x-0 mx-auto max-w-md sm:max-w-xl px-4 z-30 pointer-events-auto">
          <div className="bg-[#090807]/85 backdrop-blur-xl border border-[#D8BA9B]/25 rounded-2xl p-3.5 shadow-2xl flex flex-col gap-2">
            
            <div className="flex items-center justify-between text-[11px] text-[#D8CEBF] font-mono">
              <span className="flex items-center gap-1.5 text-[#D8BA9B]">
                <MousePointer className="w-3.5 h-3.5" />
                <span>SCRUB 360° ORBIT</span>
              </span>
              <span className="text-xs font-semibold text-[#FAF8F5]">
                {Math.round(progress * 100)}%
              </span>
              <button
                onClick={onScrollToShop}
                className="text-[10px] text-[#BE9A78] hover:text-[#FAF8F5] underline underline-offset-4 tracking-wider uppercase transition-colors"
              >
                Skip to Store ↓
              </button>
            </div>

            {/* Clickable / Draggable Progress Track */}
            <div
              onClick={handleTimelineScrub}
              className="relative w-full h-2.5 bg-[#231710] rounded-full overflow-hidden cursor-pointer group"
              title="Click or drag to scrub 360 view"
            >
              {/* Loaded Buffer Bar */}
              <div
                className="absolute inset-y-0 left-0 bg-[#332218] rounded-full transition-all duration-300"
                style={{ width: `${loadPercentage}%` }}
              />
              {/* Active Scrub Position */}
              <div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#88624C] via-[#BE9A78] to-[#FAF8F5] rounded-full shadow-[0_0_12px_#BE9A78]"
                style={{ width: `${progress * 100}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[10px] text-[#736E69]">
              <span>Front Elevation</span>
              <span>Headboard Detail</span>
              <span>24K Accents</span>
              <span>Plinth Base</span>
              <span>Full View</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
