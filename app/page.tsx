"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [scene, setScene] = useState(0);
  const [showFlash, setShowFlash] = useState(false);
  const [audioReady, setAudioReady] = useState(false);

  useEffect(() => {
    setAudioReady(true);
  }, []);

  useEffect(() => {
    const timings = [
      { scene: 0, duration: 3500 }, // Opening scene
      { scene: 1, duration: 3000 }, // Family enjoying picnic
      { scene: 2, duration: 2500 }, // Child picks up camera
      { scene: 3, duration: 1500 }, // Camera advance sound
      { scene: 4, duration: 800 },  // Taking photo with flash
      { scene: 5, duration: 3500 }, // Processed photo reveal
      { scene: 6, duration: 5000 }, // Call to action
    ];

    if (scene < timings.length) {
      const timer = setTimeout(() => {
        if (scene === 3 && audioReady) {
          playClickSound();
        }
        if (scene === 4) {
          triggerFlash();
        }
        setScene(scene + 1);
      }, timings[scene].duration);

      return () => clearTimeout(timer);
    } else {
      // Loop back to beginning
      const timer = setTimeout(() => {
        setScene(0);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [scene, audioReady]);

  const playClickSound = () => {
    if (typeof window !== 'undefined') {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = 800;
      oscillator.type = 'square';

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    }
  };

  const triggerFlash = () => {
    setShowFlash(true);
    setTimeout(() => setShowFlash(false), 300);
  };

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-black">
      {/* Flash Effect */}
      <AnimatePresence>
        {showFlash && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-white z-50 pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Scene 0: Opening */}
      <AnimatePresence>
        {scene === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-green-50 via-yellow-50 to-orange-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-6xl md:text-8xl font-bold text-fujifilm-green mb-4">
                FUJIFILM
              </h1>
              <p className="text-3xl md:text-4xl text-gray-700 font-light">QuickSnap</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 1: Family Picnic */}
      <AnimatePresence>
        {scene === 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-br from-blue-200 via-green-100 to-yellow-100"
          >
            <div className="relative w-full h-full flex items-center justify-center p-8">
              {/* Sky and grass background */}
              <div className="absolute inset-0">
                <div className="absolute top-0 w-full h-1/2 bg-gradient-to-b from-blue-300 to-blue-200" />
                <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-green-400 to-green-200" />
                {/* Sun */}
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute top-12 right-12 w-24 h-24 bg-yellow-300 rounded-full shadow-lg"
                />
              </div>

              {/* Family illustration */}
              <div className="relative z-10 flex gap-8 items-end">
                {/* Father in Kuwaiti dress */}
                <motion.div
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-col items-center"
                >
                  <div className="w-20 h-20 bg-amber-100 rounded-full mb-2 border-4 border-amber-200" />
                  <div className="w-24 h-40 bg-white rounded-lg relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-100" />
                  </div>
                </motion.div>

                {/* Mother in hijab */}
                <motion.div
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-col items-center"
                >
                  <div className="w-20 h-28 bg-purple-300 rounded-t-full mb-2 border-4 border-purple-400 relative">
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-12 h-12 bg-amber-100 rounded-full" />
                  </div>
                  <div className="w-24 h-32 bg-purple-400 rounded-lg" />
                </motion.div>

                {/* Younger child */}
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-col items-center"
                >
                  <div className="w-14 h-14 bg-amber-100 rounded-full mb-2 border-3 border-amber-200" />
                  <div className="w-16 h-24 bg-red-400 rounded-lg" />
                </motion.div>

                {/* 10-year-old child */}
                <motion.div
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-col items-center"
                >
                  <div className="w-16 h-16 bg-amber-100 rounded-full mb-2 border-3 border-amber-200" />
                  <div className="w-20 h-28 bg-blue-400 rounded-lg" />
                </motion.div>
              </div>

              {/* Picnic blanket */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.6 }}
                className="absolute bottom-24 w-96 h-8 bg-red-500 origin-center"
                style={{
                  backgroundImage: "repeating-linear-gradient(90deg, #ef4444 0px, #ef4444 40px, white 40px, white 80px)",
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 2: Child picks up camera */}
      <AnimatePresence>
        {scene === 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-br from-blue-200 via-green-100 to-yellow-100"
          >
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Zoomed in on child */}
              <div className="relative">
                <motion.div
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1.5 }}
                  transition={{ duration: 0.8 }}
                  className="flex flex-col items-center"
                >
                  <div className="w-32 h-32 bg-amber-100 rounded-full mb-4 border-4 border-amber-200 relative">
                    {/* Eyes */}
                    <div className="absolute top-12 left-8 w-4 h-6 bg-gray-800 rounded-full" />
                    <div className="absolute top-12 right-8 w-4 h-6 bg-gray-800 rounded-full" />
                    {/* Smile */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-12 h-6 border-b-4 border-gray-800 rounded-b-full" />
                  </div>
                  <div className="w-40 h-56 bg-blue-400 rounded-lg relative">
                    {/* Arms reaching for camera */}
                    <div className="absolute -left-8 top-4 w-16 h-6 bg-amber-100 rounded-full -rotate-45" />
                    <div className="absolute -right-8 top-4 w-16 h-6 bg-amber-100 rounded-full rotate-45" />
                  </div>
                </motion.div>

                {/* QuickSnap Camera */}
                <motion.div
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: -50, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="absolute bottom-0 left-1/2 -translate-x-1/2"
                >
                  <div className="w-32 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-lg shadow-2xl relative">
                    {/* Lens */}
                    <div className="absolute top-1/2 left-6 -translate-y-1/2 w-12 h-12 bg-gray-800 rounded-full">
                      <div className="absolute inset-2 bg-blue-900 rounded-full">
                        <div className="absolute inset-1 bg-gray-700 rounded-full" />
                      </div>
                    </div>
                    {/* Flash */}
                    <div className="absolute top-3 right-6 w-6 h-6 bg-yellow-200 rounded-sm" />
                    {/* Viewfinder */}
                    <div className="absolute top-2 right-14 w-4 h-3 bg-gray-700 rounded-sm" />
                    {/* QuickSnap text */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[8px] font-bold text-white">
                      QuickSnap
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 3: Camera advance */}
      <AnimatePresence>
        {scene === 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-br from-amber-100 to-orange-100"
          >
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Close-up of camera with hand advancing film */}
              <div className="relative">
                <motion.div
                  initial={{ scale: 1 }}
                  animate={{ scale: 2 }}
                  transition={{ duration: 0.5 }}
                  className="w-64 h-48 bg-gradient-to-br from-green-400 to-green-600 rounded-xl shadow-2xl relative"
                >
                  {/* Film advance wheel */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="absolute top-4 right-4 w-12 h-12 bg-gray-300 rounded-full"
                  >
                    <div className="absolute inset-2 bg-gray-400 rounded-full" />
                    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                      <div
                        key={angle}
                        className="absolute top-1/2 left-1/2 w-1 h-4 bg-gray-600 origin-top"
                        style={{ transform: `translate(-50%, -50%) rotate(${angle}deg)` }}
                      />
                    ))}
                  </motion.div>

                  {/* Hand */}
                  <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="absolute -top-8 right-0 w-16 h-20 bg-amber-100 rounded-full -rotate-12"
                  />

                  {/* Lens */}
                  <div className="absolute top-1/2 left-12 -translate-y-1/2 w-24 h-24 bg-gray-800 rounded-full">
                    <div className="absolute inset-3 bg-blue-900 rounded-full">
                      <div className="absolute inset-2 bg-gray-700 rounded-full" />
                    </div>
                  </div>

                  {/* Flash */}
                  <div className="absolute top-6 left-44 w-12 h-12 bg-yellow-200 rounded-sm" />
                </motion.div>

                {/* Click text */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: [0, 1, 1, 0], scale: [0, 1.2, 1.2, 0] }}
                  transition={{ duration: 0.8 }}
                  className="absolute -top-20 left-1/2 -translate-x-1/2 text-4xl font-bold text-gray-700"
                >
                  *CLICK*
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 4: Taking photo */}
      <AnimatePresence>
        {scene === 4 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-br from-blue-200 via-green-100 to-yellow-100"
          >
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Camera viewfinder perspective of family */}
              <motion.div
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                className="relative w-full h-full flex items-center justify-center"
              >
                {/* Viewfinder frame */}
                <div className="absolute inset-8 border-4 border-gray-700 pointer-events-none z-10" />

                {/* Family from viewfinder */}
                <div className="flex gap-6 items-end">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-amber-100 rounded-full mb-2" />
                    <div className="w-20 h-32 bg-white rounded-lg" />
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-24 bg-purple-300 rounded-t-full mb-2 relative">
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-10 h-10 bg-amber-100 rounded-full" />
                    </div>
                    <div className="w-20 h-28 bg-purple-400 rounded-lg" />
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-amber-100 rounded-full mb-2" />
                    <div className="w-14 h-20 bg-red-400 rounded-lg" />
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 5: Processed Photo */}
      <AnimatePresence>
        {scene === 5 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center"
          >
            {/* Polaroid-style photo */}
            <motion.div
              initial={{ scale: 0.3, rotateY: 90 }}
              animate={{ scale: 1, rotateY: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="bg-white p-4 pb-16 shadow-2xl relative film-grain"
              style={{ width: "400px" }}
            >
              <div className="vintage-photo bg-gradient-to-br from-blue-200 via-green-100 to-yellow-100 w-full aspect-square relative overflow-hidden">
                {/* Photo content - family */}
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <div className="flex gap-4 items-end">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-amber-100 rounded-full mb-1 border-2 border-amber-200" />
                      <div className="w-14 h-24 bg-white rounded-lg shadow-sm" />
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-18 bg-purple-300 rounded-t-full mb-1 border-2 border-purple-400 relative">
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-8 h-8 bg-amber-100 rounded-full" />
                      </div>
                      <div className="w-14 h-20 bg-purple-400 rounded-lg shadow-sm" />
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 bg-amber-100 rounded-full mb-1 border-2 border-amber-200" />
                      <div className="w-12 h-16 bg-red-400 rounded-lg shadow-sm" />
                    </div>
                  </div>
                </div>

                {/* Vintage effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/20 via-transparent to-orange-200/30 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/10 pointer-events-none" />
              </div>

              {/* Date stamp */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-4 right-6 text-orange-600 font-mono text-sm"
              >
                '24 ☀️
              </motion.div>
            </motion.div>

            {/* Emotional text */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="absolute bottom-16 text-center text-white"
            >
              <p className="text-3xl font-light italic">Memories worth keeping</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 6: Call to Action */}
      <AnimatePresence>
        {scene === 6 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-br from-fujifilm-green to-green-700 flex flex-col items-center justify-center p-8"
          >
            {/* Camera illustration */}
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <div className="w-64 h-48 bg-gradient-to-br from-green-300 to-green-500 rounded-2xl shadow-2xl relative">
                <div className="absolute top-1/2 left-12 -translate-y-1/2 w-20 h-20 bg-gray-800 rounded-full">
                  <div className="absolute inset-2 bg-blue-900 rounded-full">
                    <div className="absolute inset-2 bg-gray-700 rounded-full" />
                  </div>
                </div>
                <div className="absolute top-6 right-12 w-10 h-10 bg-yellow-200 rounded-sm" />
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xl font-bold text-white">
                  QuickSnap
                </div>
                <div className="absolute top-4 right-32 w-8 h-6 bg-gray-700 rounded-sm" />
                <div className="absolute top-4 left-40 w-10 h-10 bg-gray-300 rounded-full" />
              </div>
            </motion.div>

            {/* Text content */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center text-white space-y-4 max-w-3xl"
            >
              <h2 className="text-5xl md:text-6xl font-bold mb-6">
                Fujifilm QuickSnap
              </h2>
              <p className="text-2xl md:text-3xl font-light mb-8">
                Capture Real Moments on Film
              </p>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 space-y-4">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-xl md:text-2xl font-semibold"
                >
                  Available in Kuwait from:
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 }}
                  className="space-y-3"
                >
                  <div className="bg-white text-fujifilm-green px-8 py-4 rounded-xl text-2xl md:text-3xl font-bold shadow-lg">
                    Boushahri Group
                  </div>
                  <p className="text-lg text-white/90">(Official Distributor)</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 }}
                  className="pt-2"
                >
                  <div className="bg-white text-fujifilm-red px-8 py-4 rounded-xl text-2xl md:text-3xl font-bold shadow-lg">
                    X-cite
                  </div>
                </motion.div>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="text-xl md:text-2xl font-light pt-6 italic"
              >
                Relive the magic of film photography
              </motion.p>
            </motion.div>

            {/* Fujifilm logo */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
              className="absolute bottom-8 text-4xl font-bold text-white"
            >
              FUJIFILM
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
