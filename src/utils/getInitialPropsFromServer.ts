import { NextPageContext } from "next";
import Router from "next/router";
import { savePrevUrl } from "../../redux/userReducer";

export default async (ctx: NextPageContext, fn: (cookie: string | undefined) => any, dispatch: any) => {
  const cookie = ctx.req?.headers.cookie;

  try {
    const users = await fn(cookie);
    return users;
  } catch (e) {
    if (!ctx.req) {
      dispatch(savePrevUrl(ctx.pathname))
      Router.replace('/login');
      return;
    } else {
      dispatch(savePrevUrl(ctx.pathname));
      ctx.res?.writeHead(302, {
        Location: 'http://localhost:3000/login',
      });
      ctx.res?.end();
      return;
    }
  }
};
