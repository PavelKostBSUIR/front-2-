import { types, flow } from "mobx-state-tree";
import apiCall from "../api/index";
const questionRoute = "/questions";
const QuestionField = types.model("QuestionField", {
  id: types.identifierNumber,
  label: types.string,
  type: types.string,
  options: types.array(types.string),
  required: types.boolean,
});
const Question = types.model("Question", {
  fields: types.array(QuestionField),
});
const QuestionStore = types
  .model("QuestionStore", {
    question: types.maybe(Question),
    questionIds: types.maybe(types.array(types.number)),
  })
  .actions((self) => {
    return {
      get: flow(function* (id) {
        const response = yield apiCall.get(
          questionRoute + "/" + id,
          undefined,
          undefined,
          undefined
        );
        const body =
          (response?.status + "")[0] === "2"
            ? yield response.json()
            : (console.log("getQuestionError>>" + response?.status), undefined);
        if (body !== undefined) {
          self.question = body;
        }
      }),
      getAll: flow(function* () {
        const response = yield apiCall.get(
          questionRoute,
          undefined,
          undefined,
          undefined
        );
        const body =
          (response?.status + "")[0] === "2"
            ? yield response.json()
            : (console.log("getAllQuestionsError>>" + response?.status),
              undefined);
        if (body !== undefined) {
          self.questionIds = body.questionIds.map(
            (questionId) => questionId.id
          );
        }
      }),
    };
  });
export default QuestionStore;
