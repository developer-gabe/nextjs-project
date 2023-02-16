import React from "react";

const Bio = ({ userName, userImage, userTitle, userBio }) => {
  const defaultProps = {
    userName: "FirstName LastName",
    userImage: "/images/gabe.jpg",
    userTitle: "Title",
    userBio:
      "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
  };

  userName = userName || defaultProps.userName;
  userImage = userImage || defaultProps.userImage;
  userTitle = userTitle || defaultProps.userTitle;
  userBio = userBio || defaultProps.userBio;

  return (
    <div className="bio-grid">
      <div className="bio-image" style={{ backgroundImage: `url(${userImage})` }}>
      </div>
      <div className="bio-info">
        <h1>{userName}</h1>
        <h2>{userTitle}</h2>
        <p>{userBio}</p>
      </div>

      <style jsx global>{`
        .bio-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          height: 500px;
          background-color: #16363a;
          box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25),
            0 10px 10px rgba(0, 0, 0, 0.295);
        }

        .bio-info {
          font-family: "Roboto", sans-serif;
          padding: 1rem;
        }

        .bio-info h1 {
          font-size: 2rem;
          color: #d7a08b;
          margin-bottom: 0.35rem;
          text-transform: uppercase;
        }

        .bio-info h2 {
          margin-top: 0;
          margin-left: 0.15rem;
          margin: 0 0.15rem 1rem 0.15rem;
          font-size: 0.9rem;
          color: #fff;
          font-weight: 300;
          text-transform: uppercase;
          letter-spacing: 2px;
        }

        .bio-info p {
          color: #d7a08b;
          line-height: 2;
        }

        .bio-image {
          background-size: cover;
          background-position: center;
          height: 100%;
        }

        @media (max-width: 768px) {
          .bio-grid {
            grid-template-columns: 1fr;
            height: 100%;
          }

          .bio-image {
            height: 450px;
            background-position: center;
          }
        }

        @media (prefers-color-scheme: dark) {
          .bio-grid {
            background-color: #15102f;
          }
        }
      `}</style>
    </div>
  );
};

export default Bio;
