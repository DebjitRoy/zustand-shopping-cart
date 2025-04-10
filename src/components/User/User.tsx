import { PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { Popover } from '../ui/popover';
import { Button } from '../ui/button';
import { UserIcon } from 'lucide-react';
import { useStore } from '@/store/store';
import { useShallow } from 'zustand/shallow';
import { Label } from '@radix-ui/react-label';
import { Input } from '../ui/input';
import { useEffect } from 'react';

export const User = () => {
  const { address, fullName, userName, setAddress, fetchUser } = useStore(
    useShallow((state) => ({
      address: state.address,
      fullName: state.fullName,
      userName: state.userName,
      setAddress: state.setAddress,
      fetchUser: state.fetchUser,
    }))
  );
  useEffect(() => {
    (async () => {
      await fetchUser();
    })();
  }, [fetchUser]);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon">
          <UserIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="overflow-y-auto  space-y-2 w-96 bg-orange-300 rounded-[10px] p-5 h-[250px]">
        <div className="flex flex-col gap-2 items-center">
          <p>
            {fullName} <span className="text-sm">({userName})</span>
          </p>

          <Label htmlFor="address" className="w-full">
            Address:
            <Input
              id="address"
              className="my-2"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Label>
        </div>
      </PopoverContent>
    </Popover>
  );
};
