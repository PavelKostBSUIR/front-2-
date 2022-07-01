import { types, flow } from "mobx-state-tree";
import apiCall from "../api/index";
const userRoute = "/users";
const User = types.model("User", {
  login: types.string,
  name: types.string,
  surname: types.string,
  phoneNumber: types.string,
});
const UserStore = types
  .model("UserStore", {
    user: types.maybe(User),
  })
  .actions((self) => {
    return {
      get: flow(function* (id, access) {
        const response = yield apiCall.get(
          userRoute + "/" + id,
          undefined,
          undefined,
          access
        );
        const body =
          (response?.status + "")[0] === "2"
            ? yield response.json()
            : (console.log("fetchUserError>>" + response?.status), undefined);
        if (body !== undefined) {
          self.user = body;
        }
      }),
      post: flow(function* (user, callback) {
        const response = yield apiCall.post(userRoute, user, undefined);
        if ((response?.status + "")[0] === "2") callback(false);
        else {
          callback(true);
          console.log("postUserError>>" + response?.status);
        }
      }),
      put: flow(function* (id, user, access, callback) {
        const response = yield apiCall.put(userRoute + "/" + id, user, access);
        if ((response?.status + "")[0] !== "2") {
          callback(true);
          console.log("putUserError>>" + response?.status);
        } else {
          callback(false);
        }
      }),
      putPassword: flow(function* (id, putPassword, access) {
        const response = yield apiCall.put(
          userRoute + "/" + id + "/password",
          putPassword,
          access
        );
        if ((response?.status + "")[0] === "2")
          console.log("putUserPasswordError>>" + response?.status);
      }),
    };
  });
export default UserStore;
