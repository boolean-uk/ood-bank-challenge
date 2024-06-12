import React, { useState } from "react";

type TileProps = {
  title: string;
  description: string;
  actionButton: () => void;
  buttonTitle: string;
};

function Tile2({ title, description, actionButton, buttonTitle }: TileProps) {
  return (
    <div className=" sm:items-center md:gap-8">
      <div className="rounded-2xl border border-indigo-600 p-6 shadow-sm ring-1 ring-indigo-600 sm:order-last sm:px-8 lg:p-6">
        <div className="text-center">
          <p>
            <strong className="text-3xl font-bold text-gray-900 sm:text-4xl">
              {title}
            </strong>
          </p>
        </div>
        <div className="flex flex-col justify-center pt-4">
          <p className=" font-light">
            {description} <br />
          </p>
        </div>
        <button
          onClick={() => actionButton()}
          className="btn btn-accent btn-outline btn-wide mt-12"
        >
          {buttonTitle}
        </button>
      </div>
    </div>
  );
}

export default Tile2;
