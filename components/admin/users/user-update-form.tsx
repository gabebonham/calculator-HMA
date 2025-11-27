"use client";

import { startTransition, useActionState } from "react";
import { updateUserAction, UpdateUserState } from "@/actions/admin/users-actions";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { SelectUser } from "@/db/schema/users";

export function UserUpdateForm({ 
  userObj,
}: { 
  userObj: SelectUser;
}) {
  const initialState: UpdateUserState = {};
  const [state, dispatch] = useActionState(updateUserAction, initialState);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    startTransition(() => dispatch(formData));
  }

  return (
      <Form onSubmit={handleSubmit}>
      <input type="hidden" name="id" value={ userObj.id } />
      <FormControl>
        <Label htmlFor="name">Name</Label>
        <Input name="name" id="name" defaultValue={ userObj.name ?? "" } />
        {state.errors?.name?.map((error) => (
          <FormMessage key={error} variant="error">{error}</FormMessage>
        ))}
      </FormControl>
      <FormControl>
        <Label htmlFor="email">Email</Label>
        <Input name="email" id="email" defaultValue={ userObj.email ?? "" } />
        {state.errors?.email?.map((error) => (
          <FormMessage key={error} variant="error">{error}</FormMessage>
        ))}
      </FormControl>
      <FormControl>
        <Label htmlFor="image">Image</Label>
        <Input name="image" id="image" defaultValue={ userObj.image ?? "" } />
        {state.errors?.image?.map((error) => (
          <FormMessage key={error} variant="error">{error}</FormMessage>
        ))}
      </FormControl>
      <FormControl>
        <Label htmlFor="role">Role</Label>
        <Input name="role" id="role" defaultValue={ userObj.role ?? "" } />
        {state.errors?.role?.map((error) => (
          <FormMessage key={error} variant="error">{error}</FormMessage>
        ))}
      </FormControl>
      <FormControl>
        <Label htmlFor="password">Password</Label>
        <Input name="password" id="password" defaultValue={ userObj.password ?? "" } />
        {state.errors?.password?.map((error) => (
          <FormMessage key={error} variant="error">{error}</FormMessage>
        ))}
      </FormControl>
      <FormControl>
        <Label htmlFor="createdAt">Created At</Label>
        <Input name="createdAt" id="createdAt" defaultValue={ userObj.createdAt?.toLocaleString() ?? "" } />
        {state.errors?.createdAt?.map((error) => (
          <FormMessage key={error} variant="error">{error}</FormMessage>
        ))}
      </FormControl>
      <FormControl>
        <Label htmlFor="updatedAt">Updated At</Label>
        <Input name="updatedAt" id="updatedAt" defaultValue={ userObj.updatedAt?.toLocaleString() ?? "" } />
        {state.errors?.updatedAt?.map((error) => (
          <FormMessage key={error} variant="error">{error}</FormMessage>
        ))}
      </FormControl>
        <FormControl>
          <Button type="submit">Submit</Button>
        </FormControl>
        {state.message && <FormMessage variant={state.status}>{state.message}</FormMessage>}
      </Form>
  );
}
