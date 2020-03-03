import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Table } from 'antd';

import { fetchVehicle } from '../../actions/vehiclesActions';

const Vehicle = ({ vehicles, fetchVehicle, match: { path } }) => {
	const columns = [
		{
			title: 'Modelo',
			dataIndex: 'model',
			key: 'model',
		},
		{
			title: 'Año',
			dataIndex: 'year',
			key: 'year',
		},
		{
			title: 'Millaje',
			dataIndex: 'mileage',
			key: 'mileage',
		},
		{
			title: 'Kilometraje',
			dataIndex: 'kilometers',
			key: 'kilometers',
		},
		{
			title: 'Estado',
			dataIndex: 'state',
			key: 'state',
		},
		{
			title: 'Acción',
			key: 'action',
			render: vehicle => (
				<span>
					<Link to={`${path}/edit/${vehicle.id}`}>Editar</Link>
				</span>
			),
		},
	];

	// load workers
	useEffect(() => {
		fetchVehicle();
	}, [fetchVehicle]);

	return (
		<>
			<Link to={`${path}/create`}>Crear</Link>
			{vehicles.length > 0 && (
				<Table columns={columns} dataSource={vehicles} rowKey="id" />
			)}
		</>
	);
};

const mapStateToProps = state => {
	const vehicles = state.vehicleInfo.vehicles;
	return {
		vehicles,
	};
};

export default connect(mapStateToProps, { fetchVehicle })(Vehicle);
