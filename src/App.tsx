import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './pages/landing';
import { LoginPage } from './pages/auth/login';
import { RegisterPage } from './pages/auth/register';
import { DashboardLayout } from './components/layout/dashboard-layout';
import { DashboardOverviewPage } from './pages/dashboard/overview';
import { ProtectedRoute } from './components/auth/protected-route';
import { routes } from './lib/routes';
import { ToastProvider } from './components/ui/toast';

// Dashboard Pages
import { StaffPage } from './pages/dashboard/staff';
import { PanelPage } from './pages/dashboard/panel';
import { PatientsPage } from './pages/dashboard/patients';
import { NewPatientPage } from './pages/dashboard/new-patient';
import { PatientCarePage } from './pages/dashboard/patient-care';
import { ReportPage } from './pages/dashboard/report';
import { BillingPage } from './pages/dashboard/billing';
import { DutyRosterPage } from './pages/dashboard/duty-roster';
import { InSessionPage } from './pages/dashboard/in-session';
import { MedicationPage } from './pages/dashboard/medication';
import { PatientSchedulePage } from './pages/dashboard/patient-schedule';
import { SchedulePage } from './pages/dashboard/schedule';
import { InventoryPage } from './pages/dashboard/inventory';
import { ItemListPage } from './pages/dashboard/item-list';
import { StockPage } from './pages/dashboard/stock';
import { StockReportPage } from './pages/dashboard/stock-report';
import { SuppliersPage } from './pages/dashboard/suppliers';
import { OrdersPage } from './pages/dashboard/orders';
import { SettingsPage } from './pages/dashboard/settings';

export default function App() {
  return (
    <Router>
      <ToastProvider />
      <Routes>
        <Route path={routes.home} element={<LandingPage />} />
        <Route path={routes.auth.login} element={<LoginPage />} />
        <Route path={routes.auth.register} element={<RegisterPage />} />
        
        <Route
          path={routes.dashboard.root}
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to={routes.dashboard.overview} replace />} />
          <Route path="overview" element={<DashboardOverviewPage />} />
          <Route path="staff" element={<StaffPage />} />
          <Route path="panel" element={<PanelPage />} />
          <Route path="patients" element={<PatientsPage />} />
          <Route path="patients/new" element={<NewPatientPage />} />
          <Route path="patient-care" element={<PatientCarePage />} />
          <Route path="report" element={<ReportPage />} />
          <Route path="billing" element={<BillingPage />} />
          <Route path="duty-roster" element={<DutyRosterPage />} />
          <Route path="in-session" element={<InSessionPage />} />
          <Route path="medication" element={<MedicationPage />} />
          <Route path="patient-schedule" element={<PatientSchedulePage />} />
          <Route path="schedule" element={<SchedulePage />} />
          <Route path="inventory" element={<InventoryPage />} />
          <Route path="item-list" element={<ItemListPage />} />
          <Route path="stock" element={<StockPage />} />
          <Route path="stock-report" element={<StockReportPage />} />
          <Route path="suppliers" element={<SuppliersPage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}