import { AdminModel } from '../../models/admin.model';

const addDefaultAdmin = async () => {
  await AdminModel.create({
    id: '2853016c-018e-4533-90a4-85e8be342c44',
    email: 'narimanyanvahe@gmail.com',
    password: '$2b$10$iM8Uh7U6jEq6D97hHJKNmuA/gwujxld6HLJvE46QLMYraxtOOwPei',
    full_name: 'Vahe Narimanyan',
    is_verified: true,
    secret: null,
  });
};

addDefaultAdmin();
