import { useNavigate, useParams } from 'react-router';
import { motion } from 'motion/react';
import {
  Zap, ChevronRight, Power, Lightbulb,
  Fan, Activity, Droplet, Box, CloudRain, Thermometer,
  Database
} from 'lucide-react';

interface ServiceItem {
  id: number;
  name: string;
  price: string;
  icon: any;
  image: string;
}

export function ServiceSelectionScreen() {
  const navigate = useNavigate();
  const { serviceType } = useParams();

  const electricalServices: ServiceItem[] = [
    {
      id: 1,
      name: 'Switch Repair',
      price: 'From ₹149',
      icon: Power,
      image: 'https://images.unsplash.com/photo-1635335874521-7987db781153?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2FsJTIwc3dpdGNoJTIwYm94fGVufDF8fHx8MTc3Mjc2ODU1NXww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: 2,
      name: 'Light Installation',
      price: 'From ₹249',
      icon: Lightbulb,
      image: 'https://images.unsplash.com/photo-1686045597025-ed4f10976673?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5naW5nJTIwbGlnaHRidWxic3xlbnwxfHx8fDE3NzI3Njg1NTV8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: 3,
      name: 'Wiring Issue',
      price: 'From ₹499',
      icon: Zap,
      image: 'https://images.unsplash.com/photo-1576446468729-7674e99608f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2FsJTIwd2lyaW5nfGVufDF8fHx8MTc3Mjc2ODU1NXww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: 4,
      name: 'Fan Installation',
      price: 'From ₹199',
      icon: Fan,
      image: 'https://images.unsplash.com/photo-1555470100-1728256970aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjZWlsaW5nJTIwZmFufGVufDF8fHx8MTc3Mjc2ODU1Nnww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: 5,
      name: 'Socket Installation',
      price: 'From ₹149',
      icon: Power,
      image: 'https://images.unsplash.com/photo-1751486289945-989724789188?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2FsJTIwc29ja2V0fGVufDF8fHx8MTc3Mjc2ODU1Nnww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: 6,
      name: 'Circuit Breaker',
      price: 'From ₹799',
      icon: Zap,
      image: 'https://images.unsplash.com/photo-1761251947512-a293e482919f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXJjdWl0JTIwYnJlYWtlciUyMHBhbmVsfGVufDF8fHx8MTc3Mjc2ODU1Nnww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: 7,
      name: 'Electrical Panel',
      price: 'From ₹1499',
      icon: Zap,
      image: 'https://images.unsplash.com/photo-1635335874521-7987db781153?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2FsJTIwc3dpdGNoJTIwYm94fGVufDF8fHx8MTc3Mjc2ODU1NXww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: 8,
      name: 'Cable Installation',
      price: 'From ₹299',
      icon: Zap,
      image: 'https://images.unsplash.com/photo-1576446468729-7674e99608f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2FsJTIwd2lyaW5nfGVufDF8fHx8MTc3Mjc2ODU1NXww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: 9,
      name: 'Ceiling Fan Repair',
      price: 'From ₹249',
      icon: Zap,
      image: 'https://images.unsplash.com/photo-1555470100-1728256970aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjZWlsaW5nJTIwZmFufGVufDF8fHx8MTc3Mjc2ODU1Nnww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: 10,
      name: 'Chandelier',
      price: 'From ₹599',
      icon: Lightbulb,
      image: 'https://images.unsplash.com/photo-1686045597025-ed4f10976673?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5naW5nJTIwbGlnaHRidWxic3xlbnwxfHx8fDE3NzI3Njg1NTV8MA&ixlib=rb-4.1.0&q=80&w=1080'
    }
  ];

  const plumbingServices: ServiceItem[] = [
    {
      id: 16,
      name: 'Pipe Leakage',
      price: 'From ₹299',
      icon: Activity,
      image: 'https://images.unsplash.com/photo-1720889589894-497c4f4f569e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWFraW5nJTIwcGlwZXxlbnwxfHx8fDE3NzI3Njg1NTh8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: 17,
      name: 'Drain Cleaning',
      price: 'From ₹249',
      icon: Droplet,
      image: 'https://images.unsplash.com/photo-1707636497310-0d65e5f4d79a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibG9ja2VkJTIwZHJhaW58ZW58MXx8fHwxNzcyNzY4NTU4fDA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: 18,
      name: 'Water Heater',
      price: 'From ₹599',
      icon: Thermometer,
      image: 'https://images.unsplash.com/photo-1701421047855-d7bafd8d6f69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMGhlYXRlcnxlbnwxfHx8fDE3NzI3Mjc2NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: 19,
      name: 'Faucet Repair',
      price: 'From ₹149',
      icon: Droplet,
      image: 'https://images.unsplash.com/photo-1761353854551-361b1c804849?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbHVtYmluZyUyMGZhdWNldHxlbnwxfHx8fDE3NzI3Njg1NTh8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: 20,
      name: 'Toilet Repair',
      price: 'From ₹299',
      icon: Box,
      image: 'https://images.unsplash.com/photo-1589824783837-6169889fa20f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2lsZXR8ZW58MXx8fHwxNzcyNzY4NTU4fDA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: 21,
      name: 'Shower Installation',
      price: 'From ₹999',
      icon: CloudRain,
      image: 'https://images.unsplash.com/photo-1652662700928-5a4685e87d64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaG93ZXIlMjBoZWFkfGVufDF8fHx8MTc3Mjc2ODU1OHww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: 22,
      name: 'Sink Installation',
      price: 'From ₹799',
      icon: Droplet,
      image: 'https://images.unsplash.com/photo-1595514535116-d0401260e7cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXRocm9vbSUyMHNpbmt8ZW58MXx8fHwxNzcyNzY4NTU4fDA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: 23,
      name: 'Water Pump',
      price: 'From ₹1199',
      icon: Database,
      image: 'https://images.unsplash.com/photo-1630732347607-3a89a66447e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMHRhbmt8ZW58MXx8fHwxNzcyNzY4NTU4fDA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: 24,
      name: 'Sewer Line',
      price: 'From ₹1999',
      icon: Droplet,
      image: 'https://images.unsplash.com/photo-1720889589894-497c4f4f569e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWFraW5nJTIwcGlwZXxlbnwxfHx8fDE3NzI3Njg1NTh8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: 25,
      name: 'Garbage Disposal',
      price: 'From ₹699',
      icon: Droplet,
      image: 'https://images.unsplash.com/photo-1595514535116-d0401260e7cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXRocm9vbSUyMHNpbmt8ZW58MXx8fHwxNzcyNzY4NTU4fDA&ixlib=rb-4.1.0&q=80&w=1080'
    }
  ];

  const servicesList = serviceType === 'electrician' ? electricalServices : plumbingServices;
  const headerTitle = serviceType === 'electrician' ? 'Electrician Services' : 'Plumbing Services';


  const handleServiceSelect = (service: ServiceItem) => {
    navigate('/customer/booking', {
      state: {
        service: service.name,
        serviceType,
        price: service.price
      }
    });
  };

  return (
    <div className="pb-10">
      <div className="max-w-7xl mx-auto px-6 pt-8 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">{headerTitle}</h1>
        <p className="text-gray-600">Select the service you need</p>
      </div>


      <div className="p-4 grid grid-cols-2 gap-4">
        {servicesList.map((service, index) => (
          <motion.button
            key={service.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
            onClick={() => handleServiceSelect(service)}
            className="bg-white rounded-[20px] shadow-[0_2px_10px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col text-left active:scale-[0.98] transition-transform"
          >
            <div className="relative h-[110px] w-full">
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="absolute bottom-2 left-2 bg-white p-1.5 rounded-[10px] shadow-sm">
                <service.icon className="w-5 h-5 text-[#3b82f6]" strokeWidth={2.5} />
              </div>
            </div>

            <div className="p-3">
              <h3 className="text-[#0f172a] font-bold text-[13px] leading-tight mb-2 min-h-[30px] flex items-center">
                {service.name}
              </h3>
              <div className="flex items-center justify-between">
                <span className="text-[#136dec] font-bold text-[12px]">{service.price}</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
