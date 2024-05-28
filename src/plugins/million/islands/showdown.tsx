"use client";

/**
 import { startTransition, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

import { getCount } from "./live-visitors";
*/

/** @see https://github.com/aidenybai/million/blob/main/website/components/extra-content.tsx */

/**
 const LagRadar = dynamic(() => import("react-lag-radar"), { ssr: false });

export function ExtraContent() {
  return (
    <>
      <Status />
    </>
  );
}
*/

/** @see https://liveblocks.io/docs/get-started/nextjs */

/* export function Status() {
  const [, forceUpdate] = useState({});
  const count = getCount();
  const userString = count > 1 ? "users are" : "user is";
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     forceUpdate({});
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, []);
  return (
    <div className="ml-1 flex items-center gap-2 text-sm text-primary/70">
      <div className="relative flex h-3 w-3">
        <div className="absolute inline-flex h-full w-full animate-ping rounded-full bg-zinc-500 opacity-75"></div>
        <div className="relative inline-flex h-3 w-3 rounded-full bg-zinc-600"></div>
      </div>
      Currently {count} other {userString} online.
    </div>
  );
} */

/**
 * Renders a showdown between React and Million.js, measuring the performance of each library.
 * @param initStart - whether to start the showdown immediately or wait for a button click
 * @param amount - the number of elements to render in the showdown
 * @returns the rendered component
 */
// million-ignore
// export function Showdown({ initStart = false, amount = 1000 }) {
/**
 * The current state of the showdown, indicating whether it has started or not
 */
// const [start, setStart] = useState<boolean>(false);
// /**
// * The number of times the showdown has been rendered
// */
// const [renders, setRenders] = useState<number>(0);
// /**
// * A reference to the first update of the component, used // to prevent unnecessary re-renders
// */
// const firstUpdate = useRef(true);
// /**
// * A reference to the functions used to render the // components
// */
// const ref = useRef<{
//   renderReact: () => void;
//   renderMillion: () => void;
// }>();

/**
 * Sets up the showdown by importing the necessary libraries and creating the components
 */
/* useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    const setup = async () => {
      const { block, mount, patch } = await import(
        "./million-library/million.mjs"
      );
      const { createRoot } = await import("react-dom/client");

      const reactRoot = document.createElement("div");
      const millionRoot = document.createElement("div");

      // An array filled with the specified number of elements
      // eslint-disable-next-line unicorn/no-new-array
      const filledArray = new Array(amount).fill(0);

      // A function that returns a block of JSX based on the specified text
      // @param text - the text to display in the block
      // @returns the block of JSX
      const b = block(({ text }: { text: string }) => ({
        type: "div",
        props: {
          children: [
            {
              type: "div",
              props: {
                children: [
                  ...filledArray.map(() => ({
                    type: "div",
                    props: {
                      children: filledArray.map(() => ({
                        type: "div",
                        props: {},
                      })),
                    },
                  })),
                  {
                    type: "div",
                    props: {
                      children: [text],
                    },
                  },
                ],
              },
            },
          ],
        },
      }));

      // A React component that displays the specified text in a block with nested divs
      // @param text - the text to display
      // @returns the React component
      const Component = ({ text }) => {
        return (
          <div>
            <div>
              {filledArray.map(() => (
                <div>
                  {filledArray.map(() => (
                    // biome-ignore lint/style/useSelfClosingElements: <explanation>
                    <div></div>
                  ))}
                </div>
              ))}
              <div>{text}</div>
            </div>
          </div>
        );
      };

      // The current block of JSX, used to update the Million.js component
      const currentBlock = b({ text: String(Math.random()) });
      // Mounts the current block of JSX to the Million.js component
      mount(currentBlock, millionRoot);
      // Creates the React root element and renders the initial component
      const root = createRoot(reactRoot);

      root.render(<Component text={String(Math.random())} />);

      // Sets the render functions for the React and Million.js components
      ref.current = {
        renderReact() {
          root.render(<Component text={String(Math.random())} />);
        },
        renderMillion() {
          patch(currentBlock, b({ text: String(Math.random()) }));
        },
      };
    };
    if (initStart || start) {
      startTransition(() => {
        void setup();
      });
    }
  }, [start]); */

/**
 * Starts the showdown if it is not already running and initializes the state
 */
/* useEffect(() => {
    if (initStart) {
      setTimeout(() => {
        startTransition(() => {
          setStart(true);
        });
      }, 1000);
    }
  }, []);

  return (
    <div className="w-full rounded-lg border border-[#e5e7eb] bg-white p-3 shadow dark:border-[#262626] dark:bg-[#141414]">
      <div className="px-2 text-xs font-semibold text-[#6b7280]">
        SPEED SHOWDOWN ⚡
      </div>
      <hr className="my-2 border-[#e8e8e8] dark:border-[#4b4b4b]" />
      {!start ? (
        <div>
          <button
            type="button"
            onClick={() => setStart(true)}
            className="w-full rounded bg-[#f0e1ff] p-2 font-bold text-[#5200a3] dark:bg-[#24182f] dark:text-[#9580ff]"
          >
            {initStart ? "Booting up demo..." : "Begin"}
          </button>
        </div>
      ) : (
        <div>
          <div className="px-2 text-xs text-[#6b7280]">
            Click on a button to invoke a render cycle{" "}
            <span className="font-semibold">({renders} renders)</span>
          </div>
          <div className="my-4 flex justify-center">
            <LagRadar />
          </div>
          <div className="mb-4 flex justify-center gap-2">
            <button
              type="button"
              onClick={() => {
                setRenders(renders + 1);
                ref.current?.renderMillion();
              }}
              className="rounded-full bg-[#b073d9] px-4 py-2 font-bold text-white shadow transition-all hover:opacity-90 active:scale-105 active:opacity-90"
            >
              Million.js
            </button>
            <button
              type="button"
              onClick={() => {
                setRenders(renders + 1);
                ref.current?.renderReact();
              }}
              className="rounded-full bg-[#139eca] px-4 py-2 text-white shadow transition-all hover:opacity-90 active:scale-105 active:opacity-90"
            >
              React
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
 */
