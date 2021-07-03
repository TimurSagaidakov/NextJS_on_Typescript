import { NextPageContext } from "next";
import Router from "next/router";

export default async (ctx: NextPageContext, fn: (cookie: string | undefined) => any) => {
  const cookie = ctx.req?.headers.cookie;

  try {
    const users = await fn(cookie);
    return users;
  } catch (e) {
    if (!ctx.req) {
      Router.replace('/login');
      return;
    } else {
      ctx.res?.writeHead(302, {
        Location: 'http://localhost:3000/login',
      });
      ctx.res?.end();
      return;
    }
  }
};
