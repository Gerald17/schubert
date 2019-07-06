import WorkDay from '../workday/WorkDay';
import Workers from '../../components/workers/workers';
import EditWorker from '../../components/workers/editWorker';

export const menuItems = [
  {
    id: 1,
    label: "Iniciar Jornada",
    icon: "pie-chart",
    component: WorkDay,
    showInMenu: true,
    link: "/WorkDay"
  },
  {
    id: 2,
    label: "Terminar Jornada",
    icon: "pie-chart",
    component: null,
    showInMenu: true,
    link: "/WorkDay"
  },
  {
    id: 3,
    label: "Catalogos",
    icon: "pie-chart",
    component: null,
    showInMenu: true,
    link: "#",
    submenu: [
      { id: 31, label: "Personas", icon: "pie-chart", component: Workers, showInMenu: true, link: "/Persons" },
      { id: 32, label: "Camiones", icon: "pie-chart", component: null, showInMenu: true, link: "/Trucks" }
    ]
  },
  {
    id: 4,
    label: "Editar Worker",
    icon: "pie-chart",
    component: EditWorker,
    showInMenu: false,
    link: "/Persons/edit/:id"
  },

];