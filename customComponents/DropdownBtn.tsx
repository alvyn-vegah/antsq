import { useState } from "react";
import { X } from "lucide-react"; 
import { AlignJustify } from "lucide-react";
import clsx from "clsx";
import { Link } from "@/navigation";

interface propType {
  name:string,
  url:string,
}

const DropdownBtn = ({content}:{content:propType[]}) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => setIsOpen(!isOpen);
    return (
        <div className="relative">
      {/* Toggle Button */}
      <button
        onClick={toggleDropdown}
        className="mx-auto flex items-center justify-center bg-transparent rounded-md shadow p-2"
      >
        {
            !isOpen ? <AlignJustify size={24} /> :  <X size={24} />  
        }
      </button>

      {/* Dropdown List */}
      <div
        className={clsx(
          'absolute left-1/2 -translate-x-1/2 mt-2 flex flex-col bg-white rounded-md overflow-hidden shadow-lg transition-all duration-300 ease-in-out z-40',
          isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        )}
      >
        {content.map((item, index) => (
          <Link href={item.url}>
          <button
            key={index}
            className="text-left px-6 py-3 hover:bg-gray-700 hover:text-white text-gray-800 font-medium transition-colors w-[60vw]"
          >
            {item.name}
          </button>
          </Link>
        ))}
      </div>
    </div>
    )
}

export default DropdownBtn