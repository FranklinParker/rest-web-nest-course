import mongoose from 'mongoose';

export const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

ContactSchema.virtual('test').get(function () {
  return 'test';
});
