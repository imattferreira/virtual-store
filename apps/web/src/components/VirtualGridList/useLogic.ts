import { useVirtualizer } from "@tanstack/react-virtual";
import { useMemo, useRef } from "react";

interface HookProps<ItemType> {
  items: ItemType[];
  cols: number;
}

const isFirstItem = (index: number) => index === 0;

const getLastItem = <T extends unknown>(arr: T[]): T => arr[arr.length - 1];

function useVirtualGridListLogic<ItemType>({
  items,
  cols,
}: HookProps<ItemType>) {
  const parentRef = useRef(null);

  const gridItems = useMemo(() => {
    const result: ItemType[][] = [];

    items.forEach((item, index) => {
      if (isFirstItem(index)) {
        result.push([]);
        return;
      }

      const column = getLastItem<ItemType[]>(result);

      if (column.length === cols) {
        result.push([item]);
        return;
      }

      column.push(item);
    });

    return result;
  }, [cols, items]);

  const virtualizedRow = useVirtualizer({
    count: gridItems.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50, // TODO
    overscan: 5, // TODO
  });

  const virtualizedColumn = useVirtualizer({
    count: cols, // TODO
    getScrollElement: () => parentRef.current,
    estimateSize: () => 100, // TODO
    overscan: 5, // TODO
  });

  return { parentRef, virtualizedRow, virtualizedColumn, gridItems };
}

export default useVirtualGridListLogic;
