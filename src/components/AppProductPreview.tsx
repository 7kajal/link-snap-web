const PRODUCT_IMAGE = "/media/app-product-reference.webp";

export function AppProductPreview({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      {/* Smaller blue-grey background */}
      <div className="relative flex h-[88%] min-h-0 w-[90%] items-center justify-center overflow-hidden rounded-[18px] bg-[#424957]">
        <img
          src={PRODUCT_IMAGE}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full scale-125 object-cover blur-[18px]"
        />

        <div aria-hidden="true" className="absolute inset-0 bg-[#1c202a]/45" />

        {/* Product card */}
        <div
          className={`relative w-full overflow-hidden rounded-[14px] border border-white/10 bg-[#111113] shadow-[0_8px_25px_rgba(0,0,0,0.3)] ${
            compact ? "mx-3 max-w-[176px] p-1.5" : "mx-3 max-w-[200px] p-2"
          }`}
        >
          <div
            className={`overflow-hidden rounded-[9px] bg-white ${
              compact ? "h-[68px]" : "h-[112px]"
            }`}
          >
            <img
              src={PRODUCT_IMAGE}
              alt=""
              className="h-full w-full object-contain"
            />
          </div>

          <div className={compact ? "pt-1.5" : "pt-2"}>
            <span
              className={`inline-flex items-center rounded-full bg-[#ff9900] font-bold italic text-white ${
                compact ? "px-2 py-0.5 text-[7px]" : "px-2.5 py-0.5 text-[8px]"
              }`}
            >
              amazon
            </span>

            <p
              className={`mt-1 line-clamp-2 font-display font-bold leading-tight text-white ${
                compact ? "text-[8px]" : "text-[10px]"
              }`}
            >
              Samsung Galaxy S25 Ultra 5G AI Smartphone
            </p>

            <div
              className={`mt-1 flex flex-wrap items-center gap-x-1.5 gap-y-0.5 font-bold text-white ${
                compact ? "text-[9px]" : "text-[11px]"
              }`}
            >
              <span>₹94,999.00</span>

              <span
                className={`font-normal text-zinc-400 line-through ${
                  compact ? "text-[7px]" : "text-[8px]"
                }`}
              >
                ₹1,29,999
              </span>

              <span
                className={`rounded bg-[#ffdfd7] px-1 py-0.5 font-bold text-[#a32e13] ${
                  compact ? "text-[7px]" : "text-[8px]"
                }`}
              >
                27% off
              </span>
            </div>

            <div
              className={`mt-1 flex items-center gap-1 font-semibold ${
                compact ? "text-[7px]" : "text-[8px]"
              }`}
            >
              <span className="tracking-[-0.06em] text-amber-500">★★★★</span>
              <span className="text-zinc-300">★</span>
              <span className="text-zinc-300">
                4.4 <span className="font-normal text-zinc-500">(4K)</span>
              </span>
            </div>

            <p
              className={`mt-1 text-zinc-400 ${
                compact ? "text-[7px]" : "text-[8px]"
              }`}
            >
              Sold by Samsung
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export { PRODUCT_IMAGE };
