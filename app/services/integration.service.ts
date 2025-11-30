'use server'
import nodemailer from 'nodemailer'
import { findUserByEmail } from './users.service'
import { db } from '@/db/db'
import { codes, users } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { hashPassword } from '@/lib/password'
export async function getCoins() {
  try {
    // const url = `https://api.massive.com/v3/reference/tickers?market=fx&limit=1000&apiKey=${process.env.API_KEY}`

    // const res = await fetch(url)

    // const data = await res.json()
    // console.log(data)
    return {
      success: true,
      data: [
        { ticker: 'USD/JPY', price: 156.15 },
        { ticker: 'NZD/USD', price: 0.57 },
      ],
    }
  } catch (e) {
    console.log(e)
    return { success: false, error: e }
  }
}

export async function sendEmail(email: string) {
  try {
    const code = await generatePasswordCode(email)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    const info = await transporter.sendMail({
      from: `"Calculator HMA" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Código de reset de senha.',
      html: `<p>Seu codigo é: <b>${code}</b></p>`, // HTML body
    })
    console.log(info)
    return { success: true }
  } catch (e) {
    console.log(e)
    return { success: false, error: e }
  }
}
async function generatePasswordCode(email: string) {
  const user = await findUserByEmail(email)
  const code = Math.floor(100000 + Math.random() * 900000)
  await db.insert(codes).values({ code, userId: user.data?.id as string })
  return code
}
export async function validateCode(email: string, code: number) {
  try {
    const user = await findUserByEmail(email)
    const [codeRes] = await db
      .select()
      .from(codes)
      .where(eq(codes.userId, user.data?.id as string))
    return { success: codeRes.code == code }
  } catch (e) {
    console.log(e)
    return { success: false, error: e }
  }
}
export async function updatePassword(email: string, password: string) {
  try {
    const hashedPassword = await hashPassword(password)
    await db
      .update(users)
      .set({ password: hashedPassword })
      .where(eq(users.email, email))
    return { success: true }
  } catch (e) {
    console.log(e)
    return { success: false, error: e }
  }
}
