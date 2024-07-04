import { toast } from "react-toastify";

//custom notification
export const notify = (type, content, position) => {
   const config = {
      position: position,
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
   };
   switch (type) {
      case "success":
         toast.success(content, config);
         break;
      case "warn":
         toast.warn(content, config);
         break;
      case "error":
         toast.error(content, config);
         break;
      case "info":
         toast.info(content, config);
         break;
      default:
         break;
   }
};