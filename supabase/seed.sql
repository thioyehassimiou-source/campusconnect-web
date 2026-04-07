-- CampusConnect Data Seed (INSERT ONLY)
-- Schema defined in migrations

INSERT INTO public.faculties (name, code) VALUES
  ('Faculté des Sciences et Techniques', 'FST'),
  ('Faculté des Sciences Administratives et de Gestion', 'FSAG'),
  ('Faculté des Lettres et Sciences Humaines', 'FLSH')
ON CONFLICT (code) DO NOTHING;

INSERT INTO public.departments (faculty_id, name, code)
SELECT id, 'Informatique', 'INF' FROM public.faculties WHERE code = 'FST' UNION ALL
SELECT id, 'MIAGE', 'MIA' FROM public.faculties WHERE code = 'FST' UNION ALL
SELECT id, 'Mathématiques Appliquées', 'MAT' FROM public.faculties WHERE code = 'FST' UNION ALL
SELECT id, 'Biologie & Environnement', 'BIO' FROM public.faculties WHERE code = 'FST' UNION ALL
SELECT id, 'Économie Statistique Appliquée', 'ESA' FROM public.faculties WHERE code = 'FST' UNION ALL
SELECT id, 'Chimie & Environnement', 'CHI' FROM public.faculties WHERE code = 'FST' UNION ALL
SELECT id, 'Énergie Photovoltaïque', 'ENV' FROM public.faculties WHERE code = 'FST'
ON CONFLICT (code) DO NOTHING;

INSERT INTO public.departments (faculty_id, name, code)
SELECT id, 'Administration Publique', 'ADM' FROM public.faculties WHERE code = 'FSAG' UNION ALL
SELECT id, 'Économie', 'ECO' FROM public.faculties WHERE code = 'FSAG' UNION ALL
SELECT id, 'Gestion', 'GES' FROM public.faculties WHERE code = 'FSAG' UNION ALL
SELECT id, 'Économie Sociale et Solidaire', 'ESS' FROM public.faculties WHERE code = 'FSAG'
ON CONFLICT (code) DO NOTHING;

INSERT INTO public.departments (faculty_id, name, code)
SELECT id, 'Sociologie & Anthropologie', 'SOC' FROM public.faculties WHERE code = 'FLSH' UNION ALL
SELECT id, 'Langue Anglaise', 'ANG' FROM public.faculties WHERE code = 'FLSH' UNION ALL
SELECT id, 'Langue Arabe', 'ARA' FROM public.faculties WHERE code = 'FLSH' UNION ALL
SELECT id, 'Lettres Modernes', 'LET' FROM public.faculties WHERE code = 'FLSH'
ON CONFLICT (code) DO NOTHING;

INSERT INTO public.services (name) VALUES
  ('Vice-rectorats'),
  ('Service technique et maintenance'),
  ('Service Informatique / IT'),
  ('Service Informatique'),
  ('Service Financier'),
  ('Service des Examens'),
  ('Service des Affaires Académiques'),
  ('Service de la Scolarité'),
  ('Service de la Recherche'),
  ('Service d''ordre'),
  ('Secrétariat général'),
  ('Scolarité'),
  ('Restauration Universitaire'),
  ('Études avancées / post-graduation'),
  ('Éditions universitaires'),
  ('Direction des ressources humaines'),
  ('Direction des affaires administratives et financières'),
  ('Coopération et relations extérieures'),
  ('Contrôle financier'),
  ('Centre médical universitaire'),
  ('Centre informatique'),
  ('Centre des œuvres universitaires'),
  ('Centre de Santé'),
  ('Bureau des Sports'),
  ('Bibliothèque Universitaire'),
  ('Agence comptable'),
  ('Accueil Médecine'),
  ('Accueil Droit')
ON CONFLICT (name) DO NOTHING;

