import { SORT_ORDER } from "../enums/sort.enum.js";

/**
 * @description query aggregation class helper for mongo
 */
export class DbQueryBuilder {
  /**
   * @description method to set up the pagination pipelines for the mongo aggregation
   * @param {{ pageNumber: number, pageSize: number }} page information (size and page number)
   * @returns {Array<Object>} the given pagination pipeline for the aggregation
   */
  static getPaginationPipelines = ({ pageNumber, pageSize }) => {
    let pipelines = [];

    if (pageNumber !== undefined && pageSize !== undefined) {
      pipelines.push({ $skip: pageSize * (pageNumber - 1) });
      pipelines.push({ $limit: parseInt(pageSize) });
    }

    return pipelines;
  };

  /**
   * @description method to set up the sorting pipelines for the mongo aggregation
   * @param {{ sortBy: string, order: string }} sorting information (field to sort and the sorting order)
   * @returns {Array<Object>} the given sorting pipeline for the aggregation
   */
  static getSortingPipelines = ({ sortBy, order }) => {
    let pipelines = [];

    if (sortBy && order)
      pipelines.push({ $sort: { [sortBy]: order == SORT_ORDER.ASC ? 1 : -1 } });

    return pipelines;
  };

  /**
   * @description method to set up the searching pipelines for the mongo aggregation
   * @param {{ search: string }} search information (searching value)
   * @returns {Array<Object>} the given searching pipelines for the aggregation
   */
  static getSearchingPipelines = ({ search }) =>
    search ? [{ $match: { $text: { $search: search } } }] : [];

  /**
   * @description method to set up the count pipelines (number of records) for the mongo aggregation
   * @returns {Array<Object>} the given count pipelines (number of records) for the aggregation
   */
  static getCountPipelines = () => [{ $count: "total" }];

  /**
   * @description method to combine an aggregation with pagination and an aggregation with the number of records
   * @note By using the '$facet' pipeline we don't need two separate queries to fetch the data and the number of records.
   *       With this method, we get both with just one query.
   * @param {Object} query information (pagination information - page size and page number)
   * @returns {Array<Object>} the given aggregation
   */
  static getPaginationWithCount = (query) => [
    {
      $facet: {
        list: this.getPaginationPipelines(query),
        total: this.getCountPipelines(),
      },
    },
  ];

  /**
   * @description method to set up selection pipelines for the mongo aggregation (specifing wich fields should be only retrieved)
   * @param {Array<string>} filtering information (by witch field to filter and the filter value)
   * @returns {Array<Object>} the given filtering pipelines for the aggregation
   */
  static getFieldsToSelect = (fieldsToSelect) => [
    {
      $project: {
        _id: 0,
        ...fieldsToSelect.reduce((obj, val) => ({ ...obj, [val]: 1 }), {}),
      },
    },
  ];
}
