import "../styles/globals.css";
import type { AppInitialProps } from "next/app";
import { wrapper } from "../redux/redux-store";
import { userData } from "../redux/userReducer";
import App from "next/app";
class MyApp extends App<AppInitialProps> {
  public static getInitialProps = wrapper.getInitialAppProps(
    (store) =>
      async ({ Component, ctx }) => {
        await store.dispatch(userData(ctx.req?.headers.cookie));

        return {
          pageProps: {
            // Call page-level getInitialProps
            ...(Component.getInitialProps
              ? await Component.getInitialProps({ ...ctx, store })
              : {}),
            // Some custom thing for all pages
            pathname: ctx.pathname,
          },
        };
      }
  );

  public render() {
    const { Component, pageProps } = this.props;

    return <Component {...pageProps} />;
  }
}

export default wrapper.withRedux(MyApp);
