import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";

export const Menu = () => {
  return (
    <Sheet>
      <SheetTrigger className="flex h-fit border-r">
        <div className="flex items-center p-2 gap-2">
          <MenuIcon width={25} height={25} />
          <div className="text-xl font-mina mt-1">Buildifyy</div>
        </div>
      </SheetTrigger>
      <SheetContent side="left" className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Are you sure absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
