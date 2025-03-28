import type { RegisterForm } from './types.server'
import { prisma } from './prisma.server'
import { createUser } from './user.server'
import { json } from '@remix-run/node'

export async function register(user: RegisterForm) {
    const exists = await prisma.customer.count({ where: { email: user.email } })
    if (exists) {
      return  Response.json({ error: `Email fue registrado anteriormente` }, { status: 400 })
    }


    const newUser = await createUser(user)
    if (!newUser) {
      return Response.json(
        {
          error: `El correo que escribiste no es válido. Intentalo de nuevo. `,
          fields: { email: user.email },
        },
        { status: 400 },
      )
    }
    return Response.json(
      {
        message: `Gracias por contagiarte, pronto estaremos en contacto `,
        fields: { email: newUser },
      },
      { status: 200 },
    )
   // return newUser;
  }