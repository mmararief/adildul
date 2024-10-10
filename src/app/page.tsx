"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";
import Image from "next/image";

export default function Home() {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (showMessage) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [showMessage]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 flex flex-col items-center justify-center p-4 overflow-hidden">
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
          className="absolute -top-16 -left-16 w-32 h-32"
        >
          <Image src="/balloon1.png" alt="Balloon" width={128} height={128} />
        </motion.div>
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, -5, 5, 0],
          }}
          transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
          className="absolute -top-12 -right-12 w-24 h-24"
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
              onClick={() => setShowMessage(true)}
              className="bg-white text-purple-600 hover:bg-purple-100 transition-colors duration-200 text-lg py-3 px-6 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
            >
              Klik untuk Kejutan!
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showMessage && (
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
              <p className="text-lg text-gray-800 mb-4">
                Selamat Ulang Tahun yang ke-19, Adila, semoga dengan
                bertambahnya usia, kamu semakin dekat dengan kebahagiaan,
                kesehatan, dan kesuksesan. gak berasa aku udah ketiga kalinya
                merayakan ulang tahun kamu. dari tahun ke tahun, kamu semakin
                cantik dan dewasa. semoga sehat selalu dan diberkahi rezeki. aku
                harap kamu bisa selalu bahagia dan jangan lupa untuk tetap
                meraih cita-citamu. terima kasih sudah menjadi pacar aku dan aku
                harap kita bisa selalu bersama sampai kapanpun.
              </p>
              <p className="text-lg text-gray-800 mb-4">
                Maaf ya, aku ga bisa kasih kamu hadiah yang terbaik dan tidak
                semeriah sebelumnya, karena masih banyak yang harus aku
                selesaikan kerjaan aku.tapi aku harap kamu tetap senang dengan
                hadiah ini.
              </p>
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
    </div>
  );
}
