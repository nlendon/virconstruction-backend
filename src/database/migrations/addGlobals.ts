import { GlobalModel } from '../../models/global.model';

const addGlobals = async () => {
  try {
    await GlobalModel.bulkCreate([
      {
        id: '1965a592-9ff1-4faf-8368-d0dc5e630582',
        name: 'workers',
        value: false,
        count: 50,
      },
      {
        id: '1965a592-9ff1-4faf-8368-d0dc5e630552',
        name: 'clients',
        value: false,
        count: 50,
      },
      {
        id: '1965a592-9ff1-4faf-8368-d0dc5e130582',
        name: 'com_projects',
        value: false,
        count: 50,
      },
      {
        id: '1915a592-9ff1-4faf-8368-d0dc5e130582',
        name: 'run_projects',
        value: false,
        count: 50,
      }
    ])
  } catch (e) {
    console.error(e);
  }
}

addGlobals()