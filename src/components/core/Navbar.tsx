import ThemeMode from "@/components/core/Theme-Mode";
import Link from "next/link";

const Navbar = () => {

    return (
        <nav className='flex justify-between items-center py-5 px-20 border-b'>
            <Link href='/' className='text-xl font-semibold'>
                <span>Project Management Tool</span>
            </Link>
            <div className='flex gap-5 items-center'>
                <ThemeMode />
            </div>
        </nav>
    );
};

export default Navbar;