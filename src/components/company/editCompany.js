import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, message } from 'antd';

import { fetchSingleCompany } from '../../actions/companiesActions';

import HttpRequest from '../../api/HttpRequest';
import { endpoints } from '../../api/endpoints';

const request = new HttpRequest();

const FormItem = Form.Item;

const EditCompany = ({
	companies,
	fetchSingleCompany,
	match: { params },
	form: { getFieldDecorator, getFieldsError, validateFields },
}) => {
	useEffect(() => {
		fetchSingleCompany(params.companyId);
	}, [fetchSingleCompany, params]);

	const hasErrors = fieldsError => {
		return Object.keys(fieldsError).some(field => fieldsError[field]);
	};

	const handleSubmit = e => {
		e.preventDefault();
		validateFields((err, values) => {
			if (!err) {
				request
					.updateData(`${endpoints.companies}/${companies.id}`, values)
					.then(response => {
						if (response.status === 200 || response.status === 204) {
							message.success('Datos actualizados exitosamente');
						}
					})
					.catch(error => {
						console.log('error', error);
					});
			}
		});
	};

	//const nameError = isFieldTouched("name") && getFieldError("name");
	//const nitError = isFieldTouched("nit") && getFieldError("nit");
	//const isssError = isFieldTouched("isss") && getFieldError("isss");
	//const workPositionError = isFieldTouched("workPosition") && getFieldError("workPosition");
	//const companyIdError = isFieldTouched("companyId") && getFieldError("companyId");
	//const workerTeamIdError = isFieldTouched("workerTeamId") && getFieldError("workerTeamId");
	console.log('companies', companies);

	return (
		<Form onSubmit={handleSubmit} layout="vertical">
			<FormItem label="Id">
				{getFieldDecorator('id', {
					initialValue: companies.id,
				})(<Input disabled />)}
			</FormItem>
			<FormItem label="Nombre" hasFeedback>
				{getFieldDecorator('name', {
					rules: [{ required: true, message: 'Escriba el nombre' }],
					initialValue: companies.name,
				})(<Input placeholder="Nombre" />)}
			</FormItem>
			<FormItem label="Descripcion" hasFeedback>
				{getFieldDecorator('description', {
					rules: [{ required: true, message: 'Escriba la descripcion' }],
					initialValue: companies.description,
				})(<Input placeholder="Descripcion" />)}
			</FormItem>
			<Form.Item>
				<Button
					type="primary"
					htmlType="submit"
					disabled={hasErrors(getFieldsError())}>
					Actualizar
				</Button>
			</Form.Item>
		</Form>
	);
};

const mapStateToProps = state => {
	const companies = state.companiesInfo.companies;
	return {
		companies,
	};
};

const EnhancedCompanyEditForm = Form.create({ name: 'company_edit' })(
	EditCompany
);

export default connect(mapStateToProps, {
	fetchSingleCompany,
})(EnhancedCompanyEditForm);
