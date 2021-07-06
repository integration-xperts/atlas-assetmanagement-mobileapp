import React, {useEffect, useState} from 'react';
import {useQuery} from 'react-query';

import {Loader} from '../../../../shared/Loader';
import {DetailList} from '../../../../shared/DetailList';
import {languageTxt} from '../../../../../utils/languageTxt';
import {getIntroduction} from '../../../../../config/api/aboutUs';

export const Introduction = () => {
  const {isLoading, error, data, refetch}: any = useQuery(
    'getIntroduction',
    getIntroduction,
    {select: introduction => introduction},
  );

  const [introductionList, setIntroductionList] = useState([]);
  useEffect(() => {
    if (data?.data) {
      let json: any = [];
      for (const [key, value] of Object.entries(data.data)) {
        if (key != 'Urdu-image') {
          json.push({
            name: key,
            description: value,
          });
        }
      }
      setIntroductionList(json);
    }
  }, [data]);
  console.log(data);
  return (
    <>
      <Loader loader={isLoading} />
      <DetailList
        arrayList={introductionList}
        interval={1}
        headerTitle={languageTxt.introductionTxt}
      />
    </>
  );
};
