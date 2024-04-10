import { Field } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

import { getCategories, setListCategories } from './../../redux/ocNewsCategories';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'src/redux/store';

type TNewsCategoryProps = ComponentProps & {
  fields: {
    items: {
      id: string;
      name: string;
      displayName: string;
      fields: {
        Title: Field<string>;
      };
    }[];
  };
};

const NewsCategory = (props: TNewsCategoryProps): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const categoriesList = useSelector(getCategories);

  if (!categoriesList || !categoriesList.length) {
    dispatch(setListCategories(props.fields.items));
  }

  return <></>;
};

export default NewsCategory;
