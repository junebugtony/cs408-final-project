"use client";

import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from "./components/table";
import Link from "next/link";
import Image from "next/image";
import hero_concert from "../assets/hero_concert.jpg"
import { useEffect, useState } from "react";

type Song = {
  id: string;
  Title: string;
  Artist: string;
  Album: string;
  Genre: string;
}

export default function Home() {

  const [songs, setSongs] = useState<Song[]>([]);
  const [filter, setFilter] = useState<string>("");

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch('https://56s163a2v2.execute-api.us-west-2.amazonaws.com/items');
        const data = await response.json();
        setSongs(data);
      } catch (error) {
        console.error("Error fetching songs:", error);
      }

    };

    fetchSongs();
  }, []);

  const filteredSongs = songs.filter((song) =>
    song.Title.toLowerCase().includes(filter.toLowerCase()) ||
    song.Artist.toLowerCase().includes(filter.toLowerCase()) ||
    song.Album.toLowerCase().includes(filter.toLowerCase()) ||
    song.Genre.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <main className="bg-black text-white min-h-screen">
      {/* Hero section */}
      <section className="relative w-full h-[30vh]">
        <div className="absolute inset-0">
          <Image
            src={hero_concert}
            alt="Concert Image"
            fill
            style={{
              objectFit: "cover",
              opacity: 0.6,
            }}
            className="absolute top-0 left-0 w-full h-full"
          />

        </div>
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="absolute inset-0 flex justify-center items-center text-center">
          <h3 className="text-4xl font-bold font-lacquer">View and Manage your Library</h3>
        </div>
      </section>

      {/* Library section */}
      <section className="space-y-4 p-8">
        {/* Filters or actions */}
        <div className="flex justify-between items-center font-space-grotesk">
          <input
            type="text"
            placeholder="Search your library..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 rounded bg-white text-black border-2 focus:outline-none focus:border-orange-500"
          />
          <Link href="/addSongs">
            <button className="px-4 py-2 bg-white text-black rounded hover:bg-orange-500">
              Add New Song
            </button>
          </Link>
        </div>

        {/* Table for library */}
        <div className="overflow-x-auto font-space-grotesk text-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Artist</TableHead>
                <TableHead>Album</TableHead>
                <TableHead>Genre</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSongs.length > 0 ? (
                filteredSongs.map((song) => (
                  <TableRow key={song.id}>
                    <TableCell>{song.Title}</TableCell>
                    <TableCell>{song.Artist}</TableCell>
                    <TableCell>{song.Album}</TableCell>
                    <TableCell>{song.Genre}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-xl">
                    No songs found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </section>
    </main>
  );
}
