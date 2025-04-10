import './App.css';
import { useStore } from './store/store';
import { PRODUCTS_DATA } from './lib/mockData';
import { Card, CardContent, CardFooter, CardHeader } from './components/ui/card';
import { Button } from './components/ui/button';
import { ChangeQtyButtons } from './components/ChangeQtyButtons/ChangeQtyButtons';
import { Cart } from './components/Cart/Cart';
import { User } from './components/User/User';

function App() {
  /*
  // valid way but less performant than shallow
  const address = useStore((state) => state.address);
  // preferrable -more performant way to get values using useShallow
  const { name, age } = useStore(
    useShallow((state) => ({
      name: state.fullName,
      age: state.age,
    }))
  );
  */
  const addProduct = useStore((state) => state.addProduct);
  const cartProducts = useStore((state) => state.products);
  return (
    <main className="space-y-2 dark h-screen bg-black-500 max-w-sm mx-auto mt-2">
      <div className="w-full flex flex-row justify-between">
        <User />
        <Cart />
      </div>
      <h1 className="text-2xl">Products:</h1>
      <div className="space-y-2">
        {PRODUCTS_DATA.map((prod) => (
          <Card key={prod.id}>
            <CardHeader>{prod.title}</CardHeader>
            <CardContent>${prod.price}</CardContent>
            <CardFooter>
              {cartProducts.find((product) => product.id === prod.id) ? (
                <ChangeQtyButtons prodId={prod.id} />
              ) : (
                <Button variant="outline" onClick={() => addProduct(prod)}>
                  Add to Cart
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}

export default App;
