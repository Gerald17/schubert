import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, message } from 'antd';

import { fetchSingleDepartment } from '../../actions/departmentActions';

import HttpRequest from '../../api/HttpRequest';
import { endpoints } from '../../api/endpoints';

const request = new HttpRequest();

const FormItem = Form.Item;

const EditDepartment = ({
	departments,
	fetchSingleDepartment,
	match: { params },
	form: { getFieldDecorator, getFieldsError, validateFields },
}) => {
	useEffect(() => {
		fetchSingleDepartment(params.departmentId);
	}, [fetchSingleDepartment, params]);

	const hasErrors = fieldsError => {
		return Object.keys(fieldsError).some(field => fieldsError[field]);
	};

	const handleSubmit = e => {
		e.preventDefault();
		validateFields((err, values) => {
			if (!err) {
				request
					.updateData(`${endpoints.siteDepartment}/${departments.id}`, values)
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
	console.log('departments', departments);

	return (
		<Form onSubmit={handleSubmit} layout="vertical">
			<FormItem label="Id">
				{getFieldDecorator('id', {
					initialValue: departments.id,
				})(<Input disabled />)}
			</FormItem>
			<FormItem label="Nombre" hasFeedback>
				{getFieldDecorator('name', {
					rules: [{ required: true, message: 'Escriba el nombre' }],
					initialValue: departments.name,
				})(<Input placeholder="Nombre" />)}
			</FormItem>
			<FormItem label="Descripcion" hasFeedback>
				{getFieldDecorator('description', {
					rules: [{ required: true, message: 'Escriba una descripcion' }],
					initialValue: departments.description,
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
	const departments = state.departmentInfo.departments;
	return {
		departments,
	};
};

const EnhancedDepartmentEditForm = Form.create({ name: 'department_edit' })(
	EditDepartment
);

export default connect(mapStateToProps, {
	fetchSingleDepartment,
})(EnhancedDepartmentEditForm);
