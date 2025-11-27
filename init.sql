INSERT INTO users (id, username, email, password, role, createdAt, updatedAt)
VALUES (
  gen_random_uuid(),
  'Cassiano',
  'cassiano@gmail.com',
  'Cassiano1234@',
  'admin',
  NULL,
  NOW(),
  NOW()
);
INSERT INTO profiles (id, userId, name, email, planId, createdAt, updatedAt)
VALUES (
    gen_random_uuid(),                            
    (SELECT id FROM users WHERE email='cassiano@gmail.com' LIMIT 1),  
    'Cassiano Silva',                             
    'cassiano@gmail.com',                         
    (SELECT id FROM plans WHERE name='Ultimate' LIMIT 1),
    NOW(),                                        
    NOW()                                         
);
INSERT INTO plans (id, name, description, period, price, color, bgcolor, createdAt, updatedAt) VALUES
(gen_random_uuid(), 'Basic', 'Plano básico ideal para começar e testar nossos serviços essenciais.', 'monthly', 23.12, 'text-blue-500', 'bg-blue-200', NOW(), NOW()),
(gen_random_uuid(), 'Standard', 'Plano padrão para quem quer mais recursos e benefícios adicionais.', 'semiannual', 52.59, 'text-yellow-500', 'bg-yellow-200', NOW(), NOW()),
(gen_random_uuid(), 'Premium', 'Plano premium com acesso completo às funcionalidades avançadas.', 'yearly', 140.10, 'text-amber-500', 'bg-amber-200', NOW(), NOW()),
(gen_random_uuid(), 'Ultimate', 'Plano ultimate para usuários que desejam todos os privilégios sem limitações.', 'lifetime', 210.26, 'text-orange-500', 'bg-orange-200', NOW(), NOW());
