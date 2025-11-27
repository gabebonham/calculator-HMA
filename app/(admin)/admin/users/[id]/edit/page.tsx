import Link from "next/link";
import { notFound } from "next/navigation";
import { UserUpdateForm } from "@/components/admin/users/user-update-form";
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
        <Link href={`/admin/users/${ userObj.id }`}>Show</Link>
      </div>
      <div>Editing User</div>
      <div>
        <UserUpdateForm 
          userObj={ userObj }
        />
      </div>
    </div>
  );
}
