import React from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, message } from 'antd';

import HttpRequest from '../../api/HttpRequest';
import { endpoints } from '../../api/endpoints';

const request = new HttpRequest();

const FormItem = Form.Item;

const CreateCompany = ({
	form: { getFieldDecorator, getFieldsError, validateFields },
}) => {
	const hasErrors = fieldsError => {
		return Object.keys(fieldsError).some(field => fieldsError[field]);
	};

	const handleSubmit = e => {
		e.preventDefault();
		validateFields((err, values) => {
			if (!err) {
				request
					.createData(`${endpoints.companies}`, values)
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
			<FormItem label="Descripccion" hasFeedback>
				{getFieldDecorator('description', {
					rules: [{ required: true, message: 'Escriba la descripccion' }],
				})(<Input placeholder="Descripccion" />)}
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
	return {};
};

const EnhancedCreateCompanyForm = Form.create({ name: 'worker_create' })(
	CreateCompany
);

export default connect(mapStateToProps, {})(EnhancedCreateCompanyForm);
