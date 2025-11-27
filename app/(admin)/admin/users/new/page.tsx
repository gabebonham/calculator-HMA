import Link from "next/link";
import { UserCreateForm } from "@/components/admin/users/user-create-form";

export default async function Page() {

  return (
    <div className="flex flex-col gap-3 p-3">
      <div className="[&>a]:underline">
        <Link href={`/admin/users`}>Back</Link>
      </div>
      <div>New User</div>
      <div>
        <UserCreateForm 
        />
      </div>
    </div>
  );
}
