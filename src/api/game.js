// const host = "http://localhost:3001";
const host = "https://intractle.onrender.com";

export const getCurrWord = async () => {
    try {
        const response = await fetch(`${host}/game/word/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error: ", error);
    }
};

export const getGame = async (userId) => {
    try {
        const response = await fetch(`${host}/game/user/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error: ", error);
    }
};
