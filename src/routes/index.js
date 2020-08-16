import Login from '../views/login';
import Dashboard from '../views/dashboard';
import SingleReport from '../views/dashboard/single_report';
import Parcels from '../views/parcels';
import ProcessParcels from '../views/process_parcels';
import Tractors from '../views/tractor';


let routes = [
    {
        path: "/dashboard",
        component: Dashboard,
        exact: true,
        private: true
    },
    {
        path: "/report/:id",
        component: SingleReport,
        exact: true,
        private: true
    },
    {
        path: "/process-parcel",
        component: ProcessParcels,
        exact: true,
        private: true
    },
    {
        path: "/parcels",
        component: Parcels,
        exact: true,
        private: true
    },
    {
        path: "/tractors",
        component: Tractors,
        exact: true,
        private: true
    },
    {
        path: "/login",
        component: Login
    }
]

export default routes;