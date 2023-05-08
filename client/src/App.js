import Layaout from './Layaout/index';
import { BrowserRouter, RouterProvider } from 'react-router-dom';
import Routes from './router';
const  App =  () => {
 
  return (
    <BrowserRouter>    
    <RouterProvider router={Routes}>
      <Layaout/>
    </RouterProvider>
    </BrowserRouter>

  );
};

export default App;
