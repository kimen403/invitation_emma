"use client";
import { useState, use, useEffect } from "react";
import Modal from "@/app/components/Modal";
import CountdownTimer from "@/app/components/CountdownTimer";
import MusicPlayer from "@/app/components/MusicPlayer";
import { motion, useScroll } from "framer-motion";
import { useTheme } from "next-themes";

export default function Home({ params }) {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const { theme } = useTheme();
  const resolvedParams = use(params);
  const [formData, setFormData] = useState({
    nama: "",
    pesan: "",
    attendance: "", // Add new field
  });

  const { guest } = resolvedParams;

  useEffect(() => {
    if (guest) {
      setFormData((prev) => ({
        ...prev,
        nama: guest,
      }));
    }
  }, [guest]);
  const handleModalOpen = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Terima kasih atas konfirmasi kehadiran Anda!");
    setFormData({ nama: "", pesan: "", attendance: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Data galeri
  const images = [
    { id: 1, src: "/images/gallery1.jpg", alt: "Gallery Image 1" },
    { id: 2, src: "/images/gallery2.jpg", alt: "Gallery Image 2" },
    { id: 3, src: "/images/gallery3.jpg", alt: "Gallery Image 3" },
  ];

  const { scrollY } = useScroll();
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    return scrollY.onChange((latest) => {
      const newOpacity = Math.max(1 - latest / 200, 0); // Fade out within 200px scroll
      setOpacity(newOpacity);
    });
  }, [scrollY]);

  const bgGradient =
    theme === "dark"
      ? "bg-gradient-to-b from-purple-900 via-gray-900 to-black"
      : "bg-gradient-radial from-pink-400 via-orange-300 to-orange-400";

  return (
    <main
      className={`min-h-screen ${bgGradient} transition-colors duration-500 relative`}
    >
      {/* Desktop Background */}
      <div
        className="hidden md:block"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: "url('/pichture/bg-vampirina.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.2,
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      {/* Mobile Background */}
      <div
        className="block md:hidden"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: "url('/pichture/bg-mobile.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.2,
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      {/* Decorative Images */}
      <motion.div
        style={{
          position: "absolute",
          top: "0px",
          right: "0px",
          width: "250px",
          height: "250px",
          backgroundImage: "url('/pichture/labakanan.png')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          zIndex: 5,
          opacity,
        }}
      />
      <motion.div
        style={{
          position: "absolute",
          top: "0px",
          left: "0px",
          width: "250px",
          height: "250px",
          backgroundImage: "url('/pichture/labakiri.png')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          zIndex: 5,
          opacity,
        }}
      />
      <Modal onOpen={handleModalOpen} guest={guest} />
      <MusicPlayer />

      {!isModalOpen && (
        <div className="container mx-auto px-4 py-12">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              className="mb-8 relative z-20"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", bounce: 0.5 }}
            >
              <h1 className="font-spooky text-5xl text-red-600 md:text-7xl mb-4 relative z-50">
                Spook-Tacular Party!
              </h1>
              <p className="font-spooky text-3xl text-yellow-200 md:text-4xl mb-2">
                Emma-Kanaya
              </p>
              <p className="font-body text-xl md:text-2xl text-gray-200 dark:text-gray-400 mb-8">
                🎂 5th Birthday Party 🎂
              </p>
            </motion.div>

            <div className="max-w-3xl mx-auto bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-xl p-8 mb-12 web-corner relative">
              {/* Background Images */}
              <div
                className="hidden md:block"
                style={{
                  position: "absolute",
                  top: "60%",
                  left: "0px",
                  width: "150px",
                  height: "150px",
                  transform: "translateY(-50%)",
                  backgroundImage: "url('/pichture/pohon.png')",
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  zIndex: 0,
                }}
              />
              <div
                className="hidden md:block"
                style={{
                  position: "absolute",
                  top: "60%",
                  right: "0px",
                  width: "150px",
                  height: "150px",
                  transform: "translateY(-50%)",
                  backgroundImage: "url('/pichture/pohon.png')",
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  zIndex: 0,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: 30,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundImage: "url('/pichture/rumah.png')",
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  opacity: 0.5,
                  zIndex: 0,
                }}
              />
              <h2 className="font-body text-2xl text-yellow-200 mb-6 relative z-10">
                Event Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                <div className="text-center spooky-hover">
                  <h3 className="font-spooky text-lg text-pink-500 dark:text-purple-400 mb-2">
                    📅 Wenn?
                  </h3>
                  <p className="fancy-text text-gray-600 dark:text-gray-300">
                    Freitag, 21. März 2025
                  </p>
                  <p className="fancy-text text-gray-600 dark:text-gray-300">
                    16:00 Uhr
                  </p>
                </div>
                <div className="text-center spooky-hover">
                  <h3 className="font-spooky text-lg text-pink-500 dark:text-purple-400 mb-2">
                    📍 Wo?
                  </h3>
                  <p className="fancy-text text-gray-600 dark:text-gray-300">
                    Zurlaubener Ufer 63
                  </p>
                  <p className="fancy-text text-gray-600 dark:text-gray-300">
                    54292 Trier, Germany
                  </p>
                </div>
              </div>
            </div>

            <CountdownTimer />
          </motion.div>

          {/* RSVP Section */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto mb-16"
            id="rsvp"
          >
            <h2 className="font-spooky text-4xl text-yellow-200 mb-8 text-center">
              🎈 Join The Party! 🎈
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-xl p-6 web-corner relative">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block magical-subtitle text-l  text-gray-700 dark:text-gray-300 mb-2">
                      Nach der Party gibt es eine Pyjama-Party für alle, die
                      übernachten möchten! Bitte gib bei der Anmeldung an, ob du
                      nur zur Hauptparty oder auch zur Pyjama-Party bleibst.
                    </label>
                    <label
                      htmlFor="nama"
                      className="block magical-subtitle text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Dein Name
                    </label>
                    <input
                      type="text"
                      id="nama"
                      name="nama"
                      value={formData.nama}
                      onChange={handleChange}
                      required
                      className="fancy-text w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 dark:focus:ring-purple-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block magical-subtitle text-gray-700 dark:text-gray-300 mb-2">
                      Werden Sie teilnehmen:
                    </label>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="mainParty"
                          name="attendance"
                          value="mainParty"
                          checked={formData.attendance === "mainParty"}
                          onChange={handleChange}
                          className="mr-2"
                        />
                        <label
                          htmlFor="mainParty"
                          className="fancy-text text-gray-700 dark:text-gray-300"
                        >
                          Nur Hauptparty
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="bothParties"
                          name="attendance"
                          value="bothParties"
                          checked={formData.attendance === "bothParties"}
                          onChange={handleChange}
                          className="mr-2"
                        />
                        <label
                          htmlFor="bothParties"
                          className="fancy-text text-gray-700 dark:text-gray-300"
                        >
                          Hauptparty + Pyjama-Party
                        </label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="pesan"
                      className="block magical-subtitle text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Spook Message
                    </label>
                    <textarea
                      id="pesan"
                      name="pesan"
                      value={formData.pesan}
                      onChange={handleChange}
                      rows="4"
                      className="fancy-text w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 dark:focus:ring-purple-400"
                    ></textarea>
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full font-spooky bg-pink-500 dark:bg-purple-500 hover:bg-pink-600 dark:hover:bg-purple-600 text-white text-xl py-3 px-6 rounded-lg transition-colors duration-300 shadow-lg spooky-hover"
                  >
                    Send RSVP
                  </motion.button>
                </form>
              </div>

              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-xl p-6 web-corner relative">
                <h3 className="magical-subtitle text-2xl text-gray-800 dark:text-white mb-4">
                  Party Location 🗺️
                </h3>
                <div className="w-full h-[400px] rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1818.7774345144442!2d6.6344285232274505!3d49.7655671615131!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47957c950d92f7eb%3A0x9928c1875791c1ee!2sZurlaubener%20Ufer%2063%2C%2054292%20Trier!5e1!3m2!1sen!2sde!4v1741210375554!5m2!1sen!2sde"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-lg"
                  />
                </div>
                <div className="mt-4 fancy-text text-gray-600 dark:text-gray-300">
                  <p>Zurlaubener Ufer 63</p>
                  <p>54292 Trier, Germany</p>
                  <a
                    href="https://maps.google.com/?q=Zurlaubener+Ufer+63,+54292+Trier,+Germany"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-pink-500 dark:text-purple-400 hover:text-pink-600 dark:hover:text-purple-300"
                  >
                    Open in Google Maps 🗺️
                  </a>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Gallery Section */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto"
            id="gallery"
          >
            <h2 className="font-spooky text-3xl text-yellow-200 text-center mb-8">
              📸 Spooky Gallery 📸
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {images.map((image) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                  className="relative aspect-square overflow-hidden rounded-lg shadow-lg spooky-hover web-corner"
                >
                  {/* Placeholder untuk gambar */}
                  <div className="absolute inset-0 bg-pink-200 dark:bg-purple-900 flex items-center justify-center">
                    <span className="fancy-text text-gray-600 dark:text-gray-300">
                      Photo {image.id} 📸
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-8">
              <p className="magical-subtitle text-gray-600 dark:text-gray-300">
                Gallery will be updated with spook party photos! 👻
              </p>
            </div>
          </motion.section>
        </div>
      )}
    </main>
  );
}
