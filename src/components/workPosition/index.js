import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Table } from 'antd';

import { fetchWorkPositions } from '../../actions/workPositionsActions';

const WorkPosition = ({
	workPosition,
	fetchWorkPositions,
	match: { path },
}) => {
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
			title: 'Area de Trabajo',
			dataIndex: 'workArea',
			key: 'workArea',
			render: workArea => workArea.name,
		},
		{
			title: 'Acción',
			key: 'action',
			render: worker => (
				<span>
					<Link to={`${path}/edit/${worker.id}`}>Editar</Link>
				</span>
			),
		},
	];

	// load workers
	useEffect(() => {
		fetchWorkPositions();
	}, [fetchWorkPositions]);

	return (
		<>
			<Link to={`${path}/create`}>Crear</Link>
			{workPosition.length > 0 && (
				<Table columns={columns} dataSource={workPosition} rowKey="id" />
			)}
		</>
	);
};

const mapStateToProps = state => {
	const workPosition = state.workPositionsInfo.workPositions;
	return {
		workPosition,
	};
};

export default connect(mapStateToProps, { fetchWorkPositions })(WorkPosition);
