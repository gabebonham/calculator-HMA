import Link from "next/link";
import { eq } from "drizzle-orm";
import { UserDeleteForm } from "@/components/admin/users/user-delete-form";
import { db } from "@/db/db";
import { users } from "@/db/schema/users";

type Params = Promise<{ id: string }>;

export default async function Page(props: { params: Params }) {
  const params = await props.params;
  const { id } = params;
  const userObj = await db.query.users.findFirst({ where: eq(users.id, id) });

  return (
    <div className="flex flex-col gap-3 p-3">
      <div className="[&>a]:underline">
        <Link href={`/admin/users`}>Back</Link>
      </div>
      <div>Delete User</div>
      <div>
        <UserDeleteForm userObj={ userObj } />
      </div>
    </div>
  );
}
