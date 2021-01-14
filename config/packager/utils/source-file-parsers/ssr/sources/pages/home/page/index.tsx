// import React from 'react';
// import { useDispatch } from 'react-redux';
// import { setModalAction } from '@wildberries/notifications';
// import s from './index.scss';

// export const Page = React.memo(() => {
//   const dispatch = useDispatch();

//   const handler = () =>
//     dispatch(setModalAction({ text: 'test', status: 'success' }));

//   return (
//     <div className={s.root}>
//       <button onClick={handler} type="button">
//         Test
//       </button>
//     </div>
//   );
// });

import React from 'react';
import s from './index.scss';

export const Page = React.memo(() => {
  return <div className={s.root}>Home</div>;
});
