import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, message } from 'antd';

import { fetchSingleVehicle } from '../../actions/vehiclesActions';

import HttpRequest from '../../api/HttpRequest';
import { endpoints } from '../../api/endpoints';

const request = new HttpRequest();

const FormItem = Form.Item;

const EditVehicle = ({
	vehicles,
	fetchSingleVehicle,
	match: { params },
	form: { getFieldDecorator, getFieldsError, validateFields },
}) => {
	useEffect(() => {
		fetchSingleVehicle(params.vehicleId);
	}, [fetchSingleVehicle, params]);

	const hasErrors = fieldsError => {
		return Object.keys(fieldsError).some(field => fieldsError[field]);
	};

	const handleSubmit = e => {
		e.preventDefault();
		validateFields((err, values) => {
			if (!err) {
				request
					.updateData(`${endpoints.vehicle}/${vehicles.id}`, values)
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
	console.log('vehicles', vehicles);

	return (
		<Form onSubmit={handleSubmit} layout="vertical">
			<FormItem label="Id">
				{getFieldDecorator('id', {
					initialValue: vehicles.id,
				})(<Input disabled />)}
			</FormItem>
			<FormItem label="Modelo" hasFeedback>
				{getFieldDecorator('model', {
					rules: [{ required: true, message: 'Escriba el modelo' }],
					initialValue: vehicles.model,
				})(<Input placeholder="Modelo" />)}
			</FormItem>
			<FormItem label="Año" hasFeedback>
				{getFieldDecorator('year', {
					rules: [{ required: true, message: 'Escriba el año' }],
					initialValue: vehicles.year,
				})(<Input placeholder="Año" />)}
			</FormItem>
			<FormItem label="Millaje" hasFeedback>
				{getFieldDecorator('mileage', {
					rules: [{ required: true, message: 'Escriba el millaje' }],
					initialValue: vehicles.mileage,
				})(<Input placeholder="Millaje" />)}
			</FormItem>
			<FormItem label="Kilometraje" hasFeedback>
				{getFieldDecorator('kilometers', {
					rules: [{ required: true, message: 'Escriba el kilometraje' }],
					initialValue: vehicles.kilometers,
				})(<Input placeholder="Kilometraje" />)}
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
	const vehicles = state.vehicleInfo.vehicles;
	return {
		vehicles,
	};
};

const EnhancedVehicleEditForm = Form.create({ name: 'vehicle_edit' })(
	EditVehicle
);

export default connect(mapStateToProps, {
	fetchSingleVehicle,
})(EnhancedVehicleEditForm);
