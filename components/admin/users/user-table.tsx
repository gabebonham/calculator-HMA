import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserList } from "@/db/queries/users-queries";

export function UserTable({ userList }: { userList: UserList }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Id</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Image</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Password</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Updated At</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        { userList.map((userObj) => (
          <TableRow key={ userObj.id }>
            <TableCell>{ userObj.id }</TableCell>
            <TableCell>{ userObj.name }</TableCell>
            <TableCell>{ userObj.email }</TableCell>
            <TableCell>{ userObj.image }</TableCell>
            <TableCell>{ userObj.role }</TableCell>
            <TableCell>{ userObj.password }</TableCell>
            <TableCell>{ userObj.createdAt?.toLocaleString() }</TableCell>
            <TableCell>{ userObj.updatedAt?.toLocaleString() }</TableCell>
            <TableCell className="flex justify-end gap-3 [&>a]:underline">
              <Link href={`/admin/users/${ userObj.id }`}>
                View
              </Link>
              <Link href={`/admin/users/${ userObj.id }/edit`}>
                Edit
              </Link>
              <Link href={`/admin/users/${ userObj.id }/delete`}>
                Delete
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
