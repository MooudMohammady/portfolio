import React from "react";

const LandingFooter = () => {
  return (
    <footer className="px-2 flex justify-center items-center mt-5">
      <ul className="flex text-lg">
        <li>
          <a
            href="#bio"
            className="px-4 py-3 flex justify-center hover:text-amber-500 transition-colors">
            بیوگرافی
          </a>
        </li>
        <li>
          <a
            href="#samples"
            className="px-4 py-3 flex justify-center hover:text-amber-500 transition-colors">
            نمونه کار ها
          </a>
        </li>
        <li>
          <a
            href="#skills"
            className="px-4 py-3 flex justify-center hover:text-amber-500 transition-colors">
            مهارت ها
          </a>
        </li>
        <li>
          <a
            href="#contact"
            className="px-4 py-3 flex justify-center hover:text-amber-500 transition-colors">
            ارتباط
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default LandingFooter;
