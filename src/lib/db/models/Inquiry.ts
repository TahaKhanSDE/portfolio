import mongoose, { Schema, Document, models, model } from 'mongoose';

export interface IInquiry extends Document {
  name: string;
  email: string;
  message: string;
  createdAt: Date;
}

const InquirySchema = new Schema<IInquiry>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

export default models.Inquiry || model<IInquiry>('Inquiry', InquirySchema);