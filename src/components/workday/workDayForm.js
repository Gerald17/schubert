import React, { useState, useEffect } from "react";
import { Button, Select, Form } from "antd";
import { withFormik, Field as FormikField } from "formik";

import { endpoints } from "../../api/endpoints";
import HttpRequest from "../../api/HttpRequest";

const FormItem = Form.Item;
const Option = Select.Option;

const WorkDayFormik = ({
  props,
  values,
  errors,
  touched,
  setFieldTouched,
  setFieldValue,
  isSubmitting,
  handleSubmit
}) => {
  // define state for selects
  const [siteDepartments, setSiteDepartments] = useState([]);
  const [workAreas, setWorkAreas] = useState([]);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    loadInitialData();
  }, []);

  function loadInitialData() {
    const request = new HttpRequest(null);
    request
      .fetchData(endpoints.siteDepartment, null)
      .then(response => {
        const options = response.data.map(option => {
          return { value: option.id, name: option.name };
        });
        setSiteDepartments(options);
      })
      .catch(error => console.log(error));
  }

  const setSelectedValue = (resource, value, callback) => {
    setFieldValue(resource, value);
    callback();
  };

  const requestWorkArea = site => {
    const request = new HttpRequest(null);
    request
      .fetchData(`${endpoints.workArea}/${site}`, null)
      .then(response => {
        let newOption = [];
        newOption.push(response.data);
        const options = newOption.map(option => {
          return { value: option.id, name: option.name };
        });
        setWorkAreas(options);
      })
      .catch(error => console.log(error));
  };

  const requestTeam = (site, workArea) => {
    const request = new HttpRequest(null);
    request
      .fetchData(
        `${endpoints.team}?Filters=site==${site},workarea==${workArea}`,
        null
      )
      .then(response => {
        const options = response.data.map(option => {
          return { value: option.id, name: option.name };
        });
        setTeams(options);
      })
      .catch(error => console.log(error));
  };

  return (
    <Form onSubmit={handleSubmit} layout="inline">
      <FormItem label="Seleccione el departamento">
        <FormikField
          name="site"
          render={({ field }) => (
            <Select
              {...field}
              onChange={value =>
                setSelectedValue("site", value, () => {
                  requestWorkArea(value);
                })
              }
              onBlur={() => setFieldTouched("site", true)}
              value={values.site}
              style={{ width: "200px" }}
            >
              {siteDepartments.map(option => {
                return (
                  <Option key={option.value} value={option.value}>
                    {option.name}
                  </Option>
                );
              })}
            </Select>
          )}
        />
      </FormItem>
      <FormItem label="Seleccione el área">
        <FormikField
          name="workArea"
          render={({ field }) => (
            <Select
              {...field}
              onChange={value =>
                setSelectedValue("workArea", value, () => {
                  requestTeam(values.site, value);
                })
              }
              onBlur={() => setFieldTouched("workArea", true)}
              value={values.workArea}
              style={{ width: "200px" }}
            >
              {workAreas.map(option => {
                return (
                  <Option key={option.value} value={option.value}>
                    {option.name}
                  </Option>
                );
              })}
            </Select>
          )}
        />
      </FormItem>
      <FormItem label="Seleccione el equipo">
        <FormikField
          name="team"
          render={({ field }) => (
            <Select
              {...field}
              onChange={value => setFieldValue("team", value)}
              onBlur={() => setFieldTouched("team", true)}
              value={values.team}
              style={{ width: "200px" }}
            >
              {teams.map(option => {
                return (
                  <Option key={option.value} value={option.value}>
                    {option.name}
                  </Option>
                );
              })}
            </Select>
          )}
        />
      </FormItem>

      <FormItem>
        <Button htmlType="submit" type="primary" disabled={isSubmitting}>
          Submit
        </Button>
      </FormItem>
    </Form>
  );
};

const WorkDayForm = withFormik({
  mapPropsToValues({ username, site, workArea, team }) {
    return {
      username: username || "",
      site: site || "",
      workArea: workArea || "",
      team: team || ""
    };
  },
  // validationSchema: yup.object().shape({
  // username: yup.string().required('Username is required'),
  // }),
  handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
    setTimeout(() => {
      console.log("Form values", values);
      // save
      setSubmitting(false);
    }, 2000);
  }
})(WorkDayFormik);

export default WorkDayForm;
