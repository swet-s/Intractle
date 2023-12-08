const { hover } = require("@testing-library/user-event/dist/hover");

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            borderColor: {
                "intractle-default": "#d3d6da",
                "intractle-default-dark": "#3d3d36",

                "intractle-selected": "#787c7e",
                "intractle-gray": "#787c7e",
                "intractle-yellow": "#c9b458",
                "intractle-green": "#6aaa64",
            },
            backgroundColor: {
                "intractle-light": "#fff",
                "intractle-dark": "#111",

                "intractle-default": "#d3d6da",
                "intractle-default-hover": "#b1b4b8",
                "intractle-default-active": "#c2c5c9",

                "intractle-default-dark": "#374151",
                "intractle-default-dark-hover": "#596373",
                "intractle-default-dark-active": "#485262",

                "intractle-gray": "#787c7e",
                "intractle-gray-hover": "#9a9ea0",
                "intractle-gray-active": "#898d8f",

                "intractle-yellow": "#c9b458",
                "intractle-yellow-hover": "#ebd67a",
                "intractle-yellow-active": "#dac569",

                "intractle-green": "#6aaa64",
                "intractle-green-hover": "#8ccc86",
                "intractle-green-active": "#7bbb75",
            },
        },
    },
    plugins: [],
};
