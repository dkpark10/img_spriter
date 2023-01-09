import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import InputSrc from './input_src';
import DropBox from './drop_box';
import { imageSrcState } from '../store';

type TabName = '이미지 경로 검색' | '이미지 파일 업로드';

export default function Header() {
  const tabNames: TabName[] = ['이미지 경로 검색', '이미지 파일 업로드'];

  const setImageSrc = useSetRecoilState(imageSrcState);

  const [currentTab, setCurrentTab] = useState<TabName>('이미지 경로 검색');

  const onClick = (tabName: TabName) => {
    setCurrentTab(tabName);
    setImageSrc((prev) => ({
      ...prev,
      src: '',
      isLocal: false,
    }));
  };

  return (
    <>
      <header className='w-full flex justify-center items-center my-8 border-b-2 border-solid border-blue-600'>
        {tabNames.map((tabName, idx) => {
          const currentTabClass = currentTab === tabName ? 'text-white bg-blue-600' : '';

          return (
            <div
              className={`inline-flex justify-center items-center rounded-t-md  w-[170px] h-[34px] ${currentTabClass}`}
              // eslint-disable-next-line react/no-array-index-key
              key={idx}
              role='button'
              tabIndex={idx}
              onClick={() => onClick(tabName)}
              onKeyPress={() => onClick(tabName)}
            >
              {tabName}
            </div>
          );
        })}
      </header>
      { currentTab === '이미지 경로 검색'
        ? <InputSrc />
        : <DropBox /> }
    </>
  );
}
