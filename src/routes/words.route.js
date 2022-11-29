import { Router } from "express";

import { QueryModel } from "../lib/classes/QueryModel.js";
import { DbQueryBuilder } from "../lib/classes/DbQueryBuilder.js";
import { HttpHeaders } from "../lib/classes/HttpHeaders.js";

import { WordModel } from "../models/WordModel.js";

const router = Router();

router.get("/", async (req, res) => {
  const queryModel = new QueryModel(req.query);

  // validate request query
  const errors = queryModel.validateQueryParams({
    keys: Object.keys(WordModel.schema.obj) || [],
  });
  if (errors.length) throw errors;

  // get the query request params
  const queryObj = queryModel.getParams();

  // create the query that will be executed
  const queryPipelines = [
    ...DbQueryBuilder.getSearchingPipelines(queryObj),
    ...DbQueryBuilder.getSortingPipelines(queryObj),
    ...DbQueryBuilder.getPaginationWithCount(queryObj),
    ...DbQueryBuilder.getFieldsToSelect([
      "list._id",
      "list.word",
      "list.definition",
      "total",
    ]),
  ];

  // run the aggregation/query
  const [response] = await WordModel.aggregate(queryPipelines);

  // set response header (number of records)
  HttpHeaders.setXTotalCount(res, response?.total?.[0]?.total);

  // return the list
  return res.json(response.list);
});

// get a word
router.get("/:id", async (req, res) =>
  res.send(await WordModel.findById(req.params.id))
);

// create a word
router.post("/", async (_req, res) => {
  return res.send({ message: "Method to create a word " });
});

// update a word
router.put("/:id", async (req, res) => {
  return res.send({
    message: `Method to update a word with id ${req.params.id}`,
  });
});

// partially update a word
router.patch("/:id", async (req, res) => {
  return res.send({
    message: `Method to update a word partially with id ${req.params.id}`,
  });
});

// delete a word
router.delete("/:id", async (req, res) => {
  return res.send({
    message: `Method to delete a word with id ${req.params.id}`,
  });
});

export const wordsRouter = router;
