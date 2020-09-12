const getFakeUser = () =>
  Promise.resolve({firstName: 'Tony', isConfirmed: true})

export default {
  user: {
    findMany: jest.fn(() => [getFakeUser()]),
    findOne: jest.fn(getFakeUser),
    create: jest.fn(getFakeUser),
    update: jest.fn(getFakeUser),
    delete: jest.fn(getFakeUser),
  },
}
