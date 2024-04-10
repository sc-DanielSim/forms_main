import { Field } from '@sitecore-jss/sitecore-jss-nextjs';

type TJsonVal = {
  jsonValue:
    | Field<string>
    | LinkField
    | {
        value: any;
      };
};

type TJsonValBase = {
  Title: TJsonVal;
  Link?: TJsonVal;
  Value?: TJsonVal;
  FieldName?: TJsonVal;
  FieldType?: Field<{ name: any }>;
  Placeholder?: TJsonVal;
  Required?: TJsonVal;
  Source?: TJsonVal;
  Validations?: {
    results: {
      Message: TJsonVal;
      Rule: TJsonVal;
    }[];
  };
} & TJsonChildren;

type TJsonChildren = {
  children?: {
    results: ({
      Source?: Field<TJsonChildren>;
    } & (TJsonValBase & TJsonChildren))[];
  };
};
