import React, { useState } from 'react';

function LazyImage({ src, alt, placeholder }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div>
      {!loaded && !error && <img loading="lazy" src={placeholder} alt="Loading..." />}
      <img loading="lazy"
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        style={{ display: loaded ? 'block' : 'none' }}
      />
      {error && <p>Failed to load image.</p>}
    </div>
  );
}

export default LazyImage;