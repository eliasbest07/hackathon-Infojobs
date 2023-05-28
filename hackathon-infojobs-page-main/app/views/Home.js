'use client'
import { useEffect, useState } from 'react';
import { Text, Title } from "@tremor/react";
import AppBar from "../components/AppBar";
import Cards from "../components/Cards";
import BannerTop from "../components/BannerTop";
import ShowDetails from "../components/ShowDetails";
import Calendar from "../components/Calendar";
import useSWR from 'swr';
import Image from 'next/image';

const fetcher = (url) => fetch(`/api/search?url=${url}`).then(res => res.json());
export default function Home({data}) {
  
  const [jobs, setJobs] = useState(data);
  const [darkMode, setDarkMode] = useState(false);
  const [search, setSearch] = useState(null)
  const [showCalendar, setShowCalendar] = useState(false);
  const [showAgendar, setShowAgendar] = useState(false);
  const [urlq, setUrlq] = useState("https://api.infojobs.net/api/9/offer?q=java")//(`https://api.infojobs.net/api/9/offer?q=flutter`); 
  
  const description= useSWR(urlq, fetcher)
  
  const handleShowCalendar = () => {
    setShowCalendar(!showCalendar);
  }
  const handleShowAgendar = () => {
    setShowAgendar(!showAgendar);
  }
  const handleSearch = (event)=>{
   console.log(event.target.value);
   setSearch(event.target.value);
  }

  const handleClickSearch = async () => {
    setUrlq("https://api.infojobs.net/api/9/offer?q="+search)
  };
  
  useEffect(() => {
    setJobs(description.data)
  }, [description.data]);


  return (
    <> 
      <AppBar darkMode={darkMode} setDarkMode={setDarkMode}/>
      <BannerTop/>
      <div className="grid-container">
        <Cards etiqueta="Presencial/Teletrabajo" darkMode={darkMode} /> 
        <Cards etiqueta="Categorías" darkMode={darkMode}/> 
        <Cards etiqueta="Agenda de Entrevistas" darkMode={darkMode} showCalendar={handleShowCalendar}/> 
        <Cards etiqueta="Localizado en" darkMode={darkMode} /> 
        <Cards etiqueta="Busco ofertas de..." darkMode={darkMode} search={handleSearch} clickSearch={handleClickSearch}/> 
        <Cards etiqueta="Tu estado"/> 
      </div>

      {  showCalendar && <Calendar src={ darkMode ? ".././calendario_dark.png" : ".././calendario_light.png"} alt="calendario" onClick={handleShowCalendar} /> }
      {  showAgendar && <Calendar src={ darkMode ? ".././agendar-dark.png" : ".././agendar.png"} alt="agendar" onClick={handleShowAgendar} /> }

      <Title className={`ml-10 mt-5  ${darkMode ? 'text-white' : 'text-black-300' }`}>Ofertas para ti</Title>
      <Text className={`ml-10 mt-5  ${darkMode ? 'text-white' : 'text-black-300' }`}>  Otros usuarios con tus mismos intereses también se han inscrito en...</Text>
        
      { !description?.data && <Image alt="loading..." width={200} height={200} className='loading' src={ darkMode ? '/loading_dark.gif' : '/loading.gif' }/> }

      { jobs?.map((job)=>(
        <ShowDetails key={job.id}  darkMode={darkMode} jobs={job} agendar={handleShowAgendar}/> )) 
      }
      {/* falta el footer xd */}
    </>
  );
}