'use server'

export async function sendCode(email: string) {
  try {
    const validEmail = email == 'user@gmail.com'
    let error
    if (!validEmail) error = 'Email inválido.'
    return { success: validEmail, error }
  } catch (e: any) {
    console.log(`Error (verifyCode): ${e.message}`)
    return { success: false, error: e.message }
  }
}
export async function verifyCode(code: string, email: string) {
  try {
    const validCode = code == '12345'
    const validEmail = email == 'user@gmail.com'
    let error
    if (!validEmail) error = 'Email inválido.'
    if (!validCode) error = 'Código inválido.'
    return { success: validCode && validEmail, error }
  } catch (e: any) {
    console.log(`Error (verifyCode): ${e.message}`)
    return { success: false, error: e.message }
  }
}
export async function updatePassword(email: string, password: string) {
  try {
    const validEmail = email == 'user@gmail.com'
    const validPassword = password == '123'
    let error
    if (!validEmail) error = 'Email inválido.'
    if (!validPassword) error = 'Credênciais inválidas.'
    return { success: validEmail && validPassword, error }
  } catch (e: any) {
    console.log(`Error (verifyCode): ${e.message}`)
    return { success: false, error: e.message }
  }
}
export async function login(email: string, password: string) {
  try {
    const validEmail = email == 'user@gmail.com'
    const validPassword = password == '123'
    let error
    if (!validEmail) error = 'Credênciais inválidas.'
    if (!validPassword) error = 'Credênciais inválidas.'
    return { success: validEmail && validPassword, error }
  } catch (e: any) {
    console.log(`Error (login): ${e.message}`)
    return { success: false, error: e.message }
  }
}
export async function register(
  email: string,
  password: string,
  username: string,
) {
  try {
    console.log(email)
    return { success: true }
  } catch (e: any) {
    console.log(`Error (register): ${e.message}`)
    return { success: false, error: e.message }
  }
}
