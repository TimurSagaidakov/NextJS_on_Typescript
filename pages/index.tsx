import Link from 'next/link';
import { Hero } from "../src/fragments/Hero";

const Index :React.FC = () => {
  
  return (
    <div>
      <div className="header">
        <Link href="/cars"><a>Машины</a></Link>
        <Link href="/login"><a>Логин</a></Link>
        <Link href="/users"><a>Все Пользователи</a></Link>
      </div>
      <Hero title="Hello TypeScript" />
    </div>
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
