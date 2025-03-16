import { AdminModel } from './admin.model';

const Models = async () => {
  await AdminModel.sync({ force: false });
};

Models();