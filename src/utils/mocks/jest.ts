jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn(() => ({})),
}))

jest.mock('jsonwebtoken', () => ({
  verify: jest.fn(() => ({
    firstName: 'tony',
  })),
  sign: jest.fn(() => 'token'),
}))

jest.mock('bcrypt', () => ({
  hash: jest.fn(() => Promise.resolve('xxxxx')),
  compare: jest.fn(() => Promise.resolve(true)),
}))

// jest.mock('./../../auth/mailer', () => ({
//   __esModule: true,
//   default: {sendEmail: jest.fn((_, cb) => cb())},
//   getConfirmationMailOptions: jest.fn(),
// }))
