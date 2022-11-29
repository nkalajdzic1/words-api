export class HttpHeaders {
  static setXTotalCount = (res, val) => {
    res.append("X-Total-Count", val);
    res.append("Access-Control-Expose-Headers", "X-Total-Count");
  };
}
