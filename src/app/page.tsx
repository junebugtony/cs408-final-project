import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from "./components/table";
import Link from "next/link";
import Image from "next/image";
import hero_concert from "../assets/hero_concert.jpg"

export default function Home() {
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
            className="p-2 rounded bg-white text-black border-2 focus:outline-none focus:border-orange-500"
          />
          <Link href="/addSongs">
            <button className="px-4 py-2 bg-white text-black rounded hover:bg-orange-500">
              Add New Song
            </button>
          </Link>
        </div>

        {/* Table for library */}
        <div className="overflow-x-auto font-space-grotesk">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Artist</TableHead>
                <TableHead>Album</TableHead>
                <TableHead>Duration</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Example Song 1</TableCell>
                <TableCell>Example Artist 1</TableCell>
                <TableCell>Example Album 1</TableCell>
                <TableCell>3:45</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Example Song 2</TableCell>
                <TableCell>Example Artist 2</TableCell>
                <TableCell>Example Album 2</TableCell>
                <TableCell>4:20</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>
    </main>
  );
}
