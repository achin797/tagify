import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class SearchForm extends Component {

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    // Only show error after a field is touched.
    const titleError = isFieldTouched('title') && getFieldError('title');
    const artistError = isFieldTouched('artist') && getFieldError('artist');
    const albumError = isFieldTouched('album') && getFieldError('album');
    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <Form.Item validateStatus={titleError ? 'error' : ''} help={titleError || ''}>
          {getFieldDecorator('title', {
            rules: [{ required: true, message: 'Please input the title!' }],
          })(
            <Input
              placeholder="Title"
            />,
          )}
        </Form.Item>
        <Form.Item validateStatus={artistError ? 'error' : ''} help={artistError || ''}>
          {getFieldDecorator('artist', {
            rules: [{ required: true, message: 'Please input the artist!' }],
          })(
            <Input
              placeholder="Artist"
            />,
          )}
        </Form.Item>
        <Form.Item validateStatus={albumError ? 'error' : ''} help={albumError || ''}>
          {getFieldDecorator('album', {
            rules: [{ required: true, message: 'Please input the album!' }],
          })(
            <Input
              placeholder="Album"
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
            Search
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export const WrappedSearchForm = Form.create({ name: 'horizontal_login' })(SearchForm);
