#!/usr/bin/env node
import fs from "fs";
import { transform } from "babel-core";

const source = fs.readFileSync(`${__dirname}/test/__snapshots__/test.spec.js.snap`, "utf8");
const { code, ast, map } = transform(source);
fs.writeFileSync(`${__dirname}/tmp/code`, code);
fs.writeFileSync(`${__dirname}/tmp/ast`, JSON.stringify(ast));
fs.writeFileSync(`${__dirname}/tmp/map`, map);
