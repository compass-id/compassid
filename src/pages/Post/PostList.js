// import dependencies
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

// create the main function
const PostList = () => {
  // create the useState
  const [posts, setPosts] = useState([]); // state for Post list
  const [search, setSearch] = useState(""); // state for search
  const [isLoading, setIsLoading] = useState(true); // state for loading
  const [isEmpty, setIsEmpty] = useState(false);
  const [lang, setLang] = useState("id");
  const [postis, setPosti] = useState([]);

  // setting up useNavigate
  const navigat = useNavigate();

  const navigate = (val) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    navigat(val);
  };

  const handleClick = (val) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    navigate(`/post-view/${lang}/${val}`);
  };

  useEffect(() => {
    // create book loader callback function
    const getposts = async () => {
      try {
        if (!search) {
          let url = "";
          lang === "en"
            ? (url = `https://seg-server.vercel.app/api/posts/en`)
            : (url = `https://seg-server.vercel.app/api/posts/id`);
          lang === "id"
            ? (url = `https://seg-server.vercel.app/api/posts/id`)
            : (url = `https://seg-server.vercel.app/api/posts/en`);
          // modify URL based on backend
          const datas = await axios.get(url); // get datas from URL with axios
          datas.data.length === 0 ? setIsEmpty(true) : setIsEmpty(false);
          setPosts(datas.data);
          setIsLoading(false);
        } else {
          let url = "";
          lang === "en" && search !== ""
            ? (url = `https://seg-server.vercel.app/api/posts/en/key/${search}`)
            : (url = `https://seg-server.vercel.app/api/posts/id/key/${search}`);
          lang === "id" && search !== ""
            ? (url = `https://seg-server.vercel.app/api/posts/id/key/${search}`)
            : (url = `https://seg-server.vercel.app/api/posts/en/key/${search}`);
          // modify URL based on backend
          const datas = await axios.get(url); // get datas from URL with axios
          datas.data.length === 0 ? setIsEmpty(true) : setIsEmpty(false);
          setPosts(datas.data);
          setIsLoading(false);
        }
      } catch (error) {
        window.alert(error.message); // display error message
      }
    };

    getposts();

    const getpostis = async () => {
      let url = "https://compasspubindonesia.com/blogs/get-post.php";

      try {
        const datas = await axios.post(url);

        setPosti(datas.data);
      } catch (error) {
        window.alert(error.message);
      }
    };

    getpostis();
  }, [search, lang]); // dependency array with only `getposts`

  const langSet = (a, b) => {
    setLang(a);
    document.getElementById(a).classList.add("active");
    document.getElementById(b).classList.remove("active");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  // render the display
  return (
    <>
      <Helmet>
        <title>Posts | Compass Publishing Indonesia</title>
        <meta
          name="description"
          content="List of posts in Compass Publishing Indonesia"
        />
        <meta
          property="og:url"
          content={`https://www.compasspubindonesia.com/posts`}
        />
        <meta
          property="og:title"
          content={`Posts | Compass Publishing Indonesia`}
        />
        <meta
          property="og:description"
          content={`List of posts in Compass Publishing Indonesia`}
        />
        <meta
          property="og:image"
          content={`https://www.compasspubindonesia.com/logo192.png`}
        />
        <link
          rel="canonical"
          href={`https://www.compasspubindonesia.com/posts`}
        />
      </Helmet>
      <div className="container">
        <div className="section headline">
          <h4>Post List</h4>
          <button onClick={() => navigate(`/`)} className="btn">
            See Home
          </button>
          <div className="section">
            <input
              type="text"
              autoComplete="on"
              className="input"
              value={search} // set value from search state
              onInput={handleSearch} // update search state on change
              placeholder="Search posts..."
            />
          </div>
        </div>
        <div className="section lang">
          <span>Select Language:</span>
          <button
            type="button"
            onClick={() => langSet("id", "en")}
            id="id"
            className="active"
          >
            Indonesia
          </button>
          <button type="button" onClick={() => langSet("en", "id")} id="en">
            English
          </button>
        </div>
        {isLoading === true ? (
          <div className="section loading">Loading Post Database...</div> // display status when loading
        ) : isEmpty ? (
          <div className="section empty">No data...</div> // display status when loading
        ) : (
          // display table after loading

          <>
            {postis.map((post, index) =>
              post.slugs === lang &&
              post.title.toLowerCase().includes(search) &&
              post.body.toLowerCase().includes(search) ? (
                <>
                  <div
                    onClick={() =>
                      post._id
                        ? handleClick(post._id)
                        : window.open(post.url, "_self")
                    }
                    className="event"
                    key={index}
                  >
                    {post.banner !== "" ? (
                      <>
                        <img
                          loading="lazy"
                          src={post.banner}
                          alt={post.banner}
                        />
                      </>
                    ) : (
                      <></>
                    )}

                    <div className="section caption">
                      {post.title !== "" ? (
                        <>
                          <h3 title={post.title}>{post.title.toUpperCase()}</h3>
                        </>
                      ) : (
                        <></>
                      )}

                      <pre
                        className="dip"
                        dangerouslySetInnerHTML={{ __html: post.body }}
                      />

                      <button
                        onClick={() =>
                          post._id
                            ? handleClick(post._id)
                            : window.open(post.url, "_self")
                        }
                        className="btn"
                      >
                        Read This post
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )
            )}
            {posts.map((post, index) => (
              <div
                onClick={() => handleClick(post._id)}
                className="event"
                key={index}
              >
                {post.banner !== "" ? (
                  <>
                    <img loading="lazy" src={post.banner} alt={post.banner} />
                  </>
                ) : (
                  <></>
                )}

                <div className="section caption">
                  {post.title !== "" ? (
                    <>
                      <h3 title={post.title}>{post.title.toUpperCase()}</h3>
                    </>
                  ) : (
                    <></>
                  )}

                  <pre
                    className="dip"
                    dangerouslySetInnerHTML={{ __html: post.body }}
                  />

                  <button onClick={() => handleClick(post._id)} className="btn">
                    Read This post
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      <div className="section"></div>
      <div className="section"></div>
    </>
  );
};

// export the main function
export default PostList;
