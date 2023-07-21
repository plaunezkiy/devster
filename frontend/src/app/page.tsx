import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { FaEnvelope, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="mt-12 w-full flex justify-center">
      <div className="w-full mx-4 md:px-12 xl:w-3/5 b-red-300">
        <div className="">
          <p className="mb-10 md:mb-0 md:mt-0 text-3xl text-center font-semibold tracking-tight">
            Hello there and welcome to
            <span className="text-blue-600 hover:text-red-400 dark:text-blue-300 dark:hover:text-red-500 duration-150 select-none">
              {" "}
              Devster
            </span>
            !
          </p>
          <div className="md:mt-3 text-lg tracking-tight font-semibold md:block flex flex-col gap-2">
            <div className="order-last relative">
              <img
                src="https://dvstr.net/static/images/me.jpg"
                alt=""
                className="w-full md:float-right md:w-48 rounded shadow-md"
              />
              <div className="absolute top-[70%] right-10 md:-right-12 md:top-40 w-28 flex flex-col gap-1 items-center justify-center">
                <svg
                  className="rotate-[280deg] fill-blue-600 dark:fill-blue-300"
                  width="150px"
                  height="150px"
                  viewBox="0 0 367.339 367.34"
                  xmlSpace="preserve"
                >
                  <g>
                    <path
                      d="M337.591,0.932c-13.464,6.12-26.315,12.852-39.168,20.196c-11.628,6.12-25.704,12.24-35.496,21.42
		c-5.508,4.896,0,15.3,7.344,12.852c0,0,0.612,0,0.612-0.612c1.836,1.224,3.061,2.448,4.896,4.284c0,0.612,0.611,1.836,0.611,2.448
		c0.612,1.224,1.836,2.448,3.061,3.672c-17.748,33.048-34.272,66.096-55.08,96.696c-6.12,9.18-12.853,17.748-20.808,25.704
		c-19.584-31.212-51.409-67.32-89.965-60.588c-50.796,9.18-23.256,63.647,3.06,82.008c31.212,22.644,58.14,21.42,85.068,0
		c12.24,20.808,20.809,44.063,19.584,66.708c-1.836,54.468-50.796,63.647-91.8,49.571c6.12-15.912,7.956-34.271,4.284-50.184
		c-6.12-28.764-50.184-54.468-75.888-34.272c-25.092,20.196,22.032,71.604,37.332,82.009c4.284,3.06,9.18,6.119,14.076,8.567
		c-0.612,0.612-0.612,1.225-1.224,1.836c-28.152,44.064-65.484,6.12-82.62-25.092c-2.448-4.896-9.18-0.612-7.344,4.284
		c14.076,32.436,42.84,70.38,81.396,48.348c9.18-5.508,17.136-13.464,22.644-23.256c33.66,13.464,72.829,13.464,97.308-17.136
		c29.376-36.72,11.017-84.456-8.567-119.952c0.611-0.612,0.611-0.612,1.224-1.224c34.884-33.66,56.304-81.396,78.336-124.236
		c4.284,3.06,9.181,6.12,13.464,9.18c3.061,1.836,7.345,1.224,9.792-1.224c17.748-20.808,31.212-45.9,35.496-73.44
		C351.055,2.768,344.324-2.128,337.591,0.932z M178.471,207.787c-23.256,13.464-46.512-3.06-63.648-18.972
		c-22.644-20.808-16.524-54.468,18.36-47.735c17.748,3.672,31.824,19.584,43.452,32.436c6.12,6.732,12.241,14.687,17.749,23.255
		C189.488,201.056,183.979,204.728,178.471,207.787z M116.047,319.171C116.047,319.171,115.435,319.171,116.047,319.171
		c-16.524-8.567-28.764-20.808-38.556-36.107c-4.284-6.732-7.956-14.076-9.792-22.032c-6.12-20.808,26.928-10.404,35.496-6.12
		C126.451,267.764,124.615,297.14,116.047,319.171z M306.379,67.028c-0.612,0-0.612-0.612-1.224-0.612
		c0-1.836-1.225-3.672-3.672-4.896c-4.284-1.836-8.568-4.284-12.853-6.732c-1.836-1.224-5.508-4.896-5.508-3.672
		c0-0.612-0.612-1.224-1.224-1.224c6.731-3.672,13.464-8.568,20.195-12.24c8.568-4.896,17.748-9.792,26.929-14.688
		C324.74,38.264,316.784,53.564,306.379,67.028z"
                    />
                  </g>
                </svg>
                <p className="ml-16 text-xl font-bold italic tracking-tighter text-blue-600 dark:text-blue-300 text-center select-none">
                  That's me
                </p>
              </div>
            </div>
            <p className="">
              I'm Nik and I study Software Engineering at{" "}
              <Link
                href="https://www.ed.ac.uk/"
                className="text-blue-600 hover:text-red-400 dark:text-blue-300 dark:hover:text-red-500 duration-150"
              >
                Edinburgh University
              </Link>{" "}
              <br /> I've got some interesting{" "}
              <Link
                href="/apps"
                className="text-blue-600 hover:text-red-400 dark:text-blue-300 dark:hover:text-red-500 duration-150 underline"
              >
                projects
              </Link>
              , which you definitely should check out!
            </p>
            {/* <p>
              My interest range from full-stack development to music to data
              science
            </p> */}
            <p>
              Alternatively, see my{" "}
              <Link
                href="/blog"
                className="text-blue-600 hover:text-red-400 dark:text-blue-300 dark:hover:text-red-500 duration-150 underline"
              >
                posts
              </Link>{" "}
              about learning and creating something interesting, there's some
              great stuff on ML.
            </p>
            <p>
              Find out more about who I am and my experience{" "}
              <Link
                href="/curriculum-vitae"
                className="text-blue-600 hover:text-red-400 dark:text-blue-300 dark:hover:text-red-500 duration-150 underline"
              >
                here
              </Link>
              .
            </p>
          </div>
          <div className="mt-12 flex flex-col gap-2">
            <p className="text-4xl font-semibold">News:</p>
            <p className="before:content-['-_']">
              Apr 25, 2023 - Became Lead Software Developer{" @"}
              <Link
                className="text-blue-600 hover:text-red-400 dark:text-blue-300 dark:hover:text-red-500 duration-150 underline"
                href="https://marketplace.dvstr.net"
              >
                Shalfey
              </Link>
            </p>
            <p className="before:content-['-_']">
              Apr 23, 2023 -{" "}
              <Link
                href="/radio"
                className="text-blue-600 hover:text-red-400 dark:text-blue-300 dark:hover:text-red-500 duration-150 underline"
              >
                Devster Radio
              </Link>
              , Rock 'n' Roll baby!
            </p>
            <p className="before:content-['-_']">
              Feb 12, 2023 -{" "}
              <Link
                href="/"
                className="text-blue-600 hover:text-red-400 dark:text-blue-300 dark:hover:text-red-500 duration-150 underline"
              >
                Devster
              </Link>{" "}
              launch, Woohoo!
            </p>
          </div>
          <div className="mt-12 flex flex-col gap-2">
            <p className="text-4xl font-semibold">Get in touch:</p>
            <div className="flex gap-4 justify-center md:justify-start mt-4 md:px-36 w-full">
              <Link
                href="mailto:nik.peleshatyi@gmail.com"
                className="text-6xl hover:text-blue-600 dark:hover:text-sky-700 cursor-pointer"
              >
                <FaEnvelope />
                {/* <i className="fa-regular fa-envelope"></i> */}
              </Link>
              <Link
                href="https://github.com/plaunezkiy/"
                className="text-6xl hover:text-blue-600 dark:hover:text-sky-700 cursor-pointer"
              >
                <FaGithub />
                {/* <i className="fa-brands fa-github"></i> */}
              </Link>
              <Link
                href="https://www.instagram.com/peleshatyi/"
                className="text-6xl hover:text-blue-600 dark:hover:text-sky-700 cursor-pointer"
              >
                <FaInstagram />
                {/* <i className="fa-brands fa-instagram"></i> */}
              </Link>
              <Link
                href="https://www.linkedin.com/in/peleshatyinik/"
                className="text-6xl hover:text-blue-600 dark:hover:text-sky-700 cursor-pointer"
              >
                <FaLinkedin />
                {/* <i className="fa-brands fa-linkedin"></i> */}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
