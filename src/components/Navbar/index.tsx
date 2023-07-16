import prismadb from "@/lib/prismadb"

import MainNav from "./main-nav"
import StoreSwitcher from "./store-switcher"
import UserButton from "./user-button"

type Props = { userId: string }
async function Navbar({ userId }: Props) {
  const stores = await prismadb.store.findMany({
    where: { userId },
  })

  return (
    <nav className=" flex  min-h-[4rem] items-center border-b">
      <section className="container flex items-center">
        <StoreSwitcher items={stores} />
        <MainNav />
        <div className="ml-auto flex items-center space-x-4">
          <UserButton />
        </div>{" "}
      </section>
    </nav>
  )
}

export default Navbar
