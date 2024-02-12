import type { TabName } from 'custom-type';
import { useRecoilState } from 'recoil';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import InputSrc from './input_src';
import DropBox from './drop_box';
import { currentTabAtom } from '@/store';
import 'react-tabs/style/react-tabs.css';

export default function Header(): JSX.Element {
  const tabNames: TabName[] = ['이미지 경로 검색', '이미지 파일 업로드'];

  const [currentTab, setCurrentTab] = useRecoilState<TabName>(currentTabAtom);

  const tabIndex = currentTab === '이미지 경로 검색' ? 0 : 1;

  return (
    <>
      <header>
        <Tabs
          className="w-full flex justify-center items-center my-8 border-b-2 border-solid border-blue-600"
          selectedIndex={tabIndex}
          onSelect={(idx) => {
            setCurrentTab(tabNames[idx]);
          }}
        >
          <TabList className="flex justify-between">
            {tabNames.map((tabName, idx) => {
              const currentTabClass = currentTab === tabName ? 'text-white bg-blue-600' : '';

              return (
                <Tab key={tabName} className="">
                  <div
                    tabIndex={idx}
                    className={`inline-flex justify-center items-center rounded-t-md w-[170px] h-[34px] ${currentTabClass} cursor-pointer	`}
                  >
                    {tabName}
                  </div>
                </Tab>
              );
            })}
          </TabList>
          {tabNames.map((tabName) => (
            <TabPanel key={tabName} />
          ))}
        </Tabs>
      </header>
      {currentTab === '이미지 경로 검색' ? <InputSrc /> : <DropBox />}
    </>
  );
}
