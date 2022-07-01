import { types, flow } from "mobx-state-tree";
import apiCall from "../api/index";
import AnswerStore from "./answerStore";
import QuestionStore from "./questionStore";
import UserAnswerStore from "./userAnswerStore";
import UserFieldStore from "./userFieldStore";
import UserStore from "./userStore";
const RootStore = types
  .model("RootStore", {
    userStore: types.optional(UserStore, {}),
    userFieldStore: types.optional(UserFieldStore, {}),
    userAnswerStore: types.optional(UserAnswerStore, {}),
    questionStore: types.optional(QuestionStore, {}),
    answerStore: types.optional(AnswerStore, {}),
    logged: types.maybe(types.boolean),
    refresh: types.maybe(types.string),
    access: types.maybe(types.string),
    timerId: types.maybe(types.number),
    userId: types.maybe(types.number),
    remember: types.maybe(types.boolean),
  })
  .actions((self) => {
    return {
      startRefresh() {
        self.timerId = setInterval(() => self.fetchTokens(), 10000);
      },
      endRefresh() {
        clearInterval(self.timerId);
      },
      fetchTokens: flow(function* () {
        const response =
          self.refresh !== undefined
            ? yield apiCall.post("/auth/refresh", {
                refreshToken: self.refresh,
              })
            : (console.log("fetchRefreshError>>" + self.refresh), undefined);
        const tokens =
          (response?.status + "")[0] === "2"
            ? yield response.json()
            : (console.log("RefreshError>>" + response?.status), undefined);

        if (tokens !== undefined) {
          self.refresh = tokens.refreshToken;
          if (self.remember)
            localStorage.setItem("refresh", tokens.refreshToken);
          self.access = tokens.accessToken;
          self.userId = tokens.userId;
        }
      }),
      fetchLogin: flow(function* (credentials, callback) {
        const response = yield apiCall.post("/auth/login", credentials);
        console.log("lol");
        const tokens =
          (response?.status + "")[0] === "2"
            ? yield response.json()
            : (console.log("LoginError>>" + response?.status),
              callback(true),
              undefined);
        console.log("lol_2");
        if (tokens !== undefined) {
          self.refresh = tokens.refreshToken;
          if (self.remember)
            localStorage.setItem("refresh", tokens.refreshToken);
          self.access = tokens.accessToken;
          self.userId = tokens.userId;
          callback(false);
        }
      }),
      authorize: flow(function* () {
        yield self.fetchTokens();
        self.logged =
          self.refresh !== undefined && self.access !== undefined
            ? true
            : false;

        if (self.logged === true) self.startRefresh();
      }),
      afterCreate() {
        //  localStorage.removeItem("refresh"); //comment
        const refresh = localStorage.getItem("refresh");
        // console.log("storagerefresh>>" + refresh);
        self.refresh = refresh !== null ? refresh : self.refresh;
        self.remember = refresh !== null ? true : false;
        self.authorize();
      },
      login: flow(function* (credentials, callback) {
        console.log("remember>>" + credentials.remember);
        self.remember = credentials.remember;
        delete credentials.remember;
        yield self.fetchLogin(credentials, callback);
        yield self.authorize();
      }),
      logout() {
        self.logged = false;
        self.endRefresh();
        localStorage.removeItem("refresh");
      },
    };
  });

export default RootStore;
