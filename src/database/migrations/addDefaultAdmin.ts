import { AdminModel } from '../../models/admin.model';

const addDefaultAdmin = async () => {
  await AdminModel.create({
    id: '2853016c-018e-4533-90a4-85e8be342c44',
    email: 'narimanyanvahe@gmail.com',
    password: '$2b$10$BW3ggCMRoUHyU5xrp2bhiekdMLPTDzufAo3yK4cM50UcsIJ8yKTMO',
    full_name: 'Vahe Narimanyan',
    is_verified: true,
    secret: null,
  })
}

addDefaultAdmin();