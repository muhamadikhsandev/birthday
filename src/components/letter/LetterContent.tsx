export default function LetterContent() {
  return (
    <div className="flex-1 min-w-0">
      {/* Letter heading */}
      <h3
        className="text-4xl md:text-5xl text-[#C96868] mb-4 leading-tight"
        style={{ fontFamily: "var(--font-sacramento)" }}
      >
        Dear Sayangku...
      </h3>

      {/* Scrollable letter body */}
      <div
        className="max-h-[45vh] overflow-y-auto pr-3 custom-scrollbar space-y-4"
        style={{ fontFamily: "var(--font-sacramento)" }}
      >
        <p className="text-3xl md:text-4xl leading-tight text-[#C96868] text-center font-medium">
          Selamat ulang tahun ya sayang! 🎂🎉 Hari ini adalah hari yang paling
          spesial buat aku, karena di hari ini kamu hadir ke dunia — dan itu
          artinya banyak banget buatku.
        </p>

        <p className="text-3xl md:text-4xl leading-tight text-[#C96868] text-center font-medium">
          Makasih udah selalu jadi orang yang paling sabar, paling lucu, dan
          selalu support aku dalam keadaan apa pun — termasuk pas aku lagi
          lemes nyari kerja dan ngoding kayak gini demi bikin sesuatu yang
          bisa bikin kamu senyum. 😊
        </p>

        <p className="text-3xl md:text-4xl leading-tight text-[#C96868] text-center font-medium">
          Kamu itu selalu tau cara bikin hari-hariku jadi lebih ringan. Ketawa
          bareng kamu tuh nggak ada obatnya. Dan setiap momen kecil yang kita
          lewatin bareng — itu yang bikin hidupku terasa penuh.
        </p>

        <p className="text-3xl md:text-4xl leading-tight text-[#C96868] text-center font-medium">
          Semoga di usia yang baru ini, kamu makin berkah, dilancarkan segala
          urusannya di daycare, makin sehat, makin cantik (kalau itu masih
          mungkin 😂), dan apa yang kamu semogakan bisa segera terwujud — satu
          per satu, insyaallah. 🤲
        </p>

        <p className="text-3xl md:text-4xl leading-tight text-[#C96868] text-center font-medium">
          Di sini ada buket digital 💐 dan doa terbaik yang selalu mengalir
          buat kamu. Semoga kamu ngerasa dicintai hari ini — karena kamu
          emang selayaknya dapat itu setiap hari.
        </p>

        <p className="text-3xl md:text-4xl leading-tight text-[#C96868] text-center font-medium">
          I love you so much! 🫰🏻✨
        </p>

        {/* Signature */}
        <div className="pt-4 text-right">
          <p
            className="text-3xl text-[#C96868]"
            style={{ fontFamily: "var(--font-sacramento)" }}
          >
            Dengan cinta,
          </p>
          <p
            className="text-4xl text-[#C96868] mt-1"
            style={{ fontFamily: "var(--font-sacramento)" }}
          >
            Cans 🦄💗
          </p>
        </div>

        {/* Bottom decorations */}
        <div className="flex justify-center gap-3 pt-2 text-lg">
          {["🌹", "💐", "🌸", "🌷", "💗"].map((icon, i) => (
            <span key={i} className="animate-bounce" style={{ animationDelay: `${i * 0.15}s` }}>
              {icon}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
