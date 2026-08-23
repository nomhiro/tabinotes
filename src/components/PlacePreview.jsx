import { useState } from "react";
import "./PlacePreview.css";

export default function PlacePreview({ image, variant = "timeline" }) {
  const [hasError, setHasError] = useState(false);

  if (!image?.src || !image.alt || hasError) return null;

  return (
    <figure
      className={`place-preview place-preview--${variant}`}
      onClick={(event) => event.stopPropagation()}
    >
      <img
        className="place-preview-image"
        src={image.src}
        alt={image.alt}
        loading="lazy"
        decoding="async"
        onError={() => setHasError(true)}
      />
      {(image.credit || image.sourceUrl) && (
        <figcaption className="place-preview-caption">
          <span aria-hidden="true">📷</span>{" "}
          {image.sourceUrl ? (
            <a
              href={image.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {image.credit || "画像の出典"}
            </a>
          ) : (
            image.credit
          )}
        </figcaption>
      )}
    </figure>
  );
}
