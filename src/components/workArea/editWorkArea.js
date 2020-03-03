import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, message } from 'antd';

import { fetchSingleWorkArea } from '../../actions/workAreaActions';

import HttpRequest from '../../api/HttpRequest';
import { endpoints } from '../../api/endpoints';

const request = new HttpRequest();

const FormItem = Form.Item;

const EditWorkArea = ({
	workAreas,
	fetchSingleWorkArea,
	match: { params },
	form: { getFieldDecorator, getFieldsError, validateFields },
}) => {
	useEffect(() => {
		fetchSingleWorkArea(params.workAreaId);
	}, [fetchSingleWorkArea, params]);

	const hasErrors = fieldsError => {
		return Object.keys(fieldsError).some(field => fieldsError[field]);
	};

	const handleSubmit = e => {
		e.preventDefault();
		validateFields((err, values) => {
			if (!err) {
				request
					.updateData(`${endpoints.workArea}/${workAreas.id}`, values)
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
	console.log('workAreas', workAreas);

	return (
		<Form onSubmit={handleSubmit} layout="vertical">
			<FormItem label="Id">
				{getFieldDecorator('id', {
					initialValue: workAreas.id,
				})(<Input disabled />)}
			</FormItem>
			<FormItem label="Nombre" hasFeedback>
				{getFieldDecorator('name', {
					rules: [{ required: true, message: 'Escriba el nombre' }],
					initialValue: workAreas.name,
				})(<Input placeholder="Nombre" />)}
			</FormItem>
			<FormItem label="Descripcion" hasFeedback>
				{getFieldDecorator('description', {
					rules: [{ required: true, message: 'Escriba una Descripcion' }],
					initialValue: workAreas.description,
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
	const workAreas = state.workAreasInfo.workAreas;
	return {
		workAreas,
	};
};

const EnhancedWorkAreaEditForm = Form.create({ name: 'workArea_edit' })(
	EditWorkArea
);

export default connect(mapStateToProps, {
	fetchSingleWorkArea,
})(EnhancedWorkAreaEditForm);
