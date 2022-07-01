import Table from "react-bootstrap/Table";
import { FaThumbsUp } from "react-icons/fa";
import { BsPencilSquare, BsTrash, BsPlusLg } from "react-icons/bs";
import { Button, Container, Row, Col } from "react-bootstrap";
import Add from "./add";
import { useState } from "react";
import useStore from "../hooks/useStore";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import Pagin from "./pagination";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { useParams } from "react-router-dom";
function UserAnswer() {
  const store = useStore();
  const [size, setSize] = useState("10");
  const userAnswerStore = store.userAnswerStore;
  const userFieldStore = store.userFieldStore;
  const fieldInfos = userFieldStore.fieldInfos;
  const answerPage = userAnswerStore.answerPage;
  const connectWebSocket = () => {
    var socket = new SockJS("http://localhost:8100/websocket");
    const stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
      stompClient.subscribe("/answer", () => {
        console.log("websocket work");
        userAnswerStore.getPage(store.userId, 0, size, store.access);
      });
    });
  };
  useEffect(() => {
    connectWebSocket();
  }, []);
  useEffect(() => {
    userAnswerStore.getPage(store.userId, 0, size, store.access);
    userFieldStore.getAllInfo(store.userId, store.access);
  }, []);
  const answers = answerPage ? answerPage.answers : undefined;
  return answerPage && fieldInfos ? (
    <Container
      className="bg-white justify-content-md-center align-items-center mt-5 py-3"
      style={{ width: "80%" }}
    >
      <Row className="d-flex justify-content-between">
        <Col md="auto">
          <h2>Responses</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table striped hover responsive>
            <thead>
              <tr>
                {fieldInfos.map((fieldInfo) => (
                  <th>{fieldInfo.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {answers.map((answer) => (
                <tr>
                  {fieldInfos.map((fieldInfo) => {
                    const tempAnswer = answer.fieldAnswers.find(
                      (fieldAnswer) => fieldInfo.id === fieldAnswer.fieldId
                    );
                    return tempAnswer ? (
                      <td>
                        {tempAnswer.options.map((option) => (
                          <>{option} </>
                        ))}
                      </td>
                    ) : (
                      <td>N/A</td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row className="d-flex justify-content-between">
        <Col md="auto">1-2 of 2</Col>
        <Col md="auto">
          <Pagin
            page={answerPage.page}
            totalPages={answerPage.totalPages}
            max={5}
            getPage={(page) =>
              userAnswerStore.getPage(store.userId, page, size, store.access)
            }
          ></Pagin>
        </Col>
        <Col md="auto">
          <select
            class="form-select"
            value={size}
            onChange={(e) => {
              setSize(e.target.value);
              userAnswerStore.getPage(
                store.userId,
                0,
                e.target.value,
                store.access
              );
            }}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
        </Col>
      </Row>
    </Container>
  ) : (
    <div>Loading...</div>
  );
}

export default observer(UserAnswer);
