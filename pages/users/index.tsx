import { NextPageContext } from "next"
import IUser from "../../interfaces/IUser"
import getUsers from "../../modules/get/getUsers"
import getInitialPropsFromServer from "../../src/utils/getInitialPropsFromServer";

const Users = ({users}: any) => {

  return (
    <>
      <div>All users</div>
      <div>{JSON.stringify(users)}</div>
    </>
  )
}

Users.getInitialProps = async (ctx: NextPageContext) => {
  const users = await getInitialPropsFromServer(ctx, getUsers);
  return {users};
}

export default Users;