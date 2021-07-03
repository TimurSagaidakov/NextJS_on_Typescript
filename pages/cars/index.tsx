import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import Link from 'next/link';
import deleteCar from "../../modules/delete/deleteCar";
import getCars from "../../modules/get/getCars";
import postCar from "../../modules/post/postCar";
import Input from '../../src/componentsUI/Input/Input';

const Cars :React.FC = () => {
  const [texts, setTexts] = useState({
    name:'',
    price: null || '',
    model: '',
    ls: '',
  });
  const [cars, setCars] = useState([]);
  const [error, setError] = useState<string>('');

  const router = useRouter();
  const postCarToBD = () => {
    const {name, price,model,ls} = texts;
    postCar({name, price, model,ls})
    setTexts({
      name:'',
      price: 0 || '',
      model: '',
      ls: '',
    })
    writeCars()
  }

  const writeCars = async () => {
    try {
      const allCars = await getCars();
      setCars(allCars);
    } catch (e) {
      setError(e.message)      
    }
  }

  const deleteThisCar = (id: number) => {
    setCars(cars.filter((car:any) => car.id !== id))
    deleteCar(id)
  }
  
  return (
    <div>
      {error}
      <Input placeholder="Введите марку"/>
      <Input placeholder="Введите цену" isNumber/>
      <Input placeholder="Введите модель"/>
      <Input placeholder="Введите количество лошадиных сил" isNumber/>
      <button className="cl" onClick={postCarToBD}>postCar</button>
      <button className="cl" onClick={writeCars}>Получить список машин</button>
      {cars?.map(({ id, name, price, model, ls }) => (
        <div key={id}>
          <span>Марка {name}  </span>
          <span>Цена {price}  </span>
          <span>Модель {model}  </span>
          <span>Лошадиные силы {ls}</span>
          <button onClick={() => deleteThisCar(id)}>удалить машину</button>
        </div>
      ))}
      <button onClick={() => router.back()}>Назад</button>
      <Link href="/"><a>Главная</a></Link>

    </div>
  )
}

export default Cars;
