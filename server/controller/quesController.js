import Question from "../schema/quesSchema.js";

export const addQuesController = async (req, res) => {
  try {
    const { question, a, b, c, d, correct, present, quesimg } = req.body;

    // Create a new question
    const newQuestion = await Question.create({
      question,
      a,
      b,
      c,
      d,
      correct,
      present,
      userId: req.userId,
      quesimg,
    });

    res.status(201).json(newQuestion);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const getQuesController = async (req, res) => {
  try {
    // Get all questions for the current user
    const questions = await Question.find({ userId: req.userId });

    res.json(questions);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const getQuesByIdController = async (req, res) => {
  // console.log(req.params.id);
  try {
    const question = await Question.findById(req.params.id);
    res.status(200).json(question);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const editQuesByIdController = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    // Update the question
    question.question = req.body.question;
    question.a = req.body.a;
    question.b = req.body.b;
    question.c = req.body.c;
    question.d = req.body.d;
    question.correct = req.body.correct;
    question.present = req.body.present;
    question.quesimg = req.body.quesimg;

    const updatedQuestion = await question.save();

    res.json(updatedQuestion);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const deleteQuesByIdController = async (req, res) => {
  // console.log(req.params.id);
  try {
    await Question.deleteOne({ _id: req.params.id });
    res.status(200).json("Deleted Successfully!");
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
