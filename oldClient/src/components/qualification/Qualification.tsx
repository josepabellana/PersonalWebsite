import "./qualification.css";
import React, { useState } from "react";

const Qualification = () => {
  const [toggleState, setToggleState] = useState(2);

  const toggleTab = (index: number) => {
    setToggleState(index);
  };
  return (
    <section className="qualification section">
      <h2 className="section__title">Qualifications</h2>
      <span className="section__subtitle">My personal Journey</span>

      <div className="qualification__container container">
        <div className="qualification__tabs">
          <div
            className={
              toggleState === 1
                ? "qualification__button qualification__active button__flex"
                : "qualification__button button__flex"
            }
            onClick={() => toggleTab(1)}
          >
            <i className="uil uil-graduation-cap qualification__icon"></i>{" "}
            Education
          </div>

          <div
            className={
              toggleState === 2
                ? "qualification__button qualification__active button__flex"
                : "qualification__button button__flex"
            }
            onClick={() => toggleTab(2)}
          >
            <i className="uil uil-briefcase-alt qualification__icon"></i>{" "}
            Experience
          </div>
        </div>

        <div className="qualification__sections">
          {/* Studies */}
          <div
            className={
              toggleState === 1
                ? "qualification__content qualification__content-active"
                : "qualification__content"
            }
          >
            <div className="qualification__data">
              <div>
                <h3 className="qualification__title">Software Engineering</h3>
                <span className="qualification__subtitle">Codeworks</span>

                <div className="qualification__calendar">
                  <i className="uil uil-calendar-alt">2022 - 2022</i>
                </div>
              </div>

              <div>
                <span className="qualification__rounder"></span>
                <span className="qualification__line"></span>
              </div>
            </div>

            <div className="qualification__data">
              <div></div>

              <div>
                <span className="qualification__rounder"></span>
                <span className="qualification__line"></span>
              </div>

              <div>
                <h3 className="qualification__title">
                  Master in Project Management
                </h3>
                <span className="qualification__subtitle">
                  La Salle Ramon Llull
                </span>

                <div className="qualification__calendar">
                  <i className="uil uil-calendar-alt">2021 - 2022</i>
                </div>
              </div>
            </div>

            <div className="qualification__data">
              <div>
                <h3 className="qualification__title">
                  Telecommunication Engineering
                </h3>
                <span className="qualification__subtitle">La Salle Ramon Llull</span>

                <div className="qualification__calendar">
                  <i className="uil uil-calendar-alt">2014 - 2018</i>
                </div>
              </div>

              <div>
                <span className="qualification__rounder"></span>
                <span className="qualification__line"></span>
              </div>
            </div>

            
            
          </div>
          {/* Experience */}
          <div
            className={
              toggleState === 2
                ? "qualification__content qualification__content-active"
                : "qualification__content"
            }
          >
            <div className="qualification__data">
              <div></div>

              <div>
                <span className="qualification__rounder"></span>
                <span className="qualification__line"></span>
              </div>

              <div>
                <h3 className="qualification__title">
                Software Engineer
                </h3>
                <span className="qualification__subtitle">Hive Streaming</span>

                <div className="qualification__calendar">
                  <i className="uil uil-calendar-alt">2023 - current</i>
                </div>
              </div>
            </div>

            <div className="qualification__data">
              <div>
                <h3 className="qualification__title">Full Stack Engineer</h3>
                <span className="qualification__subtitle">AmazeThing</span>

                <div className="qualification__calendar">
                  <i className="uil uil-calendar-alt">2022 - 2022</i>
                </div>
              </div>

              <div>
                <span className="qualification__rounder"></span>
                <span className="qualification__line"></span>
              </div>
            </div>

            <div className="qualification__data">
              <div></div>

              <div>
                <span className="qualification__rounder"></span>
                <span className="qualification__line"></span>
              </div>

              <div>
                <h3 className="qualification__title">
                Full Stack Engineer
                </h3>
                <span className="qualification__subtitle">Atypeical</span>

                <div className="qualification__calendar">
                  <i className="uil uil-calendar-alt">2022 - 2022</i>
                </div>
              </div>
            </div>

            <div className="qualification__data">
              <div>
                <h3 className="qualification__title">Full Stack Engineer</h3>
                <span className="qualification__subtitle">Tactictoe</span>

                <div className="qualification__calendar">
                  <i className="uil uil-calendar-alt">2022 - 2022</i>
                </div>
              </div>

              <div>
                <span className="qualification__rounder"></span>
                <span className="qualification__line"></span>
              </div>
            </div>

            <div className="qualification__data">
              <div></div>

              <div>
                <span className="qualification__rounder"></span>
                <span className="qualification__line"></span>
              </div>

              <div>
                <h3 className="qualification__title">
                  Project Manager Associate
                </h3>
                <span className="qualification__subtitle">IOMED</span>

                <div className="qualification__calendar">
                  <i className="uil uil-calendar-alt">2022 - 2022</i>
                </div>
              </div>
            </div>

            <div className="qualification__data">
              <div>
                <h3 className="qualification__title">Data Analyst</h3>
                <span className="qualification__subtitle">SDG Group</span>

                <div className="qualification__calendar">
                  <i className="uil uil-calendar-alt">2021 - 2022</i>
                </div>
              </div>

              <div>
                <span className="qualification__rounder"></span>
                <span className="qualification__line"></span>
              </div>
            </div>

            <div className="qualification__data">
              <div></div>

              <div>
                <span className="qualification__rounder"></span>
                <span className="qualification__line"></span>
              </div>

              <div>
                <h3 className="qualification__title">Cloud Consultant</h3>
                <span className="qualification__subtitle">
                  Zurich Insurance Group
                </span>

                <div className="qualification__calendar">
                  <i className="uil uil-calendar-alt">2018 - 2021</i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Qualification;
