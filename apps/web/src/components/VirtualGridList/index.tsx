import { useVirtualizer } from "@tanstack/react-virtual";
import { Fragment, ReactNode, useMemo, useRef } from "react";
import { Container } from "./styles";

type GridVirtualListProps<ItemType> = {
  items: ItemType[];
  cols: number;
  render: (item: ItemType) => ReactNode;
};

const isFirstItem = (index: number) => index === 0;

const getLastItem = <T extends unknown>(arr: T[]): T => arr[arr.length - 1];

function VirtualGridList<ItemType>({
  items,
  cols,
  render,
}: GridVirtualListProps<ItemType>) {
  const parentRef = useRef(null);

  const gridItems = useMemo(() => {
    const result: ItemType[][] = [];

    items.forEach((item, index) => {
      if (isFirstItem(index)) {
        result.push([item]);
        return;
      }

      const row = getLastItem<ItemType[]>(result);

      if (row.length < cols) {
        row.push(item);
        return;
      }

      result.push([item]);
    });

    return result;
  }, [cols, items]);

  const rowVirtualizer = useVirtualizer({
    count: gridItems.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50, // TODO
    overscan: 5, // TODO
  });

  const columnVirtualizer = useVirtualizer({
    count: cols, // TODO
    getScrollElement: () => parentRef.current,
    estimateSize: () => 100, // TODO
    overscan: 5, // TODO
  });

  return (
    <Container
      ref={parentRef}
      style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
    >
      {rowVirtualizer.getVirtualItems().map((virtualRow) => (
        <Fragment key={virtualRow.key}>
          {columnVirtualizer.getVirtualItems().map((virtualColumn) => {
            const item = gridItems[virtualRow.index][virtualColumn.index];

            // workaround when the last column don't is has all indexes filled
            return item === undefined ? null : render(item);
          })}
        </Fragment>
      ))}
    </Container>
  );
}

export default VirtualGridList;
