import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHeader, TableHead, TableRow } from "./components/table";

export default function Home() {
  return (
    <Table className="w-full sm:w-3/4 lg:w-3/4 xl:w-3/4 mx-auto relative border-2 border-black">
      <TableHeader>
        <TableRow>
          <TableHead className="">Song Title</TableHead>
          <TableHead>Artist</TableHead>
          <TableHead>Album</TableHead>
          <TableHead className="">Length</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Run to the hills</TableCell>
          <TableCell>Iron Maiden</TableCell>
          <TableCell>Best album</TableCell>
          <TableCell>4:32</TableCell>
        </TableRow>
      </TableBody>
    </Table>

  )
}
