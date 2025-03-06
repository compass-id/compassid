import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";

function Home() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [post, setPost] = useState([]);
  const [event, setEvent] = useState([]);
  const [books, setBook] = useState([]);
  const [lang, setLang] = useState("id");
  const posts = post.slice(0, 6);
  const events = event.slice(0, 3);

  const navigat = useNavigate();

  const navigate = (val) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    navigat(val);
  };

  useEffect(() => {
    setCurrentTime(new Date());

    const getpost = async () => {
      let url = "";
      lang === "en"
        ? (url = `https://seg-server.vercel.app/api/posts/en`)
        : (url = `https://seg-server.vercel.app/api/posts/id`);
      lang === "id"
        ? (url = `https://seg-server.vercel.app/api/posts/id`)
        : (url = `https://seg-server.vercel.app/api/posts/en`);
      try {
        const datas = await axios.get(url);

        setPost(datas.data);
      } catch (error) {
        window.alert(error.message);
      }
    };

    getpost();

    const getevent = async () => {
      let url = `https://seg-server.vercel.app/api/events`;
      try {
        const datas = await axios.get(url);

        setEvent(datas.data);
      } catch (error) {
        window.alert(error.message);
      }
    };

    getevent();

    const getBooks = async () => {
      let url = `https://seg-server.vercel.app/api/booked/key/%201%20`;
      try {
        const datas = await axios.get(url);
        setBook(datas.data);
      } catch (error) {
        window.alert(error.message);
      }
    };

    getBooks();
  }, [lang]);

  const getGreeting = () => {
    const hours = currentTime.getHours();

    if (hours >= 5 && hours < 12) {
      return (
        <h5>
          <i style={{ marginRight: "10px" }} className="fas fa-cloud-sun"></i>{" "}
          Hello, Good Morning!
        </h5>
      );
    } else if (hours >= 12 && hours < 15) {
      return (
        <h5>
          <i style={{ marginRight: "10px" }} className="fas fa-sun"></i> Hello
          Educators, Good Day!
        </h5>
      );
    } else if (hours >= 15 && hours < 18) {
      return (
        <h5>
          <i style={{ marginRight: "10px" }} className="fas fa-cloud-sun"></i>{" "}
          Hello, Good Afternoon!
        </h5>
      );
    } else if (hours >= 18 && hours < 21) {
      return (
        <h5>
          <i style={{ marginRight: "10px" }} className="fas fa-cloud-moon"></i>{" "}
          Hello, Good Evening!
        </h5>
      );
    } else if (hours >= 21 || hours < 5) {
      return (
        <h5>
          <i
            style={{ marginRight: "10px" }}
            className="fas fa-star-and-crescent"
          ></i>{" "}
          Hello, Good Night!
        </h5>
      );
    }
  };

  const greeting = getGreeting();

  const partners = [
    {
      src: "/assets/img/partner/b.jpg",
      uri: "https://compasspub.com/eng",
    },
    {
      src: "/assets/img/partner/a.jpg",
      uri: "https://classboxenglish.com",
    },
    {
      src: "/assets/img/partner/c.jpg",
      uri: "https://global.playbigbox.com",
    },
    {
      src: "/assets/img/partner/d.jpg",
      uri: "",
    },
    {
      src: "/assets/img/partner/f.jpg",
      uri: "https://www.readingoceans.com",
    },
  ];

  const icons = [
    {
      src: "fas fa-home",
      url: "/",
      label: "Home",
    },
    {
      src: "fas fa-book",
      url: "/books",
      label: "Book",
    },
    {
      src: "fas fa-calendar-alt",
      url: "/events",
      label: "Event",
    },
  ];

  const langSet = (a, b) => {
    setLang(a);
    document.querySelectorAll(`#${a}`).forEach((element) => {
      element.classList.add("active");
    });
    document.querySelectorAll(`#${b}`).forEach((element) => {
      element.classList.remove("active");
    });
  };

  const formatTime = (dateString) => {
    // Create a new Date object from the provided dateString
    const date = new Date(dateString);

    // Define arrays for day names and month names
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Get the day of the week, month, day, and year from the Date object
    const dayOfWeek = daysOfWeek[date.getDay()];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    // Get the hours and minutes from the Date object
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Format the time as "HH.MM"
    const time = `${hours < 10 ? "0" : ""}${hours}.${
      minutes < 10 ? "0" : ""
    }${minutes}`;

    // Return the formatted date string
    return `${dayOfWeek}, ${day} ${month} ${year}. ${time} WIB`;
  };

  const handleClick = (val) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    navigate(`/post-view/${lang}/${val}`);
  };

  const handleEvent = (val) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    navigate(`/event-join/${val}`);
  };

  // create currency format function
  function formatCurrency(number) {
    // define options for formatting
    const options = {
      style: "currency", // set currency
      currency: "IDR", // set currency code for Indonesian Rupiah (IDR)
      minimumFractionDigits: 0, // set minimum decimal places to 2
      maximumFractionDigits: 0, // set maximum decimal places to 2
    };

    // use toLocaleString() with the defined options
    return new Intl.NumberFormat("id-ID", options).format(number);
  }

  // render the display
  return (
    <>
      <Helmet>
        <title>Home | Compass Publishing Indonesia</title>
        <meta
          name="description"
          content="Official Homepage of Compass Publishing Indonesia"
        />
        <meta
          property="og:url"
          content="https://www.compasspubindonesia.com/"
        />
        <meta
          property="og:title"
          content="Home | Compass Publishing Indonesia"
        />
        <meta
          property="og:description"
          content="Official Homepage of Compass Publishing Indonesia"
        />
        <meta
          property="og:image"
          content="https://www.compasspubindonesia.com/logo192.png"
        />
        <link rel="canonical" href={`https://www.compasspubindonesia.com/`} />
      </Helmet>
      <div className="container">
        <div className="panel">
          <div className="headline">
            {greeting}
            <div className="section">
              <input
                type="text"
                className="input"
                placeholder="Search anything..."
                onClick={() => navigate("/search")}
              />
            </div>
          </div>
          <div className="section icons">
            {icons.map((icon, index) => (
              <>
                <button
                  type="button"
                  onClick={() => navigate(icon.url)}
                  key={index}
                >
                  <span>
                    <i className={icon.src}></i>
                  </span>
                  <label>{icon.label}</label>
                </button>
              </>
            ))}
            <button
              type="button"
              onClick={() =>
                window.open(
                  "https://compasspubindonesia.com/blogs/category/id/",
                  "_blank"
                )
              }
            >
              <span>
                <i className="fas fa-file-alt"></i>
              </span>
              <label>Blog</label>
            </button>
            <button
              type="button"
              onClick={() =>
                window.open("https://compasspubindonesia.com/forum", "_blank")
              }
            >
              <span>
                <i className="fas fa-users"></i>
              </span>
              <label>Forum</label>
            </button>
          </div>
        </div>

        <div className="section recom">
          <div className="section headline">
            <h5 style={{ float: "left" }}>Recommendations</h5>
            <button
              type="button"
              onClick={() => navigate("/books")}
              style={{
                borderRadius: "10px",
                background: "transparent",
                color: "#111",
                border: "1px hidden",
                paddingLeft: "5px",
                paddingRight: "5px",
                float: "right",
                fontWeight: "400",
              }}
              className="btn"
            >
              <span style={{ marginRight: "10px" }}>See More</span>&#10095;
            </button>
          </div>
          <div className="section scrollList">
            {books.map((book, index) => (
              <button
                className="axe"
                onClick={() => navigate(`/book-view/${book._id}`)}
                key={index}
              >
                <img loading="lazy" src={book.src} alt={book.src} />
                <p>
                  <strong>{book.name}</strong>
                </p>
                <p style={{ textTransform: "uppercase" }}>
                  <i className="fas fa-list"></i> {book.category}
                </p>
              </button>
            ))}
          </div>
        </div>

        <div className="section post">
          <div className="section headline">
            <h5 style={{ float: "left" }}>Latest Posts</h5>
            <button
              type="button"
              onClick={() =>
                window.open(
                  "https://compasspubindonesia.com/blogs/category/id/"
                )
              }
              style={{
                borderRadius: "10px",
                background: "transparent",
                color: "#111",
                border: "1px hidden",
                paddingLeft: "5px",
                paddingRight: "5px",
                float: "right",
                fontWeight: "400",
              }}
              className="btn"
            >
              <span style={{ marginRight: "10px" }}>See More</span>&#10095;
            </button>
          </div>
          <div className="section lang">
            <span>Select Language:</span>
            <button
              type="button"
              onClick={() => langSet("id", "en")}
              id="id"
              className="id active"
            >
              Indonesia
            </button>
            <button type="button" onClick={() => langSet("en", "id")} id="en">
              English
            </button>
          </div>

          <div className="scrollList">
            {posts.map((item, index) => (
              <div
                onClick={() => handleClick(item._id)}
                key={index}
                className="panel"
              >
                <img loading="lazy" src={item.banner} alt={item.banner} />
                <h3>{item.title.toUpperCase()}</h3>
                <pre
                  className="dip dipo"
                  dangerouslySetInnerHTML={{ __html: item.body }}
                />
                <button
                  type="button"
                  onClick={() => handleClick(item._id)}
                  className="btn"
                >
                  Read This post
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="section post">
          <div className="section headline">
            <h5 style={{ float: "left" }}>Latest Events</h5>
            <button
              type="button"
              onClick={() => navigate("/events")}
              style={{
                borderRadius: "10px",
                background: "transparent",
                color: "#111",
                border: "1px hidden",
                paddingLeft: "5px",
                paddingRight: "5px",
                float: "right",
                fontWeight: "400",
              }}
              className="btn"
            >
              <span style={{ marginRight: "10px" }}>See More</span>&#10095;
            </button>
          </div>

          <div className="scrollList">
            {events.map((item, index) => (
              <div
                onClick={() => handleEvent(item._id)}
                rel="noreferrer"
                key={index}
                className="panel"
              >
                {item.img !== "" ? (
                  <>
                    <img loading="lazy" src={item.img} alt={item.img} />
                  </>
                ) : (
                  <></>
                )}

                {item.title !== "" ? (
                  <>
                    <h3 title={item.title}>{item.title}</h3>
                  </>
                ) : (
                  <></>
                )}

                {item.start !== "" ? (
                  <>
                    <p>
                      <strong>Date:</strong> {formatTime(item.start)}
                    </p>
                  </>
                ) : (
                  <></>
                )}

                {item.model !== "" ? (
                  <>
                    <p title={item.model}>
                      <strong>Role:</strong> {item.model}
                    </p>
                  </>
                ) : (
                  <></>
                )}

                {item.address !== "" ? (
                  <>
                    <p title={item.address}>
                      <strong>Location:</strong> {item.address}
                    </p>
                  </>
                ) : (
                  <>
                    <p title={item.address}>
                      <strong>Location:</strong> -
                    </p>
                  </>
                )}

                {item.price !== "" ? (
                  <>
                    <p>
                      <strong>Price:</strong> {formatCurrency(item.price)}
                    </p>
                  </>
                ) : (
                  <></>
                )}
                <button
                  type="button"
                  onClick={() => handleEvent(item._id)}
                  className="btn"
                >
                  Join This Event
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="partner">
          <div className="section headline">
            <h5>Our Services</h5>
          </div>
          <div className="section thumb">
            {partners.map((thumb, index) => (
              <>
                <a
                  href={thumb.uri}
                  target="
                _blank"
                  key={index}
                >
                  <img loading="lazy" src={thumb.src} alt={thumb.src} />
                </a>
              </>
            ))}
          </div>
        </div>

        <div className="section"></div>

        <div className="section headline">
          <h5>About Us</h5>
        </div>
        <div id="about-lang" className="section lang">
          <span>Select Language:</span>
          <button
            type="button"
            onClick={() => langSet("id", "en")}
            id="id"
            className="id active"
          >
            Indonesia
          </button>
          <button type="button" onClick={() => langSet("en", "id")} id="en">
            English
          </button>
        </div>

        <div id="mobile-about">
          {lang === "en" ? (
            <>
              <div className="section about">
                <div className="section">
                  <img
                    src={"/assets/img/banner/a.jpg"}
                    alt={`a.jpg`}
                    style={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                      borderRadius: "10px",
                    }}
                  />
                </div>
                <div className="section">
                  <p>
                    <a
                      href="https://compasspubindonesia.com"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Compass Publishing Indonesia
                    </a>{" "}
                    is a representative from{" "}
                    <a
                      href="https://compasspub.com"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Compass Publishing
                    </a>{" "}
                    South Korea which produce innovative ELT solutions for
                    teachers and their influence towards students since 1999. We
                    provide all services related to ELT books, ELT digital
                    books, ELT applications, and Top Class Education Webinar
                    Services for Indonesian teachers upskill needs in curriculum
                    insight, language skill, digital skill, and class psychology
                    management. We positioned as Sahabat Guru Sepanjang Masa in
                    order to develop the education quality in Indonesia. We
                    motivate all to inspire to teach, inspire to learn.
                  </p>
                </div>
              </div>
            </>
          ) : lang === "id" ? (
            <>
              <div className="section about">
                <div className="section">
                  <img
                    src={"/assets/img/banner/b.jpg"}
                    alt={`b.jpg`}
                    style={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                      borderRadius: "10px",
                    }}
                  />
                </div>
                <div className="section">
                  <p>
                    <a
                      href="https://compasspubindonesia.com"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Compass Publishing Indonesia
                    </a>{" "}
                    adalah representatif dari{" "}
                    <a
                      href="https://compasspub.com"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Compass Publishing
                    </a>{" "}
                    Korea Selatan yang menghasilkan berbagai solusi inovatif
                    seputar ELT bagi para guru dan influencer sejak tahun 1999.
                    Kami menyediakan berbagai layanan yang berkaitan dengan
                    berbagai buku ELT, buku digital ELT, aplikasi ELT, dan
                    Layanan Webinar Edukasi Top Class untuk meningkatkan taraf
                    kompetensi para guru di Indonesia dalam menjalankan
                    kurikulum, kemampuan bahasa, kecakapan digital, dan
                    pengelolaan psikologi dalam kelas. Kami hadir sebagai
                    Sahabat Guru Sepanjang Masa dalam rangka meningkatkan
                    kualitas pendidikan di Indonesia. Kami memotivasi semua
                    orang untuk menginspirasi dalam mengajar dan menginspirasi
                    dalam belajar.
                  </p>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
          <div className="thub">
            <h5>
              {lang === "id"
                ? "Kami berkomitmen untuk menjadi sahabat guru dalam:"
                : lang === "en"
                ? "We have bold commitment to be teachers partner in:"
                : ""}
            </h5>
            <div>
              <img src={"/assets/img/about/a.jpg"} alt={`a.jpg`} />
              <p>
                {lang === "id"
                  ? "Pengembangan Diri"
                  : lang === "en"
                  ? "Self Development"
                  : ""}
              </p>
            </div>
            <div>
              <img src={"/assets/img/about/b.jpg"} alt={`a.jpg`} />
              <p>
                {lang === "id"
                  ? "Peningkatan Keterampilan"
                  : lang === "en"
                  ? "Skill Enhancement"
                  : ""}
              </p>
            </div>
            <div>
              <img src={"/assets/img/about/c.jpg"} alt={`a.jpg`} />
              <p>
                {lang === "id"
                  ? "Materi Pembelajaran"
                  : lang === "en"
                  ? "Learning Subject"
                  : ""}
              </p>
            </div>
          </div>
        </div>

        <div id="desktop-about">
          {lang === "en" ? (
            <>
              <div className="section about">
                <div className="section">
                  <img
                    src={"/assets/img/banner/a.jpg"}
                    alt={`a.jpg`}
                    style={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                      borderRadius: "10px",
                    }}
                  />
                </div>
                <div className="section">
                  <p>
                    <a
                      href="https://compasspubindonesia.com"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Compass Publishing Indonesia
                    </a>{" "}
                    is a representative from{" "}
                    <a
                      href="https://compasspub.com"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Compass Publishing
                    </a>{" "}
                    South Korea which produce innovative ELT solutions for
                    teachers and their influence towards students since 1999. We
                    provide all services related to ELT books, ELT digital
                    books, ELT applications, and Top Class Education Webinar
                    Services for Indonesian teachers upskill needs in curriculum
                    insight, language skill, digital skill, and class psychology
                    management. We positioned as Sahabat Guru Sepanjang Masa in
                    order to develop the education quality in Indonesia. We
                    motivate all to inspire to teach, inspire to learn.
                  </p>
                </div>
              </div>
            </>
          ) : lang === "id" ? (
            <>
              <div className="section about">
                <div className="section">
                  <img
                    src={"/assets/img/banner/b.jpg"}
                    alt={`b.jpg`}
                    style={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                      borderRadius: "10px",
                    }}
                  />
                </div>
                <div className="section">
                  <p>
                    <a
                      href="https://compasspubindonesia.com"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Compass Publishing Indonesia
                    </a>{" "}
                    adalah representatif dari{" "}
                    <a
                      href="https://compasspub.com"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Compass Publishing
                    </a>{" "}
                    Korea Selatan yang menghasilkan berbagai solusi inovatif
                    seputar ELT bagi para guru dan influencer sejak tahun 1999.
                    Kami menyediakan berbagai layanan yang berkaitan dengan
                    berbagai buku ELT, buku digital ELT, aplikasi ELT, dan
                    Layanan Webinar Edukasi Top Class untuk meningkatkan taraf
                    kompetensi para guru di Indonesia dalam menjalankan
                    kurikulum, kemampuan bahasa, kecakapan digital, dan
                    pengelolaan psikologi dalam kelas. Kami hadir sebagai
                    Sahabat Guru Sepanjang Masa dalam rangka meningkatkan
                    kualitas pendidikan di Indonesia. Kami memotivasi semua
                    orang untuk menginspirasi dalam mengajar dan menginspirasi
                    dalam belajar.
                  </p>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
          <div className="thub">
            <h5>
              {lang === "id"
                ? "Kami berkomitmen untuk menjadi sahabat guru dalam:"
                : lang === "en"
                ? "We have bold commitment to be teachers partner in:"
                : ""}
            </h5>
            <div>
              <img src={"/assets/img/about/a.jpg"} alt={`a.jpg`} />
              <p>
                {lang === "id"
                  ? "Pengembangan Diri"
                  : lang === "en"
                  ? "Self Development"
                  : ""}
              </p>
            </div>
            <div>
              <img src={"/assets/img/about/b.jpg"} alt={`a.jpg`} />
              <p>
                {lang === "id"
                  ? "Peningkatan Keterampilan"
                  : lang === "en"
                  ? "Skill Enhancement"
                  : ""}
              </p>
            </div>
            <div>
              <img src={"/assets/img/about/c.jpg"} alt={`a.jpg`} />
              <p>
                {lang === "id"
                  ? "Materi Pembelajaran"
                  : lang === "en"
                  ? "Learning Subject"
                  : ""}
              </p>
            </div>
          </div>
        </div>

        <div className="section"></div>
        <div className="section"></div>
      </div>
    </>
  );
}

export default Home;
