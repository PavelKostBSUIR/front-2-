import { observer } from "mobx-react-lite";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import useStore from "./hooks/useStore";
import Login from "./component/login";
import UnauthNavbar from "./component/unauthNavbar";
import { useNavigate } from "react-router-dom";
import AuthNavbar from "./component/authNavbar";
import Registration from "./component/registration";
import Questions from "./component/questions";
import Question from "./component/question";
import UserField from "./component/userField";
import UserAnswer from "./component/userAnswer";
import User from "./component/user";
import UserPassword from "./component/userPassword";
import Success from "./component/success";
function App() {
  const store = useStore();

  return (
    <div>
      {store.logged === undefined ? (
        <div>Loading...</div>
      ) : (
        <div>
          <BrowserRouter>
            {store.logged ? <AuthNavbar /> : <UnauthNavbar />}
            <Routes>
              {store.logged ? (
                <Route path="/" element={<UserField />} />
              ) : (
                <Route path="/" element={<Login />} />
              )}
              <Route path="/auth/login" element={<Login />} />
              <Route path="/users/:id/answers" element={<UserAnswer />} />
              <Route path="/users/:id/password" element={<UserPassword />} />
              <Route path="/users/:id/fields" element={<UserField />} />
              <Route path="/users/:id" element={<User />} />
              <Route path="/users" element={<Registration />} />
              <Route path="/questions/:id" element={<Question />} />
              <Route path="/questions" element={<Questions />} />
              <Route path="/success" element={<Success />} />
            </Routes>
          </BrowserRouter>
        </div>
      )}
    </div>
  );
}

export default observer(App);
