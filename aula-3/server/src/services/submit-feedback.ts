import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbackRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedback {
  private feedbacksRepository: FeedbacksRepository;

  constructor(private feedbackRepository: FeedbacksRepository, private mailAdapter: MailAdapter) {
    this.feedbacksRepository = feedbackRepository;
  }

  async handle(request: SubmitFeedbackRequest) {
    const { type, comment, screenshot } = request;

    if(!type){
      throw new Error('Type is required');
    }

    if(!comment){
      throw new Error('Comment is required');
    }

    if( screenshot && !screenshot.startsWith('data:image/png;base64')){
      throw new Error('Invalid screenshot format.');
    }

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot,
    });

    await this.mailAdapter.sendMail({
      subject: "Novo Feedback",
      body: [
        `<p>Tipo de feedback: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
      ].join('<br/>')
    });
  }
}