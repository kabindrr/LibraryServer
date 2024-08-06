import imageRouter from "./imageRouter.js";
import userRouter from "./userRouter.js";

const routes = [
  {
    path: "/api/v1/users",
    middlewawers: [userRouter],
  },
  {
    path: "/api/v1/image-upload",
    middlewawers: [imageRouter],
  },
];
export default routes;
