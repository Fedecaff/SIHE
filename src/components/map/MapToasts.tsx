import { useEffect, useRef } from "react";
import { toast } from "sonner";

export type MapToast = {
  id: string;
  text: string;
  tone: "alert" | "status";
};

type Props = {
  items: MapToast[];
  onDismiss: (item: MapToast) => void;
};

export function MapToasts({ items, onDismiss }: Props) {
  const onDismissRef = useRef(onDismiss);
  const activeIds = useRef(new Set<string>());

  useEffect(() => {
    onDismissRef.current = onDismiss;
  }, [onDismiss]);

  useEffect(() => {
    const nextIds = new Set(items.map((item) => `map-${item.id}`));
    const removedIds = [...activeIds.current].filter((id) => !nextIds.has(id));
    activeIds.current = nextIds;

    for (const id of removedIds) {
      toast.dismiss(id);
    }

    for (const item of items) {
      const id = `map-${item.id}`;
      const options = {
        id,
        duration: Infinity,
        closeButton: true,
        closeButtonAriaLabel: `Descartar: ${item.text}`,
        onDismiss: () => {
          if (activeIds.current.has(id)) {
            onDismissRef.current(item);
          }
        },
      };

      if (item.tone === "alert") {
        toast.error(item.text, options);
      } else {
        toast.info(item.text, options);
      }
    }
  }, [items]);

  return null;
}
