'use client'

import { Card, Text, Bold, Button  } from "@tremor/react";
import { MultiSelectBox, MultiSelectBoxItem } from "@tremor/react";
import Select from "react-select";

import "react-datepicker/dist/react-datepicker.css";

import { TextInput } from "@tremor/react";
import { optionsCategoria, optionsProvincia } from "../services/filtroData";

export default function Cards( { etiqueta,darkMode, showCalendar, search ,clickSearch} ) {  
  const optionsCtgs = optionsCategoria;
  const optionsProv = optionsProvincia
  return ( 
      <>
      {etiqueta === 'Presencial/Teletrabajo' ? (
        <Card className= {`max-w-xs ml-10 mr-5 mt-5 ${darkMode ? 'bg-darkAzul' : 'bg-blue-100' }`}
         decoration="top" decorationColor="indigo" >
        <Text className={`ml-3 mt-5  ${darkMode ? 'text-white' : 'text-black-300' }`}>{etiqueta}</Text>
        <MultiSelectBox className="p-3 text-black" placeholder="Modalidad">
        <MultiSelectBoxItem  value="1" text="Híbrido" />
        <MultiSelectBoxItem  value="2" text="Presencial" />
        <MultiSelectBoxItem  value="3" text="Sin especificar" />
        <MultiSelectBoxItem  value="4" text="Solo teletrabajo" />
        </MultiSelectBox>
        </Card>
      ) : null }
   {etiqueta === 'Categorías' ? (
        <Card className={`max-w-xs ml-10 mr-5 mt-5 ${darkMode ? 'bg-darkAzul' : 'bg-blue-100' }`}
         decoration="top" decorationColor="indigo">
          <Text className={`ml-3 mt-5  ${darkMode ? 'text-white' : 'text-black-300' }`}>{etiqueta}</Text>
          <div className="max-w-sm ml-3 mr-3 mt-3 ">
            <Select
            className="basic-single text-black"
            classNamePrefix="select"
            defaultValue={optionsCtgs[0]}
            isDisabled={false}
            isLoading={false}
            isClearable={true}
            isRtl={false}
            isSearchable={true}
            options={optionsCtgs}
            placeholder="Categorías"
            />
          </div>
   
        </Card>
      ) : null}
 {etiqueta === 'Agenda de Entrevistas' ? (
        <Card className= {`max-w-xs ml-10 mr-5 mt-5 ${darkMode ? 'bg-white-100' : 'bg-white-200' }`}
         decoration="top" decorationColor="indigo" >
        <Text className={`ml-3 mt-5  ${darkMode ? 'text-white' : 'text-black-300' }`}>{etiqueta}</Text>

        <Button className="p-2 ml-20 mt-5 text-white bg-orange-400" size="xs" onClick={showCalendar}>
           CALENDARIO
        </Button>
       
        </Card>
      ) : null }
 {etiqueta === 'Localizado en' ? (
        <Card className= {`max-w-xs ml-10 mr-5 mt-5 ${darkMode ? 'bg-darkAzul' : 'bg-blue-100' }`}
         decoration="top" decorationColor="indigo" >
        <Text className={`ml-3 mt-5  ${darkMode ? 'text-white' : 'text-black-300' }`}>{etiqueta}</Text>
        <div className="max-w-sm ml-3 mr-3 mt-3 ">
            <Select
            className="basic-single text-black"
            classNamePrefix="select"
            defaultValue={optionsProv[0]}
            isDisabled={false}
            isLoading={false}
            isClearable={true}
            isRtl={false}
            isSearchable={true}
            options={optionsProv}
            placeholder="Categorías"
            />
          </div>
        </Card>
      ) : null }
       {etiqueta === 'Busco ofertas de...' ? (
        <Card className= {`max-w-xs ml-10 mr-5 mt-5 ${darkMode ? 'bg-orange-700' : 'bg-orange-200' }`}
         decoration="top" decorationColor="indigo" >
        <div className="flex-container">
        <Text className={`ml-3 mt-5  ${darkMode ? 'text-white' : 'text-black-300' }`}>{etiqueta}</Text>
        <Button className="p-2  text-white bg-orange-500" size="xs" onClick={clickSearch}>
           BUSCAR
        </Button>
        </div>
        <div className="max-w-sm mx-auto space-y-6 pl-1 pr-1 mr-1 ml-1 pt-3">
            <TextInput onChange={search} className="p-3 text-black" placeholder=" Puesto, empresa o palabra clave" />
        </div>
        </Card>
      ) : null }
       {etiqueta === 'Tu estado' ? (
        <Card className= {`max-w-xs ml-10 mr-5 mt-5 ${darkMode ? 'bg-darkAzul' : 'bg-white-100' }`}
         decoration="top" decorationColor="indigo" >
        <Text className={`ml-3 mt-5  ${darkMode ? 'text-white' : 'text-black-300' }`}>{etiqueta}</Text>
        <Bold className={`ml-3 mt-1 text-inf ${darkMode ? 'text-white' : 'text-black-300' }`}>3 candidaturas activas</Bold>
        <Text className={`ml-3 mt-1 text-inf ${darkMode ? 'text-white' : 'text-black-300' }`}>Hay novedades en tus candidaturas</Text>
        <Text className={`ml-3 mt-1 text-inf ${darkMode ? 'text-white' : 'text-black-300' }`}>Ir a Candidaturas</Text>
        </Card>
      ) : null }
    </>
  );
    }



