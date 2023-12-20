import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import Home from './pages/common/home';
import Login from './pages/common/login';
import PasswordReset from './pages/common/passwordReset';
import Notice from './pages/common/notice';
import Webtoon from './pages/common/webtoon';
import MyPage from './pages/common/myPage';
import HrAdd from './pages/hr/hrAdd';
import HrAttendance from './pages/hr/hrAttendance';
import HrProfileListView from './pages/hr/hrProfileListView';
import HrProfileView from './pages/hr/hrProfileView';
import HrView from './pages/hr/hrView';
import HrSalary from './pages/hr/hrSalary';
import HrAllSalaryView from './pages/hr/hrAllSalaryView';
import HrOrgChart from './pages/hr/hrOrgChart';
import ItRequestAdd from './pages/itsm/itRequestAdd';
import ItRequestListView from './pages/itsm/itRequestListView';
import ItRequestView from './pages/itsm/itRequestView';
import ToonView from './pages/webtoon/toonView';
import EpRequestAdd from './pages/electropayment/epRequestAdd';
import NavBar from './component/navBar';
import Header from './component/header';
import HrMyAttendance from './pages/hr/hrMyAttendance';
import ToonAdd from './pages/webtoon/toonAdd';
import EpisodeAdd from './pages/webtoon/episodeAdd';
import AllToonView from './pages/webtoon/allToonView';
import ToonDetail from './pages/webtoon/toonDetail';
import EpMyDocsView from './pages/electropayment/epMyDocsView';
import EpDepDocsView from './pages/electropayment/epDepDocsView';
import EpHoldenDocsView from './pages/electropayment/epHoldenDocsView';
import EpRefDocsView from './pages/electropayment/epRefDocsView';
import EpRequestDetail from './pages/electropayment/epRequestDetail';
import EpFormCorporateCardUsage from './pages/electropayment/epFormCorporateCardUsage';
import EpFormPurchaseOrder from './pages/electropayment/epFormPurchaseOrder';
import EpFormReimbursementRequest from './pages/electropayment/epFormReimbursementRequest';
import EpFormWorkRequest from './pages/electropayment/epFormWorkRequest';
import NoticeAdd from './pages/system/noticeAdd';
import Tab from './component/Tab';
import TabComponent from './component/TabComponent';
import ScheduleAdd from './pages/system/scheduleAdd';
import Schedule from './pages/common/schedule';
import ScheduleDetail from './pages/system/scheduleDetail';
import EpisodeDetail from './pages/webtoon/episodeDetail';
import NoticeDetail from './pages/system/noticeDetail';
import ItRequestDetail from './pages/itsm/itRequestDetail';

function App() {
  const [token, setToken] = useState(sessionStorage.getItem("accessToken"));
  const [userId, setUserId] = useState(sessionStorage.getItem("employeeId"));
  const [position, setPosition] = useState(sessionStorage.getItem("position"));
  const [deptCode, setDeptCode] = useState(sessionStorage.getItem("deptCode"));


  useEffect(() => {
    function handleSessionChange() {
      setToken(sessionStorage.getItem("accessToken"));
      setUserId(sessionStorage.getItem("employeeId"));
      setPosition(sessionStorage.getItem("position"));
      setDeptCode(sessionStorage.getItem("deptCode"));
    }
    
    window.addEventListener('storage', handleSessionChange);
    
    return () => {
      window.removeEventListener('storage', handleSessionChange);
    }
  }, []);

  const [tabElements, setTabElements] = useState([
    { title: 'Home', fixed: true }
  ]);
  const [activeTab, setActiveTab] = useState<string | null>(tabElements[0]?.title || null);
  const [activeModal, setActiveModal] = useState<{ title: string; fixed: boolean } | null>(null);


  // 탭 추가 함수
  const handleAddTab = (title: string) => {
    if (!tabElements.some((tab) => tab.title === title)) {
      const newTabElements = [...tabElements, { title, fixed: false }];
      setTabElements(newTabElements);
      // 상태 업데이트 후 약간의 지연을 두고 새로고침
      //window.location.reload();
    }
  };
  

  // 컴포넌트가 마운트될 때 로컬 스토리지에서 탭 상태를 불러옵니다.
  useEffect(() => {
    const savedTabs = JSON.parse(localStorage.getItem('tabs') || '[]');
    if (savedTabs.length > 0 && tabElements.length === 1 && tabElements[0].title === 'Home') {
      setTabElements(savedTabs);
    }
  }, [handleAddTab]);

  // tabElements 상태가 변경될 때마다 이를 로컬 스토리지에 저장합니다.
  useEffect(() => {
    localStorage.setItem('tabs', JSON.stringify(tabElements));
  }, [tabElements]);

  
  // 탭 닫기 함수
  const handleCloseTab = (index: number) => {
    if (tabElements[index].fixed) {
      return;
    }

    const newTabElements = [...tabElements];
    newTabElements.splice(index, 1);
    setTabElements(newTabElements);

    if (tabElements[index].title === activeTab) {
      setActiveTab(newTabElements.length > 0 ? newTabElements[newTabElements.length - 1].title : null);
    }
  };


  const handleOpenModal = (index: number) => {
    setActiveModal(tabElements[index]);
  };

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  
  const isLoginPage = window.location.pathname === '/';

  const tabComponent = useMemo(() => (
    <Tab
      tabElements={tabElements}
      onClose={handleCloseTab}
      onOpenModal={handleOpenModal}
    />
  ), [tabElements, handleCloseTab, handleOpenModal]);

  return (
    <Router>
      {
        isLoginPage &&  (
          <>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/passwordReset" element={<PasswordReset />} />
            </Routes>
          </>
        )
      }
      {!isLoginPage && (
        <>
          <header>
            <Header />
          </header>
          <div style={{ display: 'flex' }}>
            <aside>
              <NavBar onAddTab={handleAddTab} />
            </aside>
            <main style={{ flex: 1, marginTop: '80px' }}>
              {tabComponent}
              <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/notice" element={<Notice />} />
                <Route path="/webtoon" element={<Webtoon />} />
                <Route path="/myPage" element={<MyPage />} />
                <Route path="/hrAdd" element={<HrAdd />} />
                <Route path="/hrAttendance" element={<HrAttendance/>} />
                <Route path="/hrMyAttendance" element={<HrMyAttendance/>}/>
                <Route path="/hrProfileListView" element={<HrProfileListView />} />
                <Route path="/hrProfileView:Id" element={<HrProfileView />} />
                <Route path="/hrView" element={<HrView />} />
                <Route path="/hrSalary" element={<HrSalary />} />
                <Route path="/hrAllSalaryView" element={<HrAllSalaryView />} />
                <Route path="/hrOrgChart" element={<HrOrgChart />} />
                <Route path="/itRequestAdd" element={<ItRequestAdd />} />
                <Route path="/itRequestListView" element={<ItRequestListView />} />
                <Route path="/itRequestView" element={<ItRequestView />} />
                <Route path="/itRequestDetail:Id" element={<ItRequestDetail />} />
                <Route path="/toonAdd" element={<ToonAdd/>} />
                <Route path="/episodeAdd/:Id" element={<EpisodeAdd />} />
                <Route path="/toonView" element={<ToonView />} />
                <Route path="/toonDetail/:Id" element={<ToonDetail />} />
                <Route path="/allToonView" element={<AllToonView />} />
                <Route path="/epRequestAdd" element={<EpRequestAdd />} />
                <Route path="/epMyDocsView" element={<EpMyDocsView />} />
                <Route path="/epDepDocsView" element={<EpDepDocsView />} />
                <Route path="/epHoldenDocsView" element={<EpHoldenDocsView />} />
                <Route path="/epRefDocsView" element={<EpRefDocsView />} />
                <Route path="/epRequestDetail/:Id" element={<EpRequestDetail /> } />
                <Route path="/epFormCorporateCardUsage" element={<EpFormCorporateCardUsage /> } />
                <Route path="/epFormPurchaseOrder" element={<EpFormPurchaseOrder /> } />
                <Route path="/epFormReimbursementRequest" element={<EpFormReimbursementRequest /> } />
                <Route path="/epFormWorkRequest" element={<EpFormWorkRequest /> } />
                <Route path="/noticeAdd" element={<NoticeAdd />} />
                <Route path="/noticeDetail/:Id" element={<NoticeDetail /> } />
                <Route path="/scheduleAdd" element={<ScheduleAdd />} />
                <Route path="/schedule" element={<Schedule />} />
                <Route path="/scheduleDetail" element={<ScheduleDetail />} />
                <Route path="/episodeDetail/:Id" element={<EpisodeDetail />} />

                {tabElements.map((tab, index) => (
                  <Route
                    key={index}
                    path={`/${tab.title}`}
                    element={
                      <TabComponent
                        title={tab.title}
                        modalContent={activeModal}
                        onOpenModal={() => handleOpenModal(index)}
                        onCloseModal={handleCloseModal}
                      />
                    }
                  />
                ))}
          </Routes>
              <footer></footer>
            </main>
          </div>
        </>
      )}
      
    </Router>
  );
}

export default App;