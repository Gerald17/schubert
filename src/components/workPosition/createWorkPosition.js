import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Select, Button, message } from 'antd';

import { fetchWorkArea } from '../../actions/workAreaActions';
import { getOptions } from '../../utils/common';

import HttpRequest from '../../api/HttpRequest';
import { endpoints } from '../../api/endpoints';

const request = new HttpRequest();

const FormItem = Form.Item;
const Option = Select.Option;

const CreateWorkPosition = ({
	workAreas,
	fetchWorkArea,
	form: { getFieldDecorator, getFieldsError, validateFields },
}) => {
	useEffect(() => {
		fetchWorkArea();
	}, [fetchWorkArea]);

	const hasErrors = fieldsError => {
		return Object.keys(fieldsError).some(field => fieldsError[field]);
	};

	const handleSubmit = e => {
		e.preventDefault();
		validateFields((err, values) => {
			if (!err) {
				request
					.createData(`${endpoints.workPosition}`, values)
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
			<FormItem label="Descripcion" hasFeedback>
				{getFieldDecorator('description', {
					rules: [{ required: true, message: 'Escriba la descripcion' }],
				})(<Input placeholder="description" />)}
			</FormItem>
			<FormItem label="Area de Trabajo" hasFeedback>
				{getFieldDecorator('workAreaId', {
					rules: [{ required: true, message: 'Seleccione el area de trabajo' }],
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
					Crear
				</Button>
			</Form.Item>
		</Form>
	);
};

const mapStateToProps = state => {
	const workAreas = getOptions(state.workAreasInfo.workAreas);
	return {
		workAreas,
	};
};

const EnhancedCreateWorkPositionForm = Form.create({
	name: 'workPosition_create',
})(CreateWorkPosition);

export default connect(mapStateToProps, {
	fetchWorkArea,
})(EnhancedCreateWorkPositionForm);
