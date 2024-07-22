
export const setUserData = (user_data) =>
   localStorage.setItem("user_data", JSON.stringify(user_data))


export const getUserData = () => {
   const userData = localStorage.getItem("user_data")
   return JSON.parse(userData)
}