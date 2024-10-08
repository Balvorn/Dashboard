import mockedData from './mockedData.js'

export const getUserData = async (id, endpoint = "") => {
  console.log(import.meta.env.MODE)
  if (import.meta.env.MODE == "development") {

    if (endpoint == "") endpoint = "main"
    const data = mockedData[endpoint].filter((obj) => {
      return obj.userId == id
    }).shift()
    return {
      data: data
    }

  } else {
    const BaseUrl = `http://localhost:3000/user/`
    const url = `${BaseUrl + id}/${endpoint}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();
      return json
    } catch (error) {
      console.error(error.message);
      throw error
    }
  }


}