import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// City options for dropdowns
const CITIES = [
  { code: 'DEL', name: 'New Delhi' },
  { code: 'BOM', name: 'Mumbai' },
  { code: 'BLR', name: 'Bengaluru' },
  { code: 'HYD', name: 'Hyderabad' },
  { code: 'CCU', name: 'Kolkata' },
  { code: 'MAA', name: 'Chennai' },
  { code: 'PNQ', name: 'Pune' },
  { code: 'AMD', name: 'Ahmedabad' },
  { code: 'GOI', name: 'Goa' },
  { code: 'COK', name: 'Kochi' },
  { code: 'JAI', name: 'Jaipur' },
  { code: 'LKO', name: 'Lucknow' },
  { code: 'IXC', name: 'Chandigarh' },
  { code: 'SAG', name: 'Sagar' },
  { code: 'VTZ', name: 'Visakhapatnam' },
  { code: 'COB', name: 'Coimbatore' },
  { code: 'SXR', name: 'Srinagar' },
  { code: 'TRZ', name: 'Tirupati' },
  { code: 'IDR', name: 'Indore' },
  { code: 'BHO', name: 'Bhopal' },
  { code: 'AGR', name: 'Agra' },
  { code: 'VNS', name: 'Varanasi' },
  { code: 'RJC', name: 'Rajkot' },
  { code: 'RAJ', name: 'Rajkot' },
  { code: 'HRI', name: 'Haryana' },
  { code: 'MSN', name: 'Manesar' },
  { code: 'AUH', name: 'Abu Dhabi' },
  { code: 'DXB', name: 'Dubai' },
  { code: 'DOH', name: 'Doha' },
  { code: 'SIN', name: 'Singapore' },
  { code: 'KUL', name: 'Kuala Lumpur' },
  { code: 'BKK', name: 'Bangkok' },
  { code: 'LHR', name: 'London' },
]

export default function HomePage() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useState({
    from: 'DEL',
    to: 'BOM',
    departDate: '',
    returnDate: '',
    passengers: '1',
    class: 'economy',
  })

  const handleSearch = (e) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams)
    navigate(`/search?${params.toString()}`)
  }

  const getFromToNames = () => {
    const fromCity = CITIES.find(c => c.code === searchParams.from)
    const toCity = CITIES.find(c => c.code === searchParams.to)
    return {
      fromName: fromCity?.name || 'Select',
      toName: toCity?.name || 'Select'
    }
  }

  const { fromName, toName } = getFromToNames()

  return (
    <div className="pt-0">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            alt="Hero Background"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbCHtMCoh2AkI2C3w7jsqw2vMncbf9UBJILe44AcGlTxTTv_fycZaB1_lhzspN8ZeDGcexRti58bsmEQPKkG1zX0Ac3VxTlVgGkNl26ooDQRvBJYreN_nRkmX8jmV0mh9-6vbHEqNlJNrBc0NofBwMjDsLpSxQZghKXm21ylsdu1fPcsJx7De0KmI2zXWCaB23SG8f9lR9t5h3FlWtQvxtwHopAa5sk58peK6SpuKXeaSAkBQIFfwqw_f4XzC7zQR2k0ArFOzsJdo"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/20 to-slate-900/10"></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 text-center">
          <div className="mb-12">
            <h1 className="font-headline text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight leading-tight">
              Explore India and the World
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto font-body">
              Search and book flights with real-time seat availability.
            </p>
          </div>

          {/* Search Widget */}
          <div className="bg-white/70 backdrop-blur-md rounded-xl shadow-2xl p-8 max-w-5xl mx-auto border border-white/30">
            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {/* From/To */}
              <div className="col-span-1 md:col-span-1 grid grid-cols-2 gap-4">
                <div className="text-left">
                  <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-1 block">
                    From
                  </label>
                  <select
                    value={searchParams.from}
                    onChange={(e) =>
                      setSearchParams({ ...searchParams, from: e.target.value })
                    }
                    className="w-full bg-white border-b-2 border-primary p-3 rounded-t-lg font-body font-semibold text-sm focus:ring-0 focus:outline-none cursor-pointer appearance-none pr-8"
                  >
                    {CITIES.map((city) => (
                      <option key={city.code} value={city.code}>
                        {city.code} - {city.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="text-left">
                  <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-1 block">
                    To
                  </label>
                  <select
                    value={searchParams.to}
                    onChange={(e) =>
                      setSearchParams({ ...searchParams, to: e.target.value })
                    }
                    className="w-full bg-white border-b-2 border-primary p-3 rounded-t-lg font-body font-semibold text-sm focus:ring-0 focus:outline-none cursor-pointer appearance-none pr-8"
                  >
                    {CITIES.map((city) => (
                      <option key={city.code} value={city.code}>
                        {city.code} - {city.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Dates */}
              <div className="col-span-1 md:col-span-1 grid grid-cols-2 gap-4">
                <div className="text-left">
                  <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-1 block">
                    Departure
                  </label>
                  <input
                    type="date"
                    value={searchParams.departDate}
                    onChange={(e) =>
                      setSearchParams({ ...searchParams, departDate: e.target.value })
                    }
                    className="w-full bg-white border-b-2 border-primary p-3 rounded-t-lg font-body font-semibold text-sm focus:ring-0 focus:outline-none cursor-pointer"
                  />
                </div>
                <div className="text-left">
                  <div className="flex items-center justify-between gap-3 mb-1">
                    <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant block">
                      Return
                    </label>
                    <label className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                      <input
                        type="checkbox"
                        checked={Boolean(searchParams.returnDate)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            const fallback = searchParams.departDate || new Date().toISOString().slice(0, 10)
                            setSearchParams({ ...searchParams, returnDate: fallback })
                          } else {
                            setSearchParams({ ...searchParams, returnDate: '' })
                          }
                        }}
                        className="h-4 w-4 rounded border-primary"
                      />
                      Round trip
                    </label>
                  </div>
                  <input
                    type="date"
                    value={searchParams.returnDate}
                    disabled={!Boolean(searchParams.returnDate)}
                    onChange={(e) => setSearchParams({ ...searchParams, returnDate: e.target.value })}
                    className="w-full bg-white border-b-2 border-primary p-3 rounded-t-lg font-body font-semibold text-sm focus:ring-0 focus:outline-none cursor-pointer disabled:opacity-60"
                  />
                </div>
              </div>

              {/* Pax/Class */}
              <div className="col-span-1 md:col-span-1 grid grid-cols-2 gap-4">
                <div className="text-left">
                  <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-1 block">
                    Passengers
                  </label>
                  <select
                    value={searchParams.passengers}
                    onChange={(e) =>
                      setSearchParams({ ...searchParams, passengers: e.target.value })
                    }
                    className="w-full bg-surface-container-lowest border-b-2 border-primary p-3 rounded-t-lg font-headline font-bold border-none focus:ring-0"
                  >
                    <option value="1">1 Adult</option>
                    <option value="2">2 Adults</option>
                    <option value="3">3 Adults</option>
                    <option value="4">4 Adults</option>
                  </select>
                </div>
                <div className="text-left">
                  <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-1 block">
                    Class
                  </label>
                  <select
                    value={searchParams.class}
                    onChange={(e) =>
                      setSearchParams({ ...searchParams, class: e.target.value })
                    }
                    className="w-full bg-surface-container-lowest border-b-2 border-primary p-3 rounded-t-lg font-headline font-bold border-none focus:ring-0"
                  >
                    <option value="economy">Economy</option>
                    <option value="business">Business</option>
                    <option value="first">First Class</option>
                  </select>
                </div>
              </div>
            </form>

            <button
              onClick={handleSearch}
              className="w-full py-4 rounded-full bg-gradient-to-r from-primary to-primary-container text-white font-headline text-lg font-bold shadow-lg hover:scale-[1.02] active:scale-95 transition-all"
            >
              Search Flights
            </button>
          </div>
        </div>
      </section>

      {/* Featured Deals Section */}
      <section className="py-24 px-6 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="font-headline text-4xl font-extrabold text-on-surface mb-2">
                Exclusive Bharat Deals
              </h2>
              <p className="text-on-surface-variant">
                Curated destinations at unbeatable prices for your next adventure.
              </p>
            </div>
            <button className="mt-4 md:mt-0 text-primary font-bold flex items-center hover:underline">
              View all deals <span className="material-symbols-outlined ml-1">arrow_forward</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Deal Cards */}
            {[
              { city: 'Goa', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqWLUrX5K-lgjVNwGfxZKgMpp74X_lO98W_EKPAdtvWKtyY9WyeG6NIheJ-4Ykf5p767Q0CK-gPdVcEGUNZ-ZyPmj41aVPBBAm918nkGOAR35vjYVFhuPcWBfkQhQo-FHOFP0HmA6wVNAHDdRakNf5TzW84-ALK--DowDBl5KjU7QbyeWKducqzyVNVog0ZttX8NRRUmEYoOKhFiVesvCcrRyU0OoGBD-9dlbV_S11GaNahgbYv4dvtWBiXZzLi4kf5WXYngbmpms', price: '₹4,999', desc: 'Round trip from Delhi' },
              { city: 'London', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuByPb7ilZZweu7y81X8k4ZjOjpKGiEsCfoNA1loEt3IL3aNloKzb-0W9CEBRYYQLrsQQurthek1VHt6K-v1O0WiQ9Pn4fA463Xvq8uKmsBkJ0LY127YtE_wjo6nKt54i9MQ__kcKd5gL8vA3LheWk6ST8_xtnvX8VHYsbbxw_fKDsMZgyADIOVrnHvLtOtbXSNzUSJNsm3KSZ2MvbyYwbF2mXqg7fFvSnoXYORp5-zdgB9Q51w_1StVHmcKqZdLd3b29TArkiDqETY', price: '₹58,200', desc: 'Direct from Mumbai' },
              { city: 'New York', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfISpVN5BKuDZ3C0sGZ8CXZaTnrT_hWZ72ol_myev2Q_14uFRar51omuwZDTccs3d2ffwC3QURLz3_bl-hY5Rl9_EXT6EAwIsj4hyfrO7iLAfOaP_xHGHmD8OOpFj21FEsi3r__CFhFVN14EzuXy5CS-fNmAm8x9O4LJ4h4gzunYKdDFUL_KVVfVQLpZPiPjadTr_ButdjgyHFuHEOgRrSuqBqYBLwMHc2LSs88CLKbMmoBiQkJVU_iQZAcwoimyTtuIzkSj9s_8', price: '₹72,450', desc: 'Via Bengaluru' },
            ].map((deal, i) => (
              <div
                key={i}
                className="group bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-surface-container"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    alt={deal.city}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    src={deal.image}
                  />
                  <div className="absolute top-4 left-4 bg-tertiary-container text-on-tertiary-container text-xs font-bold px-3 py-1 rounded-full">
                    FEATURED
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-headline text-2xl font-bold">{deal.city}</h3>
                      <p className="text-on-surface-variant text-sm">{deal.desc}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-on-surface-variant">Starts from</p>
                      <p className="text-2xl font-headline font-extrabold text-primary">{deal.price}</p>
                    </div>
                  </div>
                  <button className="w-full py-3 rounded-lg border-2 border-outline-variant/20 text-primary font-bold hover:bg-surface-container-low transition-colors">
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Service Banner */}
      <section className="py-24 px-6 bg-surface-container-low overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-square bg-white rounded-full absolute -top-12 -left-12 w-64 h-64 opacity-50 blur-3xl"></div>
            <img
              alt="Cabin Experience"
              className="relative z-10 rounded-xl shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-500"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDYhwCiS3JgTqacl1Fe6Q0sm1Yg88S2PNcF_LDetnGkHi6WvbH6BAUo2sVk3j5cl3u6H_A2VQXEgdKzXHwAj6nkFvDP49HspNAjvoGX9WZF15H-DohoHbSP44KNIXRDF2MK02EMmy8R2mZ-GPlwd9VGvvhS0F9G-EFG74fiEwcTqUooHhQlIVxM-1DqP9WN-mDAPrZeM9RNg7WpJrmrDqWvho_ev3iX0jQ3odhT_u76evLvAwoG971G9GU0KZveOXWDJZEFndt7n4"
            />
          </div>
          <div>
            <span className="text-primary font-bold tracking-widest uppercase text-sm block mb-4">
              Experience Excellence
            </span>
            <h2 className="font-headline text-5xl font-extrabold leading-tight mb-6">
              Redefining the Sky. Premium Bharat Service.
            </h2>
            <p className="text-on-surface-variant text-lg mb-8 leading-relaxed">
              From gourmet Indian cuisine to spacious seating across all classes, we bring the warmth of
              Indian hospitality to 30,000 feet. Experience seamless check-ins and real-time updates
              through our smart flight management system.
            </p>
            <div className="flex gap-4">
              <div className="flex items-center space-x-2">
                <span className="material-symbols-outlined text-tertiary">verified</span>
                <span className="font-semibold">Award Winning</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="material-symbols-outlined text-tertiary">wifi</span>
                <span className="font-semibold">Free In-flight Wi-Fi</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
