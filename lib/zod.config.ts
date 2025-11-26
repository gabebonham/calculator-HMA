import { z } from 'zod'

export const LoginSchema = z.object({
  username: z.string({
    error: 'Nome de usuário é obrigatório',
  }),
  code: z.number({
    error: 'Código é obrigatório',
  }),
  email: z.string().email({ message: 'Email inválido' }), // Esta você já tinha
  password: z
    .string({ error: 'Senha inválida' })
    .min(8, { message: 'A senha deve conter pelo menos 8 caracteres' }) // Tradução para 'Too small'
    .regex(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
      'A senha deve conter pelo menos uma letra maiúscula, um número, e um caractere especial', // Esta você já tinha
    ),
})

export const RegisterSchema = z
  .object({
    username: z.string({ error: 'Nome inválido' }),
    email: z.email({ error: 'Email inválido' }),
    password: z
      .string({ error: 'Senha inválida' })
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
