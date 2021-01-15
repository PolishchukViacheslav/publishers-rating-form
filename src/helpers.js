/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
import { firstRatingIcon, secondRatingIcon, thirdRatingIcon } from './icons/icons';

/**
  *
  * @param {Array} contacts for sort
  * @param {String} sortType accept next types of sort: 'asc', 'desc', 'default'
  */
export const sorter = (authors, sortType) => {
  const sortParams = sortType.split('_');

  if (sortParams[0] === 'name') {
    const collator = new Intl.Collator('ru', { sensitivity: 'base' });
    return [...authors].sort(
      (itemA, itemB) => {
        const { name: nameA, orderNumber: idxA } = itemA;
        const { name: nameB, orderNumber: idxB } = itemB;
        if (sortParams[1] === 'asc') {
          return collator.compare(nameA, nameB);
        }

        if (sortParams[1] === 'desc') {
          return collator.compare(nameB, nameA);
        }

        if (sortParams[1] === 'init') {
          return Number(idxA) - Number(idxB);
        }

        return 0;
      },
    );
  }

  if (sortParams[0] === 'pageviews') {
    return [...authors].sort(
      (itemA, itemB) => {
        const { pageviews: viewsA, orderNumber: idxA } = itemA;
        const { pageviews: viewsB, orderNumber: idxB } = itemB;
        if (sortParams[1] === 'desc') {
          return Number(viewsA) - Number(viewsB);
        }

        if (sortParams[1] === 'asc') {
          return Number(viewsB) - Number(viewsA);
        }

        if (sortParams[1] === 'init') {
          return Number(idxA) - Number(idxB);
        }

        return 0;
      },
    );
  }
  return null;
};

/**
 *
 * @param {Array} array will return same array with top 3 ten rating added with O(n)
 */
export const addRatingToMax3 = (array) => {
  if (array.length <= 3) return array;
  const max = [
    { author: array[0], index: 0 },
    { author: array[1], index: 1 },
    { author: array[2], index: 2 },
  ];
  max.sort((a, b) => a.value - b.value);

  for (let i = 3; i < array.length; i++) {
    if (array[i] > max[0].author.pageviews) {
      max[0] = { author: array[i], index: i };
      max.sort((a, b) => a.author.pageviews - b.author.pageviews);
    }
  }

  array[max[0].index] = { ...max[0].author, rating: 1 };
  array[max[1].index] = { ...max[1].author, rating: 2 };
  array[max[2].index] = { ...max[2].author, rating: 3 };
  return array;
};

/**
 *
 * @param {Number} rating return JSX SVG Icon
 */
export const ratingIconPreparator = (rating) => {
  switch (rating) {
    case 1:
      return firstRatingIcon;
    case 2:
      return secondRatingIcon;
    case 3:
      return thirdRatingIcon;
    default:
      return null;
  }
};
