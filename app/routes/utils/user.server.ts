import type { RegisterForm } from './types.server'
import { prisma } from './prisma.server'

export const createUser = async (user: RegisterForm) => {   const newUser = await prisma.customer.create({
      data: {
        email: user.email
      },
    }) 
    return { id: newUser.id, email: user.email }
  }