import Link from "next/link";
import { notFound } from "next/navigation";
import { getUserById } from "@/db/queries/users-queries";

type Params = Promise<{ id: string }>;

export default async function Page(props: { params: Params }) {
  const params = await props.params;
  const { id } = params;

  const userObj = await getUserById(id);

  if (!userObj) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-3 p-3">
      <div className="flex gap-3 [&>a]:underline">
        <Link href={`/admin/users`}>Back</Link>
        <Link href={`/admin/users/${ userObj.id }/edit`}>Edit</Link>
        <Link href={`/admin/users/${ userObj.id }/delete`}>Delete</Link>
      </div>
      <div>User</div>
      <div>
        <p><strong>Id:</strong> { userObj.id }</p>
        <p><strong>Name:</strong> { userObj.name }</p>
        <p><strong>Email:</strong> { userObj.email }</p>
        <p><strong>Image:</strong> { userObj.image }</p>
        <p><strong>Role:</strong> { userObj.role }</p>
        <p><strong>Password:</strong> { userObj.password }</p>
        <p><strong>Created At:</strong> { userObj.createdAt?.toLocaleString() }</p>
        <p><strong>Updated At:</strong> { userObj.updatedAt?.toLocaleString() }</p>
      </div>
    </div>
  );
}
