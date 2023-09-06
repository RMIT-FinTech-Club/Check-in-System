/**
 * A className for storing information of a question object
 * @param {String} title - The title/header of the question
 * @param {String} type - The type of the question, includinng text, date, or multiple choice
 * @param {Boolean} required - Whether this question must be answer or not
 * @param {Array} choice - List of choices for a multiple choice question
 * @param {String} id - ID/key of the question
 */

class Question {
  constructor({
    title,
    type = "Text",
    required = false,
    choice = [],
    id,
    answer = "",
  }) {
    this.title = title;
    this.type = type;
    this.required = required;
    this.choice = choice;
    this.id = id;
    this.answer = answer;
  }
}

export default Question;
