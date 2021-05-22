import React from "react";
import { useHistory } from "react-router-dom";

const Footer = () => {
  const history = useHistory();
  return (
    <>
      <footer className="page-footer">
        <div className="footer-grid">
          <img
            src="/images/logo_white.png"
            alt="page logo"
            className="logo"
            onClick={() => {
              history.push("/");
            }}
          />
          <div className="social-media-buttons">
            <div className="social-media-button-img">
              <a href="www.facebook.com">
                <img
                  src="/images/icons/facebook_white.svg"
                  alt="facebook button"
                />
              </a>
            </div>

            <div className="social-media-button-img">
              <a href="www.telegram.com">
                <img
                  src="/images/icons/telegram_white.svg"
                  alt="telegram button"
                />
              </a>
            </div>

            <div className="social-media-button-img">
              <a href="www.twitter.com">
                <img
                  src="/images/icons/twitter_white.svg"
                  alt="twitter button"
                />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
