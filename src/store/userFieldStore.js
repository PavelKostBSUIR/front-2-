import { types, flow } from "mobx-state-tree";
import { number } from "yup";
import apiCall from "../api/index";
const userRoute = "/users";
const fieldRoute = "/fields";
const Field = types.model("Field", {
  id: types.identifierNumber,
  label: types.string,
  type: types.string,
  options: types.array(types.string),
  required: types.boolean,
  active: types.boolean,
});
const FieldInfo = types.model("FieldInfo", {
  id: types.identifierNumber,
  label: types.string,
});
const FieldPage = types.model("FieldPage", {
  page: types.number,
  totalPages: types.number,
  size: types.number,
  fields: types.array(Field),
});
const UserFieldStore = types
  .model("UserFieldStore", {
    activeFieldId: types.maybe(types.number),
    field: types.maybe(Field),
    fieldPage: types.maybe(FieldPage),
    fieldInfos: types.maybe(types.array(FieldInfo)),
  })
  .actions((self) => {
    return {
      get: flow(function* (userId, fieldId, access) {
        const response = yield apiCall.get(
          userRoute + "/" + userId + fieldRoute + "/" + fieldId,
          undefined,
          undefined,
          access
        );
        const body =
          (response?.status + "")[0] === "2"
            ? yield response.json()
            : (console.log("getUserFieldError>>" + response?.status),
              undefined);
        if (body !== undefined) {
          self.field = body;
        }
      }),
      getAllInfo: flow(function* (userId, access) {
        const response = yield apiCall.get(
          userRoute + "/" + userId + fieldRoute + "/info",
          undefined,
          undefined,
          access
        );
        const body =
          (response?.status + "")[0] === "2"
            ? yield response.json()
            : (console.log("getAllUserFieldInfoError>>" + response?.status),
              undefined);
        if (body !== undefined) {
          self.fieldInfos = body.fields;
          console.log("FIELD_INFOS");
        }
      }),
      getPage: flow(function* (userId, page, size, access) {
        const response = yield apiCall.get(
          userRoute + "/" + userId + fieldRoute,
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
            : (console.log("getUserFieldPageError>>" + response?.status),
              undefined);
        if (body !== undefined) {
          const fieldPage = body.fieldPage;
          self.fieldPage = {
            page: fieldPage.number,
            totalPages: fieldPage.totalPages,
            size: fieldPage.size,
            fields: fieldPage.content,
          };
        }
      }),
      post: flow(function* (userId, field, access) {
        const response = yield apiCall.post(
          userRoute + "/" + userId + fieldRoute + "/",
          field,
          access
        );
        if ((response?.status + "")[0] !== "2")
          console.log("postUserFieldError>>" + response?.status);
      }),
      put: flow(function* (userId, fieldId, field, access) {
        const response = yield apiCall.put(
          userRoute + "/" + userId + fieldRoute + "/" + fieldId,
          field,
          access
        );
        if ((response?.status + "")[0] !== "2")
          console.log("putUserFieldError>>" + response?.status);
      }),
      delete: flow(function* (userId, fieldId, access) {
        const response = yield apiCall.delete(
          userRoute + "/" + userId + fieldRoute + "/" + fieldId,
          access
        );
        if ((response?.status + "")[0] !== "2")
          console.log("deleteUserFieldError>>" + response?.status);
      }),

      setActiveFieldId: (id) => (self.activeFieldId = id),
    };
  })
  .views((self) => ({
    get activeField() {
      return self.fieldPage.fields.find(
        (field) => field.id === self.activeFieldId
      );
    },
  }));
export default UserFieldStore;
