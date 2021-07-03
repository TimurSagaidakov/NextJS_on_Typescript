import { useState, useEffect } from "react";
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

export default Index;
