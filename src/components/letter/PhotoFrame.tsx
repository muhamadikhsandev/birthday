interface PhotoFrameProps {
  src: string;
  alt: string;
}

export default function PhotoFrame({ src, alt }: PhotoFrameProps) {
  return (
    <div className="shrink-0 relative">
      {/* Outer decorative ring */}
      <div
        className="rounded-full p-1"
        style={{
          background: "linear-gradient(135deg, #C96868, #D2B48C, #C96868)",
        }}
      >
        {/* Inner ring */}
        <div className="rounded-full p-1 bg-white">
          {/* Photo */}
          <div
            className="w-44 h-44 md:w-56 md:h-56 rounded-full overflow-hidden"
            style={{
              boxShadow:
                "0 8px 32px rgba(201, 104, 104, 0.25), 0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src={src}
              alt={alt}
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback placeholder
                (e.target as HTMLImageElement).src =
                  "data:image/svg+xml;base64," +
                  btoa(`<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'>
                    <rect fill='#F5E6D3' width='400' height='400'/>
                    <text x='50%' y='45%' font-size='80' text-anchor='middle' dominant-baseline='middle'>🦄</text>
                    <text x='50%' y='65%' font-size='24' text-anchor='middle' fill='%23C96868' font-family='sans-serif'>Foto Doi Cantik</text>
                  </svg>`);
              }}
            />
          </div>
        </div>
      </div>
      {/* Floating heart decoration */}
      <div className="absolute -top-2 -right-2 text-xl animate-bounce">💗</div>
      <div className="absolute -bottom-2 -left-2 text-lg animate-bounce" style={{ animationDelay: "0.3s" }}>🌸</div>
    </div>
  );
}
