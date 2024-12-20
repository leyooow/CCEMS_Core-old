import React, { useEffect, useState } from 'react';

import Table from '../../../components/Table/Table';


import ExceptionManagement from '../../../services/exceptionManagement';
import { PagedResult } from '../../../models/GenericResponseDTO';
import { ExceptionDTO } from '../../../models/exceptionManagementDTOs';

const Dashboard = () =>  {

  const [exceptionsList, setExceptionList] = useState<PagedResult<ExceptionDTO>>();

  useEffect(() => {
  }, []);

  const getExceptionsList = async() => {
    try {
      const result = await ExceptionManagement.getExceptionsList(
        1,
        10,
        "",
        1
      );
      setExceptionList(result.data.data);
    } catch (error) {
      console.error("Error fetching groups", error);
    }
  }

  console.log(exceptionsList)
  return (
    <>
     <h1>Dashboard</h1>
    </>
  )
}

export default Dashboard