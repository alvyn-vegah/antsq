"use client"
import React, { useState, ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import clsx from 'clsx';

interface SheetDropdownProps {
  title: string;
  children: ReactNode;
  pathname: string;
  icon?: ReactNode;
}

const SheetDropdown: React.FC<SheetDropdownProps> = ({ title, children, pathname, icon }) => {
  const [isOpen, setIsOpen] = useState(false);

  const hasActiveLink = React.Children.toArray(children).some(child => {
      if (React.isValidElement<{ children?: React.ReactNode }>(child)) {
          const link = child.props.children;
          if (React.isValidElement<{ href?: string }>(link) && link.props.href) {
            return pathname.startsWith(link.props.href);
          }
      }
      return false;
  });

  return (
    <div className="w-full">
      <button
        type="button"
        className={clsx(
          'flex items-center justify-between w-full text-lg cursor-pointer hover:text-[#ee4123]',
          hasActiveLink && 'text-[#ee4123]'
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="flex items-center gap-2">
          {icon}
          <span>{title}</span>
        </span>
        <ChevronDown
          className={clsx(
            'h-5 w-5 transition-transform duration-300',
            isOpen && 'rotate-180'
          )}
        />
      </button>
      <div
        className={clsx(
          'overflow-hidden transition-all duration-300 ease-in-out',
          isOpen ? 'max-h-screen' : 'max-h-0'
        )}
      >
        <div className="py-2 pl-4 flex flex-col gap-2 text-sm">
          {children}
        </div>
      </div>
    </div>
  );
};

export default SheetDropdown; 