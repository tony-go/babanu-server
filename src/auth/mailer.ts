import nodemailer from 'nodemailer'

import env from '../env'

interface IConfirmationMailOptions {
  from: string
  to: string
  subject: string
  html: string
}

export const getConfirmationMailOptions = (
  to: string,
): IConfirmationMailOptions => ({
  from: 'gorez.tony@gmail.com',
  to,
  subject: 'Confirmation email',
  html: '<p>Add redirect to front end</p>',
})

export default nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: env.MAILER_USER,
    pass: env.MAILER_PASSWORD,
  },
})
