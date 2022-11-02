import { useVirtualizer } from "@tanstack/react-virtual";
import { Fragment, ReactNode, useMemo, useRef } from "react";
import { Container } from "./styles";
import useLogic from "./useLogic";

type GridVirtualListProps<ItemType> = {
  items: ItemType[];
  cols: number;
  render: (item: ItemType) => ReactNode;
};

function VirtualGridList<ItemType>({
  items,
  cols,
  render,
}: GridVirtualListProps<ItemType>) {
  const { parentRef, virtualizedColumn, virtualizedRow, gridItems } =
    useLogic<ItemType>({ items, cols });

  return (
    <Container
      ref={parentRef}
      style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
    >
      {virtualizedRow.getVirtualItems().map((virtualRow) => (
        <Fragment key={virtualRow.key}>
          {virtualizedColumn.getVirtualItems().map((virtualColumn) => {
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
