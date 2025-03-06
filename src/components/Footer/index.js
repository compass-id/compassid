import React from "react";

function Footer() {
  const socials = [
    {
      src: "https://static.xx.fbcdn.net/rsrc.php/yT/r/aGT3gskzWBf.ico?_nc_eui2=AeFGwtFgLdVIHM7LBnFuKvT_rSiY817De8atKJjzXsN7xqi8ECKJdfPZh9_pxx_g-_0wOCb9xZ5iP9uVJIRjdb8O",
      url: "https://facebook.com/compasspubindonesia",
    },
    {
      src: "https://static.cdninstagram.com/rsrc.php/v3/yG/r/De-Dwpd5CHc.png",
      url: "https://instagram.com/compasspubindonesia",
    },
    {
      src: "https://static.licdn.com/aero-v1/sc/h/akt4ae504epesldzj74dzred8",
      url: "https://www.linkedin.com/company/compass-publishing-indonesia",
    },
    {
      src: "https://www.youtube.com/s/desktop/050e6796/img/favicon_144x144.png",
      url: "https://www.youtube.com/@compasspubindonesia",
    },
    {
      src: "https://sf16-sg.tiktokcdn.com/obj/eden-sg/uvkuhyieh7lpqpbj/pwa/192x192.png",
      url: "https://www.tiktok.com/@compasspubindonesia?is_from_webapp=1&sender_device=pc",
    },
    {
      src: "https://images.tokopedia.net/img/lite-sw/assets/144px.png",
      url: "https://www.tokopedia.com/ptsolusiedukasi",
    },
  ];

  return (
    <>
      <div className="footer">
        <div className="container section">
          <div className="section">
            {socials.map((soc, index) => (
              <>
                <a
                  href={soc.url}
                  target="
                _blank"
                  key={index}
                >
                  <img loading="lazy" src={soc.src} alt="" />
                </a>
              </>
            ))}
          </div>
        </div>
        <div className="section" style={{ background: "#000" }}>
          <div className="container">
            <p style={{ fontSize: "10pt" }}>
              &copy; 2024 - PT Solusi Edukasi Gemilang
            </p>
            <p style={{ fontSize: "10pt" }}>
              Perhatian: Website ini sedang dalam pengembangan.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
