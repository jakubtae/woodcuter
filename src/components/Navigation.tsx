import Link from "next/link";
import { Button } from "./ui/button";

async function Navigation() {
  return (
    <div className="sticky top-0 z-10 bg-red">
      <div className="flex gap-4 justify-between items-center px-2 py-1 font-semibold border-b-2 border-b-foreground/20 bg-background">
        <div className="w-full flex items-center justify-between">
          <Button variant="link" className="font-bold"> <Link href="/">Woodcuter</Link> </Button>
        </div>
      </div>
    </div>
  );
}

export default Navigation;