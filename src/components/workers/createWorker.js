import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Select, Button, message } from 'antd';

import { fetchSingleWorker } from '../../actions/workerActions';
import { fetchWorkPositions } from '../../actions/workPositionsActions';
import { fetchCompanies } from '../../actions/companiesActions';
import { fetchTeams } from '../../actions/teamActions';
import { getOptions } from '../../utils/common';

import HttpRequest from '../../api/HttpRequest';
import { endpoints } from '../../api/endpoints';

const request = new HttpRequest();

const FormItem = Form.Item;
const Option = Select.Option;

const CreateWorker = ({
	workPositions,
	companies,
	teams,
	fetchWorkPositions,
	fetchCompanies,
	fetchTeams,
	form: { getFieldDecorator, getFieldsError, validateFields },
}) => {
	useEffect(() => {
		fetchWorkPositions();
		fetchCompanies();
		fetchTeams();
	}, [fetchWorkPositions, fetchCompanies, fetchTeams]);

	const hasErrors = fieldsError => {
		return Object.keys(fieldsError).some(field => fieldsError[field]);
	};

	const handleSubmit = e => {
		e.preventDefault();
		validateFields((err, values) => {
			if (!err) {
				request
					.createData(`${endpoints.worker}`, values)
					.then(response => {
						if (response.status === 200 || response.status === 204) {
							message.success('Registro creado exitosamente');
						}
					})
					.catch(error => {
						console.log('error', error);
					});
			}
		});
	};

	return (
		<Form onSubmit={handleSubmit} layout="vertical">
			<FormItem label="Nombre" hasFeedback>
				{getFieldDecorator('name', {
					rules: [{ required: true, message: 'Escriba el nombre' }],
				})(<Input placeholder="Nombre" />)}
			</FormItem>
			<FormItem label="Nit" hasFeedback>
				{getFieldDecorator('nit', {
					rules: [{ required: true, message: 'Escriba el número de NIT' }],
				})(<Input placeholder="NIT" />)}
			</FormItem>
			<FormItem label="ISSS" hasFeedback>
				{getFieldDecorator('isss', {
					rules: [{ required: true, message: 'Escriba el número del ISSS' }],
				})(<Input placeholder="ISSS" />)}
			</FormItem>
			<FormItem label="Cargo" hasFeedback>
				{getFieldDecorator('workPositionId', {
					rules: [{ required: true, message: 'Seleccione el cargo!' }],
				})(
					<Select style={{ width: '200px' }}>
						{workPositions.map(option => {
							return (
								<Option key={option.value} value={option.value}>
									{option.name}
								</Option>
							);
						})}
					</Select>
				)}
			</FormItem>
			<FormItem label="Empresa" hasFeedback>
				{getFieldDecorator('companyId', {
					rules: [{ required: true, message: 'Seleccione una empresa' }],
				})(
					<Select style={{ width: '200px' }}>
						{companies.map(option => {
							return (
								<Option key={option.value} value={option.value}>
									{option.name}
								</Option>
							);
						})}
					</Select>
				)}
			</FormItem>
			<FormItem label="Equipo" hasFeedback>
				{getFieldDecorator('workerTeamId', {
					rules: [{ required: true, message: 'Seleccione un equipo' }],
				})(
					<Select style={{ width: '200px' }}>
						{teams.map(option => {
							return (
								<Option key={option.value} value={option.value}>
									{option.name}
								</Option>
							);
						})}
					</Select>
				)}
			</FormItem>
			<Form.Item>
				<Button
					type="primary"
					htmlType="submit"
					disabled={hasErrors(getFieldsError())}>
					Crear
				</Button>
			</Form.Item>
		</Form>
	);
};

const mapStateToProps = state => {
	const workPositions = getOptions(state.workPositionsInfo.workPositions);
	const companies = getOptions(state.companiesInfo.companies);
	const teams = getOptions(state.teamsInfo.teams);
	return {
		workPositions,
		companies,
		teams,
	};
};

const EnhancedCreateWorkerForm = Form.create({ name: 'worker_create' })(
	CreateWorker
);

export default connect(mapStateToProps, {
	fetchSingleWorker,
	fetchWorkPositions,
	fetchCompanies,
	fetchTeams,
})(EnhancedCreateWorkerForm);
