import { useGetAllServicesQuery } from "../../rtk/Service/ServiceApi";



function Service() {
      const { data: allService } = useGetAllServicesQuery();
    console.log(allService);
    
   
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-10 text-gray-800">Our Services</h1>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
          {allService?.data?.map((service, idx) => (
            <div
              key={idx}
              className="relative bg-white rounded-3xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition duration-300"
            >
              {/* Coming Soon Ribbon */}
              {service.commingSoon && (
                <div className="absolute top-4 right-4 bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                  Coming Soon
                </div>
              )}
  
              {/* Image */}
              <div className="w-full h-48 mb-4 overflow-hidden rounded-xl">
                <img
                  src={service.imageCover}
                  alt={service.name_en}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
  
              {/* Names */}
              <h2 className="text-xl font-bold text-gray-800 mb-1">
                {service.name_en}
              </h2>
              <h3 className="text-sm text-gray-500 mb-3">{service.name_ar}</h3>
  
              {/* Descriptions */}
              <p className="text-gray-600 text-sm mb-1">
                {service.description_en}
              </p>
              <p className="text-gray-400 text-sm italic">
                {service.description_ar}
              </p>
            </div>
          ))}
        </div>
      </div>
  )
}

export default Service
