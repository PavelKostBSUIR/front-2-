import { types, flow } from "mobx-state-tree";
import apiCall from "../api/index";
const userRoute = "/users";
const answerRoute = "/answers";
const FieldAnswer = types.model("FieldAnswer", {
  fieldId: types.identifierNumber,
  options: types.array(types.string),
});
const Answer = types.model("Answer", {
  fieldAnswers: types.array(FieldAnswer),
});
const AnswerPage = types.model("AnswerPage", {
  page: types.number,
  totalPages: types.number,
  size: types.number,
  answers: types.array(Answer),
});
const UserAnswerStore = types
  .model("UserAnswerStore", {
    answerPage: types.maybe(AnswerPage),
  })
  .actions((self) => {
    return {
      getPage: flow(function* (userId, page, size, access) {
        const response = yield apiCall.get(
          userRoute + "/" + userId + answerRoute,
          undefined,
          {
            page: page,
            size: size,
          },
          access
        );
        const body =
          (response?.status + "")[0] === "2"
            ? yield response.json()
            : (console.log("getUserAnswerPageError>>" + response?.status),
              undefined);

        if (body !== undefined) {
          const userAnswerPage = body.userAnswerPage;
          self.answerPage = {
            page: userAnswerPage.number,
            totalPages: userAnswerPage.totalPages,
            size: userAnswerPage.size,
            answers: userAnswerPage.content,
          };
          console.log("ANSWER_PAGE");
        }
      }),
    };
  });
export default UserAnswerStore;
