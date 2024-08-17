// A hardcoded list of categories.
// Sorted in preferential order. Certain contexts might only
// include a subset (eg. mobile nav), and it should be taken
// from the top.
export const CATEGORIES = [
  { name: 'React', slug: 'react' },
  { name: 'Animation', slug: 'animation' },
  { name: 'CSS', slug: 'css' },
  { name: 'Career', slug: 'career' },
  { name: 'JavaScript', slug: 'javascript' },
  { name: 'Next.js', slug: 'nextjs' },
  { name: 'Performance', slug: 'performance' },
];

export const SNIPPET_CATEGORIES = [
  { name: 'JavaScript', slug: 'javascript' },
  { name: 'HTML & CSS', slug: 'html' },
  { name: 'React Component', slug: 'react-components' },
  { name: 'React Hook', slug: 'react-hooks' },
];

// This category is used when an article has no category (eg. meta
// posts).
export const DEFAULT_CATEGORY_SLUG = 'blog';

export const getFormattedName = (categorySlug) => {
  // We have one pseudo-category: 'blog'.
  // For "meta" posts, and stuff that doesn't fit anywhere else.
  // It isn't included in CATEGORIES because it isn't listed as a
  // category.
  if (categorySlug === 'blog') {
    return '';
  }

  const ALL_CATS = [...CATEGORIES, ...SNIPPET_CATEGORIES];

  const category = ALL_CATS.find((cat) => cat.slug === categorySlug);

  return category.name;
};

const prepCategories = (categories) => {
  return categories.map((cat) => {
    return {
      slug: cat.fieldValue,
      name: getFormattedName(cat.fieldValue),
      content: cat.nodes,
    };
  });
};

export const sortCategories = (categories, limit = 100000) => {
  const sortedCategories = [...categories].sort((a, b) => {
    if (a.totalCount <= b.totalCount) {
      return 1;
    }

    return -1;
  });

  const clampedCategories = sortedCategories.slice(0, limit);

  return prepCategories(clampedCategories);
};
