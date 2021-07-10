import { NextPageContext } from "next"
import IUser from "../../interfaces/IUser"
import getUsers from "../../modules/get/getUsers"
import getInitialPropsFromServer from "../../src/utils/getInitialPropsFromServer";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { TAppState } from "../../redux/redux-store";
import Header from "../../src/layouts/Header";

const Users = ({users}: any) => {
  const router = useRouter();
  return (
    <>
    <Header>
      <div>All users</div>
      <div>{JSON.stringify(users)}</div>
    </Header>
    </>
  )
}

Users.getInitialProps = async (ctx: NextPageContext) => {
  const { dispatch } = ctx.store;
  const users = await getInitialPropsFromServer(ctx, getUsers, dispatch);

  return {users};
}

export default connect((state: TAppState) => state)(Users);
