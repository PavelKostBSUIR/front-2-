import { types, flow } from "mobx-state-tree";
import apiCall from "../api/index";
const answerRoute = "/answers";
const AnswerStore = types.model("AnswerStore", {}).actions((self) => {
  return {
    post: flow(function* (answer) {
      const response = yield apiCall.post(answerRoute, answer, undefined);
      if ((response?.status + "")[0] !== "2")
        console.log("postAnswerError>>" + response?.status);
    }),
  };
});
export default AnswerStore;
