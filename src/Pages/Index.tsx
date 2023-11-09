import { Link } from 'react-router-dom'



export default function Index() {

  return (
    <div className="bg-white">
      <header className="absolute inset-x-0 top-0 z-50">
        {/* <div className="mx-auto max-w-7xl">
          <div className="px-6 pt-6 lg:max-w-2xl lg:pl-8 lg:pr-0">
            <nav className="flex items-center justify-between lg:justify-start" aria-label="Global">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">GramMaster</span>
                <img
                  alt="Your Company"
                  className="h-8 w-auto"
                  src="../public/bread.svg"
                />
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700 lg:hidden"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
              <div className="hidden lg:ml-12 lg:flex lg:gap-x-14">
                {navigation.map((item) => (
                  <a key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-gray-900">
                    {item.name}
                  </a>
                ))}
              </div>
            </nav>
          </div>
        </div>
        <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">GramMaster</span>
                <img
                  className="h-8 w-auto"
                  src="../public/bread.svg"
                  alt="bread logo"
                />
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <a
                    href="/login"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </a>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog> */}
      </header>

      <div className="relative">
        <div className="mx-auto max-w-7xl">
          <div className="relative z-10 pt-14">

            <div className="relative px-6 py-32">
              <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Grammaster
              </h2>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl mt-1">
                All your baking in one place
              </h1>
              <p className="mt-2 sm:mt-6 text-lg leading-8 text-gray-600">
                A convenient way to create, store, and adjust your bread
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <Link to={`/recipes`}>
                  <span className="rounded-md bg-orange-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">Recipes</span>  
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
