import React from 'react';

export default function CrosswalkDivider() {
  return (
    <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen py-6 flex items-center justify-center overflow-x-clip">
      <div
        className="w-full h-16 border-y-4 border-[#121316] relative shadow-[4px_4px_0px_0px_#121316] flex items-center justify-center"
        style={{
          background: `repeating-linear-gradient(
            -45deg,
            #121316 0px,
            #121316 26px,
            #FFD13B 26px,
            #FFD13B 52px,
            #F4F5F7 52px,
            #F4F5F7 78px
          )`,
        }}
      >
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          <div className="flex items-center gap-4 bg-[#121316]/95 px-6 py-2 border-2 border-[#FFD13B] rounded shadow-[4px_4px_0px_0px_#121316] text-xs font-mono">
            <i className="fa-solid fa-person-walking text-[#FFD13B] text-base"></i>
            <span className="text-[#F4F5F7] font-bold tracking-wider">
              MOVING FORWARD // FROM CODE TO PRODUCTION SYSTEMS
            </span>
            <span className="text-[#FFD13B] font-mono font-bold">[ROAD TO SDE-2]</span>
          </div>
        </div>
      </div>
    </div>
  );
}