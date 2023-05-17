import AsyncStorage from "@react-native-async-storage/async-storage";
export const searchUsers = async (query, searchIn, limit, offset) => {
  const token = await AsyncStorage.getItem("@session_token");

  try {
    const response = await fetch(
      `http://localhost:3333/api/1.0.0/search?q=${query}&search_in=${searchIn}&limit=${limit}&offset=${offset}`,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          "X-Authorization": token,
        },
      }
    );

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};
