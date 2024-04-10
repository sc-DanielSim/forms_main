import { Field, ImageField } from '@sitecore-jss/sitecore-jss-nextjs';

type TListItem = {
  id: string;
  url: string;
  name: string;
  displayName: string;
};

type TNewsTag = TListItem & {
  fields: {
    Title: Field<string>;
  };
};

type TNewsDetail = {
  DisplayDate: Field<string>;
  NewsTypeTag?: Field<string>;
  CategoryTags?: TNewsTag[];
  FeaturedTag: TNewsTag;
  Content: Field<string>;
  ShortContent: Field<string>;
  Image: Field<ImageField>;
  Title?: Field<string>;
};
