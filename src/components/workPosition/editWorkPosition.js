import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Select, Button, message } from 'antd';

import { fetchSingleWorkPosition } from '../../actions/workPositionsActions';
import { fetchWorkArea } from '../../actions/workAreaActions';
import { getOptions } from '../../utils/common';

import HttpRequest from '../../api/HttpRequest';
import { endpoints } from '../../api/endpoints';

const request = new HttpRequest();

const FormItem = Form.Item;
const Option = Select.Option;

const EditWorkPosition = ({
	workPosition,
	workAreas,
	fetchSingleWorkPosition,
	fetchWorkArea,
	match: { params },
	form: { getFieldDecorator, getFieldsError, validateFields },
}) => {
	useEffect(() => {
		fetchSingleWorkPosition(params.workPositionId);
		fetchWorkArea();
	}, [fetchSingleWorkPosition, fetchWorkArea, params]);

	const hasErrors = fieldsError => {
		return Object.keys(fieldsError).some(field => fieldsError[field]);
	};

	const handleSubmit = e => {
		e.preventDefault();
		validateFields((err, values) => {
			if (!err) {
				request
					.updateData(`${endpoints.workPosition}/${workPosition.id}`, values)
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

	return (
		<Form onSubmit={handleSubmit} layout="vertical">
			<FormItem label="Id">
				{getFieldDecorator('id', {
					initialValue: workPosition.id,
				})(<Input disabled />)}
			</FormItem>
			<FormItem label="Nombre" hasFeedback>
				{getFieldDecorator('name', {
					rules: [{ required: true, message: 'Escriba el nombre' }],
					initialValue: workPosition.name,
				})(<Input placeholder="Nombre" />)}
			</FormItem>
			<FormItem label="Descripcion" hasFeedback>
				{getFieldDecorator('description', {
					rules: [{ required: true, message: 'Escriba la descripcion' }],
					initialValue: workPosition.description,
				})(<Input placeholder="description" />)}
			</FormItem>
			<FormItem label="Area de trabajo" hasFeedback>
				{getFieldDecorator('workAreaId', {
					rules: [
						{ required: true, message: 'Seleccione el area de trabajo!' },
					],
					initialValue: workPosition.workAreaId,
				})(
					<Select style={{ width: '200px' }}>
						{workAreas.map(option => {
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
					Actualizar
				</Button>
			</Form.Item>
		</Form>
	);
};

const mapStateToProps = state => {
	const workPosition = state.workPositionsInfo.workPositions;
	const workAreas = getOptions(state.workAreasInfo.workAreas);
	return {
		workPosition,
		workAreas,
	};
};

const EnhancedEditWorkPositionForm = Form.create({ name: 'workPosition_edit' })(
	EditWorkPosition
);

export default connect(mapStateToProps, {
	fetchSingleWorkPosition,
	fetchWorkArea,
})(EnhancedEditWorkPositionForm);
