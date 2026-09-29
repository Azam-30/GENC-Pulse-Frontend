.admin-dashboard {
  min-height: 100vh;
  background: #f3f7fb;
}

.dashboard-header {
  background: linear-gradient(90deg, #0f172a 0%, #1e293b 100%);
  padding: 1.25rem 2rem;
  color: white;
  box-shadow: 0 12px 24px rgba(15, 23, 42, 0.08);
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-weight: 600;
}

.logout-btn {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255,255,255,0.12);
  color: white;
  border-radius: 10px;
  padding: 0.7rem 1rem;
}

.dashboard-main {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 1.25rem 3rem;
}

.admin-section {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 18px;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.05);
  padding: 1.25rem;
  margin-bottom: 1.25rem;
}

.admin-section h2 {
  margin-top: 0;
  margin-bottom: 1rem;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
}

.toggle-btn,
.submit-btn {
  border: none;
  border-radius: 10px;
  padding: 0.75rem 1rem;
  font-weight: 700;
}

.toggle-btn {
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  color: #1d4ed8;
}

.register-form-container {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  padding: 1rem;
}

.form-row {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.45rem;
  font-weight: 600;
  color: #334155;
}

.form-group input,
.form-group select {
  width: 100%;
  border: 1px solid #d8e1ee;
  border-radius: 12px;
  padding: 0.85rem 1rem;
}

.submit-btn {
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
  color: white;
}

.message {
  margin-top: 1rem;
  border-radius: 10px;
  padding: 0.75rem 0.9rem;
  font-weight: 600;
}

.message.success {
  background: #dcfce7;
  color: #166534;
}

.message.error {
  background: #fee2e2;
  color: #b91c1c;
}

.managers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}

.manager-card {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  padding: 1rem;
}

.manager-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.role-badge {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  padding: 0.35rem 0.7rem;
  font-size: 0.72rem;
  font-weight: 700;
  background: #dbeafe;
  color: #1d4ed8;
}

.manager-details {
  display: grid;
  gap: 0.45rem;
  color: #334155;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(180px, 1fr));
  gap: 1rem;
}

.info-card {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  padding: 1rem;
}

.info-card h3 {
  margin: 0 0 0.5rem;
  color: #64748b;
}

.info-value {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 800;
  color: #0f172a;
}

.status-operational {
  color: #16a34a;
}

@media (max-width: 700px) {
  .form-row,
  .info-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .header-content,
  .section-header {
    flex-direction: column;
    align-items: flex-start;
  }
}
