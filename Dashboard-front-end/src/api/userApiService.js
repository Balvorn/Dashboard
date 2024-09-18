
export const getUserData = async (id,endpoint = "") =>{
  const BaseUrl = `http://localhost:3000/user/`
  const url = `${BaseUrl+id}/${endpoint}`;

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