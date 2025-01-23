import { API_SERVICES_URLS } from '@/data/page';
import { useSWRHook } from '@/hooks/page';
import Image from 'next/image';

import React from 'react';

export const Statistic = () => {
  const { data } = useSWRHook(API_SERVICES_URLS.GET_STATISTICS);

  return (
    <div className='grid sm:grid-cols-2 grid-cols-1 gap-5'>
      {/* Today Appointments */}
      <div className='bg-[#77CDFF] p-5 rounded-lg flex items-center'>
        <div className='bg-white bg-opacity-30 p-3 rounded-full mr-4'>
          <Image src={'/icon1.svg'} alt='icon'width={30} height={30} />
        </div>
        <div>
          <h2 className='text-white text-2xl font-bold'>{data?.todayAppointments || 0}</h2>
          <p className='text-white text-sm'>Today Appointment</p>
        </div>
      </div>

      {/* Number of Users */}
      <div className='bg-[#F95454] p-5 rounded-lg flex items-center'>
        <div className='bg-white bg-opacity-30 p-3 rounded-full mr-4'>
          <Image src={'/icon2.svg'} alt='icon2' width={30} height={30}/>
        </div>
        <div>
          <h2 className='text-white text-2xl font-bold'>{data?.totalUsers || 0}</h2>
          <p className='text-white text-sm'>Number of users</p>
        </div>
      </div>
    </div>
  );
};

export default Statistic;
