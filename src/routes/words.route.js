import { Router } from "express";

import { QueryModel } from "../lib/classes/QueryModel.js";
import { DbQueryBuilder } from "../lib/classes/DbQueryBuilder.js";

import { WordModel } from "../models/WordModel.js";

const router = Router();

router.get("/", async (req, res) => {
  const queryModel = new QueryModel(req.query);

  // validate request query
  const errors = queryModel.validateQueryParams({
    keys: Object.keys(WordModel.schema.obj) || [],
  });
  if (errors.length) throw errors;

  const queryObj = queryModel.getParams();

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

  const [response] = await WordModel.aggregate(queryPipelines);

  res.setHeader("x-total-count", response?.total?.[0]?.total || 0);

  return res.json(response.list);
});

router.get("/:id", async (req, res) =>
  res.send(await WordModel.findById(req.params.id))
);

router.post("/", async (_req, res) => {
  return res.send({ message: "Method to create a word " });
});

router.put("/:id", async (req, res) => {
  return res.send({
    message: `Method to update a word with id ${req.params.id}`,
  });
});

router.patch("/:id", async (req, res) => {
  return res.send({
    message: `Method to update a word partially with id ${req.params.id}`,
  });
});

router.delete("/:id", async (req, res) => {
  return res.send({
    message: `Method to delete a word with id ${req.params.id}`,
  });
});

export const wordsRouter = router;
