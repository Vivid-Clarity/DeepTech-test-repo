import { useEffect, useRef, useState } from 'react';
import { galleryImages } from '../data/gallery';
import './Gallery.css';

function Gallery() {
  const [selected, setSelected] = useState(null);
  const closeButtonRef = useRef(null);
  const lastTriggerRef = useRef(null);

  function openImage(image, event) {
    lastTriggerRef.current = event.currentTarget;
    setSelected(image);
  }

  function closeImage() {
    setSelected(null);
    lastTriggerRef.current?.focus();
  }

  useEffect(() => {
    if (!selected) return undefined;
    closeButtonRef.current?.focus();

    function handleKeyDown(event) {
      if (event.key === 'Escape') closeImage();
    }
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selected]);

  return (
    <div className="container page">
      <h1>Gallery</h1>
      <p className="lead">A peek inside the bakery. Select a photo to see it larger.</p>

      <ul className="gallery-grid">
        {galleryImages.map((image) => (
          <li key={image.id}>
            <button
              type="button"
              className="gallery-item"
              onClick={(event) => openImage(image, event)}
            >
              <img src={image.src} alt={image.alt} loading="lazy" width="800" height="600" />
              <span className="gallery-caption">{image.title}</span>
            </button>
          </li>
        ))}
      </ul>

      {selected && (
        <div className="lightbox" onClick={closeImage}>
          <div
            className="lightbox-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="lightbox-title"
            onClick={(event) => event.stopPropagation()}
          >
            <img src={selected.src} alt={selected.alt} width="800" height="600" />
            <div className="lightbox-footer">
              <h2 id="lightbox-title">{selected.title}</h2>
              <button
                type="button"
                className="button button-secondary"
                ref={closeButtonRef}
                onClick={closeImage}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gallery;
