import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Table } from 'antd';

import { fetchCompanies } from '../../actions/companiesActions';

const Company = ({ companies, fetchCompanies, match: { path } }) => {
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
			render: company => (
				<span>
					<Link to={`${path}/edit/${company.id}`}>Editar</Link>
				</span>
			),
		},
	];

	// load workers
	useEffect(() => {
		fetchCompanies();
	}, [fetchCompanies]);

	return (
		<>
			<Link to={`${path}/create`}>Crear</Link>
			{companies.length > 0 && (
				<Table columns={columns} dataSource={companies} rowKey="id" />
			)}
		</>
	);
};

const mapStateToProps = state => {
	const companies = state.companiesInfo.companies;
	return {
		companies,
	};
};

export default connect(mapStateToProps, { fetchCompanies })(Company);
