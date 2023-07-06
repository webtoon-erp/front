import { Link, Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Home from './pages/common/home';
import Login from './pages/common/login';
import Profile from './pages/common/profile';
import Notice from './pages/common/notice';
import Webtoon from './pages/common/webtoon';
import HrAdd from './pages/hr/hrAdd';
import HrAttendance from './pages/hr/hrAttendance';
import HrProfileListView from './pages/hr/hrProfileListView';
import HrProfileState from './pages/hr/hrProfileState';
import HrProfileView from './pages/hr/hrProfileView';
import HrUpdate from './pages/hr/hrUpdate';
import HrVacationRequest from './pages/hr/hrVacationRequest';
import HrVacationView from './pages/hr/hrVacationView';
import HrView from './pages/hr/hrView';
import HrWholeState from './pages/hr/hrWholeState';
import ItPastReqeustList from './pages/itsm/itPastRequestList';
import ItRequestAdd from './pages/itsm/itRequestAdd';
import ItRequestListView from './pages/itsm/itRequestListView';
import ItRequestView from './pages/itsm/itRequestView';
import ToonAdd from './pages/webtoon/toonAdd';
import EpisodeAdd from './pages/webtoon/episodeAdd';
import ToonView from './pages/webtoon/toonView';
import EpRequestAdd from './pages/electropayment/epRequestAdd';
import EpRequestList from './pages/electropayment/epRequestList';
import EpRequestView from './pages/electropayment/epRequestView';
import NavBar from './component/navBar';
import Header from './component/header';
import HrMyAttendance from './pages/hr/hrMyAttendance';

function App() {
  return (
    <>
    <Router>
      <header>
        <Header />
      </header>
        <div style={{ display: 'flex' }}>
        <aside>
            <NavBar />
          </aside>
        
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/notice" element={<Notice />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/webtoon" element={<Webtoon />} />
              <Route path="/hrAdd" element={<HrAdd />} />
              <Route path="/hrAttendance" element={<HrAttendance/>} />
              <Route path="/hrMyAttendance" element={<HrMyAttendance/>}/>
              <Route path="/hrProfileListView" element={<HrProfileListView />} />
              <Route path="/hrProfileState" element={<HrProfileState />} />
              <Route path="/hrProfileView" element={<HrProfileView />} />
              <Route path="/hrUpdate" element={<HrUpdate />} />
              <Route path="/hrVacationRequest" element={<HrVacationRequest />} />
              <Route path="/hrVacationView" element={<HrVacationView />} />
              <Route path="/hrView" element={<HrView />} />
              <Route path="/hrWholeState" element={<HrWholeState />} />
              <Route path="/itPastRequestList" element={<ItPastReqeustList />} />
              <Route path="/itRequestAdd" element={<ItRequestAdd />} />
              <Route path="/itRequestListView" element={<ItRequestListView />} />
              <Route path="/itRequestView" element={<ItRequestView />} />
              <Route path="/toonAdd" element={<ToonAdd />} />
              <Route path="/episodeAdd" element={<EpisodeAdd />} />
              <Route path="/toonView" element={<ToonView />} />
              <Route path="/epRequestAdd" element={<EpRequestAdd />} />
              <Route path="/epRequestList" element={<EpRequestList />} />
              <Route path="/epRequestView" element={<EpRequestView />} />
            </Routes>
          </main>
          </div>
      <footer>
        
      </footer>
    </Router>
    </>
  );
}

export default App;
