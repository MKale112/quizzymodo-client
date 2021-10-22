import React from "react";
import "./homepage.css";
import heroImage from "../images/heroImg.jpg";
import teacher from "../images/teacher.svg";
import beer from "../images/beer.svg";
import learner from "../images/learner.svg";
import competitor from "../images/competitor.svg";
import bored from "../images/bored.svg";
import pathMatej from "../images/jere.jpg";
import pathJere from "../images/jere.jpg";

const PixelTransition = ({ opacity }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
      <path
        fill="#000000"
        fillOpacity={opacity}
        d="M0,192L0,224L43.6,224L43.6,96L87.3,96L87.3,128L130.9,128L130.9,32L174.5,32L174.5,96L218.2,96L218.2,128L261.8,128L261.8,192L305.5,192L305.5,256L349.1,256L349.1,256L392.7,256L392.7,224L436.4,224L436.4,64L480,64L480,32L523.6,32L523.6,128L567.3,128L567.3,96L610.9,96L610.9,96L654.5,96L654.5,96L698.2,96L698.2,32L741.8,32L741.8,256L785.5,256L785.5,256L829.1,256L829.1,192L872.7,192L872.7,288L916.4,288L916.4,64L960,64L960,96L1003.6,96L1003.6,64L1047.3,64L1047.3,96L1090.9,96L1090.9,64L1134.5,64L1134.5,64L1178.2,64L1178.2,288L1221.8,288L1221.8,256L1265.5,256L1265.5,288L1309.1,288L1309.1,160L1352.7,160L1352.7,256L1396.4,256L1396.4,64L1440,64L1440,0L1396.4,0L1396.4,0L1352.7,0L1352.7,0L1309.1,0L1309.1,0L1265.5,0L1265.5,0L1221.8,0L1221.8,0L1178.2,0L1178.2,0L1134.5,0L1134.5,0L1090.9,0L1090.9,0L1047.3,0L1047.3,0L1003.6,0L1003.6,0L960,0L960,0L916.4,0L916.4,0L872.7,0L872.7,0L829.1,0L829.1,0L785.5,0L785.5,0L741.8,0L741.8,0L698.2,0L698.2,0L654.5,0L654.5,0L610.9,0L610.9,0L567.3,0L567.3,0L523.6,0L523.6,0L480,0L480,0L436.4,0L436.4,0L392.7,0L392.7,0L349.1,0L349.1,0L305.5,0L305.5,0L261.8,0L261.8,0L218.2,0L218.2,0L174.5,0L174.5,0L130.9,0L130.9,0L87.3,0L87.3,0L43.6,0L43.6,0L0,0L0,0Z"
      ></path>
    </svg>
  );
};

const PixelTransition2 = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
      <path
        fill="linear-gradient(to left top, #f25413, #ff3a3e, #ff1c63, #ff0789, #ff23b0, #f32fc4, #e33dd7, #ce4bea, #b54cee, #984ef2, #7550f4, #4352f6)"
        fillOpacity="1"
        d="M0,32L0,32L42.4,32L42.4,32L84.7,32L84.7,32L127.1,32L127.1,288L169.4,288L169.4,160L211.8,160L211.8,96L254.1,96L254.1,192L296.5,192L296.5,192L338.8,192L338.8,224L381.2,224L381.2,64L423.5,64L423.5,192L465.9,192L465.9,160L508.2,160L508.2,160L550.6,160L550.6,0L592.9,0L592.9,0L635.3,0L635.3,128L677.6,128L677.6,64L720,64L720,192L762.4,192L762.4,288L804.7,288L804.7,96L847.1,96L847.1,192L889.4,192L889.4,0L931.8,0L931.8,32L974.1,32L974.1,160L1016.5,160L1016.5,224L1058.8,224L1058.8,64L1101.2,64L1101.2,96L1143.5,96L1143.5,192L1185.9,192L1185.9,288L1228.2,288L1228.2,0L1270.6,0L1270.6,128L1312.9,128L1312.9,224L1355.3,224L1355.3,256L1397.6,256L1397.6,96L1440,96L1440,320L1397.6,320L1397.6,320L1355.3,320L1355.3,320L1312.9,320L1312.9,320L1270.6,320L1270.6,320L1228.2,320L1228.2,320L1185.9,320L1185.9,320L1143.5,320L1143.5,320L1101.2,320L1101.2,320L1058.8,320L1058.8,320L1016.5,320L1016.5,320L974.1,320L974.1,320L931.8,320L931.8,320L889.4,320L889.4,320L847.1,320L847.1,320L804.7,320L804.7,320L762.4,320L762.4,320L720,320L720,320L677.6,320L677.6,320L635.3,320L635.3,320L592.9,320L592.9,320L550.6,320L550.6,320L508.2,320L508.2,320L465.9,320L465.9,320L423.5,320L423.5,320L381.2,320L381.2,320L338.8,320L338.8,320L296.5,320L296.5,320L254.1,320L254.1,320L211.8,320L211.8,320L169.4,320L169.4,320L127.1,320L127.1,320L84.7,320L84.7,320L42.4,320L42.4,320L0,320L0,320Z"
      ></path>
    </svg>
  );
};

export const HeroImage = () => {
  return (
    <div>
      <div
        className="vh-75 vh-50-m cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${heroImage})`,
          marginTop: "30px",
        }}
      >
        <div className="bg-black-40 vh-75 vh-50-m">
          <div className="tc-l tc ph3">
            <h1 className="f2 f1-l fw5 b white-90 mb0 mt0 pt7 pt5-m pt7-l lh-title">
              WELCOME TO QUIZZYMODO!
            </h1>
            <h2 className="fw3 b f3 white-80 mt3 mb4">
              Relax with us! Here you can
            </h2>
            <a
              className="f6 no-underline grow dib v-mid bg-light-purple white ba b--light-purple ph3 pv2 mb3"
              href="/listquizes"
            >
              Solve a quizz
            </a>
            <span className="dib v-mid ph3 white-70 mb3">or</span>
            <a
              className="f6 no-underline grow dib v-mid white ba b--white ph3 pv2 mb3"
              href="/izmjena"
            >
              Try making one yourself
            </a>
          </div>
        </div>
      </div>
      <div
        style={{
          backgroundColor: "black",
          paddingTop: "2rem",
          paddingBottom: "2rem",
        }}
      ></div>
    </div>
  );
};

const Description = () => {
  return (
    <div className="descContainer mv6">
      <h1 className="tc f2 ">QUIZZIMODO IS A FAVOURITE AMONG...</h1>
      <div className="testemonials mw-100">
        <DescriptionBox
          type="Teachers"
          reason="Are your students retaining your lessons? Find out in real time!"
          svg={teacher}
        />
        <DescriptionBox
          type="Competative People"
          reason="Solve quizzes and place yourself on the Leaderboard!"
          svg={competitor}
        />
        <DescriptionBox
          type="Learners"
          reason="For people always willing to learn! Or expand their repertoire!"
          svg={learner}
        />
        <DescriptionBox
          type="Bored People"
          reason="When you just wanna have some fun waiting for the bus!"
          svg={bored}
        />
        <DescriptionBox
          type="I dunno anymore"
          reason="This one is just so that we have six boxes! Woo!"
          svg=""
        />
        <DescriptionBox
          type="Bars"
          reason="Game nights and quiz nights are our favourite! Snacks and fun!"
          svg={beer}
        />
      </div>
    </div>
  );
};

const DescriptionBox = ({ type, reason, svg }) => {
  return (
    <div
      className="h3 h5-ns w-80 w-50-m w-30-ns ma2 ma4-ns br3 pa3 pa4-ns ba bg-white b--black-10 shadow-2"
      style={{
        background: `url(${svg})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right",
        backgroundSize: "50%",
        // backgroundSize: "contain",
        minHeight: "200px",
      }}
    >
      <h2 className="w-40 w-50-ns f3 mb2">{type}</h2>
      <div className="w-40 w-50-ns f4 fw4 gray mt0">{reason}</div>
    </div>
  );
};

const AboutUs = () => {
  return (
    <div className="bg-black pa5">
      <h2 className="tc white f2">MADE BY:</h2>
      <div className="about mw-70 mv4">
        <Member name={"Matej Kalebic"} pic={pathMatej} />
        <Member name={"Jerolim Marcic"} pic={pathJere} />
      </div>
    </div>
  );
};

const Member = ({ name, pic }) => {
  return (
    <article className="descContainer mw5 bg-white br3 pa3 mh4 pa4-ns mv4 mv4-ns ba b--black-10">
      <div className="tc">
        <img
          src={pic}
          alt=""
          className="br-100 h3 w3 dib"
          title="Photo of a kitty staring at you"
        />
        <h1 className="f4">{name}</h1>
        <hr className="mw3 bb bw1 b--black-10" />
      </div>
      <p className="lh-copy measure center f6 black-70">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ornare
        purus at mollis consequat. Sed odio mi, aliquet eu massa non, lobortis
        ullamcorper nisl. Nulla facilisi.
      </p>
    </article>
  );
};

const Homepage = () => {
  return (
    <div>
      {/* hero image section => image, call to action buttons, jumbo header */}
      <HeroImage />
      <PixelTransition opacity={1} />
      <Description />
      {/* <PixelTransition opacity={0} /> */}
      <PixelTransition2 />
      <AboutUs />
    </div>
  );
};
export default Homepage;
