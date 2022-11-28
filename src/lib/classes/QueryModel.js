import { SORT_ORDER } from "../enums/sort.enum.js";

/**
 * @description class to handle the query data from the request
 */
export class QueryModel {
  #pageNumber = 1;
  #pageSize = 10;
  #sortBy = "";
  #order = SORT_ORDER.ASC;
  #search = "";

  // setup the query data in the construtor
  constructor({ pageNumber, pageSize, sortBy, order, search }) {
    this.#pageNumber = pageNumber || 1;
    this.#pageSize = pageSize || 10;
    this.#sortBy = sortBy || "";
    this.#order = order || SORT_ORDER.ASC;
    this.#search = search || "";

    this.validateQueryParams();
  }

  // getter
  getParams = () => {
    return {
      pageNumber: this.#pageNumber,
      pageSize: this.#pageSize,
      sortBy: this.#sortBy,
      order: this.#order,
      search: this.#search,
    };
  };

  /**
   * @description method to validate if the query contains any invalid params
   * @param {Object} obj
   * @returns {Array<Error>} array of errors
   */
  validateQueryParams = (obj) => {
    const errors = [];

    if (this.#pageNumber <= 0)
      errors.push(new Error("Page number must be positive"));
    if (this.#pageSize <= 0 || this.#pageSize >= 100)
      errors.push(new Error("Page size must be between 0 and 100"));
    if (this.#sortBy !== "" && obj?.keys && !obj?.keys.includes(this.#sortBy))
      errors.push(new Error("Invalid sorting field"));
    if (![SORT_ORDER.ASC, SORT_ORDER.DESC].includes(this.#order))
      errors.push(new Error("Invalid sort order"));

    return errors;
  };
}
