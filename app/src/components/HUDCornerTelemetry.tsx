interface HUDCornerTelemetryProps {
  cursorCoords: {
    lat: string;
    lng: string;
    hex1: string;
    hex2: string;
    altLat: string;
    altLng: string;
    rawX: number;
    rawY: number;
  };
}

export function HUDCornerTelemetry({ cursorCoords }: HUDCornerTelemetryProps) {
  return (
    <>
      {/* ================= TOP-LEFT CORNER ================= */}
      <div
        id="hud-top-left"
        className="absolute top-4 left-4 sm:top-7 sm:left-8 z-30 font-mono-hud text-xs sm:text-sm select-none"
      >
        <div className="flex items-center gap-2">
          <span className="text-[#34d399] tracking-wider font-semibold">
            [{cursorCoords.lat}, {cursorCoords.lng}]
          </span>
          <span className="text-[#34d399]/85 text-[11px] sm:text-xs">
            {cursorCoords.hex1}
          </span>
        </div>
      </div>

      {/* ================= TOP-RIGHT CORNER ================= */}
      <div
        id="hud-top-right"
        className="absolute top-4 right-4 sm:top-7 sm:right-8 z-30 font-mono-hud text-xs sm:text-sm select-none text-right"
      >
        <div className="flex items-center justify-end gap-2">
          <span className="text-[#34d399] tracking-wider font-semibold">
            [{cursorCoords.lat}, {cursorCoords.lng}]
          </span>
          <span className="text-[#34d399]/85 text-[11px] sm:text-xs">
            {cursorCoords.hex1}
          </span>
        </div>
      </div>

      {/* ================= BOTTOM-LEFT CORNER ================= */}
      <div
        id="hud-bottom-left"
        className="absolute bottom-4 left-4 sm:bottom-7 sm:left-8 z-30 font-mono-hud text-xs sm:text-sm select-none"
      >
        <div className="flex items-center gap-2">
          <span className="text-[#34d399] tracking-wider font-semibold">
            [{cursorCoords.altLat}, {cursorCoords.lng}]
          </span>
          <span className="text-[#34d399]/85 text-[11px] sm:text-xs">
            {cursorCoords.hex2}
          </span>
        </div>
      </div>

      {/* ================= BOTTOM-RIGHT CORNER ================= */}
      <div
        id="hud-bottom-right"
        className="absolute bottom-4 right-4 sm:bottom-7 sm:right-8 z-30 font-mono-hud text-xs sm:text-sm select-none text-right"
      >
        <div className="flex items-center justify-end gap-2">
          <span className="text-[#34d399] tracking-wider font-semibold">
            [{cursorCoords.lat}, {cursorCoords.altLng}]
          </span>
        </div>
      </div>
    </>
  );
}
