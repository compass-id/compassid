import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

function PostIdView() {
  // Fetches latest Event count for serie generation (Optional)
  const [isLoading, setIsLoading] = useState(true); // state for loading
  const [isEmpty, setIsEmpty] = useState(false);

  const { id } = useParams();

  const [post, setPost] = useState([]);
  const [posts, setPosts] = useState([]);
  const [lang, setLang] = useState("id");
  const postp = posts.slice(0, 6);

  const langSet = (a, b) => {
    setLang(a);
    document.getElementById(a).classList.add("active");
    document.getElementById(b).classList.remove("active");
  };

  // Setting up useNavigate
  const navigat = useNavigate();

  const navigate = (val) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    navigat(val);
  };

  // setting up useEffect to do tasks in real-time
  useEffect(() => {
    // create party loader callback function
    const getPost = async () => {
      try {
        let uri = "";
        lang === "en"
          ? (uri = `https://seg-server.vercel.app/api/posts/en`)
          : (uri = `https://seg-server.vercel.app/api/posts/id`);
        lang === "id"
          ? (uri = `https://seg-server.vercel.app/api/posts/id`)
          : (uri = `https://seg-server.vercel.app/api/posts/en`);
        const url = `https://seg-server.vercel.app/api/posts/id/id/${id}`; // modify URL based on backend
        const datas = await axios.get(url); // get datas from URL with axios
        const datap = await axios.get(uri); // get datas from URL with axios
        datas.data.length === 0 ? setIsEmpty(true) : setIsEmpty(false);
        setPost(datas.data);
        setPosts(datap.data);
        setIsLoading(false);
      } catch (error) {
        window.alert(error.message); // display error message
      }
    };

    getPost(); // dependency array with only `search`
  }, [id, lang, isLoading]); // dependency array with only `getParty`

  const handleClick = (val) => {
    navigate(`/post-view/${lang}/${val}`);
    setIsLoading(true);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const selMain = (value) => {
    document.getElementById("main").src = document.getElementById(
      `main-${value}`,
    ).src;
  };

  function formatTime(dateString) {
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
  }

  const handleCopy = () => {
    const uri = `https://www.compasspubindonesia.com/post-view.php?id=${post._id}&lang=${post.lang}`;
    const copied = navigator.clipboard.writeText(uri);
    if (copied) {
      document.getElementById("fab").classList.add("active");
      document.getElementById("lbs").innerText = "Link Copied";
    }
  };

  // render the display
  return (
    <>
      <Helmet>
        <title>{`${post.title}`} | Compass Publishing Indonesia</title>
        <meta name="description" content={`${post.body}`} />
        <meta
          property="og:url"
          content={`https://www.compasspubindonesia.com/post-view/id/${post._id}`}
        />
        <meta
          property="og:title"
          content={`${post.title} | Compass Publishing Indonesia`}
        />
        <meta property="og:description" content={`${post.title}`} />
        <meta property="og:image" content={`${post.banner}`} />
        <link
          rel="canonical"
          href={`https://www.compasspubindonesia.com/post-view/id/${post._id}`}
        />
      </Helmet>
      <div className="party container">
        {isLoading === true ? (
          <div className="section loading">Loading post database...</div> // display status when loading
        ) : isEmpty ? (
          <div className="section empty">No data...</div> // display status when loading
        ) : (
          <>
            <div className="section">
              <div className="section headline">
                <h4>Post View</h4>
                <button onClick={() => navigate(`/posts`)} className="btn">
                  See Posts
                </button>
              </div>
              <div className="posts section" key={post._id}>
                <div className="film">
                  <img
                    loading="lazy"
                    src={post.banner}
                    alt={post.banner}
                    id="main"
                  />
                  <div className="panel">
                    {post.fileList.map((file, index) => (
                      <img
                        src={file.url}
                        alt={file.url}
                        key={index + 1}
                        id={`main-${index + 1}`}
                        onClick={() => selMain(index + 1)}
                      />
                    ))}
                  </div>
                </div>
                <div className="section"></div>
                <div className="section sub">
                  <h2>{post.title.toUpperCase()}</h2>
                  <p>{formatTime(post.date)}</p>
                </div>
                <pre
                  className="section psto"
                  style={{ maxHeight: "1000000000px" }}
                  dangerouslySetInnerHTML={{ __html: post.body }}
                />
                <div className="section"></div>
                <p>
                  <strong>Category:</strong> {post.category}
                </p>
                <p>
                  <strong>Tags:</strong> {post.tags}
                </p>
              </div>
            </div>
            <div className="section"></div>
            <div className="section"></div>
            <div className="section post">
              <div className="section headline">
                <h5 style={{ float: "left" }}>Latest Posts</h5>
                <button
                  type="button"
                  onClick={() => navigate("/posts")}
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
                  className={`${lang === "id" ? "active" : ""}`}
                >
                  Indonesia
                </button>
                <button
                  type="button"
                  onClick={() => langSet("en", "id")}
                  id="en"
                  className={`${lang === "en" ? "active" : ""}`}
                >
                  English
                </button>
              </div>
              {isLoading === true ? (
                <>
                  <div className="section loading">
                    <p>Loading data, please wait...</p>
                  </div>
                </>
              ) : isEmpty === true ? (
                <>
                  <div className="section empty">
                    <p>No data...</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="scrollList">
                    {postp.map((item, index) => (
                      <div
                        onClick={() => handleClick(item._id)}
                        key={index}
                        className="panel"
                      >
                        <img
                          loading="lazy"
                          src={item.banner}
                          alt={item.banner}
                        />
                        <h3>{item.title.toUpperCase()}</h3>
                        <pre
                          className="dip"
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
                </>
              )}
            </div>
          </>
        )}
      </div>
      <div className="section"></div>
      <div className="section"></div>
      <button
        type="button"
        onClick={() => handleCopy()}
        className="fab"
        id="fab"
      >
        <span id="lbs">Share</span> <i className="fas fa-share-alt"></i>
      </button>
    </>
  );
}

export default PostIdView;
