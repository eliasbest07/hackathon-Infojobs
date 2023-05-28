'use client'
import { Fragment, useEffect } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'


const navigation = [
  { name: 'Empleos', href: '#', current: true },
  { name: 'Mis ofertas', href: '#', current: false },
  { name: 'CV', href: '#', current: false },
  { name: 'Quién me ve', href: '#', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function AppBar( { darkMode, setDarkMode }) {

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const disclosureClasses = darkMode
    ? 'bg-darkAzul shadow-dark pt-4'
    : 'bg-white-800 shadow-md pt-4';

  const primaryColor= darkMode ?  '#e76726' : '#2088c2' ;
  const navigationColor= darkMode ?  'text-white hover:bg-white-700 hover:text-colorNaranja' : 'text-black-300 hover:bg-black-700 hover:text-colorAzul' ;
  const navigationColorActive= darkMode ?  'bg-colorNaranja text-white' : 'bg-colorAzul text-white' ;
  const buttonChangeTheme = darkMode ? 'bg-blue-100' : 'bg-gray-800' 
  
  return (
    <Disclosure as="nav" className={disclosureClasses}>
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Abrir menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <svg width="50px" height="50px" viewBox="0 -10 200 200" xmlns="http://www.w3.org/2000/svg" version="1.1">
                  <path style={{fill:primaryColor}} d="M138 112.968c0 12.75-10.335 23.086-23.085 23.086h-91.83C10.336 136.054 0 125.719 0 112.968V23.086C0 10.336 10.336 0 23.085 0h91.83C127.665 0 138 10.336 138 23.086v89.882z" ></path>
                  <path style={{fill:`#fff`}} d="M57.905 89.323c-.083.749-.748 1.247-1.493 1.247H45.344c-.664 0-1.251-.416-1.251-1.082l.082-.166 7.052-59.253c.085-.666.217-1.004.968-1.087h12.098c.581 0 .914.415.914.997v.166l-7.302 59.178zM86.169 91.298c-1.58 12.898-9.654 15.892-19.39 15.892-5.741 0-6.491-.249-7.988-.415-.748-.085-1.497-.167-1.497-1.332v-.415l.582-4.825c.166-1.415.748-1.662 1.996-1.662 1.165-.083 2.748-.083 4.493-.167 4.325-.248 7.323-.582 8.072-6.743l7.569-61.603c.086-.665.668-1.081 1.416-1.163l11.314.119h.168c.664 0 1.001.415 1.001.998"></path>
                  </svg>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current ? navigationColorActive : navigationColor,
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  onClick={toggleDarkMode}
                  type="button"
                  className= {buttonChangeTheme + " rounded-full p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"}
                >
                  <span className="sr-only">Theme Mode</span>

                  {darkMode ? (
        <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
        />
      </svg>
      ) : (
        <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
        />
      </svg>
       
      )}
                </button>
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open user menu</span>
                      <Image 
                        width={32}
                        height={32}
                        className="h-8 w-8 rounded-full"
                        src="https://firebasestorage.googleapis.com/v0/b/e-commer-app-7777.appspot.com/o/descargar2.jpg?alt=media&token=744048c9-85b0-4475-86e5-ba4b2b849132"
                        alt="foto perfil"
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className={`absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md ${darkMode ? 'bg-darkSecondary' : 'bg-white'} py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? darkMode ? 'bg-darkTertiary' : 'bg-gray-100 ' :  '', darkMode ? 'block px-4 py-2 text-sm text-white' : 'block px-4 py-2 text-sm text-gray-700' )}
                          >
                           Buscar empresas
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? darkMode ? 'bg-darkTertiary' : 'bg-gray-100 ' :  '', darkMode ? 'block px-4 py-2 text-sm text-white' : 'block px-4 py-2 text-sm text-gray-700' )}
                          >
                            Salarios
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? darkMode ? 'bg-darkTertiary' : 'bg-gray-100 ' :  '', darkMode ? 'block px-4 py-2 text-sm text-white' : 'block px-4 py-2 text-sm text-gray-700' )}
                          >
                           Formación
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? darkMode ? 'bg-darkTertiary' : 'bg-gray-100 ' :  '', darkMode ? 'block px-4 py-2 text-sm text-white' : 'block px-4 py-2 text-sm text-gray-700' )}
                          >
                           Consejos
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? darkMode ? 'bg-darkTertiary' : 'bg-gray-100 ' :  '', darkMode ? 'block px-4 py-2 text-sm text-white' : 'block px-4 py-2 text-sm text-gray-700' )}
                          >
                           Ajustes
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? darkMode ? 'bg-darkTertiary' : 'bg-gray-100 ' :  '', darkMode ? 'block px-4 py-2 text-sm text-white' : 'block px-4 py-2 text-sm text-gray-700' )}
                          >
                          Ayuda
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? darkMode ? 'bg-darkTertiary' : 'bg-gray-100 ' :  '', darkMode ? 'block px-4 py-2 text-sm text-white' : 'block px-4 py-2 text-sm text-gray-700' )}
                          >
                           Cerrar sesión
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-black' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}