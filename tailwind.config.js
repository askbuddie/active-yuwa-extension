/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                roboto: ['"Roboto Condensed"', "serif"],
            },
            colors: {
                primary: 'rgb(229, 57, 53)',
            }
        },
    },
    plugins: [],
};
