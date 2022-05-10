import { SubmitFeedback } from "./submit-feedback"

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedback(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
)

describe('Submit feedback', () => {
  it('Should be able to submit a feedback', () => {
    expect(submitFeedback.handle({
      type:'BUG',
      comment: 'Loremn Ipsum example of comment',
      screenshot: 'data:image/png;base64,asdhujhuih198dh2891hdsad',
    })).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  })

  it('Should not be able to sumbit a feedback without a type', () => {
    expect(submitFeedback.handle({
      type:'',
      comment: 'Loremn Ipsum example of comment',
      screenshot: 'data:image/png;base64,asdhujhuih198dh2891hdsad',
    })).rejects.toThrow();
  })

  it('Should not be able to sumbit a feedback without a comment', () => {
    expect(submitFeedback.handle({
      type:'BUG',
      comment: '',
      screenshot: 'data:image/png;base64,asdhujhuih198dh2891hdsad',
    })).rejects.toThrow();
  })

  it('Should not be able to sumbit a feedback without an invalid screenshot', () => {
    expect(submitFeedback.handle({
      type:'BUG',
      comment: 'Loremn Ipsum example of comment',
      screenshot: 'test.jpg',
    })).rejects.toThrow();
  })
})