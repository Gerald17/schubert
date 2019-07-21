import WorkDay from '../workday/WorkDay';

import TeamJourneys from '../workday/TeamJourneys';
import EndWorkDay from '../workday/endWorkDay';

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
    link: "/teamJourneys"
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
    component: TeamJourneys,
    path: "/teamJourneys"
  },
  {
    id: 21,
    component: EndWorkDay,
    path: "/teamJourneys/:id"
  },
  {
    id: 3,
    component: EndWorkDay,
    path: "/endWorkDay"
  },
  {
    id: 4,
    component: null,
    path: "/trucks"
  },
  {
    id: 5,
    component: Workers,
    path: "/persons"
  },
  {
    id: 51,
    component: EditWorker,
    path: "/persons/edit/:workerId"
  },
  {
    id: 52,
    component: CreateWorker,
    path: "/persons/create"
  },
]