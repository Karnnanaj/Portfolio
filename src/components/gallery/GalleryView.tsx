"use client";

import { Media, MasonryGrid, Column, Text } from "@once-ui-system/core";
import { gallery } from "@/resources";

export default function GalleryView() {
  return (
    <MasonryGrid columns={2} s={{ columns: 1 }}>
      {gallery.images.map((image, index) => (
        <Column key={index} gap="m">
          <Media
            enlarge
            priority={index < 10}
            sizes="(max-width: 560px) 100vw, 50vw"
            radius="m"
            aspectRatio={image.orientation === "horizontal" ? "16 / 9" : "3 / 4"}
            src={image.src}
            alt={image.alt}
          />
          {image.caption && (
            <Text variant="body-default-s" onBackground="neutral-weak">
              {image.caption}
            </Text>
          )}
        </Column>
      ))}
    </MasonryGrid>
  );
}
