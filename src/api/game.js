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
        const response = await fetch(`${host}/game/${userId}`, {
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

export const getUser = async (userId) => {
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

export const appendWord = async (userId, word, guess) => {
    if (userId === null) return;

    try {
        const payload = {
            userID: userId,
            word: word,
            guess: guess,
        };

        const response = await fetch(`${host}/game/append`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload), // Include the JSON payload in the request body
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error: ", error);
    }
};

export const updateGameStatus = async (userId, gameStatus) => {
    if (userId === null) return;

    try {
        const payload = {
            userID: userId,
            gameStatus: gameStatus,
        };

        const response = await fetch(`${host}/game/status`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload), // Include the JSON payload in the request body
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error: ", error);
    }
};

export const addGame = async (userId, attempt) => {
    if (userId === null) return;

    try {
        const payload = {
            userID: userId,
            attempt: attempt,
        };

        const response = await fetch(`${host}/game/addgame`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload), // Include the JSON payload in the request body
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error: ", error);
    }
};
