import { RequestMock } from 'testcafe';
import { LOGIN_BY_PHONE_ENDPOINT } from '../endpoints';

// это функция которая отвечает за подмену запросов
// для позитивных/негативных ответов можно написать аналогичную функцию и прокидывать в
// .requestHooks(mockManualRequests())
export const mockManualRequests = () =>
  RequestMock()
    .onRequestTo(LOGIN_BY_PHONE_ENDPOINT)
    .respond((req, res) => {
      res.headers['content-type'] = 'application/json;charset=UTF-8';
      res.statusCode = 200;
      res.setBody({ token: 'token', till_next_request: 5000 });
    });
