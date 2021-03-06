module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        dBanner: "url('/src/assets/dbanner.png')",
        mBanner: "url('/src/assets/mbanner.png')",
        ourCooffe: "url('/src/assets/our.jpg')",
        ourCooffe2: "url('/src/assets/our2.jpg')",
      },
      backgroundColor: () => ({
        pink: "#F7DADA",
        darkTransparent: "rgba(0,0,0,0.6)",
        base: "#BD0707",
        cream: "rgba(224, 200, 200, 0.25)",
      }),
      borderColor: () => ({
        base: "#BD0707",
      }),
      textColor: {
        base: "#BD0707",
      },
      boxShadow: {
        main: "0px 4px 4px rgba(0, 0, 0, 0.25), 4px 4px 20px rgba(0, 0, 0, 0.25)",
      },
      inset: {
        99: "29.5rem",
        100: "33rem",
        "2/5": "38%",
        "1/6": "10%",
      },

      maxHeight: {
        97: "28rem",
      },
      height: {
        99: "33.4rem",
      },
      gap: {
        8: "2.1rem",
      },
    },
  },

  variants: {
    extend: {},
  },
  plugins: [],
};
