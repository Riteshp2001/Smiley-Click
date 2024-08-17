import React from 'react';

export const ContentContext = React.createContext();

export const ContentProvider = ({
  children,
  contentType,
  slug,
  title,
  subtitle,
  category,
  formattedCategory,
  isPublished,
  location,
  hits,
}) => {
  const data = React.useMemo(
    () => ({
      contentType,
      slug,
      title,
      subtitle,
      category,
      formattedCategory,
      isPublished,
      location,
      hits,
    }),
    [
      contentType,
      slug,
      title,
      subtitle,
      category,
      formattedCategory,
      isPublished,
      location,
      hits,
    ]
  );

  return (
    <ContentContext.Provider value={data}>{children}</ContentContext.Provider>
  );
};

export default ContentProvider;
