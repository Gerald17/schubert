import React from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, message } from 'antd';

import HttpRequest from '../../api/HttpRequest';
import { endpoints } from '../../api/endpoints';

const request = new HttpRequest();

const FormItem = Form.Item;

const CreateVehicle = ({
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
					.createData(`${endpoints.vehicle}`, values)
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
			<FormItem label="ID" hasFeedback>
				{getFieldDecorator('id', {
					rules: [{ required: true, message: 'Escriba el ID' }],
				})(<Input placeholder="ID" />)}
			</FormItem>
			<FormItem label="Modelo" hasFeedback>
				{getFieldDecorator('model', {
					rules: [{ required: true, message: 'Escriba el modelo' }],
				})(<Input placeholder="Modelo" />)}
			</FormItem>
			<FormItem label="Año" hasFeedback>
				{getFieldDecorator('year', {
					rules: [{ required: true, message: 'Escriba el año' }],
				})(<Input placeholder="Año" />)}
			</FormItem>
			<FormItem label="Millaje" hasFeedback>
				{getFieldDecorator('mileage', {
					rules: [{ required: true, message: 'Escriba el millaje' }],
				})(<Input placeholder="Millaje" />)}
			</FormItem>
			<FormItem label="Kilometraje" hasFeedback>
				{getFieldDecorator('kilometers', {
					rules: [{ required: true, message: 'Escriba el kilometraje' }],
				})(<Input placeholder="Kilometraje" />)}
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

const EnhancedCreateVehicleForm = Form.create({ name: 'vehicle_created' })(
	CreateVehicle
);

export default connect(mapStateToProps, {})(EnhancedCreateVehicleForm);
