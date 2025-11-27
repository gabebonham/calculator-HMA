import { z } from 'zod'

export const LoginSchema = z.object({
  email: z.string().email({ message: 'Email inválido' }), // Esta você já tinha
  password: z
    .string({ message: 'Senha inválida' })
    .min(8, { message: 'A senha deve conter pelo menos 8 caracteres' }) // Tradução para 'Too small'
    .regex(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
      'A senha deve conter pelo menos uma letra maiúscula, um número, e um caractere especial', // Esta você já tinha
    ),
})

export const RegisterSchema = z
  .object({
    username: z.string({ message: 'Nome inválido' }),
    email: z.string({ message: 'Email inválido' }),
    password: z
      .string({ message: 'Senha inválida' })
      .min(8)
      .regex(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
        'Senha deve conter pelo menos uma letra maiúscula, um número, e um caractére especial',
      ),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: 'Senhas não são iguais',
  })
