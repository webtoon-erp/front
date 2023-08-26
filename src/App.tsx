import { Link, Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './pages/common/home';
import Login from './pages/common/login';
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
import PasswordReset from './pages/common/passwordReset';
import ToonAdd from './pages/webtoon/toonAdd';
import EpisodeAdd from './pages/webtoon/episodeAdd';
import AllToonView from './pages/webtoon/allToonView';
import ToonDetail from './pages/webtoon/toonDetail';
import EpMyDocsView from './pages/electropayment/epMyDocsView';
import EpDepDocsView from './pages/electropayment/epDepDocsView';
import EpHoldenDocsView from './pages/electropayment/epHoldenDocsView';
import EpRefDocsView from './pages/electropayment/epRefDocsView';
import EpRequestDetail from './pages/electropayment/epRequestDetail';
import EpFormAnnualLeaveRequest from './pages/electropayment/epFormAnnualLeaveRequest';
import EpFormCorporateCardUsage from './pages/electropayment/epFormCorporateCardUsage';
import EpFormPurchaseOrder from './pages/electropayment/epFormPurchaseOrder';
import EpFormReimbursementRequest from './pages/electropayment/epFormReimbursementRequest';
import EpFormWorkRequest from './pages/electropayment/epFormWorkRequest';
import NoticeAdd from './pages/system/noticeAdd';
import Tab from './component/Tab';
import TabComponent from './component/TabComponent';
import ScheduleAdd from './pages/system/scheduleAdd';
import Schedule from './pages/common/schedule';
import EpisodeDetail from './pages/webtoon/episodeDetail';
import Modal from './component/modal'; // Assuming you have a Modal component
import NoticeDetail from './pages/system/noticeDetail';

function App() {
  const [tabElements, setTabElements] = useState([
    { title: 'Home', fixed: true }
  ]);
  const [activeTab, setActiveTab] = useState<string | null>(tabElements[0]?.title || null);
  const [activeModal, setActiveModal] = useState<{ title: string; fixed: boolean } | null>(null);


  useEffect(() => {
    const savedTabs = JSON.parse(localStorage.getItem('tabs') || '[]');
    setTabElements(savedTabs);
  }, []);

  useEffect(() => {
    localStorage.setItem('tabs', JSON.stringify(tabElements));
  }, [tabElements]);

  const handleCloseTab = (index: number) => {
    if (tabElements[index].fixed) {
      return;
    }

    const newTabElements = [...tabElements];
    newTabElements.splice(index, 1);

    if (tabElements[index].title === activeTab) {
      setActiveTab(newTabElements[newTabElements.length - 1]?.title || null);
    }

    setTabElements(newTabElements);
  };

  const handleAddTab = (title: string) => {
    if (!tabElements.some((tab) => tab.title === title)) {
      const newTabElements = [...tabElements, { title, fixed: false }];
      setTabElements(newTabElements);
      setActiveTab(title);
    }
  };

  const handleOpenModal = (index: number) => {
    setActiveModal(tabElements[index]);
  };

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  return (
    <Router>
      <header>
        <Header />
      </header>
      <div style={{ display: 'flex' }}>
        <aside>
          <NavBar onAddTab={handleAddTab} />
        </aside>
        <main style={{ flex: 1, marginTop: '80px' }}>
        <Tab
          tabElements={tabElements}
          onClose={handleCloseTab}
          onOpenModal={handleOpenModal}
        />

          <Routes>
              <Route path="/" element={<Home />} />  {/* 메인홈 */}
              <Route path="/login" element={<Login />} />  {/* 로그인 */}
              <Route path="/passwordReset" element={<PasswordReset />}/>  {/* 비밀번호 초기화 */}
              <Route path="/notice" element={<Notice />} />  {/* 공지사항 조회 */}
              <Route path="/webtoon" element={<Webtoon />} />  {/* 작품 관리 */}
              <Route path="/myPage" element={<MyPage />} />  {/* 마이페이지 */}
              <Route path="/hrAdd" element={<HrAdd />} />  {/* 사원 등록 */}
              <Route path="/hrAttendance" element={<HrAttendance/>} />  {/* 전체 근태 관리 */}
              <Route path="/hrMyAttendance" element={<HrMyAttendance/>}/>  {/* 내 근태 관리 */}
              <Route path="/hrProfileListView" element={<HrProfileListView />} />  {/*  */}
              <Route path="/hrProfileView" element={<HrProfileView />} />  {/* 직원 상세 */}
              <Route path="/hrView" element={<HrView />} />  {/* 전체 직원 관리 */}
              <Route path="/hrSalary" element={<HrSalary />} />  {/* 내 급여 관리 */}
              <Route path="/hrAllSalaryView" element={<HrAllSalaryView />} />  {/* 전체 급여 관리 */}
              <Route path="/hrOrgChart" element={<HrOrgChart />} />  {/* 조직도 */}
              <Route path="/itRequestAdd" element={<ItRequestAdd />} />  {/* 서비스 요청 */}
              <Route path="/itRequestListView" element={<ItRequestListView />} />  {/* 서비스 조회 */}
              <Route path="/itRequestView" element={<ItRequestView />} />  {/* 서비스 요청 상세 */}
              <Route path="/toonAdd" element={<ToonAdd/>} />  {/* 작품 등록 */}
              <Route path="/episodeAdd" element={<EpisodeAdd />} />  {/* 회차 등록 */}
              <Route path="/episodeDetail" element={<EpisodeDetail />} />  {/* 회차 상세 */}
              <Route path="/toonView" element={<ToonView />} />  {/* 웹툰 상세 (사용X)*/}
              <Route path="/toonDetail" element={<ToonDetail />} />  {/* 웹툰 상세 (사용O) */}
              <Route path="/allToonView" element={<AllToonView />} />  {/* 전체 웹툰 조회 */}
              <Route path="/epRequestAdd" element={<EpRequestAdd />} />  {/* 결재 요청 */}
              <Route path="/epMyDocsView" element={<EpMyDocsView />} />  {/* 내 문서 조회 */}
              <Route path="/epDepDocsView" element={<EpDepDocsView />} />  {/* 부서 문서 조회 */}
              <Route path="/epHoldenDocsView" element={<EpHoldenDocsView />} />  {/* 결재 대기 문서 조회 */}
              <Route path="/epRefDocsView" element={<EpRefDocsView />} />  {/* 참조 문서 조회 */}
              <Route path="/epRequestDetail" element={<EpRequestDetail /> } />  {/*  */}
              <Route path="/epFormAnnualLeaveRequest" element={<EpFormAnnualLeaveRequest /> } />  {/* 연차 신청서  */}
              <Route path="/epFormCorporateCardUsage" element={<EpFormCorporateCardUsage /> } />  {/* 법인카드 사용내역서 */}
              <Route path="/epFormPurchaseOrder" element={<EpFormPurchaseOrder /> } />  {/* 구매 품의서 */}
              <Route path="/epFormReimbursementRequest" element={<EpFormReimbursementRequest /> } />  {/* 비용집행 요청서 */}
              <Route path="/epFormWorkRequest" element={<EpFormWorkRequest /> } />  {/*연장/휴일근무 신청서  */}
              <Route path="/noticeAdd" element={<NoticeAdd />} />  {/* 공지사항 등록 */}
              <Route path="/noticeDetail" element={<NoticeDetail /> } />  {/* 공지사항 상세 */}
              <Route path="/scheduleAdd" element={<ScheduleAdd />} />  {/* 일정 등록 */}
              <Route path="/schedule" element={<Schedule />} />  {/* 일정 조회 */}

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
        </main>
      </div>
      <footer></footer>
    </Router>
  );
}

export default App;