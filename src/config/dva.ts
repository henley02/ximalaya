import {create} from 'dva-core-ts';
import models from '@/models/index';

const app = create();

models.forEach(model => {
  app.model(model);
});

app.start();

export default app._store;
