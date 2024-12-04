"use client";

import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from "./components/table";
import Link from "next/link";
import Image from "next/image";
import hero_concert from "../assets/hero_concert.jpg"
import { useEffect, useState } from "react";
import { Album } from "lucide-react";

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
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [newSong, setNewSong] = useState<Song>({
    id: "",
    Title: "",
    Artist: "",
    Album: "",
    Genre: "",
  });

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch("https://56s163a2v2.execute-api.us-west-2.amazonaws.com/items");
        const data = await response.json();
        setSongs(data);
      } catch (error) {
        console.error("Error fetching songs:", error);
      }

    };

    fetchSongs();
  }, []);

  const handleAddSong = async () => {
    try {
      const response = await fetch("https://56s163a2v2.execute-api.us-west-2.amazonaws.com/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Title: newSong.Title,
          Artist: newSong.Artist,
          Album: newSong.Album,
          Genre: newSong.Genre,
        }),
      });

      if (response.ok) {
        const addedSong = await response.json();
        setSongs([...songs, addedSong]);
        setNewSong({ id: "", Title: "", Artist: "", Album: "", Genre: "" });
        setIsPopupOpen(false);
      } else {
        console.error("Failed to add song");
      }
    } catch (error) {
      console.error("Error adding song:", error);
    }
  };

  const filteredSongs = songs.filter((song) =>
    (song.Title && song.Title.toLowerCase().includes(filter.toLowerCase())) ||
    (song.Artist && song.Artist.toLowerCase().includes(filter.toLowerCase())) ||
    (song.Album && song.Album.toLowerCase().includes(filter.toLowerCase())) ||
    (song.Genre && song.Genre.toLowerCase().includes(filter.toLowerCase()))
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
            className="p-2 rounded bg-gray-500/40 focus:outline-none border border-black focus:border-orange-500"
          />
          <button
            onClick={() => setIsPopupOpen(true)}
            className="px-4 py-2 bg-white text-black rounded hover:bg-orange-500"
          >
            Add New Song
          </button>
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
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="text-lg">
              {filteredSongs.length > 0 ? (
                filteredSongs.map((song) => (
                  <TableRow key={song.id}>
                    <TableCell>{song.Title}</TableCell>
                    <TableCell>{song.Artist}</TableCell>
                    <TableCell>{song.Album}</TableCell>
                    <TableCell>{song.Genre}</TableCell>
                    <TableCell>
                      <button
                        className="text-red-500"
                      >
                        Remove
                      </button>
                    </TableCell>
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

      {/* Add song popup form */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white text-black p-6 rounded shadow-lg space-y-4">
            <h3 className="text-lg font-bold">Add a New Song</h3>
            <input
              type="text"
              placeholder="Title"
              value={newSong.Title}
              onChange={(e) => setNewSong({ ...newSong, Title: e.target.value })}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Artist"
              value={newSong.Artist}
              onChange={(e) => setNewSong({ ...newSong, Artist: e.target.value })}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Album"
              value={newSong.Album}
              onChange={(e) => setNewSong({ ...newSong, Album: e.target.value })}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Genre"
              value={newSong.Genre}
              onChange={(e) => setNewSong({ ...newSong, Genre: e.target.value })}
              className="w-full p-2 border rounded"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsPopupOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAddSong}
                className="px-4 py-2 bg-orange-500 text-white rounded"
              >
                Add Song
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
