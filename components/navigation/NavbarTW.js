import Image from "next/image";
import Link from "next/link";

export default function ({ imgUri }) {
    return (
        <nav className="bg-white p-4">
            <div className="container mx-auto flex items-center justify-between">
                <div>
                    <Link href="/" className="flex items-center text-white font-bold">
                        <Image src="/assets/global/logo.png" alt="Logo" width={176} height={27} />
                    </Link>
                </div>
                <div className="flex items-center">
                    <div className="relative">
                        <button className="text-black hover:text-white mr-4">Modules</button>
                        <div className="absolute bg-white w-48 mt-2 p-2 rounded shadow-lg hidden">
                            <Link href="/module1" className="block text-gray-800 hover:bg-gray-200 py-1 px-2 rounded">
                                Module 1
                            </Link>
                            <Link href="/module2" lassName="block text-gray-800 hover:bg-gray-200 py-1 px-2 rounded">
                                Module 2
                            </Link>
                            <Link href="/module3" className="block text-gray-800 hover:bg-gray-200 py-1 px-2 rounded">
                                Module 3
                            </Link>
                        </div>
                    </div>
                    <Link href="/plans" className="text-black hover:text-white mr-4">
                        Plans
                    </Link>
                    <Link href="/contacts" className="text-black hover:text-white mr-4">
                        Contacts
                    </Link>
                    <Link href="/about" className="text-black hover:text-white mr-4">
                        About
                    </Link>
                    <Link href="/login" className="text-black hover:text-white mr-4">
                        Login
                    </Link>
                    <Link href="/register" className="text-black hover:text-white mr-4">
                        Register
                    </Link>
                </div>
            </div>
        </nav>
    );
};