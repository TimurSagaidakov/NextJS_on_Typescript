import { useState, useEffect } from "react";
import ILogin from "../../interfaces/Login";
import signup from "../../modules/post/signup";

interface IError {
  errorPassword?: boolean,
  errorPasswordLength?: boolean,
  errorName?: boolean,
}

const Signup: React.FC = () => {
  const [data, setData] = useState<ILogin>({
    name: '',
    password: '',
    repeatPassword: '',
  });
  const [error, setError] = useState<IError>({
    errorPassword: false,
    errorName: false,
  });

  const registration = async () => {
    const {name, password, repeatPassword} = data;
    const errorInput = {
      errorPassword: password !== repeatPassword || password?.length < 4,
      errorName: name?.length < 6,
      errorPasswordLength: password?.length < 4
    }
    if (Object.values(errorInput).find(Boolean)) {
      return setError(errorInput)
    };
      await signup({name, password});
      setError({
        errorPassword: false,
        errorName: false,
        errorPasswordLength: false
      });
  };

  return (
    <div>
      {error.errorPassword && (
        <div>
        не совпадают пароли
      </div>
      )}
      {error.errorPasswordLength && (
        <div>
        короткий пароль
      </div>
      )}
      {error.errorName && (
        <div>
        Длина имени должна быть больше 5 символов
      </div>
      )}
      <input
        type="text"
        placeholder="Введите Имя"
        value={data.name}
        onKeyDown={() => error.errorName && setError({errorName: false})}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setData({ ...data, name: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="Введите пароль"
        value={data.password}
        onKeyDown={() => error.errorPassword && setError({errorPassword: false, errorPasswordLength: false})}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setData({ ...data, password: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="Повторите пароль"
        value={data.repeatPassword}
        onKeyDown={() => error.errorPassword && setError({errorPassword: false, errorPasswordLength: false})}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setData({ ...data, repeatPassword: e.target.value })
        }
      />
      <button onClick={registration}>Войти</button>

    </div>
  );
}

export default Signup;
