import WorkDay from '../workday/WorkDay';
import Workers from '../../components/workers/workers';
import EditWorker from '../../components/workers/editWorker';
import CreateWorker from '../../components/workers/createWorker';

export const menuItems = [
  {
    id: 1,
    label: "Iniciar Jornada",
    icon: "pie-chart",
    link: "/workDay"
  },
  {
    id: 2,
    label: "Terminar Jornada",
    icon: "pie-chart",
    link: "/workDay"
  },
  {
    id: 3,
    label: "Catalogos",
    icon: "pie-chart",
    link: "#",
    submenu: [
      { id: 31, label: "Personas", link: "/persons" },
      { id: 32, label: "Camiones", link: "/trucks" }
    ]
  }
];

export const menuComponents = [
  {
    id: 1,
    component: WorkDay,
    path: "/workDay"
  },
  {
    id: 2,
    component: null,
    path: "/trucks"
  },
  {
    id: 3,
    component: Workers,
    path: "/persons"
  },
  {
    id: 31,
    component: EditWorker,
    path: "/persons/edit/:workerId"
  },
  {
    id: 32,
    component: CreateWorker,
    path: "/persons/create"
  },
]