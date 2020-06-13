import { RequestMock } from 'testcafe';
import {
  GRANT_ENDPOINT,
  LOGIN_BY_PHONE_ENDPOINT,
  LOGIN_ENDPOINT,
} from '../../../../endpoints';

let counter = 0;

// это функция которая отвечает за подмену запросов
// для позитивных/негативных ответов можно написать аналогичную функцию и прокидывать в
// .requestHooks(mockManualRequests())
export const mockRequests = () =>
  RequestMock()
    .onRequestTo(GRANT_ENDPOINT)
    .respond((req, res) => {
      res.headers['content-type'] = 'application/json;charset=UTF-8';
      res.statusCode = 400;
      res.setBody({ error: 'test' });
    })
    .onRequestTo(LOGIN_BY_PHONE_ENDPOINT)
    .respond((req, res) => {
      res.headers['content-type'] = 'application/json;charset=UTF-8';
      res.statusCode = 200;
      res.setBody({ token: 'token', till_next_request: 3000 });
    })
    .onRequestTo(LOGIN_ENDPOINT)
    .respond((req, res) => {
      switch (counter) {
        case 1:
          res.headers['content-type'] = 'application/json;charset=UTF-8';
          res.statusCode = 200;
          res.setBody({ token: 'token login' });
          counter += 1;
          return;

        case 2:
          res.headers['content-type'] = 'application/json;charset=UTF-8';
          res.statusCode = 400;
          res.setBody({ error: 'some error' });
          counter += 1;
          return;

        case 3:
          res.headers['content-type'] = 'application/json;charset=UTF-8';
          res.statusCode = 200;
          res.setBody({ token: 'token login' });
          counter += 1;
          return;

        default:
          res.headers['content-type'] = 'application/json;charset=UTF-8';
          res.statusCode = 400;
          res.setBody({ error: 'some error' });
          counter += 1;
          break;
      }
    });
