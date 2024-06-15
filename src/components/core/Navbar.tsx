import ThemeMode from "@/components/core/Theme-Mode";
import Link from "next/link";
import AuthButtons from "./AuthButtons";

const Navbar = () => {
  return (
    <nav className="flex justify-end md:justify-between items-center py-2 px-10 md:py-5 md:px-20 border-b">
      <Link href="/" className="text-xl font-semibold hidden md:block">
        <span>Project Management Tool</span>
      </Link>
      <div className="flex gap-5 items-center">
        <AuthButtons />
        <ThemeMode />
      </div>
    </nav>
  );
};

export default Navbar;
