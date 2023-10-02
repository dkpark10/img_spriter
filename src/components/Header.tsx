import { TabName } from 'custom-type';
import React from 'react';
import { useRecoilState } from 'recoil';
import InputSrc from './input_src';
import DropBox from './drop_box';
import { currentTabAtom } from '@/store';

export default function Header() {
  const tabNames: TabName[] = ['이미지 경로 검색', '이미지 파일 업로드'];

  const [currentTab, setCurrentTab] = useRecoilState<TabName>(currentTabAtom);

  const onClick = (tabName: TabName) => {
    setCurrentTab(tabName);
  };

  return (
    <>
      <header className="w-full flex justify-center items-center my-8 border-b-2 border-solid border-blue-600">
        {tabNames.map((tabName, idx) => {
          const currentTabClass = currentTab === tabName ? 'text-white bg-blue-600' : '';

          return (
            <div
              className={`inline-flex justify-center items-center rounded-t-md  w-[170px] h-[34px] ${currentTabClass}`}
              key={tabName}
              role="button"
              tabIndex={idx}
              onClick={() => onClick(tabName)}
              onKeyUp={() => onClick(tabName)}
            >
              {tabName}
            </div>
          );
        })}
      </header>
      {currentTab === '이미지 경로 검색' ? <InputSrc /> : <DropBox />}
    </>
  );
}
