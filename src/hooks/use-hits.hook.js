import React from 'react';

export default function useHits(slug) {
  const [hits, setHits] = React.useState(null);

  React.useEffect(() => {
    const isE2ETest = window.location.search.match('e2e-test=true');

    // Register the article as seen!
    if (!isE2ETest && process.env.NODE_ENV === 'production') {
      // Fetch the # of hits
      fetch(`/api/get-article-hits?slug=${slug}`)
        .then((res) => res.json())
        .then((json) => {
          if (typeof json.hits === 'number') {
            setHits(json.hits + 1);
          }
        });
    } else {
      setHits(1337);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return hits;
}
