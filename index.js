import url from 'url';
import { send }  from 'micro';
import phantomas from 'phantomas';
import { formatErr, formatRes } from './lib/format.js';

export default async function(req, res) {
  const query = url.parse(req.url, true).query;

  if (!query.url) {
    send(res, 403);
  }

  try {
    const data = await phantomas(query.url);
    send(res, 200, formatRes(data.json));
  }
  catch(err) {
    send(res, formatErr(err));
  }
}
