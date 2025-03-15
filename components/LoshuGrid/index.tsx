import React, { FC } from "react";

interface LoshuGridProps {
  grid: number[];
}

export const LoshuGrid: FC<LoshuGridProps> = ({ grid }) => {
  const renderGridCell = (value: number, index: number) => {
    const position = index + 1;
    const hasNumber = value > 0;

    return (
      <div
        key={index}
        className={`relative flex flex-col items-center justify-center p-4 border ${
          hasNumber
            ? "bg-blue-50 border-blue-200"
            : "bg-gray-50 border-gray-200"
        }`}
      >
        <div className="absolute top-1 left-1 text-xs text-gray-500">
          {position}
        </div>
        {hasNumber && (
          <div className="text-blue-600 text-lg tracking-wide">
            {Array(value).fill("●").join(" ")}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <div className="grid grid-cols-3 grid-rows-3 gap-2 aspect-square">
        {grid.map((value, index) => renderGridCell(value, index))}
      </div>
    </div>
  );
};
