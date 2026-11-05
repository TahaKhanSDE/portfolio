import mongoose, { Schema, Document, models, model } from 'mongoose';

export interface IProject extends Document {
  title: string;
  slug: string;
  category: 'production' | 'distributed' | 'opensource';
  description: string;
  tags: string[];
  metrics?: { label: string; value: string };
  repoUrl?: string;
  liveUrl?: string;
  isSpotlight: boolean;
  order: number;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: {
      type: String,
      enum: ['production', 'distributed', 'opensource'],
      required: true,
    },
    description: { type: String, required: true },
    tags: [{ type: String }],
    metrics: { label: String, value: String },
    repoUrl: String,
    liveUrl: String,
    isSpotlight: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default models.Project || model<IProject>('Project', ProjectSchema);