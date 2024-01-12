import { CardItem, CardItemSkeleton } from './card-item';

export const CardList = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <CardItem />
    </div>
  );
};

export const CardListSkeleton = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {[...Array(4)].map((_, i) => (
        <CardItemSkeleton key={i} />
      ))}
    </div>
  );
};
