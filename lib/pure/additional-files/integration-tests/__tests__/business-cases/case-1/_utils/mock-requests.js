import { RequestMock } from 'testcafe';
import { GRANT_ENDPOINT } from '../../../../endpoints';

// это функция которая отвечает за подмену запросов
// для позитивных/негативных ответов можно написать аналогичную функцию и прокидывать в
// .requestHooks(mockManualRequests())
export const mockRequests = () =>
  RequestMock()
    .onRequestTo(GRANT_ENDPOINT)
    .respond((req, res) => {
      res.headers['content-type'] = 'application/json;charset=UTF-8';
      res.statusCode = 200;
      res.setBody({ auth_code: '123_code' });
    });
