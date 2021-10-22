import React from "react";
import Header from "../navigation/header";
import Footer from "../navigation/footer";

const SiteContainer = (props) => {
  return (
    <div
      {...props}
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        margin: "0 auto",
        backgroundImage:
          "linear-gradient(to left top, #f25413, #ff3a3e, #ff1c63, #ff0789, #ff23b0, #f32fc4, #e33dd7, #ce4bea, #b54cee, #984ef2, #7550f4, #4352f6)",
      }}
    />
  );
};

const Layout = ({ children }) => {
  return (
    <SiteContainer>
      <Header style={{ zIndex: 1 }} />
      {children}
      <Footer />
    </SiteContainer>
  );
};

export default Layout;
