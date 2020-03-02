import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Table } from 'antd';

import { fetchWorkArea } from '../../actions/workAreaActions';

const WorkArea = ({ workAreas, fetchWorkArea, match: { path } }) => {
	const columns = [
		{
			title: 'Nombre',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Descripcion',
			dataIndex: 'description',
			key: 'description',
		},
		{
			title: 'Acción',
			key: 'action',
			render: workArea => (
				<span>
					<Link to={`${path}/edit/${workArea.id}`}>Editar</Link>
				</span>
			),
		},
	];

	// load workers
	useEffect(() => {
		fetchWorkArea();
	}, [fetchWorkArea]);

	return (
		<>
			<Link to={`${path}/create`}>Crear</Link>
			{workAreas.length > 0 && (
				<Table columns={columns} dataSource={workAreas} rowKey="id" />
			)}
		</>
	);
};

const mapStateToProps = state => {
	const workAreas = state.workAreasInfo.workAreas;
	return {
		workAreas,
	};
};

export default connect(mapStateToProps, { fetchWorkArea })(WorkArea);
