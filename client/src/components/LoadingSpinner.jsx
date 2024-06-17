import React from "react";

export default function LoadingSpinner() {
  return (
    <div className="w-full h-[85vh] flex justify-center items-start pt-40 ">
      <div
        className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:anim  ate-[spin_1.5s_linear_infinite] text-center"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    </div>
  );
}
