import { Response } from "express";
export default function (handler: (arg0: any, arg1: any) => any) {
  return async (req: any, res: Response, next: any) => {
    try {
      await handler(req, res);
    } catch (ex: any) {
      console.error(ex.message, ex);
      res
        .status(500)
        .send({ status: "500", message: "Internal server error" });
    }
  };
};

// import { Response, NextFunction } from "express";
// import { UserRequest } from "./validateUserToken";

// type AsyncHandlerFn = (
//   req: UserRequest,
//   res: Response,
//   next: any
// ) => Promise<void>;

// export default function asyncHandler(handler: AsyncHandlerFn) {
//   return (req: UserRequest, res: Response, next: NextFunction) => {
//     Promise.resolve(handler(req, res, next)).catch((error) => {
//       console.error(error.message, error);
//       res.status(500).json({ status: "500", message: "Internal server error" });
//     });
//   };
// }