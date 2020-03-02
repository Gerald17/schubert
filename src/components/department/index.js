import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Table } from 'antd';

import { fetchDepartment } from '../../actions/departmentActions';

const Department = ({ departments, fetchDepartment, match: { path } }) => {
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
			render: department => (
				<span>
					<Link to={`${path}/edit/${department.id}`}>Editar</Link>
				</span>
			),
		},
	];

	// load workers
	useEffect(() => {
		fetchDepartment();
	}, [fetchDepartment]);

	return (
		<>
			<Link to={`${path}/create`}>Crear</Link>
			{departments.length > 0 && (
				<Table columns={columns} dataSource={departments} rowKey="id" />
			)}
		</>
	);
};

const mapStateToProps = state => {
	console.log(state);
	const departments = state.departmentInfo.departments;
	return {
		departments,
	};
};

export default connect(mapStateToProps, { fetchDepartment })(Department);
