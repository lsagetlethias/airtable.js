import { isBoolean, isNumber, isPlainObject, isString } from "lodash";

import { type ObjectMap } from "./object_map";
import check from "./typecheck";

export const paramValidators = {
  fields: check(check.isArrayOf(isString), "the value for `fields` should be an array of strings"),

  filterByFormula: check(isString, "the value for `filterByFormula` should be a string"),

  maxRecords: check(isNumber, "the value for `maxRecords` should be a number"),

  pageSize: check(isNumber, "the value for `pageSize` should be a number"),

  offset: check(isNumber, "the value for `offset` should be a number"),

  sort: check(
    check.isArrayOf((obj): obj is { direction?: "asc" | "desc"; field: string } => {
      return (
        isPlainObject(obj) &&
        isString((obj as ObjectMap<string, unknown>).field) &&
        ((obj as ObjectMap<string, unknown>).direction === void 0 ||
          ["asc", "desc"].includes((obj as ObjectMap<string, string>).direction))
      );
    }),
    "the value for `sort` should be an array of sort objects. " +
      "Each sort object must have a string `field` value, and an optional " +
      '`direction` value that is "asc" or "desc".',
  ),

  view: check(isString, "the value for `view` should be a string"),

  cellFormat: check((cellFormat): cellFormat is "json" | "string" => {
    return isString(cellFormat) && ["json", "string"].includes(cellFormat);
  }, 'the value for `cellFormat` should be "json" or "string"'),

  timeZone: check(isString, "the value for `timeZone` should be a string"),

  userLocale: check(isString, "the value for `userLocale` should be a string"),

  method: check((method): method is "json" | "string" => {
    return isString(method) && ["get", "post"].includes(method);
  }, 'the value for `method` should be "get" or "post"'),

  returnFieldsByFieldId: check(isBoolean, "the value for `returnFieldsByFieldId` should be a boolean"),

  recordMetadata: check(check.isArrayOf(isString), "the value for `recordMetadata` should be an array of strings"),
};

export const URL_CHARACTER_LENGTH_LIMIT = 15000;

export const shouldListRecordsParamBePassedAsParameter = (paramName: string): boolean => {
  return paramName === "timeZone" || paramName === "userLocale";
};

export interface SortParameter<TFields> {
  direction?: "asc" | "desc";
  field: keyof TFields;
}

export interface QueryParams<TFields> {
  cellFormat?: "json" | "string";
  fields?: Array<keyof TFields>;
  filterByFormula?: string;
  maxRecords?: number;
  method?: string;
  offset?: number;
  pageSize?: number;
  recordMetadata?: string[];
  returnFieldsByFieldId?: boolean;
  sort?: Array<SortParameter<TFields>>;
  timeZone?: string;
  userLocale?: string;
  view?: string;
}
