import React from "react";
const Submit = ({ value, disabled }: { value: string; disabled?: boolean }) => {
  return (
    <div className="p-1 pt-8 ">
      <input
        value={value}
        type="submit"
        disabled={disabled}
        className={`" py-3 px-2 rounded-md  w-full border-2 ${
          disabled && disabled == true
            ? "bg-gray-400 opacity-30 cursor-not-allowed"
            : "bg-base border-base text-white"
        }   "`}
      />
    </div>
  );
};
export default Submit;
