"use client";

import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from "./components/table";
import Image from "next/image";
import hero_concert from "../assets/hero_concert.jpg";
import { useEffect, useState } from "react";

type Song = {
  id: string;
  Title: string;
  Artist: string;
  Album: string;
  Genre: string;
};

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

  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [songToEdit, setSongToEdit] = useState<Song | null>(null);

  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [songToDelete, setSongToDelete] = useState<string | null>(null);

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

        setNewSong({ id: "", Title: "", Artist: "", Album: "", Genre: "" });
        setIsPopupOpen(false);
      } else {
        console.error("Failed to add song");
      }
    } catch (error) {
      console.error("Error adding song:", error);
    }
  };

  const handleDeleteSong = async () => {
    if (!songToDelete) return;

    try {
      const response = await fetch(`https://56s163a2v2.execute-api.us-west-2.amazonaws.com/items/${songToDelete}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete song");
      }

      setSongs((prevSongs) => prevSongs.filter((song) => song.id !== songToDelete));
      setIsDeletePopupOpen(false);
      setSongToDelete(null);
    } catch (error) {
      console.error("Error deleting song:", error);
    }
  };

  const handleOpenDeletePopup = (songId: string) => {
    setSongToDelete(songId);
    setIsDeletePopupOpen(true);
  };

  const handleCancelDelete = () => {
    setIsDeletePopupOpen(false);
    setSongToDelete(null);
  };

  const handleOpenEditPopup = (song: Song) => {
    setSongToEdit(song);
    setIsEditPopupOpen(true);
  };

  const handleEditSong = async () => {
    if (!songToEdit) return;

    try {
      const response = await fetch(`https://56s163a2v2.execute-api.us-west-2.amazonaws.com/items/${songToEdit.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(songToEdit),
      });

      if (response.ok) {
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

        setIsEditPopupOpen(false);
      } else {
        console.error("Failed to update song");
      }
    } catch (error) {
      console.error("Error editing song:", error);
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
      <section className="relative w-full h-[30vh] md:h-[40vh]">
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
          <h3 className="text-4xl font-bold font-lacquer text-white md:text-5xl">View and Manage your Library</h3>
        </div>
      </section>

      {/* Library section */}
      <section className="space-y-4 p-8">
        {/* Filters or actions */}
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 font-space-grotesk">
          <input
            type="text"
            placeholder="Search your library..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 rounded bg-gray-500/40 focus:outline-none border border-black focus:border-orange-500 w-full sm:w-auto"
          />
          <button
            onClick={() => setIsPopupOpen(true)}
            className="px-4 py-2 bg-white text-black rounded hover:bg-orange-500 w-full sm:w-auto"
          >
            Add New Song
          </button>
        </div>

        {/* Table for library */}
        <div className="overflow-x-auto font-space-grotesk text-white">
          <Table className="min-w-full table-auto sm:table-fixed">
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
                    <TableCell className="truncate">{song.Title}</TableCell>
                    <TableCell className="truncate">{song.Artist}</TableCell>
                    <TableCell className="truncate">{song.Album}</TableCell>
                    <TableCell className="truncate">{song.Genre}</TableCell>
                    <TableCell className="flex justify-between">
                    <button
                        onClick={() => handleOpenEditPopup(song)}
                        className="text-blue-500 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleOpenDeletePopup(song.id)}
                        className="text-red-500 hover:underline"
                      >
                        Remove
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-xl">
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
          <div className="bg-white text-black p-6 rounded shadow-lg space-y-4 w-full max-w-md">
            <h3 className="text-lg font-bold text-center">Add a New Song</h3>
            <input
              type="text"
              placeholder="Title"
              value={newSong.Title}
              onChange={(e) => setNewSong({ ...newSong, Title: e.target.value })}
              className="w-full p-2 border border-black rounded shadow-md"
            />
            <input
              type="text"
              placeholder="Artist"
              value={newSong.Artist}
              onChange={(e) => setNewSong({ ...newSong, Artist: e.target.value })}
              className="w-full p-2 border border-black rounded shadow-md"
            />
            <input
              type="text"
              placeholder="Album"
              value={newSong.Album}
              onChange={(e) => setNewSong({ ...newSong, Album: e.target.value })}
              className="w-full p-2 border border-black rounded shadow-md"
            />
            <input
              type="text"
              placeholder="Genre"
              value={newSong.Genre}
              onChange={(e) => setNewSong({ ...newSong, Genre: e.target.value })}
              className="w-full p-2 border border-black rounded shadow-md"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsPopupOpen(false)}
                className="px-4 py-2 bg-black text-white text-bold rounded hover:bg-red-500"
              >
                Cancel
              </button>
              <button
                onClick={handleAddSong}
                className="px-4 py-2 bg-green-500 text-white text-bold rounded hover:bg-green-600"
              >
                Add Song
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit song popup form */}
      {isEditPopupOpen && songToEdit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white text-black p-6 rounded shadow-lg space-y-4 w-full max-w-md">
            <h3 className="text-lg font-bold text-center">Edit Song</h3>
            <input
              type="text"
              placeholder="Title"
              value={songToEdit.Title}
              onChange={(e) => setSongToEdit({ ...songToEdit, Title: e.target.value })}
              className="w-full p-2 border border-black rounded shadow-md"
            />
            <input
              type="text"
              placeholder="Artist"
              value={songToEdit.Artist}
              onChange={(e) => setSongToEdit({ ...songToEdit, Artist: e.target.value })}
              className="w-full p-2 border border-black rounded shadow-md"
            />
            <input
              type="text"
              placeholder="Album"
              value={songToEdit.Album}
              onChange={(e) => setSongToEdit({ ...songToEdit, Album: e.target.value })}
              className="w-full p-2 border border-black rounded shadow-md"
            />
            <input
              type="text"
              placeholder="Genre"
              value={songToEdit.Genre}
              onChange={(e) => setSongToEdit({ ...songToEdit, Genre: e.target.value })}
              className="w-full p-2 border border-black rounded shadow-md"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsEditPopupOpen(false)}
                className="px-4 py-2 bg-black text-white rounded hover:bg-black/80"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSong}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirmation popup */}
      {isDeletePopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white text-black p-6 rounded shadow-lg space-y-4 w-full max-w-md">
            <h3 className="text-lg font-bold text-center">Are you sure you want to delete this song?</h3>
            <h3 className="text-lg font-bold text-center">This action cannot be undone.</h3>
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleCancelDelete}
                className="px-4 py-2 bg-black text-white rounded hover:bg-black/80"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteSong}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
