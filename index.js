import url from 'url';
import { send }  from 'micro';
import phantomas from 'phantomas';

export default async function(req, res) {
  const query = url.parse(req.url, true).query;

  if (!query.url) {
    send(res, 400);
  }

  const data = await phantomas(query.url);

  const dataFilter = {
    html  : data.json.metrics.htmlSize,
    css   : data.json.metrics.cssSize,
    image : data.json.metrics.imageSize,
    js    : data.json.metrics.jsSize,
    other : data.json.metrics.otherSize,
    total : data.json.metrics.contentLength
  };

  send(res, 200, dataFilter);
}
