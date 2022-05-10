import express from 'express';
import { NodeMailerMailAdapter } from './adapters/nodeMailer/node-mailer-mail-adapter';
import { PrismaFeedbackRepository } from './repositories/prisma/prisma-feedback-repository';
import { SubmitFeedback } from './services/submit-feedback';

export const routes = express.Router()

routes.post('/feedbacks', async (req, res)=>{
  const { type, comment, screenshot } = req.body;

  const prismaFeedbackRepository = new PrismaFeedbackRepository();
  const nodeMailerMailAdapter = new NodeMailerMailAdapter();

  const submitFeedback = new SubmitFeedback( prismaFeedbackRepository, nodeMailerMailAdapter );

  await submitFeedback.handle({
    type, comment, screenshot
  })


  return res.status(201).send();
});