
import React, { useState, useEffect } from 'react';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import GeneratorPage from './pages/GeneratorPage';
import HistoryPage from './pages/HistoryPage';
import Navbar from './components/Navbar';
// Fixed: Added missing import for CurriculumDisplay component
import CurriculumDisplay from './components/CurriculumDisplay';
import { authService } from './services/mockAuthService';
import { UserProfile, Curriculum } from './types';
import Toasts from './components/Toast';

const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [currentPage, setCurrentPage] = useState<string>('dashboard');
  const [selectedCurriculum, setSelectedCurriculum] = useState<Curriculum | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const sessionUser = authService.getCurrentUser();
    setUser(sessionUser);
    setIsLoading(false);
  }, []);

  const handleLogin = (newUser: UserProfile) => {
    setUser(newUser);
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    setCurrentPage('dashboard');
  };

  const navigateTo = (page: string) => {
    setCurrentPage(page);
    setSelectedCurriculum(null);
  };

  const handleSelectCurriculum = (c: Curriculum) => {
    setSelectedCurriculum(c);
    setCurrentPage('view');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 bg-indigo-200 rounded-2xl mb-4"></div>
          <div className="h-4 w-32 bg-indigo-100 rounded"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen pb-20">
      <Navbar 
        user={user} 
        onLogout={handleLogout} 
        onNavigate={navigateTo} 
        currentPage={currentPage}
      />
      
      <main className="transition-all duration-300">
        {currentPage === 'dashboard' && (
          <DashboardPage 
            user={user} 
            onNavigate={navigateTo} 
            onSelectCurriculum={handleSelectCurriculum} 
          />
        )}
        {currentPage === 'generate' && <GeneratorPage />}
        {currentPage === 'history' && (
          <HistoryPage onSelect={handleSelectCurriculum} />
        )}
        {currentPage === 'view' && selectedCurriculum && (
          <div className="max-w-5xl mx-auto px-4 py-10">
            <button 
              onClick={() => navigateTo('history')}
              className="mb-8 flex items-center text-slate-500 hover:text-indigo-600 transition-colors font-semibold"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to History
            </button>
            <CurriculumDisplay data={selectedCurriculum} />
          </div>
        )}
      </main>

      <Toasts />

      {/* Quick Access Fab on Mobile */}
      <button 
        onClick={() => navigateTo('generate')}
        className="fixed bottom-6 right-6 md:hidden w-14 h-14 btn-primary text-white rounded-full shadow-2xl flex items-center justify-center z-50 animate-bounce"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  );
};

export default App;
