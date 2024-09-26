import * as lib from "./lib.ts";
import * as types from "./types.ts";
//@ts-ignore
import * as ui from "./ui";

const allExports = {
  ...lib,
  ...types,
  ...ui,
};

export default allExports;
