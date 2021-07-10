import { NextPage } from "next";
import Head from 'next/head';
import Link from 'next/link';
import { useSelector } from "react-redux";
import { TAppState } from "../../redux/redux-store";


const Header: NextPage = ({children}) => {
 const {birthdate, email, firstName, lastName, image} = useSelector((state: TAppState) => state.userData);
 
 return (
  <>
  <Head>
   <title>Главная страница моего будущего приложения</title>
   <meta name='description' content='что то для ботов'></meta>
  </Head>
  <div className="header">
   <Link href="/"><a>Главная</a></Link>
   <Link href="/cars"><a>Машины</a></Link>
   <Link href="/login"><a>Логин</a></Link>
   <Link href="/users"><a>Все Пользователи</a></Link>
  </div>
  {image && <img src={image} style={{width: '200px'}}/>}
  {firstName && (
   <>
    <div>
     Текущий пользователь {`${firstName} ${lastName}`}
    </div>
    {birthdate && <div>Дата рождения: {birthdate.slice(0, 10)} </div>}
   </>
  )}
  {children}
  </>
 );
}

export default Header;
