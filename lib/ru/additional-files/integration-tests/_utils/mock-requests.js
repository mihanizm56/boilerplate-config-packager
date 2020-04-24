import { RequestMock } from 'testcafe';
import { testContractsUrl, testRevisesUrl } from '../endpoints';
import { mockRevisesResponse } from '../mock-data/revises';
import { mockContractsResponse } from '../mock-data/contracts';
import { pageUrl } from '../_constants';

// функция которая отвечает за подмену запросов
export const mockManualRequests = () =>
  RequestMock()
    .onRequestTo(testContractsUrl)
    .respond((req, res) => {
      res.headers['content-type'] = 'application/json;charset=UTF-8';
      res.headers['access-control-allow-origin'] = pageUrl;
      res.headers['access-control-allow-methods'] = 'GET';
      res.statusCode = 200;
      res.setBody(mockContractsResponse);
    })
    .onRequestTo(`${testRevisesUrl}?limit=0&lastReviseId=0`)
    .respond((req, res) => {
      res.headers['content-type'] = 'application/json;charset=UTF-8';
      res.headers['access-control-allow-origin'] = pageUrl;
      res.headers['access-control-allow-methods'] = 'GET';
      res.statusCode = 200;
      res.setBody(mockRevisesResponse);
    });
