// A list of all content for a specific category
import React from 'react';

import { getFormattedName } from '@/helpers/category.helpers';

import ContentList from '../ContentList';
import SEO from '../SEO';

const AllContentInCategory = ({ categoryTitle, content }) => {
  const pageTitle = `${categoryTitle} articles`;

  const groupedContent = [
    {
      title: categoryTitle || 'Blog',
      content,
    },
  ];

  return (
    <>
      <SEO title={pageTitle} />

      <ContentList groupedContent={groupedContent} />
    </>
  );
};

export default AllContentInCategory;
