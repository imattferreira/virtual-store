import { Fragment, ReactNode } from "react";
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
      {virtualizedRow
        .getVirtualItems()
        .map(({ index: virtualRowIndex, key: virtualRowKey }) => (
          <Fragment key={virtualRowKey}>
            {virtualizedColumn
              .getVirtualItems()
              .map(({ index: virtualColumnIndex }) => {
                const item = gridItems[virtualRowIndex][virtualColumnIndex];

                // workaround when the last column don't is has all indexes filled
                return !!item ? render(item) : null;
              })}
          </Fragment>
        ))}
    </Container>
  );
}

export default VirtualGridList;
