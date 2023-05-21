import mongoose from "mongoose";

const questionSchema = mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  a: {
    type: String,
    required: true,
  },
  b: {
    type: String,
    required: true,
  },
  c: {
    type: String,
    required: true,
  },
  d: {
    type: String,
    required: true,
  },
  correct: {
    type: String,
    required: true,
  },
  present: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const Question = mongoose.model("Question", questionSchema);

export default Question;
