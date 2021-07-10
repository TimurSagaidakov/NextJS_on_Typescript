import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Link from 'next/link';
import ILogin from "../../src/interfaces/Login";
import login from "../../modules/post/login";
import { TAppState } from "../../redux/redux-store";
import Input from '../../src/componentsUI/Input/Input';
import Header from "../../src/layouts/Header";

const Login :React.FC = () => {
  const [data, setData] = useState<ILogin>({
    name: '',
    password: '',
  });
const router = useRouter();
const prevUrl = useSelector((state: TAppState)=> state.userData.saveUrl);
const clickOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const loginResult = await login(data);
  if (loginResult.auth) {
    router.push(prevUrl || '/');
  } else {
    console.log('зайти не удалось');
  }
}
  return (
    <div>
      <Header>
        <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => clickOnSubmit(e)}>
        <input
          type="text"
          placeholder="Введите Имя"
          value={data.name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setData({ ...data, name: e.target.value })
          }
        />
        <input
          type="password"
          placeholder="Введите пароль"
          value={data.password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setData({ ...data, password: e.target.value })
          }
        />
        <input type="submit"  value="Войти"/>
        </form>
        <Link href="/signup"><a>Зарегистрироваться</a></Link>
      </Header>
    </div>
  );
}

export default Login;
