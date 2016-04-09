/*
 * Converts Phantomas exit errors to HTTP status codes
 * Reference: https://git.io/vVScR
 */
export function formatErr(err) {
  switch (err) {
    case 252:
      err = 408;
      break;
    case 253:
      err = 418;
      break;
    case 254:
      err = 400;
      break;
    case 255:
      err = 405;
      break;
    default:
      err = 500;
  }

  return err;
}

/*
 * Sanitizes Phantomas success response object
 */
export function formatRes(data) {
  return {
    html  : data.metrics.htmlSize,
    css   : data.metrics.cssSize,
    image : data.metrics.imageSize,
    js    : data.metrics.jsSize,
    other : data.metrics.otherSize,
    total : data.metrics.contentLength
  }
}
