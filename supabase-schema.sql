-- Schema Supabase per societa-dubai.it
-- Esegui queste query nella SQL Editor di Supabase

-- Tabella clienti
CREATE TABLE IF NOT EXISTS clients (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email           text UNIQUE NOT NULL,
  full_name       text NOT NULL,
  phone           text,
  whatsapp        text,
  company_name    text,
  company_type    text, -- freezone | mainland | offshore
  free_zone       text,
  created_at      timestamptz DEFAULT now()
);

-- Tabella contratti
CREATE TABLE IF NOT EXISTS contracts (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id       uuid REFERENCES clients(id),
  plan            text NOT NULL, -- BASIC | ENTRY_LEVEL | PRO | SILVER | GOLD | PLATINUM | DIAMOND
  amount_aed      integer,
  addons          jsonb DEFAULT '[]',
  status          text DEFAULT 'pending', -- pending | active | paused | cancelled | onboarding_complete
  mamopay_plan_id text,
  mamopay_sub_id  text,
  started_at      timestamptz,
  next_billing    timestamptz,
  cancelled_at    timestamptz,
  created_at      timestamptz DEFAULT now()
);

-- Tabella sessioni configuratore
CREATE TABLE IF NOT EXISTS configurator_sessions (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_data    jsonb NOT NULL,
  client_email    text,
  plan_suggested  text,
  amount_aed      integer,
  converted       boolean DEFAULT false,
  created_at      timestamptz DEFAULT now()
);

-- Tabella documenti
CREATE TABLE IF NOT EXISTS documents (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id       uuid REFERENCES clients(id),
  contract_id     uuid REFERENCES contracts(id),
  name            text NOT NULL,
  storage_path    text NOT NULL,
  uploaded_by     text, -- client | pbtax
  doc_type        text, -- trade_license | passport | moa | bank_statement | trn_cert | other
  created_at      timestamptz DEFAULT now()
);

-- Tabella log alert
CREATE TABLE IF NOT EXISTS alerts_log (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id      uuid REFERENCES configurator_sessions(id),
  alert_code      text,
  alert_text      text,
  created_at      timestamptz DEFAULT now()
);

-- RLS policies (Row Level Security)
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE configurator_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE alerts_log ENABLE ROW LEVEL SECURITY;

-- Policy: service role ha accesso completo (per le API routes)
-- Le politiche dettagliate per gli utenti autenticati vanno configurate
-- in base all'implementazione dell'auth Supabase.

-- Indici per performance
CREATE INDEX IF NOT EXISTS idx_contracts_client_id ON contracts(client_id);
CREATE INDEX IF NOT EXISTS idx_documents_contract_id ON documents(contract_id);
CREATE INDEX IF NOT EXISTS idx_configurator_sessions_email ON configurator_sessions(client_email);
CREATE INDEX IF NOT EXISTS idx_contracts_status ON contracts(status);
