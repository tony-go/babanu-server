import {verify} from 'jsonwebtoken'
import {PrismaClient, User} from '@prisma/client'

import env from './env'

import {IUser} from './users/types'

export interface IContext {
  db: PrismaClient
  user: null | User
}

export async function getUser(
  token: string,
  ctx: IContext,
): Promise<User | null> {
  if (!token) {
    return null
  }

  if (!ctx || !ctx.db) {
    return null
  }

  const userToken = verify(token, env.SECRET_KEY) as IUser
  return await ctx.db.user.findOne({where: {id: userToken.id}})
}

const db = new PrismaClient()

export default async ({req}): Promise<IContext> => {
  const token = req.headers.authorization || ''

  return {
    db,
    user: await getUser(token, {db, user: null}),
  }
}
