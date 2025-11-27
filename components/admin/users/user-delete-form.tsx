"use client";

import { notFound } from "next/navigation";
import { deleteUserAction, DeleteUserState } from "@/actions/admin/users-actions";
import { Button } from "@/components/ui/button";
import { startTransition, useActionState } from "react";
import { SelectUser } from "@/db/schema/users";
import { Form, FormControl, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";

export function UserDeleteForm({ userObj }: { userObj?: SelectUser }) {
  const initialState: DeleteUserState = {};
  const [state, dispatch] = useActionState(deleteUserAction, initialState);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    startTransition(() => dispatch(formData));
  }

  if (!userObj && state.message) {
    return <FormMessage variant={state.status}>{state.message}</FormMessage>
  }

  if (!userObj) {
    notFound();
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormControl>
        <Label htmlFor="id"><strong>Id:</strong> { userObj.id }</Label>
        <input type="hidden" name="id" id="id" value={ userObj.id } />
      </FormControl>
      <FormControl>
        <Button variant="destructive" type="submit">
          Delete
        </Button>
      </FormControl>
      {state.message && <FormMessage variant={state.status}>{state.message}</FormMessage>}
    </Form>
  );
}
