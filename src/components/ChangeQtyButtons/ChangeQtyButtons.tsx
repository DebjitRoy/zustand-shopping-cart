import { useStore } from '@/store/store';
import { Button } from '../ui/button';
import { useShallow } from 'zustand/shallow';
import { Minus, Plus } from 'lucide-react';
import { useEffect } from 'react';

export const ChangeQtyButtons = ({ prodId }: { prodId: string }) => {
  //   const getProductById = useStore((state) => state.getProductById);
  const { getProductById, increment, decrement, setTotal } = useStore(
    useShallow((state) => ({
      getProductById: state.getProductById,
      increment: state.incrementQty,
      decrement: state.decrementQty,
      setTotal: state.setTotal,
    }))
  );
  const product = getProductById(prodId);
  useEffect(() => {
    const unsubscribe = useStore.subscribe(
      (state) => state.products,
      (products) => {
        const total = products.reduce((acc, cur) => acc + cur.price * cur.qty, 0);
        setTotal(total);
      },
      { fireImmediately: true }
    );
    return unsubscribe;
  }, []);

  return (
    <>
      {product ? (
        <div className=" flex flex-row gap-2 justify-center items-center">
          <Button
            variant="outline"
            className="mx-3"
            onClick={() => {
              decrement(prodId);
            }}
          >
            <Minus />
          </Button>
          <p>{product.qty}</p>
          <Button
            variant="outline"
            className="mx-3"
            onClick={() => {
              increment(prodId);
            }}
          >
            <Plus />
          </Button>
        </div>
      ) : (
        <span>Something went wrong</span>
      )}
    </>
  );
};
