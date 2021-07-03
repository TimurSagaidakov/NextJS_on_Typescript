import { useState, useEffect } from "react";
import ILogin from "../../interfaces/Login";
import login from "../../modules/post/login";
import Input from '../../src/componentsUI/Input/Input';

const Login :React.FC = () => {
  const [data, setData] = useState<ILogin>({
    name: '',
    password: '',
  });

  return (
    <div>
      <input
        type="text"
        placeholder="Введите Имя"
        value={data.name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setData({ ...data, name: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="Введите пароль"
        value={data.password}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setData({ ...data, password: e.target.value })
        }
      />
      <button onClick={() => login(data)}>Войти</button>
    </div>
  );
}

export default Login;
