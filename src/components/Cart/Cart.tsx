import { PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { Popover } from '../ui/popover';
import { Button } from '../ui/button';
import { CircleX, ShoppingCart, Trash2 } from 'lucide-react';
import { useStore } from '@/store/store';
import { useShallow } from 'zustand/shallow';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { ChangeQtyButtons } from '../ChangeQtyButtons/ChangeQtyButtons';

export const Cart = () => {
  const { total, reset, products, removeProduct, address } = useStore(
    useShallow((state) => ({
      products: state.products,
      reset: state.reset,
      removeProduct: state.removeProduct,
      total: state.total,
      address: state.address,
    }))
  );
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon">
          <ShoppingCart />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="overflow-y-auto  space-y-2 w-96 bg-orange-300 rounded-[10px] p-5 h-[750px]">
        <div className="flex w-full gap-2 text-lg items-center">
          <h1>Cart:</h1>
          <Button onClick={reset} variant="destructive" size="icon">
            <CircleX />
          </Button>
        </div>
        <div className="space-y-2">
          {products.map((product) => (
            <Card key={product.id} className="flex flex-col">
              <CardHeader className="flex flex-row items-center gap-2">
                <CardTitle>{product.title}</CardTitle>
                <Button size="icon" onClick={() => removeProduct(product.id)}>
                  <Trash2 />
                </Button>
              </CardHeader>
              <CardContent>{product.price}</CardContent>
              <CardFooter>
                <ChangeQtyButtons prodId={product.id} />
              </CardFooter>
            </Card>
          ))}
        </div>
        <p>Total: ${total}</p>
        <p>Address to: {address}</p>
      </PopoverContent>
    </Popover>
  );
};
