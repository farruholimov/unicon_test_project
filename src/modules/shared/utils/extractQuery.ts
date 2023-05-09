import { isEmpty } from 'class-validator';
import { defaultQueryValues } from '../defaults/defaults';

const extractQuery = (query) => {
  const filters = {};
  const sorts = Object.assign({}, defaultQueryValues);

  if (query && Object.keys(query).length) {
    for (const [key, value] of Object.entries(query)) {
      if (!isEmpty(value) && key != 'limit' && key != 'offset' && key != 'page' && key != 'order' && key != 'orderBy') {
        filters[key] = value;
      } else {
        if (!isEmpty(value)) {
          if (key == 'page') {
            sorts.page = Number(value) - 1;
          } else {
            sorts[key] = value;
          }
        }
      }
    }
  }
  sorts.offset = sorts.limit * sorts.page;

  return {
    filters,
    sorts,
  };
};

export default extractQuery;
