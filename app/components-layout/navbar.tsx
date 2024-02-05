import Wallet from "../components-app/Wallet";

const Navbar = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <div className="text-3xl font-bold underline">
      <div className={"bg-base-04 flex items-center lg:justify-between h-[48px] lg:h-[60px] w-full px-2.5 lg:px-5"}>
        {children}
      </div>
    </div>
)
}

export default Navbar;
