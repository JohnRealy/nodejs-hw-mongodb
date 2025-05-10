import nodemailer from 'nodemailer';
import 'dotenv/config';

import { getEnvVar } from '../utils/getEnvVar.js';

const user = getEnvVar('SMTP_USER');
const pass = getEnvVar('SMTP_PASSWORD');
const host = getEnvVar('SMTP_HOST');
const port = getEnvVar('SMTP_PORT');

const nodemailerConfig = {
  host: host,
  port: Number(port),
  auth: {
    user,
    pass,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

export const sendEmail = (data) => {
  const email = { ...data, from: user };

  return transport.sendMail(email);
};
