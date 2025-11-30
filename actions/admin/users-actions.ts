'use server'

import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { db } from '@/db/db'
import { users } from '@/db/schema/users'
import { requireAdmin } from '@/lib/auth'

const insertUserSchema = z.object({
  name: z.coerce.string(),
  email: z.coerce.string(),
  image: z.coerce.string(),
  role: z.coerce.string(),
  password: z.coerce.string(),
})

export type CreateUserState = {
  errors?: {
    name?: string[]
    email?: string[]
    image?: string[]
    role?: string[]
    password?: string[]
  }
  message?: string
  status?: 'success' | 'error'
}

export async function createUserAction(
  prevState: CreateUserState,
  formData: FormData,
): Promise<CreateUserState> {
  const session = await requireAdmin()

  const validatedFields = insertUserSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    image: formData.get('image'),
    role: formData.get('role'),
    password: formData.get('password'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid data',
      status: 'error',
    }
  }

  try {
    await db.insert(users).values(validatedFields.data)
  } catch (error) {
    console.error(error)
    return {
      message: 'Database error',
      status: 'error',
    }
  }

  revalidatePath('/users')

  return {
    message: 'User created successfully',
    status: 'success',
  }
}

const updateUserSchema = z
  .object({
    id: z.coerce.string(),
    name: z.coerce.string(),
    email: z.coerce.string(),
    image: z.coerce.string(),
    role: z.coerce.string(),
    password: z.coerce.string(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
  })
  .partial()
  .required({ id: true })

export type UpdateUserState = {
  errors?: {
    id?: string[]
    name?: string[]
    email?: string[]
    image?: string[]
    role?: string[]
    password?: string[]
    createdAt?: string[]
    updatedAt?: string[]
  }
  message?: string
  status?: 'success' | 'error'
}

export async function updateUserAction(
  prevState: UpdateUserState,
  formData: FormData,
): Promise<UpdateUserState> {
  const session = await requireAdmin()

  const validatedFields = updateUserSchema.safeParse({
    id: formData.get('id'),
    name: formData.get('name'),
    email: formData.get('email'),
    image: formData.get('image'),
    role: formData.get('role'),
    password: formData.get('password'),
    createdAt: formData.get('createdAt'),
    updatedAt: formData.get('updatedAt'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid data',
      status: 'error',
    }
  }

  try {
    await db
      .update(users)
      .set(validatedFields.data)
      .where(eq(users.id, validatedFields.data.id))
  } catch (error) {
    console.error(error)
    return {
      message: 'Database error',
      status: 'error',
    }
  }

  revalidatePath('/users')
  revalidatePath('/users/' + validatedFields.data.id)
  revalidatePath('/users/' + validatedFields.data.id + '/edit')

  return {
    message: 'User updated successfully',
    status: 'success',
  }
}

const deleteUserSchema = z
  .object({
    id: z.coerce.string(),
  })
  .pick({ id: true })

export type DeleteUserState = {
  errors?: {
    id?: string[]
  }
  message?: string
  status?: 'success' | 'error'
}

export async function deleteUserAction(
  prevState: DeleteUserState,
  formData: FormData,
): Promise<DeleteUserState> {
  const session = await requireAdmin()

  const validatedFields = deleteUserSchema.safeParse({
    id: formData.get('id'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid data',
      status: 'error',
    }
  }

  try {
    await db.delete(users).where(eq(users.id, validatedFields.data.id))
  } catch (error) {
    console.log(error)
    return {
      message: 'Database error',
      status: 'error',
    }
  }

  revalidatePath('/users')

  return {
    message: 'User deleted successfully',
    status: 'success',
  }
}
