const host = "http://localhost:3001";

export const getCurrWord = async () => {
  try {
    const response = await fetch(`${host}/game/word/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating game status:', error);
  }
};

