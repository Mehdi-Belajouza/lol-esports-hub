import React from 'react';
import './AdPlaceholder.css';

const AdPlaceholder = () => {
  return (
    <div className="hidden lg:block w-48 flex-shrink-0">
        <div className="landscape-card">
          <div className="landscape-section">
            <div className="sky"></div>
            <div className="sun"></div>
            <div className="hill-1"></div>
            <div className="hill-2"></div>
            <div className="ocean">
              <div className="reflection"></div>
              <div className="reflection"></div>
              <div className="reflection"></div>
              <div className="reflection"></div>
              <div className="reflection"></div>
              <div className="shadow-hill-1"></div>
              <div className="shadow-hill-2"></div>
            </div>
            <div className="hill-3"></div>
            <div className="hill-4"></div>
            <div className="tree-1">
              <svg
                strokeWidth="0.00064"
                stroke="#b77873"
                fill="#b77873"
                xmlSpace="preserve"
                viewBox="0 0 64.00 64.00"
                xmlns="http://www.w3.org/2000/svg"
                id="Layer_1"
                version="1.0"
              >
                <g strokeWidth="0" id="SVGRepo_bgCarrier"></g>
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  id="SVGRepo_tracerCarrier"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M32,0C18.148,0,12,23.188,12,32c0,9.656,6.883,17.734,16,19.594V60c0,2.211,1.789,4,4,4s4-1.789,4-4v-8.406 C45.117,49.734,52,41.656,52,32C52,22.891,46.051,0,32,0z"
                    fill="#b77873"
                  ></path>
                </g>
              </svg>
            </div>
            <div className="tree-2">
              <svg
                strokeWidth="0.00064"
                stroke="#b77873"
                fill="#b77873"
                xmlSpace="preserve"
                viewBox="0 0 64.00 64.00"
                xmlns="http://www.w3.org/2000/svg"
                id="Layer_1"
                version="1.0"
              >
                <g strokeWidth="0" id="SVGRepo_bgCarrier"></g>
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  id="SVGRepo_tracerCarrier"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M32,0C18.148,0,12,23.188,12,32c0,9.656,6.883,17.734,16,19.594V60c0,2.211,1.789,4,4,4s4-1.789,4-4v-8.406 C45.117,49.734,52,41.656,52,32C52,22.891,46.051,0,32,0z"
                    fill="#b77873"
                  ></path>
                </g>
              </svg>
            </div>
            <div className="tree-3">
              <svg
                version="1.0"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 64.00 64.00"
                xmlSpace="preserve"
                fill="#a16773"
                stroke="#a16773"
                strokeWidth="0.00064"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    fill="#a16773"
                    d="M32,0C18.148,0,12,23.188,12,32c0,9.656,6.883,17.734,16,19.594V60c0,2.211,1.789,4,4,4s4-1.789,4-4v-8.406 C45.117,49.734,52,41.656,52,32C52,22.891,46.051,0,32,0z"
                  ></path>
                </g>
              </svg>
            </div>
            <div className="filter"></div>
          </div>

          <div className="content-section">
            <div className="weather-info">
              <div className="left-side">
                <div className="icon">
                  <svg
                    stroke="#000000"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <g strokeWidth="0" id="SVGRepo_bgCarrier"></g>
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      id="SVGRepo_tracerCarrier"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        strokeLinecap="round"
                        strokeWidth="1.5"
                        stroke="#ffffff"
                        d="M22 14.3529C22 17.4717 19.4416 20 16.2857 20H11M14.381 9.02721C14.9767 8.81911 15.6178 8.70588 16.2857 8.70588C16.9404 8.70588 17.5693 8.81468 18.1551 9.01498M7.11616 11.6089C6.8475 11.5567 6.56983 11.5294 6.28571 11.5294C3.91878 11.5294 2 13.4256 2 15.7647C2 18.1038 3.91878 20 6.28571 20H7M7.11616 11.6089C6.88706 10.9978 6.7619 10.3369 6.7619 9.64706C6.7619 6.52827 9.32028 4 12.4762 4C15.4159 4 17.8371 6.19371 18.1551 9.01498M7.11616 11.6089C7.68059 11.7184 8.20528 11.9374 8.66667 12.2426M18.1551 9.01498C18.8381 9.24853 19.4623 9.60648 20 10.0614"
                      ></path>
                    </g>
                  </svg>
                </div>
                <p>Cloudy</p>
              </div>
              <div className="right-side">
                <div className="location">
                  <div>
                    <svg
                      version="1.0"
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      width="64px"
                      height="64px"
                      viewBox="0 0 64 64"
                      xmlSpace="preserve"
                      fill="#ffffff"
                      stroke="#ffffff"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <path
                          fill="#ffffff"
                          d="M32,0C18.746,0,8,10.746,8,24c0,5.219,1.711,10.008,4.555,13.93c0.051,0.094,0.059,0.199,0.117,0.289l16,24 C29.414,63.332,30.664,64,32,64s2.586-0.668,3.328-1.781l16-24c0.059-0.09,0.066-0.195,0.117-0.289C54.289,34.008,56,29.219,56,24 C56,10.746,45.254,0,32,0z M32,32c-4.418,0-8-3.582-8-8s3.582-8,8-8s8,3.582,8,8S36.418,32,32,32z"
                        ></path>
                      </g>
                    </svg>
                    <span>Tunisia</span>
                  </div>
                </div>
                <p>Thursday, 1st May</p>
                <p className="temperature">28°C</p>
              </div>
            </div>
            <div className="forecast">
              <div>
                <p>Friday, 2nd May</p>
                <p>29°C</p>
              </div>
              <div className="separator"></div>
              <div>
                <p>Saturday, 3rd May</p>
                <p>31°C</p>
              </div>
              <div className="separator"></div>
              <div>
                <p>Sunday, 4th May</p>
                <p>27°C</p>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default AdPlaceholder;