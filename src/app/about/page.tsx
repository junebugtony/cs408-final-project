export default function About() {
  return (
    <main className="bg-gradient-to-b from-black via-purple-950 to-black min-h-screen flex items-center justify-center">
      <div className="text-center text-white space-y-6">
        <h1 className="text-5xl font-bold tracking-wide animate__animated animate__fadeInUp">
          About Us
        </h1>
        <p className="text-lg md:text-xl font-light opacity-80 animate__animated animate__fadeIn animate__delay-1s">
          The goal of this website is to provide a seamless experience to create, manage, and share a music library of your favorite songs, artists, and albums.
        </p>
        <p className="text-lg md:text-xl font-light opacity-80 animate__animated animate__fadeIn animate__delay-2s">
          Whether you're an artist or music enthusiast, this platform is designed to alow you with the power to share music.
        </p>
      </div>
    </main>
  );
}
