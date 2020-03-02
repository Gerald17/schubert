import WorkDay from '../workday/WorkDay';

import TeamJourneys from '../workday/TeamJourneys';
import EndWorkDay from '../workday/endWorkDay';

import Workers from '../../components/workers/workers';
import EditWorker from '../../components/workers/editWorker';
import CreateWorker from '../../components/workers/createWorker';
import company from '../company';
import editCompany from '../company/editCompany';
import createCompany from '../company/createCompany';
import Department from '../department';
import WorkPosition from '../workPosition';
import Vehicle from '../vehicle';
import editDepartment from '../department/editDepartment';
import CreateDepartment from '../department/createDepartment';
import workArea from '../workArea';
import editWorkArea from '../workArea/editWorkArea';
import createWorkArea from '../workArea/createWorkArea';
import editVehicle from '../vehicle/editVehicle';
import createVehicle from '../vehicle/createVehicle';
import createWorkPosition from '../workPosition/createWorkPosition';
import editWorkPosition from '../workPosition/editWorkPosition';

export const menuItems = [
	{
		id: 1,
		label: 'Iniciar Jornada',
		icon: 'calendar',
		link: '/workDay',
	},
	{
		id: 2,
		label: 'Terminar Jornada',
		icon: 'carry-out',
		link: '/teamJourneys',
	},
	{
		id: 3,
		label: 'Catalogos',
		icon: 'database',
		link: '#',
		submenu: [
			{ id: 31, label: 'Personas', link: '/persons' },
			{ id: 32, label: 'Camiones', link: '/trucks' },
			{ id: 33, label: 'Compañia', link: '/company' },
			{ id: 34, label: 'Departamento', link: '/siteDepartment' },
			{ id: 35, label: 'Posicion de trabajo', link: '/workPosition' },
			{ id: 36, label: 'Area de trabajo', link: '/workArea' },
			{ id: 37, label: 'Vehiculo', link: '/vehicle' },
		],
	},
];

export const menuComponents = [
	{
		id: 1,
		component: WorkDay,
		path: '/workDay',
	},
	{
		id: 2,
		component: TeamJourneys,
		path: '/teamJourneys',
	},
	{
		id: 21,
		component: EndWorkDay,
		path: '/teamJourneys/:id',
	},
	{
		id: 3,
		component: EndWorkDay,
		path: '/endWorkDay',
	},
	{
		id: 4,
		component: null,
		path: '/trucks',
	},
	{
		id: 5,
		component: Workers,
		path: '/persons',
	},
	{
		id: 51,
		component: EditWorker,
		path: '/persons/edit/:workerId',
	},
	{
		id: 52,
		component: CreateWorker,
		path: '/persons/create',
	},
	{
		id: 6,
		component: company,
		path: '/company',
	},
	{
		id: 61,
		component: editCompany,
		path: '/company/edit/:companyId',
	},
	{
		id: 62,
		component: createCompany,
		path: '/company/create',
	},
	{
		id: 7,
		component: Department,
		path: '/siteDepartment',
	},
	{
		id: 71,
		component: editDepartment,
		path: '/siteDepartment/edit/:departmentId',
	},
	{
		id: 72,
		component: CreateDepartment,
		path: '/siteDepartment/create',
	},
	{
		id: 8,
		component: WorkPosition,
		path: '/workPosition',
	},
	{
		id: 81,
		component: editWorkPosition,
		path: '/workPosition/edit/:workPositionId',
	},
	{
		id: 82,
		component: createWorkPosition,
		path: '/workPosition/create',
	},
	{
		id: 9,
		component: workArea,
		path: '/workArea',
	},
	{
		id: 91,
		component: editWorkArea,
		path: '/workArea/edit/:workAreaId',
	},
	{
		id: 92,
		component: createWorkArea,
		path: '/workArea/create',
	},
	{
		id: 100,
		component: Vehicle,
		path: '/vehicle',
	},
	{
		id: 101,
		component: editVehicle,
		path: '/vehicle/edit/:vehicleId',
	},
	{
		id: 102,
		component: createVehicle,
		path: '/vehicle/create',
	},
];
