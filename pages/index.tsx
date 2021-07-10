import { Hero } from "../src/fragments/Hero";
import Header from "../src/layouts/Header";

const Index :React.FC = () => {
  return (
    <>
      <Header>
        <Hero title="Hello TypeScript" />
      </Header>
    </>
  )
}

// export async function getServerSideProps(context) {
//   const cookies = context.req.headers.cookie;
//   return {
//     props: {},
//   };
// }

// export const getServerSideProps = wrapper.getServerSideProps(store => async ({req, res, ...etc}) => {
  
//   await store.dispatch(userData(req?.headers.cookie));

//   // console.log('State on server', store.getState());

//   return {
//       props: {
//           'sdf': 'sdf',
//       },
//   };
// });

export default Index;
