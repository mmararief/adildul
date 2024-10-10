"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";
import Image from "next/image";
import { Gift } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";

export default function Home() {
  const [showMessage, setShowMessage] = useState(false);
  const [showGifts, setShowGifts] = useState(false);
  const [gift1Revealed, setGift1Revealed] = useState(false);
  const [gift2Revealed, setGift2Revealed] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [currentGift, setCurrentGift] = useState<number | null>(null);
  const [password, setPassword] = useState("");
  const [bgColor, setBgColor] = useState(
    "from-pink-300 via-purple-300 to-indigo-400"
  );
  const [showBackground, setShowBackground] = useState(false);
  const successAudioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (showMessage) {
      const duration = 15 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const randomInRange = (min: number, max: number) =>
        Math.random() * (max - min) + min;

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti(
          Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          })
        );
        confetti(
          Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          })
        );
      }, 250);

      // Play the audio when showMessage becomes true
      if (audioRef.current) {
        audioRef.current
          .play()
          .catch((error) => console.error("Audio playback failed:", error));
      }
    }
  }, [showMessage]);

  useEffect(() => {
    const colors = [
      "from-pink-300 via-purple-300 to-indigo-400",
      "from-yellow-300 via-red-300 to-pink-400",
      "from-green-300 via-blue-300 to-purple-400",
    ];
    let colorIndex = 0;
    const interval = setInterval(() => {
      colorIndex = (colorIndex + 1) % colors.length;
      setBgColor(colors[colorIndex]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const openPasswordModal = (giftNumber: number) => {
    setCurrentGift(giftNumber);
    setIsPasswordModalOpen(true);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentGift === 1 && password === "dompet") {
      setGift1Revealed(true);
      setIsPasswordModalOpen(false);
      playSuccessSound();
    } else if (currentGift === 2 && password === "sonny") {
      setGift2Revealed(true);
      setIsPasswordModalOpen(false);
      playSuccessSound();
    } else {
      alert("Incorrect password. Try again!");
    }
    setPassword("");
  };

  const playSuccessSound = () => {
    if (successAudioRef.current) {
      successAudioRef.current
        .play()
        .catch((error) => console.error("Audio playback failed:", error));
    }
  };

  const handleBalloonClick = () => {
    // Play a pop sound
    new Audio("/pop.mp3")
      .play()
      .catch((error) => console.error("Audio playback failed:", error));
  };

  const handleButtonClick = () => {
    setShowMessage(true);
    setShowBackground(true);
  };

  const birthdayMessage = `Selamat Ulang Tahun yang ke-19 Sayangku, semoga dengan
  bertambahnya usia, kamu semakin dekat dengan kebahagiaan,
  kesehatan, dan kesuksesan. gak berasa aku udah ketiga kalinya
  merayakan ulang tahun kamu. dari tahun ke tahun, kamu semakin
  cantik dan dewasa. semoga sehat selalu dan diberkahi rezeki. aku
  harap kamu bisa selalu bahagia dan jangan lupa untuk tetap
  meraih cita-citamu. terima kasih sudah menjadi pacar aku dan aku
  harap kita bisa selalu bersama sampai kapanpun.
  
  Maaf ya, aku ga bisa kasih kamu hadiah yang terbaik dan tidak
  semeriah sebelumnya, karena masih banyak yang harus aku
  selesaikan kerjaan aku. sebenarnya aku ke warkop hari ini buat
  selesain web ini hehehe. aku harap kamu tetap senang dengan
  hadiah ini.`;

  return (
    <div
      className={`min-h-screen ${
        showBackground ? "bg-cover bg-center" : `bg-gradient-to-r ${bgColor}`
      } transition-colors duration-1000 flex flex-col items-center justify-center p-4 overflow-hidden`}
      style={
        showBackground ? { backgroundImage: "url('/background.jpg')" } : {}
      }
    >
      <audio ref={audioRef} loop>
        <source src="/happy-birthday.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <audio ref={successAudioRef}>
        <source src="/success.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 1, type: "spring" }}
        className="text-center relative"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
          Selamat Ulang Tahun!
        </h1>
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-2xl md:text-3xl font-semibold text-white mb-8 drop-shadow-md"
        >
          Adila Ulya Ramadhani
        </motion.h2>
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0],
          }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute -top-16 -left-16 md:-top-24 md:-left-24 w-32 h-32"
          onClick={handleBalloonClick}
        >
          <Image src="/balloon1.png" alt="Balloon" width={128} height={128} />
        </motion.div>
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, -5, 5, 0],
          }}
          onClick={handleBalloonClick}
          transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
          className="absolute -top-12 -right-12 md:-top-20 md:-right-20 w-24 h-24"
        >
          <Image src="/balloon2.png" alt="Balloon" width={96} height={96} />
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {!showMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
          >
            <Button
              onClick={handleButtonClick}
              className="bg-white text-purple-600 hover:bg-purple-100 transition-colors duration-200 text-lg py-3 px-6 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Klik ini yakkk!
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showMessage && !showGifts && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="mt-8 p-6 bg-white rounded-lg shadow-lg max-w-md text-center relative overflow-hidden"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {birthdayMessage.split("").map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.p>
              <motion.p
                className="text-xl font-semibold text-purple-600"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                I love you, Adila! ❤️
              </motion.p>
              <p className="text-lg text-gray-800 mb-4">
                from your boyfriend, Ammar
              </p>
            </motion.div>
            <motion.div
              className="absolute -bottom-8 -right-8 w-32 h-32 opacity-20"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            >
              <Image src="/flower.png" alt="Flower" width={128} height={128} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showGifts && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="mt-8 p-6 bg-white rounded-lg shadow-lg max-w-md text-center"
          >
            <h3 className="text-2xl font-semibold text-purple-600 mb-4">
              <Gift className="w-10 h-10 mx-auto" />
              Pilih Hadiah
            </h3>
            <div className="flex justify-around gap-4">
              <div>
                <Button
                  onClick={() => openPasswordModal(1)}
                  className="bg-pink-500 text-white hover:bg-pink-600 transition-colors duration-200"
                  disabled={gift1Revealed}
                >
                  {gift1Revealed ? "Terbuka" : "Hadiah 1"}
                </Button>
                {gift1Revealed && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="mt-4"
                  >
                    <p className="text-lg font-semibold">Dompet</p>
                    <Image
                      src="/dompet.jpg"
                      alt="Dompet"
                      width={150}
                      height={150}
                      className="mt-2 rounded-lg"
                    />
                  </motion.div>
                )}
              </div>
              <div>
                <Button
                  onClick={() => openPasswordModal(2)}
                  className="bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200"
                  disabled={gift2Revealed}
                >
                  {gift2Revealed ? "Terbuka" : "Hadiah 2"}
                </Button>
                {gift2Revealed && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="mt-4"
                  >
                    <p className="text-lg font-semibold">Sonny Angel</p>
                    <Image
                      src="/sonny.jpg"
                      alt="Sonny"
                      width={150}
                      height={150}
                      className="mt-2 rounded-lg"
                    />
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showMessage && !showGifts && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="mt-8 p-6 rounded-lg shadow-lg max-w-md text-center relative overflow-hidden"
          >
            <Button
              onClick={() => setShowGifts(true)}
              className="  bg-purple-600 text-white hover:bg-purple-700 transition-colors duration-200 text-lg py-6 px-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 "
            >
              <Gift className="w-10 h-10 mr-2" />
              Lihat Hadiah!
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Password Modal */}
      <Dialog.Root
        open={isPasswordModalOpen}
        onOpenChange={setIsPasswordModalOpen}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
          <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-xl">
            <Dialog.Title className="text-xl font-semibold mb-4">
              Enter Password
            </Dialog.Title>
            <form onSubmit={handlePasswordSubmit}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mb-4"
                placeholder="Enter password"
              />
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  onClick={() => setIsPasswordModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-purple-600 text-white">
                  Submit
                </Button>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
