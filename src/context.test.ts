import getContext, {getUser, IContext} from './context'
import dbMock from './utils/mocks/db'

describe('context module', () => {
  describe('getUser', () => {
    it('should call verify', async () => {
      const token = 'token'
      const res = await getUser(token, {
        db: dbMock as unknown,
        user: null,
      } as IContext)

      expect(res?.firstName).toBeTruthy()
    })

    it('should return null when string is empty', async () => {
      expect(await getUser('', null)).toEqual(null)
    })

    it('should return null if ctx is null', async () => {
      expect(await getUser('token', null)).toEqual(null)
    })

    it('should return null if ctx is null', async () => {
      expect(await getUser('token', {db: null, user: null})).toEqual(null)
    })
  })

  describe('getContext', () => {
    const contextArguments = {req: {headers: {authorization: null}}}

    it('should return an object with user and db', async () => {
      const context = await getContext(contextArguments)
      expect(context.db).toBeTruthy()
      expect(context.user).toBeFalsy()
    })
  })
})
